import { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft, Check, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  return (
    <main className="bg-[#f7f5f8] dark:bg-[#191022] min-h-screen flex flex-col font-['Spline_Sans'] transition-colors duration-300">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-120 bg-white dark:bg-[#251a33] rounded-4xl shadow-xl border border-[#e0dbe6] dark:border-[#3b2d4a] overflow-hidden">
          <div className="p-8 md:p-10 flex flex-col gap-8">
            {/* Page Heading */}
            <div className="flex flex-col gap-3">
              <h1 className="text-[#141118] dark:text-white text-3xl font-black leading-tight tracking-tight font-display">Set your new password</h1>
              <p className="text-[#75608a] dark:text-[#a692b8] text-base font-normal leading-normal">Choose a strong password to secure your account for future events.</p>
            </div>

            {/* Form Section */}
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              {/* New Password Input */}
              <div className="flex flex-col gap-2">
                <label className="text-[#141118] dark:text-white text-sm font-medium pb-1">New Password</label>
                <div className="flex w-full items-stretch rounded-full border border-[#e0dbe6] dark:border-[#3b2d4a] bg-white dark:bg-[#191022] focus-within:ring-2 focus-within:ring-[#8c25f4]/50 transition-all">
                  <input className="flex w-full rounded-full text-[#141118] dark:text-white bg-transparent h-14 placeholder:text-[#75608a] px-5 text-base outline-none" placeholder="••••••••" type={showPassword ? "text" : "password"} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[#75608a] flex items-center justify-center pr-5 hover:text-[#8c25f4]">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Password Strength Indicator
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <p className="text-[#141118] dark:text-white text-sm font-medium">Password Strength</p>
                  <p className="text-[#8c25f4] text-sm font-bold">Strong</p>
                </div>
                <div className="rounded-full bg-[#e0dbe6] dark:bg-[#3b2d4a] h-2.5 overflow-hidden">
                  <div className="h-full rounded-full bg-[#8c25f4] transition-all duration-500" style={{ width: "75%" }}></div>
                </div>
                <p className="text-[#75608a] dark:text-[#a692b8] text-xs">Great! Your password is secure and ready to use.</p>
              </div> */}

              {/* Confirm Password Input */}
              <div className="flex flex-col gap-2">
                <label className="text-[#141118] dark:text-white text-sm font-medium pb-1">Confirm New Password</label>
                <div className="flex w-full items-stretch rounded-full border border-[#e0dbe6] dark:border-[#3b2d4a] bg-white dark:bg-[#191022] focus-within:ring-2 focus-within:ring-[#8c25f4]/50 transition-all">
                  <input
                    className="flex w-full rounded-full text-[#141118] dark:text-white bg-transparent h-14 placeholder:text-[#75608a] px-5 text-base outline-none"
                    placeholder="••••••••"
                    type={showConfirmPassword ? "text" : "password"}
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-[#75608a] flex items-center justify-center pr-5 hover:text-[#8c25f4]">
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Checklist Requirements */}
              <div className="flex flex-col gap-1 py-2">
                <div className="flex items-center gap-x-3 py-1.5 text-[#8c25f4]">
                  <div className="flex items-center justify-center size-5 rounded-full bg-[#8c25f4] text-white">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <p className="text-sm font-normal">At least 8 characters</p>
                </div>
                <div className="flex items-center gap-x-3 py-1.5 text-[#8c25f4]">
                  <div className="flex items-center justify-center size-5 rounded-full bg-[#8c25f4] text-white">
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <p className="text-sm font-normal">Includes a number</p>
                </div>
                <div className="flex items-center gap-x-3 py-1.5 text-[#75608a] dark:text-[#a692b8]">
                  <div className="size-5 rounded-full border-2 border-[#e0dbe6] dark:border-[#3b2d4a]"></div>
                  <p className="text-sm font-normal">Includes a special character</p>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full h-14 bg-[#8c25f4] hover:bg-[#7a1fd6] text-white font-bold text-base rounded-full shadow-lg shadow-[#8c25f4]/25 transition-all active:scale-[0.98]">Update Password</button>

              {/* Back Link */}
              <div className="flex justify-center pt-2">
                <Link to="/login" className="text-[#75608a] dark:text-[#a692b8] text-sm font-medium hover:text-[#8c25f4] flex items-center gap-1 transition-colors group">
                  <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={18} />
                  Back to login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Dark Mode Toggle */}
      <button onClick={toggleDarkMode} className="fixed bottom-8 right-8 p-3 bg-white dark:bg-gray-800 shadow-2xl rounded-full border border-gray-200 dark:border-gray-700 transition-all hover:scale-110 z-50">
        {isDarkMode ? <Sun className="text-yellow-400" size={24} /> : <Moon className="text-[#8c25f4]" size={24} />}
      </button>
    </main>
  );
}

export default ResetPassword;
