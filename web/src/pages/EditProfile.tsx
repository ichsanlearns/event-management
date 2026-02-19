import { useState } from "react";
import { useNavigate } from "react-router";
import { updateProfile } from "../services/user.service";
import api from "../lib/api";
import toast from "react-hot-toast";
import { User, Lock, Settings, Eye, EyeOff, Camera, Loader2 } from "lucide-react";

export default function EditProfile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  // State Data Profile
  const [name, setName] = useState(storedUser.name || "");
  const [email, setEmail] = useState(storedUser.email || "");

  // State Password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State Image Upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(storedUser.profile_image || "");
  const [uploading, setUploading] = useState(false);

  // UI States
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /* =======================
     LOGIC HANDLERS
  ======================= */

  // Handle Preview Gambar
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle Upload Foto
  const uploadImageAction = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setUploading(true);
      const res = await api.put("/user/profile/image", formData);
      return res.data.profile_image;
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      toast.error("Gagal mengunggah foto profil");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi Password jika diisi
    if (newPassword || confirmPassword || oldPassword) {
      if (!oldPassword || !newPassword || !confirmPassword) {
        toast.error("Lengkapi semua field password");
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error("Konfirmasi password tidak sama");
        return;
      }
    }

    setLoading(true);
    const toastId = toast.loading("Menyimpan perubahan...");

    try {
      let finalImageUrl = storedUser.profile_image;
      if (imageFile) {
        const uploadedUrl = await uploadImageAction();
        if (uploadedUrl) finalImageUrl = uploadedUrl;
      }

      const payload: any = { name, email };
      if (oldPassword && newPassword && confirmPassword) {
        payload.oldPassword = oldPassword;
        payload.newPassword = newPassword;
        payload.confirmPassword = confirmPassword;
      }

      const res = await updateProfile(payload);

      const updatedUser = {
        ...res.data.user,
        profile_image: finalImageUrl,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile berhasil diperbarui", { id: toastId });
      navigate("/profile");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal update profile", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  dark:bg-[#0f172a] flex items-center justify-center p-4 md:p-8  bg-slate-500">
      <div className="max-w-2xl w-full mt-10 mb-10 bg-white dark:bg-slate-900 rounded-[1.25rem]  dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
        {/* HEADER */}
        <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Profil</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Kelola informasi akun dan keamanan Anda.</p>
          </div>
          <button type="button" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
            <Settings size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-10">
          {/* FOTO PROFIL SECTION */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-md overflow-hidden">
                {previewUrl ? <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" /> : <User className="text-slate-400" size={40} />}
                {uploading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Loader2 className="text-white animate-spin" size={24} />
                  </div>
                )}
              </div>
              <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg">
                <Camera size={14} />
                <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-slate-900 dark:text-white">Foto Profil</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">PNG, JPG atau GIF. Maksimal 2MB.</p>
              <div className="mt-3 flex gap-2 justify-center md:justify-start">
                <label htmlFor="photo-upload" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 cursor-pointer">
                  Ganti Foto
                </label>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setPreviewUrl("");
                  }}
                  className="text-sm font-medium text-red-500 hover:text-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* INFORMASI DASAR */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <User className="text-indigo-600" size={20} />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Informasi Dasar</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Nama Lengkap</label>
                <input
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Alamat Email</label>
                <input
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </section>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* KEAMANAN */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Lock className="text-indigo-600" size={20} />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Keamanan</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Kata Sandi Lama</label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Masukkan kata sandi lama"
                  />
                  <button type="button" onClick={() => setShowOldPassword(!showOldPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Password Baru</label>
                  <input
                    type="password"
                    placeholder="Min. 8 karakter"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Konfirmasi Password</label>
                  <input
                    type="password"
                    placeholder="Ulangi password baru"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ACTIONS */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-end">
            <button type="button" onClick={() => navigate("/profile")} className="w-full sm:w-auto px-8 py-3 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
              Batalkan
            </button>
            <button
              disabled={loading || uploading}
              className="w-full sm:w-auto px-10 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transform active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
