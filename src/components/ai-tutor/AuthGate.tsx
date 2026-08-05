import { FormEvent, ReactNode, useEffect, useState } from "react";
import { ArrowLeft, BookOpen, GraduationCap, LayoutDashboard, Loader2, LockKeyhole, LogOut, Plus, School, ShieldCheck, UserPlus, Users } from "lucide-react";
import { Link } from "react-router-dom";
import LogoFinal from "@/assets/LogoFinal.webp";

type Role = "super_admin" | "school_admin" | "teacher" | "student";
type SessionUser = { id: string; name: string; username: string; role: Role; schoolId?: string; classSection?: string };

const roleLabels: Record<Role, string> = { super_admin: "Super Admin", school_admin: "School Admin", teacher: "Teacher", student: "Student" };
const roleIcons = { super_admin: ShieldCheck, school_admin: School, teacher: Users, student: GraduationCap };
const demoCredentials: Record<Role, { username: string; password: string }> = {
  super_admin: { username: "superadmin", password: "Admin@2026" },
  school_admin: { username: "schooladmin", password: "School@2026" },
  teacher: { username: "teacher1b", password: "Teacher@2026" },
  student: { username: "SVS-1B-12", password: "1234" },
};

async function api(path: string, options: RequestInit = {}) {
  const response = await fetch(path, { ...options, credentials: "same-origin", headers: { "Content-Type": "application/json", ...options.headers } });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}

type DashboardItem = { id: string; name: string; code?: string; adminName?: string; username?: string; classSection?: string; createdAt?: string };
type DashboardData = { kind: "schools" | "teachers" | "students"; items: DashboardItem[]; stats: { total: number; active: number; secondary: number | string } };

function ManagementDashboard({ user, onLogout }: { user: SessionUser; onLogout: () => void }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const title = user.role === "super_admin" ? "Create school" : user.role === "school_admin" ? "Create teacher" : "Create student";
  const endpoint = user.role === "super_admin" ? "/api/admin/schools" : user.role === "school_admin" ? "/api/admin/teachers" : "/api/admin/students";
  const listTitle = user.role === "super_admin" ? "Schools" : user.role === "school_admin" ? "Teachers" : `Students in ${user.classSection}`;

  const loadDashboard = () => {
    setLoading(true);
    api("/api/dashboard").then(setData).catch((value) => setMessage(value instanceof Error ? value.message : "Could not load dashboard.")).finally(() => setLoading(false));
  };
  useEffect(loadDashboard, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setMessage("");
    const formElement = event.currentTarget;
    const form = new FormData(event.currentTarget);
    try {
      const result = await api(endpoint, { method: "POST", body: JSON.stringify(Object.fromEntries(form)) });
      setMessage(result.message); formElement.reset(); loadDashboard();
    } catch (value) { setMessage(value instanceof Error ? value.message : "Could not create account."); }
    finally { setBusy(false); }
  };

  const secondaryLabel = user.role === "super_admin" ? "School admins" : user.role === "school_admin" ? "Class sections" : "Your class";
  return <div className="min-h-screen bg-slate-50 text-slate-900">
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4"><div className="flex items-center gap-3"><img src={LogoFinal} alt="Srijan Valley School" className="h-12 w-12 object-contain" /><div><p className="font-extrabold">Srijan Valley School</p><p className="text-xs font-bold text-[#d0510f]">{roleLabels[user.role]} Portal</p></div></div><button onClick={onLogout} className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white"><LogOut className="h-4 w-4" /> Sign out</button></div></header>
    <div className="mx-auto grid max-w-[1400px] gap-6 px-5 py-7 lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside><div className="rounded-2xl bg-gradient-to-br from-[#004aad] to-[#052a62] p-5 text-white shadow-lg"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15"><ShieldCheck className="h-5 w-5" /></div><p className="mt-4 font-extrabold">{user.name}</p><p className="mt-1 text-xs text-blue-200">@{user.username}</p>{user.classSection && <p className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-xs font-bold">Class {user.classSection}</p>}</div><nav className="mt-4 rounded-2xl border border-slate-200 bg-white p-2"><div className="flex items-center gap-3 rounded-xl bg-blue-50 px-3 py-3 text-sm font-extrabold text-[#004aad]"><LayoutDashboard className="h-4 w-4" /> Dashboard</div><div className="flex items-center gap-3 px-3 py-3 text-sm font-bold text-slate-500"><Users className="h-4 w-4" /> {listTitle}</div></nav></aside>
      <main className="min-w-0 space-y-6">
        <div><p className="text-sm font-extrabold uppercase tracking-widest text-[#d0510f]">Management dashboard</p><h1 className="mt-1 text-3xl font-extrabold">Welcome, {user.name}</h1><p className="mt-2 text-slate-500">Manage only the records assigned to your role.</p></div>
        <div className="grid gap-4 sm:grid-cols-3"><Stat label={`Total ${listTitle}`} value={data?.stats.total ?? "—"} icon={School} /><Stat label="Active accounts" value={data?.stats.active ?? "—"} icon={Users} /><Stat label={secondaryLabel} value={data?.stats.secondary ?? "—"} icon={BookOpen} /></div>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 p-5"><div><h2 className="text-xl font-extrabold">{listTitle}</h2><p className="mt-1 text-sm text-slate-500">Live records saved in MongoDB</p></div></div>{loading ? <div className="flex h-52 items-center justify-center"><Loader2 className="h-7 w-7 animate-spin text-[#004aad]" /></div> : data?.items.length ? <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Name</th><th className="px-5 py-3">Login / code</th><th className="px-5 py-3">Assignment</th></tr></thead><tbody>{data.items.map((item) => <tr key={item.id} className="border-t border-slate-100"><td className="px-5 py-4 font-bold">{item.name}<span className="mt-1 block text-xs font-normal text-slate-400">{item.adminName}</span></td><td className="px-5 py-4 font-mono text-xs">{item.code || item.username}</td><td className="px-5 py-4">{item.classSection || (item.adminName ? "School Admin" : "—")}</td></tr>)}</tbody></table></div> : <div className="p-10 text-center text-sm text-slate-500">No records yet. Use the form to create the first one.</div>}</section>
          <section className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-5 flex items-center gap-3"><div className="rounded-xl bg-orange-50 p-2.5 text-[#d0510f]"><Plus className="h-5 w-5" /></div><div><h2 className="font-extrabold">{title}</h2><p className="text-xs text-slate-500">Saved immediately to the database</p></div></div><form onSubmit={submit} className="grid gap-4">{user.role === "super_admin" && <><Field name="schoolName" label="School name" /><Field name="schoolCode" label="School code" placeholder="e.g. DPS-01" /><Field name="adminName" label="School Admin name" /></>}{user.role === "school_admin" && <><Field name="name" label="Teacher name" /><Field name="classSection" label="Assigned class / section" placeholder="e.g. 1B" /></>}{user.role === "teacher" && <Field name="name" label="Student name" />}<Field name={user.role === "teacher" ? "rollNumber" : "username"} label={user.role === "teacher" ? "Student roll number" : "Username"} /><Field name={user.role === "teacher" ? "pin" : "password"} label={user.role === "teacher" ? "4-digit PIN" : "Temporary password"} type="password" pattern={user.role === "teacher" ? "[0-9]{4}" : undefined} maxLength={user.role === "teacher" ? 4 : 128} />{message && <p className={`rounded-xl p-3 text-sm font-semibold ${message.toLowerCase().includes("created") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{message}</p>}<button disabled={busy} className="flex items-center justify-center gap-2 rounded-xl bg-[#d0510f] px-5 py-3.5 font-extrabold text-white disabled:opacity-60">{busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <UserPlus className="h-5 w-5" />} {title}</button></form></section>
        </div>
      </main>
    </div>
  </div>;
}

function Stat({ label, value, icon: Icon }: { label: string; value: number | string; icon: typeof School }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-sm font-bold text-slate-500">{label}</p><Icon className="h-5 w-5 text-[#004aad]" /></div><p className="mt-3 text-3xl font-extrabold">{value}</p></div>; }

function Field({ name, label, type = "text", placeholder, pattern, maxLength }: { name: string; label: string; type?: string; placeholder?: string; pattern?: string; maxLength?: number }) {
  return <label className="grid gap-1.5 text-sm font-bold text-slate-700">{label}<input required name={name} type={type} placeholder={placeholder} pattern={pattern} maxLength={maxLength} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#004aad] focus:ring-2 focus:ring-blue-100" /></label>;
}

export default function AuthGate({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [checking, setChecking] = useState(true);
  const [role, setRole] = useState<Role>("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/api/auth/me").then((data) => setUser(data.user)).catch(() => undefined).finally(() => setChecking(false));
  }, []);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true); setError("");
    try {
      const data = await api("/api/auth/login", { method: "POST", body: JSON.stringify({ role, username, password }) });
      setUser(data.user);
    } catch (value) { setError(value instanceof Error ? value.message : "Login failed."); }
    finally { setBusy(false); }
  };

  if (checking) return <div className="flex min-h-screen items-center justify-center bg-slate-50"><Loader2 className="h-8 w-8 animate-spin text-[#004aad]" /></div>;
  if (user) {
    const logout = async () => { await api("/api/auth/logout", { method: "POST" }); setUser(null); };
    if (user.role === "student") return <>{children}<button onClick={logout} className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-xl"><LogOut className="h-4 w-4" /> Sign out</button></>;
    return <ManagementDashboard user={user} onLogout={logout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef5ff] via-white to-[#fff3e9] px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#004aad]"><ArrowLeft className="h-4 w-4" /> Back to school website</Link>
        <div className="overflow-hidden rounded-[30px] border border-white bg-white shadow-2xl shadow-blue-950/10 lg:grid lg:grid-cols-[1.05fr_.95fr]">
          <section className="relative overflow-hidden bg-gradient-to-br from-[#004aad] to-[#06275c] p-8 text-white sm:p-12">
            <div className="absolute -right-24 -top-20 h-64 w-64 rounded-full bg-cyan-300/15 blur-3xl" />
            <div className="relative">
              <div className="mb-10 flex items-center gap-3"><img src={LogoFinal} alt="Srijan Valley School" className="h-16 w-16 rounded-2xl bg-white object-contain p-1" /><div><p className="text-lg font-extrabold">Srijan Valley School</p><p className="text-sm text-blue-200">AI Learning Studio</p></div></div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold"><LockKeyhole className="h-3.5 w-3.5" /> Secure school access</span>
              <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">Your personal AI Tutor starts here.</h1>
              <p className="mt-4 max-w-md leading-7 text-blue-100">Sign in with the account created for you by your school. Student access uses a simple roll number and 4-digit PIN.</p>
              <div className="mt-9 grid grid-cols-2 gap-3">
                {(Object.keys(roleLabels) as Role[]).map((item) => { const Icon = roleIcons[item]; return <div key={item} className="flex items-center gap-2 rounded-xl bg-white/10 p-3 text-sm font-bold"><Icon className="h-4 w-4 text-orange-300" />{roleLabels[item]}</div>; })}
              </div>
            </div>
          </section>
          <section className="p-7 sm:p-12">
            <div className="mb-7"><p className="text-sm font-extrabold uppercase tracking-widest text-[#d0510f]">AI Tutor Login</p><h2 className="mt-2 text-3xl font-extrabold text-slate-900">Welcome back</h2><p className="mt-2 text-sm text-slate-500">Choose your role and enter your school credentials.</p></div>
            <form onSubmit={login} className="space-y-5">
              <div><label className="mb-2 block text-sm font-bold text-slate-700">Login as</label><div className="grid grid-cols-2 gap-2">{(Object.keys(roleLabels) as Role[]).map((item) => <button type="button" key={item} onClick={() => { setRole(item); setPassword(""); setError(""); }} className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${role === item ? "border-[#004aad] bg-blue-50 text-[#004aad]" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{roleLabels[item]}</button>)}</div></div>
              <div><label htmlFor="auth-username" className="mb-2 block text-sm font-bold text-slate-700">{role === "student" ? "Roll number" : "Username"}</label><input id="auth-username" required autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#004aad] focus:ring-2 focus:ring-blue-100" placeholder={role === "student" ? "e.g. SVS-1B-12" : "Enter username"} /></div>
              <div><label htmlFor="auth-password" className="mb-2 block text-sm font-bold text-slate-700">{role === "student" ? "4-digit PIN" : "Password"}</label><input id="auth-password" required type="password" inputMode={role === "student" ? "numeric" : undefined} maxLength={role === "student" ? 4 : 128} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} pattern={role === "student" ? "[0-9]{4}" : undefined} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#004aad] focus:ring-2 focus:ring-blue-100" placeholder={role === "student" ? "••••" : "Enter password"} /></div>
              {error && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
              <button type="button" onClick={() => { setUsername(demoCredentials[role].username); setPassword(demoCredentials[role].password); setError(""); }} className="w-full rounded-xl border border-[#004aad] px-5 py-3 text-sm font-extrabold text-[#004aad] hover:bg-blue-50">Use {roleLabels[role]} demo login</button>
              <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d0510f] px-5 py-3.5 font-extrabold text-white shadow-lg transition hover:bg-[#b8430b] disabled:opacity-60">{busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <LockKeyhole className="h-5 w-5" />} Sign in and open AI Tutor</button>
            </form>
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-[#004aad]">Demo login IDs</p>
              <div className="grid gap-2 text-xs">{(Object.keys(roleLabels) as Role[]).map((item) => <div key={item} className="grid grid-cols-[1fr_1fr_1fr] gap-2 rounded-lg bg-white px-3 py-2"><strong>{roleLabels[item]}</strong><span>{demoCredentials[item].username}</span><span>{demoCredentials[item].password}</span></div>)}</div>
            </div>
            <div className="mt-7 flex gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-600"><UserPlus className="mt-0.5 h-5 w-5 shrink-0 text-[#004aad]" /><p><strong>Need an account?</strong> Accounts follow the school hierarchy: Super Admin creates schools, School Admin creates teachers, and teachers create student logins.</p></div>
          </section>
        </div>
      </div>
    </div>
  );
}
