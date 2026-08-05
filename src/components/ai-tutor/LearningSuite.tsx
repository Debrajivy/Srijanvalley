import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Award,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  Download,
  FileQuestion,
  Headphones,
  Image as ImageIcon,
  Layers3,
  Lightbulb,
  Loader2,
  Network,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Search,
  Send,
  Sparkles,
  Target,
  Trash2,
  Trophy,
  Volume2,
  X,
} from "lucide-react";

type ToolId = "flashcards" | "quiz" | "mindmap" | "podcast";
type ToolItem = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  front: string;
  back: string;
  heading: string;
  content: string;
};
type ToolResult = { title: string; summary: string; items: ToolItem[]; script: string };
type Book = { id: string; title: string; subject: string; classes: number[]; category: string; accent: string; icon: string };
type Goal = { id: string; title: string; description: string; complete: boolean };
type QuizAttempt = { id: string; topic: string; subject: string; score: number; total: number; percentage: number; date: string };

const SUBJECT_NAMES = ["Mathematics", "Science", "Physics", "Chemistry", "Biology", "English", "Hindi", "Social Science", "Computer Science", "Accountancy", "Business Studies", "Economics"];

const TOOLS: { id: ToolId; title: string; description: string; icon: typeof Layers3; colors: string }[] = [
  { id: "flashcards", title: "Flashcards", description: "Create quick revision cards and flip through key ideas.", icon: Layers3, colors: "from-rose-500 to-orange-500" },
  { id: "quiz", title: "Quiz Me", description: "Generate, attempt and score a personalised CBSE quiz.", icon: FileQuestion, colors: "from-[#004aad] to-cyan-500" },
  { id: "mindmap", title: "Mind Map", description: "Connect concepts visually for deeper understanding.", icon: Network, colors: "from-violet-600 to-fuchsia-500" },
  { id: "podcast", title: "Podcast Generator", description: "Turn a topic into an audio-friendly study episode.", icon: Headphones, colors: "from-amber-500 to-[#d0510f]" },
];

const BOOKS: Book[] = [
  { id: "math-6", title: "Mathematics Explorer", subject: "Mathematics", classes: [6, 7, 8], category: "School Academics", accent: "from-blue-700 to-blue-400", icon: "∑" },
  { id: "science-6", title: "Curiosity Science", subject: "Science", classes: [6, 7, 8], category: "School Academics", accent: "from-emerald-700 to-teal-400", icon: "⚗" },
  { id: "math-9", title: "Mathematics Practice", subject: "Mathematics", classes: [9, 10], category: "School Academics", accent: "from-indigo-700 to-violet-400", icon: "π" },
  { id: "science-9", title: "Integrated Science", subject: "Science", classes: [9, 10], category: "School Academics", accent: "from-cyan-700 to-blue-400", icon: "⚛" },
  { id: "physics", title: "Physics Concepts", subject: "Physics", classes: [11, 12], category: "School Academics", accent: "from-slate-800 to-blue-500", icon: "λ" },
  { id: "chemistry", title: "Chemistry Part I", subject: "Chemistry", classes: [11, 12], category: "School Academics", accent: "from-orange-700 to-amber-400", icon: "H₂O" },
  { id: "biology", title: "Biology Foundations", subject: "Biology", classes: [11, 12], category: "School Academics", accent: "from-green-700 to-lime-400", icon: "DNA" },
  { id: "flamingo", title: "English Reader", subject: "English", classes: [9, 10, 11, 12], category: "School Academics", accent: "from-rose-700 to-pink-400", icon: "Aa" },
  { id: "history", title: "Themes in Indian History", subject: "Social Science", classes: [9, 10, 11, 12], category: "School Academics", accent: "from-amber-800 to-orange-400", icon: "🏛" },
  { id: "accountancy", title: "Accountancy Essentials", subject: "Accountancy", classes: [11, 12], category: "School Academics", accent: "from-sky-800 to-cyan-400", icon: "₹" },
  { id: "business", title: "Business Studies", subject: "Business Studies", classes: [11, 12], category: "School Academics", accent: "from-purple-800 to-fuchsia-400", icon: "↗" },
  { id: "economics", title: "Indian Economic Development", subject: "Economics", classes: [11, 12], category: "School Academics", accent: "from-lime-700 to-emerald-400", icon: "₹" },
  { id: "exam-math", title: "Board Mathematics Sprint", subject: "Mathematics", classes: [10, 12], category: "Test Prep / Exam", accent: "from-red-700 to-orange-400", icon: "✓" },
  { id: "exam-science", title: "Science Board Revision", subject: "Science", classes: [10], category: "Test Prep / Exam", accent: "from-teal-800 to-green-400", icon: "★" },
  { id: "coding", title: "Creative Coding", subject: "Computer Science", classes: [6, 7, 8, 9, 10, 11, 12], category: "Hobbies / Skills", accent: "from-slate-900 to-indigo-500", icon: "</>" },
  { id: "speaking", title: "Confident Communication", subject: "English", classes: [6, 7, 8, 9, 10, 11, 12], category: "Hobbies / Skills", accent: "from-pink-700 to-rose-400", icon: "🎙" },
];

const GOAL_CHOICES = [
  { title: "Board Excellence", description: "Build a steady revision and practice routine." },
  { title: "JEE Foundation", description: "Strengthen Mathematics, Physics and Chemistry concepts." },
  { title: "NEET Foundation", description: "Strengthen Biology, Physics and Chemistry concepts." },
  { title: "English Confidence", description: "Improve reading, writing and speaking every week." },
];

const emptyResult: ToolResult = { title: "", summary: "", items: [], script: "" };

function getError(value: unknown) {
  return value instanceof Error ? value.message : "Could not generate this learning activity.";
}

export default function LearningSuite({ grade, currentSubject, board = "CBSE" }: { grade: string; currentSubject: string; board?: string }) {
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const [topic, setTopic] = useState("");
  const [toolSubject, setToolSubject] = useState(currentSubject === "All subjects" ? "Science" : currentSubject);
  const [difficulty, setDifficulty] = useState("Medium");
  const [count, setCount] = useState("5");
  const [language, setLanguage] = useState("English");
  const [result, setResult] = useState<ToolResult>(emptyResult);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [bookOpen, setBookOpen] = useState(false);
  const [bookCategory, setBookCategory] = useState("School Academics");
  const [bookSearch, setBookSearch] = useState("");
  const [bookSubject, setBookSubject] = useState("All subjects");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [goalOpen, setGoalOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [customGoal, setCustomGoal] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [bookImage, setBookImage] = useState("");
  const [bookQuestion, setBookQuestion] = useState("");
  const [bookChat, setBookChat] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [bookChatLoading, setBookChatLoading] = useState(false);
  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([]);
  const [savedQuizKey, setSavedQuizKey] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("srijan-ai-goals");
      if (stored) setGoals(JSON.parse(stored));
      const attempts = window.localStorage.getItem("srijan-ai-quiz-history");
      if (attempts) setQuizHistory(JSON.parse(attempts));
    } catch { /* local storage can be unavailable in private contexts */ }
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem("srijan-ai-goals", JSON.stringify(goals)); } catch { /* no-op */ }
  }, [goals]);

  useEffect(() => {
    try { window.localStorage.setItem("srijan-ai-quiz-history", JSON.stringify(quizHistory)); } catch { /* no-op */ }
  }, [quizHistory]);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const filteredBooks = useMemo(() => BOOKS.filter((book) =>
    book.category === bookCategory
    && book.classes.includes(Number(grade))
    && (bookSubject === "All subjects" || book.subject === bookSubject)
    && `${book.title} ${book.subject}`.toLowerCase().includes(bookSearch.toLowerCase()),
  ), [bookCategory, bookSearch, bookSubject, grade]);

  const openTool = (id: ToolId) => {
    setActiveTool(id);
    setResult(emptyResult);
    setError("");
    setTopic("");
    setCardIndex(0);
    setFlipped(false);
    setQuizAnswers({});
    setSavedQuizKey("");
  };

  const generate = async (event?: FormEvent, book?: Book) => {
    event?.preventDefault();
    const mode = book ? "book" : activeTool;
    if (!mode) return;
    const learningTopic = book ? `${book.title}: create a Class ${grade} guided overview with important concepts and suggested study order` : topic.trim();
    if (!learningTopic) { setError("Please enter a topic first."); return; }
    setLoading(true);
    setError("");
    if (book) setResult(emptyResult);
    try {
      const response = await fetch("/api/learning-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, topic: learningTopic, grade, board, subject: book?.subject || toolSubject, difficulty, count: Number(count), language, bookTitle: book?.title }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation failed.");
      setResult(data.result as ToolResult);
      if (book) {
        setBookChat([{ role: "assistant", content: `Your visual guide is ready. Ask me anything about ${book.title}.` }]);
        fetch("/api/book-illustration", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ topic: data.result.title || book.title, subject: book.subject, grade }) })
          .then(async (imageResponse) => { const imageData = await imageResponse.json(); if (imageResponse.ok && imageData.image) setBookImage(`data:image/png;base64,${imageData.image}`); })
          .catch(() => undefined);
      }
      setCardIndex(0);
      setFlipped(false);
      setQuizAnswers({});
    } catch (value) {
      setError(getError(value));
    } finally {
      setLoading(false);
    }
  };

  const addGoal = (title: string, description: string) => {
    if (goals.some((goal) => goal.title.toLowerCase() === title.toLowerCase())) return;
    setGoals((current) => [...current, { id: `${Date.now()}-${title}`, title, description, complete: false }]);
  };

  const playPodcast = () => {
    if (!("speechSynthesis" in window) || !result.script) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(result.script.replace(/[*#_`]/g, ""));
    utterance.lang = language === "Hindi" ? "hi-IN" : "en-IN";
    utterance.rate = 0.96;
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const askBook = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedBook || !bookQuestion.trim() || bookChatLoading) return;
    const question = bookQuestion.trim();
    const next = [...bookChat, { role: "user" as const, content: question }];
    setBookChat(next); setBookQuestion(""); setBookChatLoading(true);
    try {
      const response = await fetch("/api/tutor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: question, grade, subject: selectedBook.subject, tutorName: "AI Book Guide", history: next.slice(-8) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The book guide could not answer.");
      setBookChat((current) => [...current, { role: "assistant", content: data.reply }]);
    } catch (value) { setBookChat((current) => [...current, { role: "assistant", content: getError(value) }]); }
    finally { setBookChatLoading(false); }
  };

  const downloadBook = async () => {
    const page = document.getElementById("ai-book-page");
    if (!page || !selectedBook) return;
    const html2pdf = (await import("html2pdf.js")).default;
    html2pdf().set({ margin: 8, filename: `${selectedBook.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-ai-guide.pdf`, image: { type: "jpeg", quality: 0.96 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: "mm", format: "a4", orientation: "portrait" } }).from(page).save();
  };

  const quizScore = result.items.reduce((score, item, index) => score + (quizAnswers[index] === item.answer ? 1 : 0), 0);
  const quizComplete = activeTool === "quiz" && result.items.length > 0 && Object.keys(quizAnswers).length === result.items.length;
  const quizKey = `${result.title}-${quizScore}-${result.items.length}`;

  useEffect(() => {
    if (!quizComplete || savedQuizKey === quizKey) return;
    const attempt: QuizAttempt = { id: `${Date.now()}`, topic: result.title || topic, subject: toolSubject, score: quizScore, total: result.items.length, percentage: Math.round((quizScore / result.items.length) * 100), date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) };
    setQuizHistory((current) => [attempt, ...current].slice(0, 20));
    setSavedQuizKey(quizKey);
  }, [quizComplete, quizKey, quizScore, result.items.length, result.title, savedQuizKey, toolSubject, topic]);

  const averageMark = quizHistory.length ? Math.round(quizHistory.reduce((sum, attempt) => sum + attempt.percentage, 0) / quizHistory.length) : 0;
  const bestMark = quizHistory.length ? Math.max(...quizHistory.map((attempt) => attempt.percentage)) : 0;
  const currentTool = TOOLS.find((tool) => tool.id === activeTool);

  return (
    <>
      <section id="my-learning" className="scroll-mt-28 overflow-hidden rounded-[30px] bg-gradient-to-br from-[#061b3f] via-[#004aad] to-[#087ecb] p-6 text-white shadow-xl sm:p-8">
        <div className="grid gap-7 lg:grid-cols-[1.15fr_.85fr]"><div><span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-cyan-200">My learning command centre</span><h2 className="mt-4 font-poppins text-3xl font-extrabold sm:text-4xl">Know what to learn next—without guessing.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">Your lessons, goals, practice activity and quiz evidence come together here. Complete a quiz and the dashboard automatically updates your marks, strongest areas and next revision priorities.</p><div className="mt-6 grid grid-cols-3 gap-3"><div className="rounded-2xl bg-white/10 p-4"><p className="text-2xl font-black">{goals.filter((goal) => !goal.complete).length}</p><p className="mt-1 text-xs text-blue-100">Active goals</p></div><div className="rounded-2xl bg-white/10 p-4"><p className="text-2xl font-black">{quizHistory.length}</p><p className="mt-1 text-xs text-blue-100">Quizzes taken</p></div><div className="rounded-2xl bg-white/10 p-4"><p className="text-2xl font-black">{averageMark}%</p><p className="mt-1 text-xs text-blue-100">Average mark</p></div></div></div><div className="rounded-[24px] border border-white/15 bg-white/10 p-5 backdrop-blur"><p className="text-xs font-extrabold uppercase tracking-widest text-cyan-200">Today’s learning route</p>{[{ n: "01", t: "Learn", d: "Understand one concept with your AI tutor" }, { n: "02", t: "Practise", d: "Attempt a targeted quiz or flashcard set" }, { n: "03", t: "Improve", d: "Review mistakes and add weak areas to revision" }].map((step) => <div key={step.n} className="mt-4 flex gap-3 rounded-xl bg-white/10 p-3"><span className="font-black text-amber-300">{step.n}</span><div><p className="text-sm font-extrabold">{step.t}</p><p className="mt-0.5 text-xs text-blue-100">{step.d}</p></div></div>)}</div></div>
      </section>

      <section id="practice" className="scroll-mt-28 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#d0510f]">Create & practise</p><h2 className="mt-1 font-poppins text-xl font-extrabold sm:text-2xl">AI learning tools</h2><p className="mt-1 text-sm text-slate-500">Build a personalised study resource in seconds.</p></div>
          <button onClick={() => setBookOpen(true)} className="flex items-center justify-center gap-2 rounded-xl bg-[#004aad] px-4 py-2.5 text-sm font-extrabold text-white shadow-md"><BookOpen className="h-4 w-4" /> Open AI Book</button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {TOOLS.map((tool) => <button key={tool.id} onClick={() => openTool(tool.id)} className="group rounded-2xl border border-slate-200 p-4 text-left transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"><span className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.colors} text-white shadow-md`}><tool.icon className="h-5 w-5" /></span><h3 className="mt-4 font-poppins text-base font-extrabold">{tool.title}</h3><p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{tool.description}</p><span className="mt-3 flex items-center gap-1 text-xs font-extrabold text-[#d0510f]">Open tool <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span></button>)}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button onClick={() => setGoalOpen(true)} className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-white p-4 text-left"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d0510f] text-white"><Target className="h-5 w-5" /></span><span className="flex-1"><span className="block text-sm font-extrabold">Choose your learning goal</span><span className="mt-0.5 block text-xs text-slate-500">{goals.length ? `${goals.filter((goal) => !goal.complete).length} active goal${goals.filter((goal) => !goal.complete).length === 1 ? "" : "s"}` : "Build a clear study roadmap"}</span></span><ChevronRight className="h-4 w-4 text-[#d0510f]" /></button>
          <button onClick={() => setBookOpen(true)} className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-4 text-left"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#004aad] text-white"><BookOpen className="h-5 w-5" /></span><span className="flex-1"><span className="block text-sm font-extrabold">Learn via AI Book</span><span className="mt-0.5 block text-xs text-slate-500">Browse Class {grade} subject guides</span></span><ChevronRight className="h-4 w-4 text-[#004aad]" /></button>
        </div>
      </section>

      <section id="achievements" className="scroll-mt-28 rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#d0510f]">Achievements & quiz marks</p><h2 className="mt-1 font-poppins text-2xl font-extrabold">Your progress, clearly measured</h2><p className="mt-2 text-sm text-slate-500">Every completed quiz is saved on this device and appears here automatically.</p></div><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><Trophy className="h-7 w-7" /></div></div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-blue-50 p-5"><BarChart3 className="h-5 w-5 text-[#004aad]" /><p className="mt-4 text-3xl font-black text-[#004aad]">{averageMark}%</p><p className="mt-1 text-xs font-bold text-slate-500">Average quiz mark</p></div><div className="rounded-2xl bg-emerald-50 p-5"><Award className="h-5 w-5 text-emerald-600" /><p className="mt-4 text-3xl font-black text-emerald-700">{bestMark}%</p><p className="mt-1 text-xs font-bold text-slate-500">Personal best</p></div><div className="rounded-2xl bg-orange-50 p-5"><FileQuestion className="h-5 w-5 text-[#d0510f]" /><p className="mt-4 text-3xl font-black text-[#d0510f]">{quizHistory.length}</p><p className="mt-1 text-xs font-bold text-slate-500">Tests completed</p></div></div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200"><div className="grid grid-cols-[1fr_76px] bg-slate-900 px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-white sm:grid-cols-[1fr_120px_100px_90px]"><span>Quiz</span><span className="hidden sm:block">Date</span><span className="hidden sm:block">Score</span><span className="text-right">Mark</span></div>{quizHistory.length ? quizHistory.map((attempt) => <div key={attempt.id} className="grid grid-cols-[1fr_76px] items-center border-t border-slate-100 px-4 py-4 sm:grid-cols-[1fr_120px_100px_90px]"><div><p className="text-sm font-extrabold">{attempt.topic}</p><p className="mt-1 text-xs text-slate-500">{attempt.subject}</p></div><span className="hidden text-xs font-semibold text-slate-500 sm:block">{attempt.date}</span><span className="hidden text-sm font-extrabold sm:block">{attempt.score}/{attempt.total}</span><span className={`text-right text-lg font-black ${attempt.percentage >= 80 ? "text-emerald-600" : attempt.percentage >= 50 ? "text-amber-600" : "text-rose-600"}`}>{attempt.percentage}%</span></div>) : <div className="p-10 text-center"><FileQuestion className="mx-auto h-9 w-9 text-slate-300" /><p className="mt-3 font-extrabold">Your first mark will appear here</p><p className="mt-1 text-sm text-slate-500">Open Practice → Quiz Me, answer every question, and the result will be saved.</p></div>}</div>
      </section>

      {activeTool && currentTool && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/65 p-3 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={currentTool.title}>
        <div className="flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-[26px] bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6"><div className="flex items-center gap-3"><span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${currentTool.colors} text-white`}><currentTool.icon className="h-5 w-5" /></span><div><h2 className="font-poppins text-lg font-extrabold">{currentTool.title}</h2><p className="text-xs text-slate-500">{board} Class {grade} personalised learning</p></div></div><button onClick={() => { setActiveTool(null); window.speechSynthesis?.cancel(); }} className="rounded-xl border border-slate-200 p-2"><X className="h-5 w-5" /></button></div>
          <div className="overflow-y-auto p-5 sm:p-6">
            {!result.title ? <form onSubmit={generate} className="mx-auto max-w-3xl">
              <div className="mb-5 flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3 text-xs text-blue-800"><span className="flex items-center gap-2 font-bold"><Lightbulb className="h-4 w-4" /> Pro tip</span><span className="hidden sm:inline">Be specific: “Light reflection and mirrors” works better than “Physics”.</span></div>
              <label className="text-sm font-extrabold">Topic <span className="text-red-500">*</span></label><textarea value={topic} onChange={(event) => setTopic(event.target.value)} rows={3} placeholder="Enter a topic (e.g., Photosynthesis)" className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-300" />
              <div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="text-sm font-extrabold">Subject<select value={toolSubject} onChange={(event) => setToolSubject(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold outline-none">{SUBJECT_NAMES.map((name) => <option key={name}>{name}</option>)}</select></label><label className="text-sm font-extrabold">Language<select value={language} onChange={(event) => setLanguage(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold outline-none"><option>English</option><option>Hindi</option><option>Hinglish</option></select></label></div>
              <h3 className="mt-6 text-sm font-extrabold">Advanced parameters</h3><div className="mt-3 grid gap-4 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2"><label className="text-xs font-bold text-slate-500">Difficulty<select value={difficulty} onChange={(event) => setDifficulty(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-800"><option>Easy</option><option>Medium</option><option>Challenging</option></select></label>{activeTool !== "podcast" && <label className="text-xs font-bold text-slate-500">{activeTool === "quiz" ? "Question" : "Item"} count<select value={count} onChange={(event) => setCount(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-800"><option>5</option><option>8</option><option>10</option></select></label>}<div className="flex items-center gap-2 text-xs font-bold text-slate-500"><Clock3 className="h-4 w-4 text-[#004aad]" /> Estimated: {activeTool === "podcast" ? "3 min episode" : `${count} items`}</div><div className="flex items-center gap-2 text-xs font-bold text-slate-500"><Sparkles className="h-4 w-4 text-[#d0510f]" /> AI-generated for Class {grade}</div></div>
              {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
              <div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="submit" disabled={loading || !topic.trim()} className="flex items-center justify-center gap-2 rounded-xl bg-[#d0510f] px-5 py-3 text-sm font-extrabold text-white disabled:opacity-50">{loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</> : <><Sparkles className="h-4 w-4" /> Generate {currentTool.title}</>}</button><button type="button" onClick={() => { setTopic(""); setDifficulty("Medium"); setCount("5"); setError(""); }} className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-extrabold text-slate-600">Clear</button></div>
            </form> : <div className="mx-auto max-w-3xl">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-wider text-[#d0510f]">Your {currentTool.title}</p><h3 className="mt-1 font-poppins text-2xl font-extrabold">{result.title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{result.summary}</p></div><button onClick={() => setResult(emptyResult)} className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-extrabold"><RotateCcw className="h-3.5 w-3.5" /> New</button></div>
              {activeTool === "flashcards" && result.items.length > 0 && <div><button onClick={() => setFlipped((value) => !value)} className={`flex min-h-72 w-full flex-col items-center justify-center rounded-[24px] p-8 text-center shadow-lg transition ${flipped ? "bg-gradient-to-br from-[#004aad] to-blue-700 text-white" : "border border-orange-100 bg-gradient-to-br from-orange-50 to-white"}`}><span className={`text-xs font-extrabold uppercase tracking-widest ${flipped ? "text-blue-200" : "text-[#d0510f]"}`}>{flipped ? "Answer" : "Question"}</span><p className="mt-5 text-xl font-extrabold leading-8">{flipped ? result.items[cardIndex].back : result.items[cardIndex].front}</p><span className={`mt-6 text-xs font-bold ${flipped ? "text-blue-200" : "text-slate-400"}`}>Tap card to flip</span></button><div className="mt-4 flex items-center justify-between"><button onClick={() => { setCardIndex((index) => Math.max(0, index - 1)); setFlipped(false); }} disabled={cardIndex === 0} className="rounded-xl border border-slate-200 p-2.5 disabled:opacity-30"><ChevronLeft className="h-5 w-5" /></button><span className="text-sm font-extrabold">{cardIndex + 1} / {result.items.length}</span><button onClick={() => { setCardIndex((index) => Math.min(result.items.length - 1, index + 1)); setFlipped(false); }} disabled={cardIndex === result.items.length - 1} className="rounded-xl border border-slate-200 p-2.5 disabled:opacity-30"><ChevronRight className="h-5 w-5" /></button></div></div>}
              {activeTool === "quiz" && <div className="space-y-5">{result.items.map((item, index) => <div key={index} className="rounded-2xl border border-slate-200 p-5"><div className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#004aad] text-xs font-extrabold text-white">{index + 1}</span><p className="font-bold leading-6">{item.question}</p></div><div className="mt-4 grid gap-2 sm:grid-cols-2">{item.options.map((option) => { const answered = Boolean(quizAnswers[index]); const correct = option === item.answer; const selected = quizAnswers[index] === option; return <button key={option} disabled={answered} onClick={() => setQuizAnswers((current) => ({ ...current, [index]: option }))} className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${answered && correct ? "border-emerald-300 bg-emerald-50 text-emerald-800" : selected ? "border-red-300 bg-red-50 text-red-800" : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"}`}>{option}</button>; })}</div>{quizAnswers[index] && <p className="mt-3 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-600"><strong>{quizAnswers[index] === item.answer ? "Correct!" : `Answer: ${item.answer}`}</strong> {item.explanation}</p>}</div>)}<div className="rounded-2xl bg-gradient-to-r from-[#004aad] to-blue-600 p-5 text-white"><p className="text-xs font-bold uppercase tracking-wider text-blue-200">Current score</p><p className="mt-1 text-3xl font-extrabold">{quizScore}/{result.items.length}</p><p className="mt-1 text-xs text-blue-100">Answered {Object.keys(quizAnswers).length} of {result.items.length}</p></div></div>}
              {activeTool === "mindmap" && <div className="rounded-[24px] bg-slate-50 p-4 sm:p-7"><div className="mx-auto flex max-w-sm items-center justify-center rounded-2xl bg-gradient-to-r from-[#004aad] to-blue-600 px-5 py-4 text-center font-extrabold text-white shadow-lg">{result.title}</div><div className="mx-auto h-8 w-0.5 bg-blue-200" /><div className="grid gap-3 sm:grid-cols-2">{result.items.map((item, index) => <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-xs font-extrabold text-[#d0510f]">{index + 1}</span><h4 className="font-extrabold">{item.heading}</h4></div><p className="mt-2 text-xs leading-5 text-slate-500">{item.content}</p></div>)}</div></div>}
              {activeTool === "podcast" && <div className="overflow-hidden rounded-[24px] border border-blue-100"><div className="bg-gradient-to-br from-[#061b3f] to-[#004aad] p-7 text-white"><div className="flex items-center gap-4"><button onClick={playPodcast} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#d0510f] shadow-lg">{isSpeaking ? <Pause className="h-6 w-6" /> : <Play className="ml-1 h-6 w-6" />}</button><div><p className="text-xs font-bold uppercase tracking-widest text-blue-200">Srijan Study Cast</p><h4 className="mt-1 text-xl font-extrabold">{result.title}</h4><p className="mt-1 text-xs text-blue-100">AI narration · approximately 3 minutes</p></div></div><div className="mt-6 flex h-10 items-center gap-1">{Array.from({ length: 34 }, (_, index) => <span key={index} className="w-1 rounded-full bg-cyan-300/70" style={{ height: 8 + ((index * 13) % 30) }} />)}</div></div><div className="max-h-80 overflow-y-auto p-5 text-sm leading-7 text-slate-600 whitespace-pre-wrap">{result.script}</div></div>}
            </div>}
          </div>
        </div>
      </div>}

      {goalOpen && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/65 p-3 backdrop-blur-sm"><div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[26px] bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><h2 className="font-poppins text-xl font-extrabold">Manage learning goals</h2><p className="mt-1 text-sm text-slate-500">Choose goals and track them from this dashboard.</p></div><button onClick={() => setGoalOpen(false)} className="rounded-xl border border-slate-200 p-2"><X className="h-5 w-5" /></button></div>
        {goals.length > 0 && <div className="mt-5 space-y-2"><p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Your goals</p>{goals.map((goal) => <div key={goal.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3"><button onClick={() => setGoals((current) => current.map((item) => item.id === goal.id ? { ...item, complete: !item.complete } : item))}>{goal.complete ? <CheckCircle2 className="h-6 w-6 text-emerald-600" /> : <Circle className="h-6 w-6 text-slate-300" />}</button><div className="flex-1"><p className={`text-sm font-extrabold ${goal.complete ? "text-slate-400 line-through" : ""}`}>{goal.title}</p><p className="mt-0.5 text-xs text-slate-500">{goal.description}</p></div><button onClick={() => setGoals((current) => current.filter((item) => item.id !== goal.id))} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div>)}</div>}
        <div className="mt-6 space-y-3"><p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Suggested goals</p>{GOAL_CHOICES.map((choice) => { const added = goals.some((goal) => goal.title === choice.title); return <div key={choice.title} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4"><div className="flex-1"><p className="text-sm font-extrabold">{choice.title}</p><p className="mt-1 text-xs text-slate-500">{choice.description}</p></div><button disabled={added} onClick={() => addGoal(choice.title, choice.description)} className={`flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-extrabold ${added ? "bg-emerald-50 text-emerald-700" : "bg-[#004aad] text-white"}`}>{added ? <><Check className="h-3.5 w-3.5" /> Added</> : <><Plus className="h-3.5 w-3.5" /> Add</>}</button></div>})}</div>
        <form onSubmit={(event) => { event.preventDefault(); if (customGoal.trim()) { addGoal(customGoal.trim(), "A personal learning goal for this term."); setCustomGoal(""); } }} className="mt-5 flex gap-2"><input value={customGoal} onChange={(event) => setCustomGoal(event.target.value)} placeholder="Add your own goal" maxLength={80} className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-orange-300" /><button className="rounded-xl bg-[#d0510f] px-4 py-2 text-sm font-extrabold text-white">Add</button></form>
      </div></div>}

      {bookOpen && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/65 p-2 backdrop-blur-sm sm:p-4"><div className="flex h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[26px] bg-white shadow-2xl"><div className="flex items-center justify-between border-b border-slate-200 px-5 py-4"><div><h2 className="font-poppins text-lg font-extrabold">Learn via AI Book</h2><p className="text-xs text-slate-500">Class {grade} interactive subject library</p></div><button onClick={() => { setBookOpen(false); setSelectedBook(null); setResult(emptyResult); }} className="rounded-xl border border-slate-200 p-2"><X className="h-5 w-5" /></button></div><div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <nav className="flex shrink-0 gap-2 overflow-x-auto border-b border-slate-200 bg-slate-50 p-3 md:w-52 md:flex-col md:border-b-0 md:border-r md:p-4">{["School Academics", "Test Prep / Exam", "Hobbies / Skills"].map((category) => <button key={category} onClick={() => { setBookCategory(category); setSelectedBook(null); setResult(emptyResult); }} className={`min-w-fit rounded-xl px-4 py-3 text-left text-xs font-extrabold ${bookCategory === category ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-white"}`}>{category}</button>)}</nav>
        <div className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6">{!selectedBook ? <><div className="relative"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={bookSearch} onChange={(event) => setBookSearch(event.target.value)} placeholder="Search your book" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-300" /></div><div className="mt-4 flex flex-wrap gap-2"><span className="rounded-xl bg-[#004aad] px-3 py-2 text-xs font-extrabold text-white">CBSE</span><span className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold">Class {grade}</span><select value={bookSubject} onChange={(event) => setBookSubject(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold"><option>All subjects</option>{SUBJECT_NAMES.map((name) => <option key={name}>{name}</option>)}</select></div><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{filteredBooks.map((book) => <button key={book.id} onClick={() => { setSelectedBook(book); setResult(emptyResult); setError(""); }} className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"><div className={`flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${book.accent} p-4 text-center text-3xl font-black text-white`}><span>{book.icon}</span></div><div className="p-3"><p className="line-clamp-2 text-xs font-extrabold leading-5">{book.title}</p><p className="mt-1 text-[10px] font-bold text-slate-400">{book.subject}</p></div></button>)}</div>{filteredBooks.length === 0 && <div className="py-16 text-center"><BookOpen className="mx-auto h-10 w-10 text-slate-300" /><p className="mt-3 text-sm font-extrabold">No matching books for Class {grade}</p><p className="mt-1 text-xs text-slate-500">Try another category or subject.</p></div>}</> : <div><button onClick={() => { setSelectedBook(null); setResult(emptyResult); }} className="flex items-center gap-2 text-xs font-extrabold text-[#004aad]"><ChevronLeft className="h-4 w-4" /> Back to library</button><div className="mt-5 grid gap-6 lg:grid-cols-[230px_1fr]"><div className={`flex aspect-[3/4] items-center justify-center rounded-[24px] bg-gradient-to-br ${selectedBook.accent} p-5 text-center text-5xl font-black text-white shadow-xl`}>{selectedBook.icon}</div><div><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold text-[#004aad]">{selectedBook.subject}</span><h3 className="mt-4 font-poppins text-3xl font-extrabold">{selectedBook.title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">An AI-guided companion for Class {grade}. It creates explanations and a study path; it does not reproduce copyrighted textbook pages.</p><div className="mt-5 grid gap-2 sm:grid-cols-3">{["Concept overview", "Key vocabulary", "Revision pathway"].map((label) => <div key={label} className="rounded-xl bg-slate-50 p-3 text-xs font-bold text-slate-600"><CheckCircle2 className="mb-2 h-4 w-4 text-emerald-600" />{label}</div>)}</div><button disabled={loading} onClick={() => generate(undefined, selectedBook)} className="mt-5 flex items-center gap-2 rounded-xl bg-[#d0510f] px-5 py-3 text-sm font-extrabold text-white disabled:opacity-50">{loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Preparing guide…</> : <><Sparkles className="h-4 w-4" /> Open AI guide</>}</button>{error && <p className="mt-3 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700">{error}</p>}</div></div>{result.title && <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 p-5"><p className="text-xs font-extrabold uppercase tracking-wider text-[#d0510f]">AI study guide</p><h4 className="mt-1 text-xl font-extrabold">{result.title}</h4><p className="mt-2 text-sm leading-6 text-slate-600">{result.summary}</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{result.items.map((item, index) => <div key={index} className="rounded-xl bg-white p-4 shadow-sm"><p className="text-sm font-extrabold">{item.heading}</p><p className="mt-1 text-xs leading-5 text-slate-500">{item.content}</p></div>)}</div></div>}</div>}</div></div>
      </div></div>}
      {bookOpen && selectedBook && result.title && <div className="fixed inset-0 z-[90] flex bg-slate-950/80 p-0 backdrop-blur-sm sm:p-3" role="dialog" aria-modal="true" aria-label="Interactive AI textbook">
        <div className="m-auto flex h-full w-full max-w-[1500px] flex-col overflow-hidden bg-[#eef1f6] shadow-2xl sm:h-[96vh] sm:rounded-2xl">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6"><div className="flex min-w-0 items-center gap-3"><button onClick={() => setResult(emptyResult)} className="rounded-lg p-2 hover:bg-slate-100"><ChevronLeft className="h-5 w-5" /></button><div className="min-w-0"><h2 className="truncate text-sm font-extrabold sm:text-base">{result.title}</h2><p className="text-[10px] font-bold uppercase tracking-wider text-[#004aad]">Interactive AI textbook · Class {grade}</p></div></div><div className="flex gap-2"><button onClick={downloadBook} className="flex items-center gap-2 rounded-xl bg-[#004aad] px-3 py-2 text-xs font-extrabold text-white"><Download className="h-4 w-4" /><span className="hidden sm:inline">Download PDF</span></button><button onClick={() => { setBookOpen(false); setSelectedBook(null); setResult(emptyResult); setBookImage(""); }} className="rounded-xl border p-2"><X className="h-5 w-5" /></button></div></header>
          <div className="grid min-h-0 flex-1 md:grid-cols-[minmax(290px,38%)_1fr]">
            <section className="flex min-h-0 flex-col border-r bg-white"><div className="border-b p-4"><div className="flex items-center gap-2 text-sm font-extrabold"><Sparkles className="h-4 w-4 text-[#d0510f]" /> Chat with your book</div><p className="mt-1 text-xs text-slate-500">Ask for explanations, examples, or a quiz.</p><div className="mt-3 flex flex-wrap gap-2">{["Explain the main idea", "Give a real-life example", "Quiz me in 3 questions"].map((prompt) => <button key={prompt} onClick={() => setBookQuestion(prompt)} className="rounded-full border px-2.5 py-1 text-[10px] font-bold hover:border-orange-300">{prompt}</button>)}</div></div>
              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">{bookChat.map((message, index) => <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-3 py-2.5 text-xs leading-5 ${message.role === "user" ? "rounded-br-sm bg-[#004aad] text-white" : "rounded-bl-sm border bg-white text-slate-700"}`}>{message.content}</div></div>)}{bookChatLoading && <div className="flex items-center gap-2 text-xs text-slate-400"><Loader2 className="h-4 w-4 animate-spin" /> Thinking…</div>}</div>
              <form onSubmit={askBook} className="flex gap-2 border-t p-3"><textarea value={bookQuestion} onChange={(event) => setBookQuestion(event.target.value)} rows={1} placeholder="Ask this book…" className="min-h-11 min-w-0 flex-1 resize-none rounded-xl border bg-slate-50 px-3 py-3 text-xs outline-none" /><button disabled={!bookQuestion.trim() || bookChatLoading} className="rounded-xl bg-[#d0510f] p-3 text-white disabled:opacity-40"><Send className="h-4 w-4" /></button></form></section>
            <section className="min-h-0 overflow-auto bg-[#cbd2dc] p-3 sm:p-6"><article id="ai-book-page" className="mx-auto min-h-[1120px] max-w-[790px] overflow-hidden bg-white shadow-2xl"><div className="h-3 bg-gradient-to-r from-[#004aad] via-cyan-500 to-[#d0510f]" /><div className="p-6 sm:p-10"><div className="flex items-start justify-between gap-5 border-b-2 border-slate-900 pb-5"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#d0510f]">Srijan AI Learning Edition</p><h1 className="mt-2 text-3xl font-extrabold leading-tight">{result.title}</h1><p className="mt-2 text-xs font-bold text-[#004aad]">{selectedBook.subject} · CBSE Class {grade}</p></div><div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedBook.accent} text-2xl font-black text-white`}>{selectedBook.icon}</div></div>
              <p className="mt-6 border-l-4 border-[#d0510f] bg-orange-50 p-4 text-sm leading-6">{result.summary}</p><div className="mt-7 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50">{bookImage ? <img src={bookImage} alt={`AI-generated educational infographic for ${result.title}`} className="aspect-[3/2] w-full object-cover" /> : <div className="flex aspect-[3/2] flex-col items-center justify-center text-[#004aad]"><Loader2 className="h-8 w-8 animate-spin" /><p className="mt-3 text-xs font-extrabold">Generating textbook illustration…</p></div>}<div className="flex items-center gap-2 border-t bg-white px-4 py-2 text-[10px] font-bold text-slate-500"><ImageIcon className="h-3.5 w-3.5" /> AI-generated concept visualization</div></div>
              <div className="mt-8"><p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Concept pathway</p><div className="mt-3 grid grid-cols-3 gap-2">{result.items.slice(0, 3).map((item, index) => <div key={index} className="rounded-xl bg-[#004aad] p-3 text-white"><span className="text-[10px] font-black text-cyan-200">0{index + 1}</span><p className="mt-1 text-xs font-extrabold">{item.heading}</p></div>)}</div></div><div className="mt-8 grid gap-4 sm:grid-cols-2">{result.items.map((item, index) => <section key={index} className={`rounded-2xl border p-5 ${index % 3 === 0 ? "border-blue-100 bg-blue-50/60" : index % 3 === 1 ? "border-orange-100 bg-orange-50/60" : "border-emerald-100 bg-emerald-50/60"}`}><div className="flex items-center gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-black text-white">{index + 1}</span><h2 className="text-sm font-extrabold">{item.heading}</h2></div><p className="mt-3 text-xs leading-5 text-slate-600">{item.content}</p></section>)}</div><footer className="mt-9 flex justify-between border-t pt-4 text-[9px] font-bold uppercase tracking-wider text-slate-400"><span>Original AI-generated study companion</span><span>Page 1</span></footer></div></article></section>
          </div>
        </div>
      </div>}
    </>
  );
}
