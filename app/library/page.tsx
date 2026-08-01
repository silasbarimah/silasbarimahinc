"use client";

import ProtectedRoute from "../_ui/ProtectedRoute";
import { useAuth } from "../_ui/AuthProvider";

type LibraryEntry = {
  title: string;
  type: string;
  creator: string;
  url: string;
};

export default function LibraryPage() {
  const { user } = useAuth();
  const entries: LibraryEntry[] = user
    ? [
        { title: "Creator Preview", type: "Visual", creator: "Silas Barimah Inc.", url: "/uploads/creator-preview.svg" },
        { title: "Studio Upload Test", type: "Visual", creator: user.name, url: "/api/works" },
      ]
    : [];

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),_rgba(241,245,249,1))] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6 rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Library</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Your saved and recently explored work.</h1>
            <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">This space keeps the content a user has interacted with close to hand.</p>
          </div>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {entries.map((entry) => (
              <article key={`${entry.title}-${entry.creator}`} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{entry.type}</p>
                <h2 className="mt-3 text-xl font-semibold text-slate-950">{entry.title}</h2>
                <p className="mt-1 text-sm text-slate-600">By {entry.creator}</p>
                <a href={entry.url} className="mt-4 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">Open item</a>
              </article>
            ))}
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}
