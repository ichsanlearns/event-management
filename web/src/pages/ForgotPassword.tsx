import React, { useState, useEffect } from "react";
import { Mail, ArrowLeft, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  // Handler Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Api
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setSuccessMessage("If the email is registered, a reset password link has been sent.");
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <div className="absolute inset-0 bg-[#8c25f4]/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-linear-to-t from-[#191022]/80 via-transparent to-transparent"></div>
        </div>
      </section>

      {/* SISI KANAN */}
      <section className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 relative">
        <div className="w-full max-w-110">
          <div className="mb-10">
            <h1 className="text-[#141118] dark:text-white text-4xl font-black mb-3">Reset Password</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Enter your email and we'll send you a link to reset your password.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase">Email Address</label>

              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 pl-4 pr-12 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-[#141118] dark:text-white focus:ring-2 focus:ring-[#8c25f4]/20 focus:border-[#8c25f4] outline-none transition-all placeholder:text-gray-400"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Message */}
            {successMessage && <p className="text-green-600 text-sm font-medium">{successMessage}</p>}

            {errorMessage && <p className="text-red-500 text-sm font-medium">{errorMessage}</p>}

            <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl font-bold text-white bg-[#6366f1]">
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="pt-6 flex justify-center">
            <Link to="/login">
              {" "}
              <button className="flex items-center gap-2 font-bold text-[#6366f1] hover:underline transition-all">
                {" "}
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={18} /> Back to Login
              </button>
            </Link>
          </div>
        </div>
      </section>

      <button onClick={toggleDarkMode} className="fixed bottom-8 right-8 p-3 rounded-full">
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </main>
  );
}

export default ForgotPassword;
