"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../_ui/ProtectedRoute";

type ActivityItem = {
  id: string;
  type: string;
  page: string;
  createdAt: string;
};

export default function NotificationsPage() {
  const [items, setItems] = useState<ActivityItem[]>([]);

  useEffect(() => {
    const loadAnalytics = async () => {
      const response = await fetch("/api/analytics");
      const analytics = (await response.json()) as ActivityItem[];
      setItems(analytics);
    };

    loadAnalytics().catch(() => {
      setItems([]);
    });
  }, []);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),_rgba(241,245,249,1))] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6 rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Notifications</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Activity and performance signals for your account.</h1>
            <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">This feed surfaces your recent interactions as the site records page views, uploads, and playback events.</p>
          </div>

          <section className="space-y-3">
            {items.length > 0 ? (
              items.map((item) => (
                <article key={item.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{item.type}</p>
                      <p className="text-sm text-slate-600">Page: {item.page}</p>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{new Date(item.createdAt).toLocaleString()}</span>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
                No account activity has been recorded yet.
              </div>
            )}
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}
