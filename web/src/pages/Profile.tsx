import { useEffect, useState } from "react";
import { User, Mail, Shield, Gift, LogOut, Camera } from "lucide-react";
import { useNavigate } from "react-router";
import api from "../lib/api";

import type { UserProfile } from "../types/user.type";
import type { UserRewards } from "../types/reward.type";
import type { Order } from "../types/order.type";

/* =======================
   COMPONENT
======================= */
export default function Profile() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");

  const [user, setUser] = useState<UserProfile | null>(
    storedUser ? JSON.parse(storedUser) : null,
  );
  const [userOrders, setUserOrders] = useState<Order[] | null>(null);

  const [rewards, setRewards] = useState<UserRewards | null>(null);
  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [isActive, setIsActive] = useState("finished");

  /* =======================
     FETCH DATA
  ======================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await api.get("/auth/me");

        setUser(profileRes.data);
        localStorage.setItem("user", JSON.stringify(profileRes.data));

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

  useEffect(() => {
    async function getOrdersById() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/orders/customer/${user?.id}?status=${isActive}`,
        );

        const data = await response.json();
        setUserOrders(data.data);
      } catch (error) {}
    }

    getOrdersById();
  }, [user]);

  /* =======================
   UPLOAD IMAGE
======================= */
  const handleUploadImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      setUploading(true);

      const res = await api.put("/user/profile/image", formData);

      setUser((prev) => {
        if (!prev) return prev;

        const updatedUser = {
          ...prev,
          profile_image: res.data.profile_image,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      });

      setImage(null);
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      alert("Upload foto gagal");
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
    <main className="min-w-screen min-h-screen  flex justify-center  bg-slate-500">
      <div className="min-h-screen min-w-[50%]  flex justify-center items-center p-6 gap-10  mt-20">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8 ">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">My Profile</h1>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <label className="cursor-pointer">
                {user.profile_image || image ? (
                  <img
                    key={user.profile_image}
                    src={
                      image ? URL.createObjectURL(image) : user.profile_image
                    }
                    alt="avatar"
                    className="w-20 h-20 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    <User size={36} />
                  </div>
                )}

                <div className="absolute bottom-0 right-0 bg-indigo-600 p-1 rounded-full text-white">
                  <Camera size={14} />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </label>

              {image && (
                <button
                  onClick={handleUploadImage}
                  disabled={uploading}
                  className="mt-2 text-sm text-indigo-600 font-semibold"
                >
                  {uploading ? "Uploading..." : "Save Photo"}
                </button>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
              <User size={20} className="text-slate-400" />
              <span className="text-slate-700 font-medium">{user.name}</span>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
              <Mail size={20} className="text-slate-400" />
              <span className="text-slate-700 font-medium">{user.email}</span>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
              <Shield size={20} className="text-slate-400" />
              <span className="text-slate-700 font-medium">
                Role: {user.role}
              </span>
            </div>

            {user.referral_code && (
              <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
                <Gift size={20} className="text-indigo-400" />
                <span className="text-indigo-700 font-semibold">
                  Referral Code: {user.referral_code}
                </span>
              </div>
            )}
          </div>

          {/* Rewards */}
          {rewards && (
            <div className="mt-8 space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                <p className="text-sm font-semibold text-yellow-700">
                  Total Points
                </p>
                <p className="text-2xl font-bold text-yellow-800">
                  {rewards.total_point.toLocaleString()}
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
                <p className="text-sm font-semibold text-green-700 mb-2">
                  Coupons
                </p>

                {rewards.coupons.length === 0 ? (
                  <p className="text-sm text-slate-500">Belum ada coupon</p>
                ) : (
                  rewards.coupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      className="flex justify-between text-sm text-green-800"
                    >
                      <span>Discount</span>
                      <span className="font-bold">
                        {coupon.amount.toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-10 space-y-4">
            <button
              onClick={() => navigate("/profile/edit")}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold"
            >
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
        <div className="w-full h-full max-w-xl max-h-220 bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-5 p-10">
          {userOrders?.map((order) => (
            <div
              key={order.id}
              className="border border-primary rounded-xl h-100 w-100"
            >
              {order.orderCode}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
