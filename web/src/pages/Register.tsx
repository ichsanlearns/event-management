import React, { useState } from "react";
import { User, Megaphone, Mail, Lock, Eye, Chrome, Apple, Moon, Star } from "lucide-react";
import { Link } from "react-router";

function Register() {
  const [role, setRole] = useState<"attendee" | "organizer">("attendee");

  return (
    <main className="w-screen h-screen flex flex-col md:flex-row overflow-hidden font-sans">
      {/* BAGIAN KIRI: Branding & Testimonial (Hanya muncul di desktop) */}
      <section className="hidden md:flex md:w-1/2 bg-[#6344d4] p-16 flex-col justify-between text-white relative">
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

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="password" placeholder="••••••••" className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-200 focus:border-[#6344d4] outline-none transition-all" />
                <Eye className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-slate-600" size={18} />
              </div>
              <p className="text-[11px] text-slate-400">Must be at least 8 characters long.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Referral Code</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="password" placeholder="••••••••" className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-200 focus:border-[#6344d4] outline-none transition-all" />
                <Eye className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-slate-600" size={18} />
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
        <div className="fixed bottom-6 right-6">
          <button className="p-3 bg-white rounded-full border border-slate-200 shadow-xl hover:scale-110 transition-all">
            <Moon size={20} className="text-slate-600" />
          </button>
        </div>
      </section>
    </main>
  );
}

export default Register;
