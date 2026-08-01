"use client";

import ProtectedRoute from "../_ui/ProtectedRoute";
import { useAuth } from "../_ui/AuthProvider";

type AccountProfile = {
  name: string;
  email: string;
  location: string;
  bio: string;
  profilePhoto: string;
  role: string;
};

export default function AccountPage() {
  const { user } = useAuth();
  const profile: AccountProfile | null = user
    ? {
        name: user.name,
        email: user.email,
        location: user.location ?? "Accra, Ghana",
        bio: user.bio ?? "Creative storyteller and audience-first maker.",
        profilePhoto: user.profilePhoto ?? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        role: user.role,
      }
    : null;

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),_rgba(241,245,249,1))] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6 rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Account</p>
              <div className="mt-5 flex items-center gap-4">
                <img src={profile?.profilePhoto} alt={profile?.name ?? "Profile photo"} className="h-20 w-20 rounded-full object-cover ring-4 ring-white/10" />
                <div>
                  <h1 className="text-3xl font-semibold">{profile?.name ?? "Your profile"}</h1>
                  <p className="text-sm text-slate-300">{profile?.email}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-300">{profile?.bio}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Location</p>
                <p className="mt-3 text-lg font-semibold text-slate-950">{profile?.location ?? "Unknown"}</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Role</p>
                <p className="mt-3 text-lg font-semibold text-slate-950">{profile?.role ?? "member"}</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Profile details</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>• Email: {profile?.email}</li>
                  <li>• Privacy: Account data is kept under the current site session and API-backed records.</li>
                  <li>• Activity tracking: page views and uploads are being recorded for analytics review.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}
