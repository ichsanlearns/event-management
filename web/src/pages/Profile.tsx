import { useEffect, useState } from "react";
import { User, Mail, Shield, Gift, LogOut, Camera } from "lucide-react";
import { useNavigate } from "react-router";
import api from "../lib/api";

/* =======================
   INTERFACES
======================= */
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  referral_code?: string;
  profile_image?: string;
}

interface Point {
  id: string;
  amount: number;
  expired_at: string;
}

interface Coupon {
  id: string;
  amount: number;
  expired_at: string;
}

interface UserRewards {
  total_point: number;
  points: Point[];
  coupons: Coupon[];
}

/* =======================
   COMPONENT
======================= */
export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [rewards, setRewards] = useState<UserRewards | null>(null);
  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  /* =======================
     FETCH DATA
  ======================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await api.get("/auth/me");
        setUser(profileRes.data);

        const rewardsRes = await api.get("/user/rewards");
        setRewards(rewardsRes.data);
      } catch (error) {
        console.error("PROFILE ERROR:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =======================
   UPLOAD IMAGE
======================= */
  const handleUploadImage = async () => {
    if (!image || !user) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      setUploading(true);

      const res = await api.put(
        "/user/profile/image",
        formData,
        // ❌ JANGAN SET HEADER
      );

      // ✅ backend kirim: { image: "/uploads/profile/xxx.jpg" }
      setUser({ ...user, profile_image: res.data.image });
      setImage(null);
    } catch (error: any) {
      console.error("UPLOAD ERROR:", error.response?.data || error);
    } finally {
      setUploading(false);
    }
  };

  /* =======================
     LOGOUT
  ======================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  /* =======================
     STATES
  ======================= */
  if (loading) return <p className="p-6">Loading...</p>;
  if (!user) return <p className="p-6">User tidak ditemukan</p>;

  /* =======================
     UI
  ======================= */
  return (
    <main className="min-h-screen bg-slate-50 flex justify-center items-center p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">My Profile</h1>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-10">
          <div className="relative">
            <label className="cursor-pointer">
              {user.profile_image ? (
                <img src={user.profile_image} alt="avatar" className="w-20 h-20 rounded-full object-cover border" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                  <User size={36} />
                </div>
              )}

              <div className="absolute bottom-0 right-0 bg-indigo-600 p-1 rounded-full text-white">
                <Camera size={14} />
              </div>

              <input type="file" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files?.[0] || null)} />
            </label>
          </div>

          <div>
            <p className="text-2xl font-bold text-slate-800">{user.name}</p>
            <p className="text-sm text-slate-500">{user.role}</p>

            {image && (
              <button onClick={handleUploadImage} disabled={uploading} className="mt-2 text-sm text-indigo-600 font-semibold">
                {uploading ? "Uploading..." : "Save Photo"}
              </button>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
            <Mail size={20} className="text-slate-400" />
            <span className="text-slate-700 font-medium">{user.email}</span>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
            <Shield size={20} className="text-slate-400" />
            <span className="text-slate-700 font-medium">Role: {user.role}</span>
          </div>

          {user.referral_code && (
            <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
              <Gift size={20} className="text-indigo-400" />
              <span className="text-indigo-700 font-semibold">Referral Code: {user.referral_code}</span>
            </div>
          )}
        </div>

        {/* Rewards */}
        {rewards && (
          <div className="mt-8 space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
              <p className="text-sm font-semibold text-yellow-700">Total Points</p>
              <p className="text-2xl font-bold text-yellow-800">{rewards.total_point.toLocaleString()}</p>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
              <p className="text-sm font-semibold text-green-700 mb-2">Coupons</p>

              {rewards.coupons.length === 0 ? (
                <p className="text-sm text-slate-500">Belum ada coupon</p>
              ) : (
                rewards.coupons.map((coupon) => (
                  <div key={coupon.id} className="flex justify-between text-sm text-green-800">
                    <span>Discount</span>
                    <span className="font-bold">{coupon.amount.toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-10 space-y-4">
          <button onClick={() => navigate("/profile/edit")} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold">
            Edit Profile
          </button>

          <button onClick={handleLogout} className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold flex items-center justify-center gap-2">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
