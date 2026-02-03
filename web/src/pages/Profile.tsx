import React, { useEffect, useState } from "react";
import { User, Mail, Shield, Gift, LogOut, Edit } from "lucide-react";
import { useNavigate } from "react-router";
import api from "../lib/api";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  referral_code?: string;
}

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("TOKEN:", localStorage.getItem("token"));

    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        console.log("PROFILE:", res.data);
        setUser(res.data);
      } catch (error: any) {
        console.error("ERROR PROFILE", error.response?.data);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!user) {
    return <p className="p-6">User tidak ditemukan</p>;
  }

  return (
    <main className="min-h-screen bg-slate-50 flex justify-center items-center p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">My Profile</h1>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-lg">
            <User size={36} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{user.name}</p>
            <p className="text-sm text-slate-500">{user.role}</p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
            <Mail className="text-slate-400" size={20} />
            <span className="text-slate-700 font-medium">{user.email}</span>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
            <Shield className="text-slate-400" size={20} />
            <span className="text-slate-700 font-medium">Role: {user.role}</span>
          </div>

          {user.referral_code && (
            <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
              <Gift className="text-indigo-400" size={20} />
              <span className="text-indigo-700 font-semibold">Referral Code: {user.referral_code}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-10 space-y-4">
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold">
            <Edit size={18} />
            Edit Profile
          </button>

          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}

export default Profile;
