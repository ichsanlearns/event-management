import React, { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, Moon, Sun, Apple, Chrome } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";

import { login as loginApi } from "../../services/auth.service";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Email dan password wajib diisi");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Sedang login...");

    try {
      const res = await loginApi(form);

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      toast.success("Login berhasil 🎉", { id: toastId });

      if (res.user.role === "CUSTOMER") {
        navigate("/");
      } else if (res.user.role === "EVENT_ORGANIZER") {
        navigate("/organizer");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login gagal", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex font-sans bg-white dark:bg-[#0f172a] transition-colors duration-300 overflow-hidden">
      {/* SISI KIRI*/}
      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
        <img
          alt="Atmospheric concert"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdusOMQ5-y8KQm5DHpOeVbzsvnJqwKCPz10q8kEJgj9W1cmZZCoHcTVvxW-yD_ccOPgXueBvFa6mp8d1NjhIx9h6TV0HQs8IzZLS81VBZ-iTINyjHPs2yjCla0pUUclLvwVNa-5B-E35EAH-KEdqZZltMEwWDYMuAB2NjAeuEf7ajuzfG0ZzXH606NDDurFUPMqhMJQcufcg4hE_Oi5Xq20rK1XMp3BOxO9CkD_5KTGBbgiyqpcQU3koPQ1jafoNLTb6a5vbhcktIE"
        />
        {/* Overlay Gradient yang halus agar teks terbaca */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/20 via-slate-900/50 to-slate-900/90"></div>

        <div className="relative z-10 flex flex-col justify-between h-full p-16 text-white">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#6366f1] rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <div className="text-white">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                    <path d="M8 14h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 14h.01" />
                  </svg>
                </div>
              </div>
              <span className="text-3xl font-bold tracking-tight">EventFlow</span>
            </div>
          </div>

          <div className="max-w-md">
            <h1 className="text-6xl font-bold leading-[1.1] mb-6">
              Live the music.
              <br />
              Feel the rhythm.
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-10 opacity-90">Join thousands of fans discovering the most exclusive concerts and workshops worldwide.</p>

            {/* Testimonial */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex items-start gap-5 shadow-2xl">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/30 shrink-0">
                <img alt="Alex Rivera" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" className="object-cover w-full h-full" />
              </div>
              <div>
                <p className="text-lg font-medium text-white italic leading-snug">"The easiest way to find and manage my event tickets. Everything is just one tap away."</p>
                <p className="text-sm text-indigo-300 font-semibold mt-3">— Alex Rivera, Music Curator</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-slate-500 font-medium">© 2026 EventFlow Platform. All rights reserved.</div>
        </div>
      </section>

      {/* SISI KANAN: Form Login) */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16 bg-white dark:bg-[#0f172a] overflow-y-auto">
        <div className="w-full max-w-105">
          {/* Logo Mobile saja */}
          <div className="lg:hidden flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-[#6366f1] rounded-xl flex items-center justify-center text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">EventFlow</span>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">Welcome back</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Enter your credentials to access your account.</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all outline-none dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="block w-full pl-12 pr-12 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all outline-none dark:text-white"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#6366f1] transition-colors">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember" type="checkbox" className="h-4 w-4 text-[#6366f1] focus:ring-[#6366f1] border-slate-300 dark:border-slate-600 rounded cursor-pointer dark:bg-slate-800" />
                <label htmlFor="remember" className="ml-2 block text-sm text-slate-600 dark:text-slate-400 cursor-pointer font-medium">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password">
                <a className="text-sm font-bold text-[#6366f1] hover:text-indigo-400 transition-colors">Forgot password?</a>
              </Link>
            </div>

            <button disabled={loading} className="w-full flex justify-center py-4 px-4 rounded-2xl shadow-xl shadow-indigo-500/20 text-base font-bold text-white bg-[#6366f1] hover:bg-indigo-700 transition-all active:scale-[0.98]">
              {loading ? "Loading..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-10 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="px-4 bg-white dark:bg-[#0f172a] text-slate-400">Or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all dark:text-white font-bold text-sm shadow-sm">
              <Chrome size={18} className="text-blue-500" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all dark:text-white font-bold text-sm shadow-sm">
              <Apple size={18} className="fill-current" />
              Apple
            </button>
          </div>

          <p className="mt-12 text-center text-slate-500 dark:text-slate-400 font-medium">
            Don't have an account?
            <Link to="/register">
              <a className="font-bold text-[#6366f1] hover:underline transition-all"> Start for free</a>
            </Link>
          </p>
        </div>
      </section>

      {/* Floating Dark Mode Toggle */}
      <button onClick={toggleDarkMode} className="fixed bottom-8 right-8 p-4 bg-white dark:bg-slate-800 shadow-2xl rounded-full border border-slate-200 dark:border-slate-700 transition-all hover:scale-110 active:scale-90 z-50 group">
        {isDarkMode ? <Sun className="text-yellow-400 group-hover:rotate-45 transition-transform" size={24} /> : <Moon className="text-slate-700 group-hover:-rotate-12 transition-transform" size={24} />}
      </button>
    </main>
  );
}

export default Login;
