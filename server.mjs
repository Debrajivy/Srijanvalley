import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createServer as createHttpServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const isProduction = process.argv.includes("--production");
const portFlagIndex = process.argv.indexOf("--port");
const port = Number((portFlagIndex >= 0 && process.argv[portFlagIndex + 1]) || process.env.PORT || 8080);
const rateLimits = new Map();

async function loadLocalEnv() {
  for (const name of [".env.local", ".env"]) {
    const path = join(root, name);
    if (!existsSync(path)) continue;
    const source = await readFile(path, "utf8");
    for (const line of source.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (!match || match[1] in process.env) continue;
      process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
    }
  }
}

await loadLocalEnv();

function json(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(payload));
}

async function readJson(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 40_000) throw new Error("Request is too large.");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function clientId(req) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = String(Array.isArray(forwarded) ? forwarded[0] : forwarded || req.socket.remoteAddress || "local").split(",")[0].trim();
  return createHash("sha256").update(`srijan-tutor:${ip}`).digest("hex").slice(0, 32);
}

function withinRateLimit(req) {
  const id = clientId(req);
  const now = Date.now();
  const current = rateLimits.get(id) || { start: now, count: 0 };
  if (now - current.start > 60_000) {
    rateLimits.set(id, { start: now, count: 1 });
    return true;
  }
  current.count += 1;
  rateLimits.set(id, current);
  return current.count <= 15;
}

async function openAIRequest(path, body) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "replace_with_your_rotated_key") {
    const error = new Error("OpenAI is not configured yet. Add a rotated API key to .env.local.");
    error.status = 503;
    throw error;
  }
  const response = await fetch(`https://api.openai.com${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data?.error?.message || "OpenAI request failed.");
    error.status = response.status;
    throw error;
  }
  return data;
}

async function handleTutor(req, res) {
  const body = await readJson(req);
  const message = String(body.message || "").trim().slice(0, 3000);
  const grade = String(body.grade || "8").replace(/[^0-9]/g, "").slice(0, 2);
  const subject = String(body.subject || "General Studies").slice(0, 80);
  const tutorName = String(body.tutorName || "Srijan AI Tutor").slice(0, 80);
  if (!message) return json(res, 400, { error: "Please enter a question." });
  if (!/^(6|7|8|9|10|11|12)$/.test(grade)) return json(res, 400, { error: "Choose a CBSE class from 6 to 12." });

  const history = Array.isArray(body.history)
    ? body.history.slice(-10).map((item) => ({
        role: item?.role === "assistant" ? "assistant" : "user",
        content: String(item?.content || "").slice(0, 3000),
      })).filter((item) => item.content)
    : [{ role: "user", content: message }];

  const instructions = `You are ${tutorName}, a patient AI tutor for Srijan Valley School in India. Teach CBSE Class ${grade} ${subject}.

Teaching approach:
- Start from the student's level, explain in clear Indian English, and use short sections.
- Use CBSE-aligned concepts and familiar Indian examples. Do not claim an exact textbook quotation or chapter mapping unless supplied.
- Guide with hints and steps. For homework or tests, teach the method instead of simply doing dishonest assessed work.
- Ask one useful check-for-understanding question when appropriate.
- Use simple text formatting that reads well aloud; avoid tables unless the student asks.
- If the student writes in Hindi or Hinglish, respond naturally in the same style.
- Be encouraging without being childish. Keep routine answers under 350 words.

Student safety:
- The learner may be a minor. Never request personal contact details, address, school credentials, photos, or other private information.
- Do not encourage dependency or secrecy from parents/teachers. For emergencies, abuse, self-harm, or dangerous activities, prioritize safety and advise contacting a trusted adult or emergency support.
- Clearly say when you are unsure and encourage checking important facts with a teacher or CBSE textbook.`;

  const data = await openAIRequest("/v1/responses", {
    model: process.env.OPENAI_TEXT_MODEL || "gpt-5-mini",
    instructions,
    input: history,
    store: false,
    max_output_tokens: 700,
    reasoning: { effort: "low" },
    text: { verbosity: "medium" },
    safety_identifier: clientId(req),
  });

  const reply = data.output_text || data.output?.flatMap((item) => item.content || []).find((item) => item.type === "output_text")?.text;
  if (!reply) throw new Error("The tutor returned an empty response.");
  return json(res, 200, { reply });
}

async function handleAvatar(req, res) {
  const body = await readJson(req);
  const prompt = String(body.prompt || "").trim().slice(0, 400);
  const tutorName = String(body.tutorName || "AI Tutor").slice(0, 80);
  const subject = String(body.subject || "teacher").slice(0, 80);
  if (prompt.length < 12) return json(res, 400, { error: "Please describe the tutor portrait in a little more detail." });

  const data = await openAIRequest("/v1/images/generations", {
    model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-2",
    prompt: `Create a square professional avatar portrait for a fictional adult AI tutor named ${tutorName}, specializing in ${subject}. ${prompt}. School-safe and welcoming for learners aged 11–18. Tasteful orange and royal-blue accents matching Srijan Valley School. Head-and-shoulders composition, clean background, polished educational product illustration. Do not depict a child, student, celebrity, public figure, logo, text, watermark, or a real person's likeness.`,
    size: "1024x1024",
    quality: "low",
    output_format: "png",
    n: 1,
  });
  const image = data.data?.[0]?.b64_json;
  if (!image) throw new Error("The avatar service returned no image.");
  return json(res, 200, { image });
}

async function handleBookIllustration(req, res) {
  const body = await readJson(req);
  const topic = String(body.topic || "").trim().slice(0, 300);
  const subject = String(body.subject || "General Studies").slice(0, 80);
  const grade = String(body.grade || "8").replace(/[^0-9]/g, "").slice(0, 2);
  if (!topic) return json(res, 400, { error: "A book topic is required." });
  const data = await openAIRequest("/v1/images/generations", {
    model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-2",
    prompt: `Create a polished educational textbook infographic illustration about ${topic} for CBSE Class ${grade} ${subject}. Clean white page with royal blue, cyan, orange and emerald accents. Explain the central concept using labelled visual objects, arrows, a simple process diagram or scientific cutaway as appropriate. Accurate, age-appropriate, uncluttered, premium school textbook style, landscape composition. Use only a few short English labels; no paragraphs, logo, watermark, people, or copyrighted characters.`,
    size: "1536x1024", quality: "low", output_format: "png", n: 1,
  });
  const image = data.data?.[0]?.b64_json;
  if (!image) throw new Error("The illustration service returned no image.");
  return json(res, 200, { image });
}

async function handleLearningTool(req, res) {
  const body = await readJson(req);
  const allowedModes = new Set(["quiz", "flashcards", "mindmap", "podcast", "book"]);
  const mode = String(body.mode || "");
  const topic = String(body.topic || "").trim().slice(0, 500);
  const grade = String(body.grade || "8").replace(/[^0-9]/g, "").slice(0, 2);
  const subject = String(body.subject || "Science").slice(0, 80);
  const difficulty = ["Easy", "Medium", "Challenging"].includes(body.difficulty) ? body.difficulty : "Medium";
  const language = ["English", "Hindi", "Hinglish"].includes(body.language) ? body.language : "English";
  const count = Math.max(3, Math.min(10, Number(body.count) || 5));
  if (!allowedModes.has(mode)) return json(res, 400, { error: "Choose a valid learning tool." });
  if (!topic) return json(res, 400, { error: "Please enter a topic." });
  if (!/^(6|7|8|9|10|11|12)$/.test(grade)) return json(res, 400, { error: "Choose a CBSE class from 6 to 12." });

  const modeGuidance = {
    quiz: `Create exactly ${count} multiple-choice questions. Each item must have exactly four concise options. The answer must exactly match one option. Include a short teaching explanation. Fill front/back and heading/content with empty strings.`,
    flashcards: `Create exactly ${count} revision flashcards. Put the prompt or term in front and the concise explanation in back. Fill question, answer, explanation, heading and content with empty strings and options with an empty array.`,
    mindmap: `Create ${count} useful branches for a concept mind map. Put each branch label in heading and its concise explanation in content. Fill question, answer, explanation, front and back with empty strings and options with an empty array.`,
    podcast: `Write an engaging audio-friendly study script of 450-650 words in script, with a hook, clear explanation, an everyday Indian example, quick recap, and one reflection question. Also create 4 chapter markers using heading and content. Fill other item fields with empty strings and options with an empty array.`,
    book: `Create a guided companion overview, not copyrighted textbook text. Include 6 ordered study sections using heading and content, essential vocabulary, common misconceptions and a revision pathway. Fill other item fields with empty strings and options with an empty array.`,
  };

  const instructions = `You create safe, accurate CBSE learning resources for Srijan Valley School students in Classes 6-12. Use ${language} at a ${difficulty.toLowerCase()} difficulty level for Class ${grade} ${subject}. Keep content age-appropriate, original, and educational. Do not reproduce copyrighted textbook passages. If the topic is unsafe or unsuitable for a minor, provide a safe educational alternative. Return only data matching the supplied JSON schema.`;
  const data = await openAIRequest("/v1/responses", {
    model: process.env.OPENAI_TEXT_MODEL || "gpt-5-mini",
    instructions,
    input: `Learning tool: ${mode}\nTopic: ${topic}\n\n${modeGuidance[mode]}`,
    store: false,
    max_output_tokens: 3200,
    reasoning: { effort: "low" },
    safety_identifier: clientId(req),
    text: {
      format: {
        type: "json_schema",
        name: "learning_resource",
        strict: true,
        schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            summary: { type: "string" },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  options: { type: "array", items: { type: "string" } },
                  answer: { type: "string" },
                  explanation: { type: "string" },
                  front: { type: "string" },
                  back: { type: "string" },
                  heading: { type: "string" },
                  content: { type: "string" },
                },
                required: ["question", "options", "answer", "explanation", "front", "back", "heading", "content"],
                additionalProperties: false,
              },
            },
            script: { type: "string" },
          },
          required: ["title", "summary", "items", "script"],
          additionalProperties: false,
        },
      },
    },
  });
  const outputText = data.output_text || data.output?.flatMap((item) => item.content || []).find((item) => item.type === "output_text")?.text;
  if (!outputText) throw new Error("The learning tool returned an empty response.");
  let result;
  try { result = JSON.parse(outputText); } catch { throw new Error("The learning tool returned an invalid result. Please try again."); }
  return json(res, 200, { result });
}

async function handleApi(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed." });
  if (!withinRateLimit(req)) return json(res, 429, { error: "Too many requests. Please wait a minute and try again." });
  try {
    if (req.url === "/api/tutor") return await handleTutor(req, res);
    if (req.url === "/api/avatar") return await handleAvatar(req, res);
    if (req.url === "/api/book-illustration") return await handleBookIllustration(req, res);
    if (req.url === "/api/learning-tool") return await handleLearningTool(req, res);
    return json(res, 404, { error: "API route not found." });
  } catch (error) {
    console.error("API error:", error instanceof Error ? error.message : error);
    const status = Number(error?.status) || (error instanceof SyntaxError ? 400 : 500);
    return json(res, status, { error: status >= 500 ? error.message || "The AI service is unavailable." : error.message });
  }
}

let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({ root, server: { middlewareMode: true }, appType: "spa" });
}

const mimeTypes = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon" };

const server = createHttpServer(async (req, res) => {
  if (req.url?.startsWith("/api/")) return handleApi(req, res);
  if (vite) return vite.middlewares(req, res, () => json(res, 404, { error: "Not found." }));
  try {
    const pathname = decodeURIComponent(new URL(req.url || "/", "http://localhost").pathname);
    const safePath = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, "");
    let filePath = join(root, "dist", safePath === "/" ? "index.html" : safePath);
    if (!existsSync(filePath) || !extname(filePath)) filePath = join(root, "dist", "index.html");
    const content = await readFile(filePath);
    res.writeHead(200, { "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream" });
    res.end(content);
  } catch {
    json(res, 404, { error: "Not found." });
  }
});

server.listen(port, () => console.log(`Srijan Valley AI Tutor running at http://localhost:${port}`));
