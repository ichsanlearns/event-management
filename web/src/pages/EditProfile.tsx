import { useState } from "react";
import { useNavigate } from "react-router";
import { updateProfile } from "../services/user.service";
import toast from "react-hot-toast";

export default function EditProfile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [name, setName] = useState(storedUser.name || "");
  const [email, setEmail] = useState(storedUser.email || "");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: any = {
        name,
        email,
      };

      // 👉 HANYA kirim password kalau user isi
      if (oldPassword && newPassword && confirmPassword) {
        payload.oldPassword = oldPassword;
        payload.newPassword = newPassword;
        payload.confirmPassword = confirmPassword;
      }

      const res = await updateProfile(payload);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/profile");
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Edit Profile</h1>

        {/* PROFILE */}
        <input className="w-full border p-3 rounded" placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} />

        <input className="w-full border p-3 rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        {/* CHANGE PASSWORD */}
        <hr className="my-4" />

        <h2 className="font-semibold">Ganti Password (Opsional)</h2>

        <input type="password" placeholder="Password Lama" className="w-full border p-3 rounded" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />

        <input type="password" placeholder="Password Baru" className="w-full border p-3 rounded" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

        <input type="password" placeholder="Konfirmasi Password Baru" className="w-full border p-3 rounded" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <button disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded font-bold">
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
