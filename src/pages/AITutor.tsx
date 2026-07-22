import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Atom,
  BookOpen,
  Bot,
  BrainCircuit,
  Calculator,
  Check,
  ChevronRight,
  Clock3,
  FlaskConical,
  GraduationCap,
  Headphones,
  ImagePlus,
  Languages,
  Loader2,
  Menu,
  MessageCircle,
  Mic,
  MicOff,
  MonitorSmartphone,
  Palette,
  Phone,
  PhoneOff,
  Send,
  Sparkles,
  Star,
  Trophy,
  UserRound,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import LogoFinal from "@/assets/LogoFinal.webp";
import LearningSuite from "@/components/ai-tutor/LearningSuite";

type ChatMessage = { role: "user" | "assistant"; content: string };
type SpeechRecognitionEventLike = { results?: { 0?: { 0?: { transcript?: string } } } };
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onstart: () => void;
  onend: () => void;
  onerror: () => void;
  onresult: (event: SpeechRecognitionEventLike) => void;
  start: () => void;
};
type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;
type Tutor = {
  id: string;
  name: string;
  subject: string;
  tagline: string;
  grades: string;
  initials: string;
  colors: string;
  rating: string;
};

const SUBJECTS = [
  { name: "Mathematics", icon: Calculator, color: "bg-blue-50 text-blue-700" },
  { name: "Science", icon: FlaskConical, color: "bg-emerald-50 text-emerald-700" },
  { name: "Physics", icon: Atom, color: "bg-violet-50 text-violet-700" },
  { name: "Chemistry", icon: FlaskConical, color: "bg-cyan-50 text-cyan-700" },
  { name: "Biology", icon: BrainCircuit, color: "bg-green-50 text-green-700" },
  { name: "English", icon: BookOpen, color: "bg-rose-50 text-rose-700" },
  { name: "Hindi", icon: Languages, color: "bg-amber-50 text-amber-700" },
  { name: "Social Science", icon: GraduationCap, color: "bg-orange-50 text-orange-700" },
  { name: "Computer Science", icon: MonitorSmartphone, color: "bg-indigo-50 text-indigo-700" },
  { name: "Accountancy", icon: Calculator, color: "bg-sky-50 text-sky-700" },
  { name: "Business Studies", icon: Trophy, color: "bg-fuchsia-50 text-fuchsia-700" },
  { name: "Economics", icon: Star, color: "bg-lime-50 text-lime-700" },
];

const TUTORS: Tutor[] = [
  { id: "aarya", name: "Aarya Mehta", subject: "Mathematics", tagline: "Makes every problem feel solvable", grades: "6–10", initials: "AM", colors: "from-blue-600 to-indigo-700", rating: "4.9" },
  { id: "kabir", name: "Kabir Rao", subject: "Physics", tagline: "Concepts through everyday examples", grades: "9–12", initials: "KR", colors: "from-violet-600 to-purple-800", rating: "4.9" },
  { id: "meera", name: "Meera Iyer", subject: "Biology", tagline: "Diagrams, stories and smart revision", grades: "6–12", initials: "MI", colors: "from-emerald-500 to-teal-700", rating: "4.8" },
  { id: "ananya", name: "Ananya Sen", subject: "English", tagline: "Clear writing and confident speaking", grades: "6–12", initials: "AS", colors: "from-rose-500 to-orange-600", rating: "4.9" },
  { id: "vihaan", name: "Vihaan Sharma", subject: "Chemistry", tagline: "Reactions explained step by step", grades: "9–12", initials: "VS", colors: "from-cyan-500 to-blue-700", rating: "4.8" },
  { id: "diya", name: "Diya Verma", subject: "Social Science", tagline: "History and civics made memorable", grades: "6–10", initials: "DV", colors: "from-amber-500 to-red-600", rating: "4.8" },
];

const QUICK_PROMPTS = ["Teach me a topic", "Clear my doubts", "Explain step by step", "Quiz me", "Help me revise"];

function extractErrorMessage(value: unknown) {
  return value instanceof Error ? value.message : "Something went wrong. Please try again.";
}

function speakText(text: string, enabled = true) {
  if (!enabled || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text.replace(/[*#_`]/g, ""));
  utterance.rate = 0.98;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

const TutorAvatar = ({ tutor, src, size = "md" }: { tutor: Tutor; src?: string; size?: "sm" | "md" | "lg" }) => {
  const sizes = size === "lg" ? "h-28 w-28 text-3xl" : size === "sm" ? "h-10 w-10 text-sm" : "h-16 w-16 text-xl";
  return (
    <div className={`${sizes} shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br ${tutor.colors} flex items-center justify-center font-extrabold text-white shadow-lg ring-4 ring-white`}>
      {src ? <img src={src} alt={`${tutor.name} AI avatar`} className="h-full w-full object-cover" /> : tutor.initials}
    </div>
  );
};

const AITutor = () => {
  const [grade, setGrade] = useState("8");
  const [subject, setSubject] = useState("All subjects");
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [callTutor, setCallTutor] = useState<Tutor | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceReplies, setVoiceReplies] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [avatarPrompt, setAvatarPrompt] = useState("Friendly Indian teacher, warm smile, smart casual clothing, modern classroom background");
  const [avatarTutor, setAvatarTutor] = useState<Tutor>(TUTORS[0]);
  const [avatarImages, setAvatarImages] = useState<Record<string, string>>({});
  const [generatingAvatar, setGeneratingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState("");
  const [callSeconds, setCallSeconds] = useState(0);
  const [callStatus, setCallStatus] = useState<"ready" | "connecting" | "connected">("ready");
  const messageEndRef = useRef<HTMLDivElement>(null);

  const visibleTutors = useMemo(
    () => subject === "All subjects" || subject === "Science" ? TUTORS : TUTORS.filter((t) => t.subject === subject),
    [subject],
  );

  useEffect(() => messageEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, isSending]);

  useEffect(() => {
    if (callStatus !== "connected") return;
    const timer = window.setInterval(() => setCallSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [callStatus]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const startTutor = (tutor: Tutor, starter?: string) => {
    setSelectedTutor(tutor);
    setMessages([
      {
        role: "assistant",
        content: `Namaste! I’m ${tutor.name}, your ${tutor.subject} learning companion for Class ${grade}. What would you like to understand today?`,
      },
    ]);
    setInput(starter || "");
  };

  const sendMessage = async (event?: FormEvent, override?: string) => {
    event?.preventDefault();
    if (!selectedTutor || isSending) return;
    const content = (override ?? input).trim();
    if (!content) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);
    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, grade, subject: selectedTutor.subject, tutorName: selectedTutor.name, history: nextMessages.slice(-10) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The tutor could not respond.");
      const reply = data.reply as string;
      setMessages((current) => [...current, { role: "assistant", content: reply }]);
      speakText(reply, voiceReplies || callStatus === "connected");
    } catch (error) {
      setMessages((current) => [...current, { role: "assistant", content: `I couldn’t connect just now. ${extractErrorMessage(error)}` }]);
    } finally {
      setIsSending(false);
    }
  };

  const startListening = (onResult?: (value: string) => void) => {
    const speechWindow = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const SpeechRecognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessages((current) => [...current, { role: "assistant", content: "Voice input is not supported in this browser. Please use Chrome or type your question." }]);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      if (onResult) onResult(transcript);
      else setInput(transcript);
    };
    recognition.start();
  };

  const openCall = (tutor: Tutor) => {
    setCallTutor(tutor);
    setCallStatus("ready");
    setCallSeconds(0);
    if (!selectedTutor || selectedTutor.id !== tutor.id) startTutor(tutor);
  };

  const beginCall = () => {
    setCallStatus("connecting");
    window.setTimeout(() => {
      setCallStatus("connected");
      speakText(`Hello! I’m ${callTutor?.name}. Ask me any ${callTutor?.subject} question for Class ${grade}.`, true);
    }, 900);
  };

  const generateAvatar = async () => {
    setGeneratingAvatar(true);
    setAvatarError("");
    try {
      const response = await fetch("/api/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: avatarPrompt, tutorName: avatarTutor.name, subject: avatarTutor.subject }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Avatar generation failed.");
      setAvatarImages((current) => ({ ...current, [avatarTutor.id]: `data:image/png;base64,${data.image}` }));
    } catch (error) {
      setAvatarError(extractErrorMessage(error));
    } finally {
      setGeneratingAvatar(false);
    }
  };

  const formatDuration = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3" aria-label="Srijan Valley School home">
              <img src={LogoFinal} alt="Srijan Valley School" className="h-14 w-14 object-contain" />
              <div className="hidden sm:block">
                <p className="font-poppins text-base font-bold leading-tight">Srijan Valley School</p>
                <p className="text-xs font-semibold text-[#d0510f]">AI Learning Studio</p>
              </div>
            </Link>
            <span className="hidden h-8 w-px bg-slate-200 md:block" />
            <span className="hidden items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#b8430b] md:flex"><Sparkles className="h-3.5 w-3.5" /> CBSE Classes 6–12</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setAvatarOpen(true)} className="hidden items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 sm:flex">
              <ImagePlus className="h-4 w-4 text-[#d0510f]" /> Avatar Studio
            </button>
            <Link to="/" className="hidden items-center gap-2 rounded-xl bg-[#d0510f] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#b8430b] sm:flex"><ArrowLeft className="h-4 w-4" /> School website</Link>
            <button onClick={() => setMobileMenu((value) => !value)} className="rounded-xl border border-slate-200 p-2.5 sm:hidden" aria-label="Open menu"><Menu className="h-5 w-5" /></button>
          </div>
        </div>
        {mobileMenu && <div className="border-t border-slate-100 bg-white p-4 sm:hidden"><div className="grid gap-2"><button onClick={() => { setAvatarOpen(true); setMobileMenu(false); }} className="rounded-xl bg-orange-50 px-4 py-3 text-left text-sm font-bold text-[#b8430b]">Open Avatar Studio</button><Link to="/" className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Back to school website</Link></div></div>}
      </header>

      <main className="mx-auto grid max-w-[1500px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)_300px] lg:px-8 lg:py-8">
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">Your classroom</p>
              <label className="mb-1.5 block text-xs font-bold text-slate-600" htmlFor="grade">CBSE class</label>
              <select id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} className="mb-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold outline-none focus:border-orange-400">
                {[6, 7, 8, 9, 10, 11, 12].map((value) => <option key={value} value={value}>Class {value}</option>)}
              </select>
              <nav className="space-y-1" aria-label="Tutor sections">
                {[{ label: "Tutor home", icon: Bot, active: true }, { label: "My learning", icon: BookOpen }, { label: "Practice", icon: BrainCircuit }, { label: "Achievements", icon: Trophy }].map((item) => <button key={item.label} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold ${item.active ? "bg-[#d0510f] text-white" : "text-slate-600 hover:bg-slate-50"}`}><item.icon className="h-4 w-4" />{item.label}</button>)}
              </nav>
            </div>
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#004aad] to-[#052a62] p-5 text-white shadow-lg">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"><Trophy className="h-5 w-5 text-amber-300" /></div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200">This week</p>
              <p className="mt-1 text-2xl font-extrabold">3 day streak</p>
              <p className="mt-2 text-sm leading-6 text-blue-100">Keep learning for 15 minutes today to continue.</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full w-3/5 rounded-full bg-amber-400" /></div>
            </div>
          </div>
        </aside>

        <section className="min-w-0 space-y-7">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#fff5ed] via-white to-[#edf4ff] p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl" />
            <div className="absolute bottom-0 right-16 h-40 w-40 rounded-full bg-blue-200/30 blur-3xl" />
            <div className="relative max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-extrabold text-[#004aad] shadow-sm ring-1 ring-blue-100"><Sparkles className="h-4 w-4 text-[#d0510f]" /> Your personal learning companion</div>
              <h1 className="font-poppins text-3xl font-extrabold leading-tight sm:text-4xl">What would you like to <span className="text-[#d0510f]">learn today?</span></h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">Choose a CBSE subject, meet your AI tutor, and learn at your own pace—through chat or a simulated voice call.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <GraduationCap className="h-5 w-5 text-[#d0510f]" /><span className="text-sm font-bold">Class</span>
                  <select value={grade} onChange={(e) => setGrade(e.target.value)} className="bg-transparent text-sm font-extrabold text-[#004aad] outline-none">{[6, 7, 8, 9, 10, 11, 12].map((value) => <option key={value}>{value}</option>)}</select>
                </div>
                <button onClick={() => startTutor(TUTORS[0])} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d0510f] px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-[#b8430b]">Start learning <ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#d0510f]">Explore</p><h2 className="mt-1 font-poppins text-xl font-extrabold sm:text-2xl">Choose your subject</h2></div><span className="text-xs font-semibold text-slate-400">Class {grade} · CBSE</span></div>
            <div className="flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none]">
              <button onClick={() => setSubject("All subjects")} className={`min-w-fit rounded-2xl border p-4 text-left transition ${subject === "All subjects" ? "border-[#d0510f] bg-orange-50 shadow-sm" : "border-slate-200 bg-white hover:border-orange-200"}`}><Sparkles className="mb-3 h-5 w-5 text-[#d0510f]" /><span className="block text-sm font-extrabold">All subjects</span></button>
              {SUBJECTS.map((item) => <button key={item.name} onClick={() => setSubject(item.name)} className={`min-w-[145px] rounded-2xl border p-4 text-left transition ${subject === item.name ? "border-[#d0510f] bg-orange-50 shadow-sm" : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-orange-200"}`}><span className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${item.color}`}><item.icon className="h-5 w-5" /></span><span className="block text-sm font-extrabold">{item.name}</span></button>)}
            </div>
          </div>

          <LearningSuite grade={grade} currentSubject={subject} />

          <div>
            <div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#004aad]">Recommended for you</p><h2 className="mt-1 font-poppins text-xl font-extrabold sm:text-2xl">Meet your AI tutors</h2></div><button onClick={() => setSubject("All subjects")} className="text-xs font-bold text-[#d0510f]">View all</button></div>
            {visibleTutors.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleTutors.map((tutor) => (
              <article key={tutor.id} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-200/60">
                <div className="flex items-start justify-between"><TutorAvatar tutor={tutor} src={avatarImages[tutor.id]} /><span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-extrabold text-amber-700"><Star className="h-3 w-3 fill-current" />{tutor.rating}</span></div>
                <div className="mt-4"><p className="text-xs font-extrabold uppercase tracking-wider text-[#d0510f]">{tutor.subject}</p><h3 className="mt-1 font-poppins text-lg font-extrabold">{tutor.name}</h3><p className="mt-1 min-h-10 text-sm leading-5 text-slate-500">{tutor.tagline}</p><p className="mt-3 text-xs font-bold text-slate-400">CBSE · Classes {tutor.grades}</p></div>
                <div className="mt-5 grid grid-cols-2 gap-2"><button onClick={() => startTutor(tutor)} className="rounded-xl bg-slate-900 px-3 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#004aad]">Study now</button><button onClick={() => openCall(tutor)} className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-extrabold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50"><Phone className="h-3.5 w-3.5" /> Call tutor</button></div>
              </article>
            ))}</div> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center"><p className="font-bold">More {subject} tutors are coming soon.</p><p className="mt-1 text-sm text-slate-500">Choose “All subjects” to continue learning today.</p></div>}
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">Learning progress</p><h2 className="mt-1 font-poppins text-lg font-extrabold">Weekly goal</h2></div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-[#d0510f]"><Trophy className="h-5 w-5" /></div></div>
            <div className="mt-5 flex items-end justify-between"><span className="text-3xl font-extrabold">42<span className="text-base text-slate-400">/75 min</span></span><span className="text-xs font-bold text-emerald-600">56% done</span></div><div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[56%] rounded-full bg-gradient-to-r from-[#d0510f] to-amber-400" /></div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">{[{ value: "12", label: "Topics" }, { value: "84%", label: "Accuracy" }, { value: "3", label: "Streak" }].map((item) => <div key={item.label} className="rounded-xl bg-slate-50 px-2 py-3"><p className="text-base font-extrabold">{item.value}</p><p className="mt-0.5 text-[10px] font-bold uppercase text-slate-400">{item.label}</p></div>)}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><h2 className="font-poppins text-lg font-extrabold">Smart tools</h2><span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-extrabold text-[#004aad]">AI POWERED</span></div><div className="space-y-2">{[
            { icon: BrainCircuit, title: "Quiz me", body: "Test any topic", color: "bg-violet-50 text-violet-700" },
            { icon: BookOpen, title: "Revision cards", body: "Remember faster", color: "bg-amber-50 text-amber-700" },
            { icon: Palette, title: "Visual explain", body: "Learn with diagrams", color: "bg-emerald-50 text-emerald-700" },
          ].map((tool) => <button key={tool.title} onClick={() => startTutor(TUTORS[0], `${tool.title}: help me with a Class ${grade} topic.`)} className="flex w-full items-center gap-3 rounded-xl border border-transparent p-2.5 text-left transition hover:border-slate-200 hover:bg-slate-50"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tool.color}`}><tool.icon className="h-5 w-5" /></span><span className="flex-1"><span className="block text-sm font-extrabold">{tool.title}</span><span className="block text-xs text-slate-400">{tool.body}</span></span><ChevronRight className="h-4 w-4 text-slate-300" /></button>)}</div></div>
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5"><div className="flex gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#004aad] text-white"><Clock3 className="h-5 w-5" /></div><div><p className="text-sm font-extrabold">Healthy learning</p><p className="mt-1 text-xs leading-5 text-slate-500">Take a short break after every 25 minutes. AI can guide learning, but your teachers remain important.</p></div></div></div>
        </aside>
      </main>

      {selectedTutor && (
        <div className="fixed inset-0 z-50 flex bg-slate-950/45 p-0 backdrop-blur-sm sm:p-4" role="dialog" aria-modal="true" aria-label={`Study with ${selectedTutor.name}`}>
          <div className="m-auto flex h-full w-full max-w-5xl flex-col overflow-hidden bg-white shadow-2xl sm:h-[92vh] sm:rounded-[28px]">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3"><TutorAvatar tutor={selectedTutor} src={avatarImages[selectedTutor.id]} size="sm" /><div><div className="flex items-center gap-2"><h2 className="text-sm font-extrabold sm:text-base">{selectedTutor.name}</h2><span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700">ONLINE</span></div><p className="text-xs font-semibold text-slate-400">{selectedTutor.subject} · CBSE Class {grade}</p></div></div>
              <div className="flex items-center gap-2"><button onClick={() => openCall(selectedTutor)} className="hidden items-center gap-2 rounded-xl bg-[#d0510f] px-4 py-2 text-xs font-extrabold text-white sm:flex"><Phone className="h-3.5 w-3.5" /> Call tutor</button><button onClick={() => { setSelectedTutor(null); window.speechSynthesis?.cancel(); }} className="rounded-xl border border-slate-200 p-2" aria-label="Close tutor"><X className="h-5 w-5" /></button></div>
            </div>
            <div className="flex-1 overflow-y-auto bg-[#f8f9fc] px-4 py-6 sm:px-8">
              <div className="mx-auto max-w-3xl space-y-5">
                <div className="mb-8 text-center"><TutorAvatar tutor={selectedTutor} src={avatarImages[selectedTutor.id]} size="lg" /><h3 className="mt-5 font-poppins text-xl font-extrabold">Let’s make learning simple and clear</h3><p className="mt-2 text-sm text-slate-500">Ask anything from your Class {grade} CBSE {selectedTutor.subject} syllabus.</p><div className="mt-4 flex flex-wrap justify-center gap-2">{QUICK_PROMPTS.map((prompt) => <button key={prompt} onClick={() => setInput(prompt)} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm hover:border-orange-200 hover:text-[#d0510f]">{prompt}</button>)}</div></div>
                {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-br-md bg-[#004aad] text-white" : "rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-sm"}`}>{message.content}</div></div>)}
                {isSending && <div className="flex justify-start"><div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin text-[#d0510f]" /> Thinking through your question…</div></div>}
                <div ref={messageEndRef} />
              </div>
            </div>
            <form onSubmit={sendMessage} className="border-t border-slate-200 bg-white p-3 sm:p-5"><div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-50"><button type="button" onClick={() => setVoiceReplies((value) => !value)} className={`rounded-xl p-2.5 ${voiceReplies ? "bg-blue-50 text-[#004aad]" : "text-slate-400"}`} aria-label="Toggle spoken replies">{voiceReplies ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}</button><textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} placeholder="Ask a question or describe what you’re stuck on…" rows={1} className="max-h-28 min-h-11 flex-1 resize-none bg-transparent px-2 py-2.5 text-sm outline-none" /><button type="button" onClick={() => startListening()} className={`rounded-xl p-2.5 ${isListening ? "animate-pulse bg-red-50 text-red-600" : "text-slate-500 hover:bg-white"}`} aria-label="Speak your question">{isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}</button><button type="submit" disabled={!input.trim() || isSending} className="rounded-xl bg-[#d0510f] p-2.5 text-white disabled:cursor-not-allowed disabled:opacity-40" aria-label="Send message"><Send className="h-5 w-5" /></button></div><p className="mt-2 text-center text-[10px] font-semibold text-slate-400">AI can make mistakes. Check important answers with your teacher and textbook.</p></form>
          </div>
        </div>
      )}

      {callTutor && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Simulated tutor call">
          <div className="w-full max-w-md overflow-hidden rounded-[28px] bg-white shadow-2xl">
            <div className="bg-gradient-to-br from-[#061b3f] via-[#004aad] to-[#1169d9] px-6 pb-8 pt-5 text-white">
              <div className="flex items-center justify-between"><span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest">Simulated AI call</span><button onClick={() => { setCallTutor(null); setCallStatus("ready"); window.speechSynthesis?.cancel(); }} className="rounded-full bg-white/10 p-2" aria-label="Close call"><X className="h-4 w-4" /></button></div>
              <div className="mt-8 flex flex-col items-center text-center"><TutorAvatar tutor={callTutor} src={avatarImages[callTutor.id]} size="lg" /><h2 className="mt-5 font-poppins text-2xl font-extrabold">{callTutor.name}</h2><p className="mt-1 text-sm font-semibold text-blue-100">{callTutor.subject} · Class {grade}</p><p className="mt-4 text-sm text-blue-100">{callStatus === "ready" ? "Ready when you are" : callStatus === "connecting" ? "Connecting to your tutor…" : formatDuration(callSeconds)}</p>
                {callStatus === "connected" && <div className="mt-5 flex h-8 items-center gap-1">{[18, 28, 38, 24, 34, 20, 30, 16, 26].map((height, index) => <span key={index} className="w-1 animate-pulse rounded-full bg-orange-300" style={{ height, animationDelay: `${index * 90}ms` }} />)}</div>}
              </div>
            </div>
            <div className="p-6">
              {callStatus === "ready" && <><div className="grid gap-2 text-sm leading-6 text-slate-500"><p className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" /> Allow microphone access for voice questions.</p><p className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" /> Tutor replies are generated by AI and read aloud.</p><p className="flex gap-2"><Headphones className="mt-1 h-4 w-4 shrink-0 text-[#004aad]" /> Use headphones in a shared space.</p></div><button onClick={beginCall} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d0510f] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-100"><Phone className="h-4 w-4" /> Start audio call</button></>}
              {callStatus === "connecting" && <div className="flex flex-col items-center py-5"><Loader2 className="h-8 w-8 animate-spin text-[#d0510f]" /><p className="mt-3 text-sm font-bold text-slate-500">Preparing your Class {grade} tutor…</p></div>}
              {callStatus === "connected" && <div><p className="text-center text-sm text-slate-500">Tap the microphone, speak once, and your tutor will answer aloud.</p><div className="mt-6 flex items-center justify-center gap-5"><button onClick={() => setVoiceReplies((value) => !value)} className={`flex h-12 w-12 items-center justify-center rounded-full ${voiceReplies ? "bg-blue-50 text-[#004aad]" : "bg-slate-100 text-slate-400"}`}>{voiceReplies ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}</button><button onClick={() => startListening((transcript) => sendMessage(undefined, transcript))} className={`flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg ${isListening ? "animate-pulse bg-red-500" : "bg-[#004aad]"}`}>{isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}</button><button onClick={() => { setCallTutor(null); setCallStatus("ready"); window.speechSynthesis?.cancel(); }} className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white"><PhoneOff className="h-5 w-5" /></button></div></div>}
            </div>
          </div>
        </div>
      )}

      {avatarOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="AI tutor avatar generator">
          <div className="w-full max-w-2xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5"><div><div className="flex items-center gap-2"><ImagePlus className="h-5 w-5 text-[#d0510f]" /><h2 className="font-poppins text-xl font-extrabold">AI Tutor Avatar Studio</h2></div><p className="mt-1 text-xs text-slate-500">Create a school-friendly portrait with GPT Image.</p></div><button onClick={() => setAvatarOpen(false)} className="rounded-xl border border-slate-200 p-2"><X className="h-5 w-5" /></button></div>
            <div className="grid gap-6 p-6 md:grid-cols-[220px_1fr]">
              <div className="flex min-h-56 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-blue-50 ring-1 ring-slate-200"><TutorAvatar tutor={avatarTutor} src={avatarImages[avatarTutor.id]} size="lg" /></div>
              <div><label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Tutor</label><select value={avatarTutor.id} onChange={(e) => setAvatarTutor(TUTORS.find((tutor) => tutor.id === e.target.value) || TUTORS[0])} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-bold outline-none focus:border-orange-300">{TUTORS.map((tutor) => <option key={tutor.id} value={tutor.id}>{tutor.name} · {tutor.subject}</option>)}</select><label className="mt-4 block text-xs font-extrabold uppercase tracking-wider text-slate-500">Portrait description</label><textarea value={avatarPrompt} onChange={(e) => setAvatarPrompt(e.target.value)} rows={4} maxLength={400} className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm leading-6 outline-none focus:border-orange-300" /><p className="mt-1 text-right text-[10px] font-semibold text-slate-400">{avatarPrompt.length}/400</p>{avatarError && <p className="mt-3 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700">{avatarError}</p>}<button onClick={generateAvatar} disabled={generatingAvatar || avatarPrompt.trim().length < 12} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d0510f] px-5 py-3 text-sm font-extrabold text-white disabled:opacity-50">{generatingAvatar ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating portrait…</> : <><Sparkles className="h-4 w-4" /> Generate avatar</>}</button><p className="mt-3 text-[10px] leading-4 text-slate-400">Creates a fictional adult tutor portrait. Do not enter a student’s name, photo, or personal information.</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITutor;
