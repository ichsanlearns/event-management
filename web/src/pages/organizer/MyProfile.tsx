import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { UserProfile } from "../../types/user.type";
import type { UserRewards } from "../../types/reward.type";
import api from "../../lib/api";
import toast from "react-hot-toast";

function MyProfile() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");

  const [user, setUser] = useState<UserProfile | null>(
    storedUser ? JSON.parse(storedUser) : null,
  );

  const [rewards, setRewards] = useState<UserRewards | null>(null);
  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState<File | null>(null);
  // const [uploading, setUploading] = useState(false);

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
      } catch (error: any) {
        console.error("PROFILE ERROR:", error);
        toast.error(error.response.data.message);
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
  // const handleUploadImage = async () => {
  //   if (!image) return;

  //   const formData = new FormData();
  //   formData.append("image", image);

  //   try {
  //     setUploading(true);
  //     toast.loading("Uploading profile image...");

  //     const res = await api.put("/user/profile/image", formData);

  //     toast.dismiss();
  //     toast.success("Successfully uploaded profile image...");

  //     setUser((prev) => {
  //       if (!prev) return prev;

  //       const updatedUser = {
  //         ...prev,
  //         profile_image: res.data.profile_image,
  //       };

  //       localStorage.setItem("user", JSON.stringify(updatedUser));
  //       return updatedUser;
  //     });

  //     setImage(null);
  //   } catch (error: any) {
  //     console.error("UPLOAD ERROR:", error);
  //     toast.error(error.response.data.message);
  //     alert("Upload foto gagal");
  //   } finally {
  //     setUploading(false);
  //   }
  // };
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
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <section className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative">
            <div className="w-32 h-32 rounded-2xl bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-xl overflow-hidden">
              <img
                alt="Alex Rivers"
                className="w-full h-full object-cover"
                data-alt="Alex Rivers professional avatar profile picture"
                src={user.profile_image}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900"></div>
          </div>
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">{user.name}</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 w-fit mx-auto md:mx-0">
                {user.role.split("_").join(" ")}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">
                  location_on
                </span>
                <span className="text-sm">San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">
                  calendar_month
                </span>
                <span className="text-sm">Joined 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">
                  verified
                </span>
                <span className="text-sm">Verified Member</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/organizer/profile/edit")}
              className="px-10 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
            >
              Edit Profile
            </button>
            {/* <button className="px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <span className="material-symbols-outlined">more_horiz</span>
            </button> */}
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg">Account Information</h3>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Email Address
                  </p>
                  <p className="text-sm font-medium mt-0.5">{user.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined">
                    shield_person
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Account Role
                  </p>
                  <p className="text-sm font-medium mt-0.5">{user.role}</p>
                </div>
              </div>
              {/* <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined">database</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Data Region
                  </p>
                  <p className="text-sm font-medium mt-0.5">
                    US-WEST-2 (Oregon)
                  </p>
                </div>
              </div> */}
              {/* <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined">history</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Last Login
                  </p>
                  <p className="text-sm font-medium mt-0.5">
                    Today at 10:24 AM
                  </p>
                </div>
              </div> */}
            </div>
          </section>
          <section className="space-y-4">
            <h3 className="font-bold text-lg px-2">Rewards &amp; Points</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-linear-to-br from-primary to-orange-600 rounded-xl p-6 text-white shadow-lg shadow-primary/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-4 -translate-y-4 group-hover:translate-x-2 transition-transform">
                  <span className="material-symbols-outlined text-[100px]">
                    stars
                  </span>
                </div>
                <p className="text-primary bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest w-fit mb-4">
                  Loyalty Balance
                </p>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-4xl font-bold">
                    {rewards?.total_point}
                  </span>
                  <span className="text-sm opacity-80 font-medium">Points</span>
                </div>
                <p className="text-sm opacity-80 mt-2">
                  Next tier unlock at 15,000 pts
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="mt-6 w-full py-2 bg-white text-primary rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors"
                >
                  Redeem Rewards
                </button>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined">
                      confirmation_number
                    </span>
                  </div>
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded">
                    3 Active
                  </span>
                </div>
                <div className="mt-4">
                  <h4 className="text-xl font-bold">Coupons</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Available discount codes for your next event.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <a
                    className="text-primary text-sm font-bold flex items-center gap-2 hover:underline"
                    href="#"
                  >
                    View Coupons
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="space-y-8">
          <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-4">Referral System</h3>
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-primary">
                  campaign
                </span>
                <span className="text-sm font-bold">Refer a friend</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Give 20% off to a friend and get 5,000 points when they host
                their first event.
              </p>
              <div className="mt-4 relative group">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-3 px-4 flex items-center justify-between">
                  <span className="font-mono text-sm font-bold tracking-wider text-slate-900 dark:text-slate-100 uppercase">
                    ALEXRIVERS-PRO24
                  </span>
                  <button className="text-primary hover:text-primary/80">
                    <span className="material-symbols-outlined text-[20px]">
                      content_copy
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Total Referrals
                </span>
                <span className="font-bold">14</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <p className="text-[10px] text-slate-400 text-center">
                3 more referrals to reach Platinum Level
              </p>
            </div>
          </section>
          <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => navigate("/profile/edit")}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
              >
                <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    lock
                  </span>
                </div>
                <span className="text-sm font-semibold">Change Password</span>
              </button>
              {/* <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    notifications_active
                  </span>
                </div>
                <span className="text-sm font-semibold">
                  Manage Notifications
                </span>
              </button> */}
              <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    contact_support
                  </span>
                </div>
                <span className="text-sm font-semibold">Support Center</span>
              </button>
              <button
                onClick={handleLogout}
                className="mt-4 w-full flex items-center justify-center gap-2 p-3 text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  logout
                </span>
                Log Out
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
