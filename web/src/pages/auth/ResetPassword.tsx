import { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/auth.service";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Reset token tidak ditemukan atau tidak valid");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) return;

    if (newPassword !== confirmPassword) {
      setError("Password dan konfirmasi tidak sama");
      return;
    }

    try {
      setLoading(true);

      await resetPassword({
        token,
        newPassword,
        confirmPassword,
      });

      setSuccess("Password berhasil direset. Silakan login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Reset password gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#f7f5f8] dark:bg-[#191022] min-h-screen flex flex-col font-['Spline_Sans'] transition-colors duration-300">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-120 bg-white dark:bg-[#251a33] rounded-4xl shadow-xl border border-[#e0dbe6] dark:border-[#3b2d4a] overflow-hidden">
          <div className="p-8 md:p-10 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h1 className="text-[#141118] dark:text-white text-3xl font-black">Set your new password</h1>
              <p className="text-[#75608a] dark:text-[#a692b8]">Choose a strong password to secure your account.</p>
            </div>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {/* New Password */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">New Password</label>
                <div className="flex rounded-full border px-5 h-14 items-center">
                  <input type={showPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="flex-1 bg-transparent outline-none" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <div className="flex rounded-full border px-5 h-14 items-center">
                  <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="flex-1 bg-transparent outline-none" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}

              <button disabled={loading} className="w-full h-14 bg-[#8c25f4] text-white rounded-full font-bold">
                {loading ? "Updating..." : "Update Password"}
              </button>

              <div className="flex justify-center">
                <Link to="/login" className="flex items-center gap-1 text-sm">
                  <ArrowLeft size={18} /> Back to login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <button onClick={toggleDarkMode} className="fixed bottom-8 right-8 p-3 rounded-full">
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button> */}
    </main>
  );
}

export default ResetPassword;
