import { createHash, createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
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
const scrypt = promisify(scryptCallback);
let mongoClient;
let database;
let databaseConnection;

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

async function getDatabase() {
  if (database) return database;
  if (databaseConnection) return databaseConnection;
  if (!process.env.MONGODB_URI) throw Object.assign(new Error("MongoDB is not configured."), { status: 503 });
  databaseConnection = (async () => {
    const client = new MongoClient(process.env.MONGODB_URI, {
      family: 4,
      serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
      serverSelectionTimeoutMS: 10_000,
      connectTimeoutMS: 10_000,
    });
    try {
      await client.connect();
      mongoClient = client;
      database = client.db(process.env.MONGODB_DB || "srijan_valley_ai_tutor");
      await Promise.all([
        database.collection("users").createIndex({ username: 1 }, { unique: true }),
        database.collection("schools").createIndex({ code: 1 }, { unique: true }),
        database.collection("users").createIndex({ schoolId: 1, role: 1 }),
      ]);
      await ensureBootstrapAccounts();
      return database;
    } catch (error) {
      database = undefined;
      mongoClient = undefined;
      await client.close().catch(() => {});
      throw error;
    } finally {
      databaseConnection = undefined;
    }
  })();
  return databaseConnection;
}

function isDatabaseConnectionError(error) {
  const message = `${error?.name || ""} ${error?.code || ""} ${error?.message || ""} ${error?.cause?.message || ""}`;
  return /Mongo(ServerSelection|Network|Topology|Runtime)|SSL|TLS|ECONN|ENOTFOUND|ETIMEDOUT|connection/i.test(message);
}

function normalizedUsername(value) { return String(value || "").trim().toLowerCase().replace(/\s+/g, ""); }
async function hashSecret(secret) {
  const salt = randomBytes(16).toString("hex");
  const derived = await scrypt(String(secret), salt, 64);
  return `${salt}:${Buffer.from(derived).toString("hex")}`;
}
async function verifySecret(secret, stored) {
  const [salt, expectedHex] = String(stored || "").split(":");
  if (!salt || !expectedHex) return false;
  const actual = Buffer.from(await scrypt(String(secret), salt, 64));
  const expected = Buffer.from(expectedHex, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
function sessionKey() { return process.env.SESSION_SECRET || "change-this-development-session-secret"; }
function signSession(user) {
  const payload = Buffer.from(JSON.stringify({ sub: String(user._id), exp: Date.now() + 8 * 60 * 60 * 1000 })).toString("base64url");
  return `${payload}.${createHmac("sha256", sessionKey()).update(payload).digest("base64url")}`;
}
function readSession(req) {
  const token = String(req.headers.cookie || "").split(";").map((part) => part.trim()).find((part) => part.startsWith("svs_ai_session="))?.slice(15);
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = createHmac("sha256", sessionKey()).update(payload).digest("base64url");
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try { const value = JSON.parse(Buffer.from(payload, "base64url").toString()); return value.exp > Date.now() ? value : null; } catch { return null; }
}
async function authenticatedUser(req) {
  const session = readSession(req);
  if (!session || !ObjectId.isValid(session.sub)) return null;
  return (await getDatabase()).collection("users").findOne({ _id: new ObjectId(session.sub), active: true });
}
function publicUser(user) { return { id: String(user._id), name: user.name, username: user.username, role: user.role, schoolId: user.schoolId ? String(user.schoolId) : undefined, classSection: user.classSection }; }

async function ensureBootstrapAccounts() {
  if (process.env.DEMO_AUTH_ENABLED !== "true") return;
  const schools = database.collection("schools");
  const users = database.collection("users");
  const school = await schools.findOneAndUpdate(
    { code: "SVS-DEMO" },
    { $set: { name: "Srijan Valley School", code: "SVS-DEMO", active: true, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true, returnDocument: "after" },
  );
  const accounts = [
    { name: "Super Admin", username: "superadmin", password: "Admin@2026", role: "super_admin" },
    { name: "School Admin", username: "schooladmin", password: "School@2026", role: "school_admin", schoolId: school._id },
    { name: "Class 1B Teacher", username: "teacher1b", password: "Teacher@2026", role: "teacher", schoolId: school._id, classSection: "1B" },
    { name: "Demo Student", username: "svs-1b-12", password: "1234", role: "student", schoolId: school._id, classSection: "1B" },
  ];
  for (const account of accounts) {
    const { password, ...profile } = account;
    await users.updateOne(
      { username: account.username },
      { $set: { ...profile, passwordHash: await hashSecret(password), active: true, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true },
    );
  }
  console.log("AI Tutor demo accounts are ready in MongoDB.");
}

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
  return current.count <= 60;
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
  const board = ["CBSE", "ICSE", "State Board"].includes(body.board) ? body.board : "CBSE";
  const language = ["English", "Hindi", "Hinglish"].includes(body.language) ? body.language : "English";
  const learningLevel = ["Foundation", "Easy", "Standard"].includes(body.learningLevel) ? body.learningLevel : "Easy";
  if (!message) return json(res, 400, { error: "Please enter a question." });
  if (!/^(6|7|8|9|10|11|12)$/.test(grade)) return json(res, 400, { error: "Choose a class from 6 to 12." });

  const history = Array.isArray(body.history)
    ? body.history.slice(-10).map((item) => ({
        role: item?.role === "assistant" ? "assistant" : "user",
        content: String(item?.content || "").slice(0, 3000),
      })).filter((item) => item.content)
    : [{ role: "user", content: message }];

  const instructions = `You are ${tutorName}, a patient AI tutor for Srijan Valley School in India. Teach ${board} Class ${grade} ${subject} in ${language} at the student's ${learningLevel.toLowerCase()} learning level.

Teaching approach:
- First identify what the student already understands. Start with the easiest correct explanation, then increase difficulty only after a successful check.
- Align every definition, method, example, question and expected depth with the ${board} Class ${grade} curriculum. Never introduce a higher-class method when a class-level method exists.
- Use ${language}; use familiar Indian examples and short sections. Define difficult words immediately.
- If the exact board syllabus mapping is uncertain, say so and ask for the chapter name or textbook page instead of inventing alignment.
- Guide with hints and steps. For homework or tests, teach the method instead of simply doing dishonest assessed work.
- End teaching answers with one easy check-for-understanding question. Use the answer to remediate a concept gap or progress gradually.
- For a whiteboard request, draw a neat text/Unicode diagram, number line, equation layout, labelled flow, or coordinate sketch while explaining each drawing step. Keep it readable on a phone.
- For performance analysis, ask 3-5 short diagnostic questions before identifying weak chapters; distinguish evidence from a tentative inference and recommend the next easy practice step.
- For a revision plan, produce a realistic dated plan with short daily sessions, revision, practice and buffer days, prioritising stated weaknesses.
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
  const board = ["CBSE", "ICSE", "State Board"].includes(body.board) ? body.board : "CBSE";
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

  const instructions = `You create safe, accurate ${board}-aligned learning resources for Srijan Valley School students in Classes 6-12. Use ${language} at a ${difficulty.toLowerCase()} difficulty level for Class ${grade} ${subject}. Begin with easy fundamentals, use only class-appropriate methods and familiar Indian examples, and never invent a chapter mapping. Keep content age-appropriate, original, and educational. Do not reproduce copyrighted textbook passages. If the topic is unsafe or unsuitable for a minor, provide a safe educational alternative. Return only data matching the supplied JSON schema.`;
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

async function handleStudentTool(req, res) {
  const body = await readJson(req);
  const modes = ["whiteboard", "performance", "adaptive", "curriculum", "revision"];
  const mode = modes.includes(body.mode) ? body.mode : "";
  const grade = String(body.grade || "8").replace(/[^0-9]/g, "").slice(0, 2);
  const board = ["CBSE", "ICSE", "State Board"].includes(body.board) ? body.board : "CBSE";
  const language = ["English", "Hindi", "Hinglish"].includes(body.language) ? body.language : "English";
  const level = ["Foundation", "Easy", "Standard"].includes(body.level) ? body.level : "Easy";
  const subject = String(body.subject || "Science").slice(0, 80);
  const topic = String(body.topic || "").trim().slice(0, 500);
  const context = String(body.context || "").trim().slice(0, 1500);
  if (!mode) return json(res, 400, { error: "Choose a valid student tool." });
  if (!/^(6|7|8|9|10|11|12)$/.test(grade)) return json(res, 400, { error: "Choose a class from 6 to 12." });
  if (!topic) return json(res, 400, { error: "Enter the requested topic or details." });

  const guidance = {
    whiteboard: "Create a visual teaching sequence. visualType must be graph, equation, flow, or diagram. Provide 3-7 short labels in visualLabels and useful numeric plot points in visualData only for a graph. Steps must explain what is drawn in order.",
    performance: "Analyse only the supplied evidence. Do not pretend to know unseen performance. Insights must name likely weak chapters/concepts, confidence/evidence, and next action. If evidence is insufficient, mark it as Needs diagnostic. Steps form a short diagnostic plan.",
    adaptive: "Create a small adaptive learning path. Start at the selected level. Each step must have a check-for-understanding and a simpler recovery activity in its detail. Insights explain why this pace fits.",
    curriculum: "Create a board- and class-aligned topic map. Never invent an official chapter number. Clearly mark any alignment that should be checked against the student's current textbook. Steps progress prerequisite to class-level mastery.",
    revision: "Create a practical calendar based on exam date, available time and weaknesses in the supplied context. Use actual YYYY-MM-DD dates when supplied. Include practice, spaced recap, a buffer day, and light final revision. Avoid overload.",
  };
  const instructions = `You are a safe school learning-system planner. Produce ${board} Class ${grade} ${subject} content in ${language}, starting at ${level.toLowerCase()} level. Stay within class level, use easy language, familiar Indian examples, and never invent curriculum mappings or performance evidence. The learner may be a minor; keep everything educational and age-appropriate. ${guidance[mode]} Return only the required JSON.`;
  const data = await openAIRequest("/v1/responses", {
    model: process.env.OPENAI_TEXT_MODEL || "gpt-5-mini",
    instructions,
    input: `Tool: ${mode}\nRequest: ${topic}\nStudent-provided context/evidence: ${context || "None supplied"}`,
    store: false,
    max_output_tokens: 2400,
    reasoning: { effort: "low" },
    safety_identifier: clientId(req),
    text: { format: { type: "json_schema", name: "student_tool_result", strict: true, schema: {
      type: "object", additionalProperties: false,
      properties: {
        title: { type: "string" }, summary: { type: "string" }, visualType: { type: "string", enum: ["graph", "equation", "flow", "diagram", "none"] },
        visualLabels: { type: "array", items: { type: "string" } }, visualData: { type: "array", items: { type: "number" } },
        insights: { type: "array", items: { type: "object", additionalProperties: false, properties: { label: { type: "string" }, detail: { type: "string" }, status: { type: "string" }, value: { type: "number" } }, required: ["label", "detail", "status", "value"] } },
        steps: { type: "array", items: { type: "object", additionalProperties: false, properties: { day: { type: "string" }, topic: { type: "string" }, activity: { type: "string" }, duration: { type: "string" } }, required: ["day", "topic", "activity", "duration"] } },
      }, required: ["title", "summary", "visualType", "visualLabels", "visualData", "insights", "steps"],
    } } },
  });
  const outputText = data.output_text || data.output?.flatMap((item) => item.content || []).find((item) => item.type === "output_text")?.text;
  if (!outputText) throw new Error("The student tool returned an empty response.");
  try { return json(res, 200, { result: JSON.parse(outputText) }); }
  catch { throw new Error("The student tool returned an invalid result. Please try again."); }
}

async function handleAuth(req, res) {
  const pathname = new URL(req.url || "/", "http://localhost").pathname;
  if (pathname === "/api/auth/login" && req.method === "POST") {
    const body = await readJson(req);
    const role = String(body.role || "");
    const username = normalizedUsername(body.username);
    const password = String(body.password || "");
    if (!['super_admin', 'school_admin', 'teacher', 'student'].includes(role)) return json(res, 400, { error: "Choose a valid role." });
    if (!username || !password) return json(res, 400, { error: "Enter your login details." });
    if (role === "student" && !/^\d{4}$/.test(password)) return json(res, 400, { error: "Student PIN must be exactly 4 digits." });
    const user = await (await getDatabase()).collection("users").findOne({ username, role, active: true });
    if (!user || !(await verifySecret(password, user.passwordHash))) return json(res, 401, { error: "Incorrect login details." });
    const secure = isProduction ? "; Secure" : "";
    res.setHeader("Set-Cookie", `svs_ai_session=${signSession(user)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${secure}`);
    json(res, 200, { user: publicUser(user) }); return true;
  }
  if (pathname === "/api/auth/logout" && req.method === "POST") {
    res.setHeader("Set-Cookie", `svs_ai_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${isProduction ? "; Secure" : ""}`);
    json(res, 200, { ok: true }); return true;
  }
  if (pathname === "/api/auth/me" && req.method === "GET") {
    const user = await authenticatedUser(req);
    if (user) json(res, 200, { user: publicUser(user) });
    else json(res, 401, { error: "Please sign in." });
    return true;
  }
  return false;
}

async function handleDashboard(req, res) {
  const pathname = new URL(req.url || "/", "http://localhost").pathname;
  if (pathname !== "/api/dashboard" || req.method !== "GET") return false;
  const actor = await authenticatedUser(req);
  if (!actor) { json(res, 401, { error: "Please sign in." }); return true; }
  const db = await getDatabase();
  if (actor.role === "super_admin") {
    const schools = await db.collection("schools").find({ active: true }).sort({ createdAt: -1 }).limit(100).toArray();
    const admins = await db.collection("users").find({ role: "school_admin", active: true }).project({ passwordHash: 0 }).toArray();
    const adminBySchool = new Map(admins.map((admin) => [String(admin.schoolId), admin]));
    const items = schools.map((school) => ({ id: String(school._id), name: school.name, code: school.code, adminName: adminBySchool.get(String(school._id))?.name || "Not assigned", username: adminBySchool.get(String(school._id))?.username || "—", createdAt: school.createdAt }));
    json(res, 200, { kind: "schools", items, stats: { total: items.length, active: items.length, secondary: admins.length } }); return true;
  }
  if (actor.role === "school_admin") {
    const items = await db.collection("users").find({ role: "teacher", schoolId: actor.schoolId, active: true }).project({ passwordHash: 0 }).sort({ createdAt: -1 }).limit(200).toArray();
    json(res, 200, { kind: "teachers", items: items.map((item) => ({ id: String(item._id), name: item.name, username: item.username, classSection: item.classSection, createdAt: item.createdAt })), stats: { total: items.length, active: items.length, secondary: new Set(items.map((item) => item.classSection)).size } }); return true;
  }
  if (actor.role === "teacher") {
    const items = await db.collection("users").find({ role: "student", schoolId: actor.schoolId, classSection: actor.classSection, active: true }).project({ passwordHash: 0 }).sort({ username: 1 }).limit(300).toArray();
    json(res, 200, { kind: "students", items: items.map((item) => ({ id: String(item._id), name: item.name, username: item.username, classSection: item.classSection, createdAt: item.createdAt })), stats: { total: items.length, active: items.length, secondary: actor.classSection } }); return true;
  }
  json(res, 403, { error: "Students do not have a management dashboard." }); return true;
}

async function handleAccountCreation(req, res) {
  if (req.method !== "POST") return false;
  const pathname = new URL(req.url || "/", "http://localhost").pathname;
  const accountRoutes = new Set(["/api/admin/schools", "/api/admin/teachers", "/api/admin/students"]);
  if (!accountRoutes.has(pathname)) return false;
  const actor = await authenticatedUser(req);
  if (!actor) return json(res, 401, { error: "Please sign in." });
  const db = await getDatabase();
  const body = await readJson(req);

  if (pathname === "/api/admin/schools") {
    if (actor.role !== "super_admin") return json(res, 403, { error: "Only a Super Admin can create schools." });
    const schoolName = String(body.schoolName || "").trim().slice(0, 120);
    const schoolCode = String(body.schoolCode || "").trim().toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 20);
    const adminName = String(body.adminName || "").trim().slice(0, 100);
    const username = normalizedUsername(body.username);
    const password = String(body.password || "");
    if (!schoolName || !schoolCode || !adminName || username.length < 3 || password.length < 8) return json(res, 400, { error: "Enter a school, code, admin name, username, and password of at least 8 characters." });
    const schoolResult = await db.collection("schools").insertOne({ name: schoolName, code: schoolCode, active: true, createdBy: actor._id, createdAt: new Date() });
    try {
      await db.collection("users").insertOne({ name: adminName, username, passwordHash: await hashSecret(password), role: "school_admin", schoolId: schoolResult.insertedId, active: true, createdBy: actor._id, createdAt: new Date() });
    } catch (error) { await db.collection("schools").deleteOne({ _id: schoolResult.insertedId }); throw error; }
    return json(res, 201, { message: "School and School Admin created." });
  }

  if (pathname === "/api/admin/teachers") {
    if (actor.role !== "school_admin" || !actor.schoolId) return json(res, 403, { error: "Only a School Admin can create teachers." });
    const name = String(body.name || "").trim().slice(0, 100);
    const username = normalizedUsername(body.username);
    const password = String(body.password || "");
    const classSection = String(body.classSection || "").trim().toUpperCase().replace(/[^A-Z0-9 -]/g, "").slice(0, 20);
    if (!name || username.length < 3 || password.length < 8 || !classSection) return json(res, 400, { error: "Enter a teacher name, class/section, username, and password of at least 8 characters." });
    await db.collection("users").insertOne({ name, username, passwordHash: await hashSecret(password), role: "teacher", schoolId: actor.schoolId, classSection, active: true, createdBy: actor._id, createdAt: new Date() });
    return json(res, 201, { message: "Teacher account created." });
  }

  if (pathname === "/api/admin/students") {
    if (actor.role !== "teacher" || !actor.schoolId || !actor.classSection) return json(res, 403, { error: "Only an assigned teacher can create students." });
    const name = String(body.name || "").trim().slice(0, 100);
    const username = normalizedUsername(body.rollNumber);
    const pin = String(body.pin || "");
    if (!name || username.length < 2 || !/^\d{4}$/.test(pin)) return json(res, 400, { error: "Enter the student name, roll number, and an exact 4-digit PIN." });
    await db.collection("users").insertOne({ name, username, passwordHash: await hashSecret(pin), role: "student", schoolId: actor.schoolId, classSection: actor.classSection, active: true, createdBy: actor._id, createdAt: new Date() });
    return json(res, 201, { message: "Student login created." });
  }
  return false;
}

async function handleApi(req, res) {
  const pathname = new URL(req.url || "/", "http://localhost").pathname.replace(/\/$/, "") || "/";
  if (!withinRateLimit(req)) return json(res, 429, { error: "Too many requests. Please wait a minute and try again." });
  try {
    const authResult = await handleAuth(req, res);
    if (authResult !== false) return authResult;
    const dashboardResult = await handleDashboard(req, res);
    if (dashboardResult !== false) return dashboardResult;
    const accountResult = await handleAccountCreation(req, res);
    if (accountResult !== false) return accountResult;
    if (req.method !== "POST") return json(res, 405, { error: "Method not allowed." });
    if (!(await authenticatedUser(req))) return json(res, 401, { error: "Please sign in to use the AI Tutor." });
    if (pathname === "/api/tutor") return await handleTutor(req, res);
    if (pathname === "/api/avatar") return await handleAvatar(req, res);
    if (pathname === "/api/book-illustration") return await handleBookIllustration(req, res);
    if (pathname === "/api/learning-tool") return await handleLearningTool(req, res);
    if (pathname === "/api/student-tool") return await handleStudentTool(req, res);
    return json(res, 404, { error: "API route not found." });
  } catch (error) {
    console.error("API error:", error instanceof Error ? error.message : error);
    if (isDatabaseConnectionError(error)) {
      return json(res, 503, { error: "Login service cannot reach the database. Please try again shortly." });
    }
    const status = Number(error?.status) || (error?.code === 11000 ? 409 : error instanceof SyntaxError ? 400 : 500);
    if (status === 409) return json(res, status, { error: "That username or school code already exists." });
    return json(res, status, { error: status >= 500 ? "The service is temporarily unavailable." : error.message });
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
