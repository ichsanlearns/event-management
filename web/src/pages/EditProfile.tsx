import { useState } from "react";
import { useNavigate } from "react-router";
import { updateProfile } from "../services/user.service";

export default function EditProfile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [name, setName] = useState(storedUser.name || "");
  const [email, setEmail] = useState(storedUser.email || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateProfile({ name, email });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/profile");
    } catch (err) {
      alert("Gagal update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Edit Profile</h1>

        <input className="w-full border p-3 rounded" placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} />

        <input className="w-full border p-3 rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <button disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded font-bold">
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
