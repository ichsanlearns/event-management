import React, { useState, useEffect } from "react";
import { User, Megaphone, Mail, Lock, Eye, EyeOff, Chrome, Apple, Moon, Star, Gift, Sun } from "lucide-react";
import { Link } from "react-router";

function Register() {
  const [role, setRole] = useState<"attendee" | "organizer">("attendee");

  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  return (
    <main className="w-screen h-screen flex flex-col md:flex-row overflow-hidden font-sans">
      {/* BAGIAN KIRI: Branding & Testimonial (Hanya muncul di desktop) */}
      <section className="hidden md:flex md:w-1/2 bg-[#6344d4] p-16 flex-col justify-between text-white relative">
        <img
          alt="Atmospheric concert"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFY3GLlCxoBJjQdwnCKoaJ38UCBWVd2a6GVXoF6T2DhjhvwY1VbTR6s7rqsecPAIbNsoD5wL1yUdjiKs1R11sbQGB9WqHhs6om3XLcy5FKcwm_jUWv6dQd7bSaW4uHjIC1o9gj90KVzqZOeq3ugd72ccgDoUBVfry9qLuWSyVPPIwSfvu9ABaEI7a1JYhtjZztnWXrxqFJ_97NVqrMEZ9uvaNMAOQkMkV-BXtqyeUrDA0Mz66Y4eUX5NzEuQzpr4FI5O1PXIvw6Hyz"
        />
        <div className="z-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-16">
            <div className="bg-white p-1.5 rounded-lg">
              <div className="w-5 h-5 border-2 border-[#6344d4] rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-[#6344d4] rounded-full"></div>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">EventFlow</span>
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-6 max-w-md">Discover the pulse of your creative city.</h1>
          <p className="text-purple-100 text-lg max-w-sm leading-relaxed opacity-80">Join over 50,000 creators and fans discovering unique concerts, workshops, and high-energy gatherings every day.</p>
        </div>

        {/* Floating Card Testimonial */}
        <div className="z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl max-w-md shadow-2xl">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="italic text-base mb-6 leading-relaxed text-purple-50">"EventFlow changed how I host my photography workshops. The ticketing process is seamless and the community is incredible."</p>
          <div className="flex items-center gap-4">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Sarah" className="w-12 h-12 rounded-full border-2 border-white/30" />
            <div>
              <p className="font-bold text-sm">Sarah Jenkins</p>
              <p className="text-xs text-purple-200">Creative Director</p>
            </div>
          </div>
        </div>

        {/* Elemen Dekoratif Belakang (Opsional) */}
        <div className="absolute top-1/4 -right-20 w-80 h-96 bg-white/5 rounded-[40px] rotate-12 pointer-events-none"></div>
      </section>

      {/* BAGIAN KANAN: Form Pendaftaran */}
      <section className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-6 md:p-12 overflow-y-auto">
        <div className="max-w-105 w-full">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Create your account</h2>
          <p className="text-slate-500 mb-8">Start your journey with us today.</p>

          {/* Toggle Role */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setRole("attendee")}
              className={`flex-1 flex flex-col items-center py-4 px-2 rounded-2xl border-2 transition-all duration-200 ${
                role === "attendee" ? "border-[#6344d4] bg-purple-50 text-[#6344d4]" : "border-slate-100 text-slate-400 hover:bg-slate-50"
              }`}
            >
              <User size={20} className="mb-2" />
              <span className="text-sm font-semibold">Attendee</span>
            </button>
            <button
              onClick={() => setRole("organizer")}
              className={`flex-1 flex flex-col items-center py-4 px-2 rounded-2xl border-2 transition-all duration-200 ${
                role === "organizer" ? "border-[#6344d4] bg-purple-50 text-[#6344d4]" : "border-slate-100 text-slate-400 hover:bg-slate-50"
              }`}
            >
              <Megaphone size={20} className="mb-2" />
              <span className="text-sm font-semibold">Organizer</span>
            </button>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="John Doe" className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-200 focus:border-[#6344d4] outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="email" placeholder="john@example.com" className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-200 focus:border-[#6344d4] outline-none transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="block w-full pl-12 pr-12 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all outline-none dark:text-white"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#6366f1] transition-colors">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Referral Code</label>
              <div className="relative">
                <Gift className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Kode Referral (Opsional)" className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-200 focus:border-[#6344d4] outline-none transition-all" />
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input type="checkbox" id="terms" className="w-4 h-4 rounded border-slate-300 text-[#6344d4] focus:ring-[#6344d4]" />
              <label htmlFor="terms" className="text-xs text-slate-500 leading-tight">
                I agree to the <span className="text-[#6344d4] font-bold cursor-pointer hover:underline">Terms of Service</span> and <span className="text-[#6344d4] font-bold cursor-pointer hover:underline">Privacy Policy</span>
              </label>
            </div>

            <button className="w-full bg-[#6344d4] text-white font-bold py-3.5 rounded-xl hover:bg-[#5236b8] shadow-lg shadow-purple-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              Create Account <span className="text-lg">→</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-slate-400 font-medium tracking-widest">Or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold text-slate-700 text-sm">
              <Chrome size={18} /> Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold text-slate-700 text-sm">
              <Apple size={18} /> Apple
            </button>
          </div>

          <p className="text-center mt-10 text-sm text-slate-500 font-medium">
            Already have an account?{" "}
            <Link to={"/Login"}>
              {" "}
              <span className="text-[#6344d4] font-bold cursor-pointer hover:underline">Log in</span>
            </Link>
          </p>
        </div>

        {/* Dark Mode Floating Button */}
        <button onClick={toggleDarkMode} className="fixed bottom-8 right-8 p-4 bg-white dark:bg-slate-800 shadow-2xl rounded-full border border-slate-200 dark:border-slate-700 transition-all hover:scale-110 active:scale-90 z-50 group">
          {isDarkMode ? <Sun className="text-yellow-400 group-hover:rotate-45 transition-transform" size={24} /> : <Moon className="text-slate-700 group-hover:-rotate-12 transition-transform" size={24} />}
        </button>
      </section>
    </main>
  );
}

export default Register;
