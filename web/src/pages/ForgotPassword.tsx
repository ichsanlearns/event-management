import React, { useState, useEffect } from "react";
import { Mail, ArrowLeft, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Inisialisasi Tema
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset link requested for:", email);
  };

  return (
    <main className="flex min-h-screen font-['Spline_Sans'] bg-white dark:bg-[#191022] transition-colors duration-300 overflow-hidden">
      {/* sisi kiri */}
      <section className="hidden lg:block lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAAeYCgr772xqsuHO_MJvf1bnFaB4tsNa7QJPcWddgDfqZ8EvdkcT-6sHJlVSmkLc_WrLi6RFyfy7Jkc-BtjJyoZ3uJyGhwkx8TTmcXPlInSWxGg31gg4ciX4-gKPK73RnRl1xK_zt7A4efjB2DiKHiYRFQPzVtO4edI3O4vtulc2h9h50_cJsofkm7HhG4BvN9xgHXAMws_CF0VcsOVgUCRYQ4VvwIl16ghiTECOuWFa_t9l3Ad2QWaEOYuOIY853yYrDQsaGvN5Hz')`,
          }}
        >
          {/* Overlay agar teks tetap terbaca */}
          <div className="absolute inset-0 bg-[#8c25f4]/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-linear-to-t from-[#191022]/80 via-transparent to-transparent"></div>
        </div>

        <div className="absolute bottom-16 left-16 max-w-md text-white z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-8 text-white">
              <svg fill="currentColor" viewBox="0 0 48 48">
                <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"></path>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">EventHub</span>
          </div>
          <h3 className="text-4xl font-bold mb-4 leading-tight">Discover your next passion.</h3>
          <p className="text-lg text-gray-200">Join thousands of creatives in workshops and concerts happening daily across the globe.</p>
        </div>
      </section>

      {/* SISI KANAN: Reset Password Form */}
      <section className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 relative">
        <div className="w-full max-w-110">
          <div className="mb-10">
            <h1 className="text-[#141118] dark:text-white text-4xl font-black leading-tight tracking-tight mb-3">Reset Password</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Enter your email and we'll send you a link to reset your password.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[#141118] dark:text-white text-sm font-bold uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full h-14 pl-4 pr-12 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-[#141118] dark:text-white focus:ring-2 focus:ring-[#8c25f4]/20 focus:border-[#8c25f4] outline-none transition-all placeholder:text-gray-400"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <button type="submit" className="w-full flex justify-center py-4 px-4 rounded-2xl shadow-xl shadow-indigo-500/20 text-base font-bold text-white bg-[#6366f1] hover:bg-indigo-700 transition-all active:scale-[0.98]">
              Send Reset Link
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-center">
            <Link to="/login">
              <button className="flex items-center gap-2 font-bold text-[#6366f1] hover:underline transition-all">
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={18} />
                Back to Login
              </button>
            </Link>
          </div>
        </div>

        {/* Footer Legal (Opsional, diletakkan di bawah form) */}
        <div className="absolute bottom-8 flex gap-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
          <a href="#" className="hover:text-[#8c25f4]">
            Privacy
          </a>
          <a href="#" className="hover:text-[#8c25f4]">
            Terms
          </a>
          <a href="#" className="hover:text-[#8c25f4]">
            Help
          </a>
        </div>
      </section>

      {/* Floating Theme Toggle */}
      <button onClick={toggleDarkMode} className="fixed bottom-8 right-8 p-3 bg-white dark:bg-gray-800 shadow-2xl rounded-full border border-gray-200 dark:border-gray-800 transition-all hover:scale-110 z-50">
        {isDarkMode ? <Sun className="text-yellow-400" size={24} /> : <Moon className="text-[#8c25f4]" size={24} />}
      </button>
    </main>
  );
}

export default ForgotPassword;
