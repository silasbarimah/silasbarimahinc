"use client";

import { useEffect, useMemo, useState } from "react";

type StudioUpload = {
  id: string;
  creatorName: string;
  title: string;
  category: "Music" | "Lyrics" | "Film" | "Poetry" | "Visual" | "Shorts";
  year: string;
  summary: string;
  mediaUrl: string;
  mediaType: string;
  mood: string;
  createdAt: string;
};

export default function ExplorePage() {
  const [uploads, setUploads] = useState<StudioUpload[]>([]);

  useEffect(() => {
    const loadWorks = async () => {
      const response = await fetch("/api/works");
      const nextUploads = (await response.json()) as StudioUpload[];
      setUploads(nextUploads);
    };

    loadWorks().catch(() => {
      setUploads([]);
    });

    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "guest",
        type: "page_view",
        page: "/explore",
        metadata: { view: "explore_feed" },
      }),
    }).catch(() => undefined);
  }, []);

  const featuredUpload = uploads[0];
  const secondaryUploads = uploads.slice(1);

  const collectionStats = useMemo(() => {
    return {
      total: uploads.length,
      featuredCategory: featuredUpload?.category ?? "Studio",
    };
  }, [featuredUpload, uploads.length]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),_rgba(241,245,249,1))] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6 rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-8 lg:p-10">
        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Explore</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Discover what creators are publishing right now.</h1>
            <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
              The newest uploads appear here for the audience to track, discover, and revisit.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{collectionStats.total} live uploads</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Featured: {collectionStats.featuredCategory}</span>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Spotlight</p>
            {featuredUpload ? (
              <div className="mt-4 space-y-3">
                <p className="text-lg font-semibold text-slate-950">{featuredUpload.title}</p>
                <p className="text-sm text-slate-600">By {featuredUpload.creatorName}</p>
                <p className="text-sm leading-6 text-slate-700">{featuredUpload.summary}</p>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                  <span className="rounded-full bg-slate-100 px-3 py-1">{featuredUpload.category}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">{featuredUpload.mood}</span>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">No uploads yet. Signed-in creators can publish from the Studio page.</p>
            )}
          </aside>
        </section>

        <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {secondaryUploads.length > 0 ? (
            secondaryUploads.map((upload) => (
              <article key={upload.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{upload.category}</span>
                  <span className="text-xs font-semibold text-slate-500">{upload.year}</span>
                </div>
                <p className="mt-4 text-xl font-semibold text-slate-950">{upload.title}</p>
                <p className="mt-1 text-sm text-slate-600">{upload.creatorName}</p>
                <p className="mt-3 text-sm leading-6 text-slate-700">{upload.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                  <span className="rounded-full border border-slate-200 px-3 py-1">{upload.mood}</span>
                  <span className="rounded-full border border-slate-200 px-3 py-1">{upload.createdAt.slice(0, 10)}</span>
                </div>

                {upload.mediaType.startsWith("video/") ? (
                  <video controls className="mt-5 w-full rounded-2xl border border-slate-200 bg-slate-950">
                    <source src={upload.mediaUrl} type={upload.mediaType} />
                  </video>
                ) : upload.mediaType.startsWith("audio/") ? (
                  <audio controls className="mt-5 w-full">
                    <source src={upload.mediaUrl} type={upload.mediaType} />
                  </audio>
                ) : upload.mediaType.startsWith("image/") ? (
                  <img src={upload.mediaUrl} alt={upload.title} className="mt-5 w-full rounded-2xl border border-slate-200 object-cover" />
                ) : (
                  <a
                    href={upload.mediaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Open work
                  </a>
                )}
              </article>
            ))
          ) : (
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm lg:col-span-2 xl:col-span-3">
              No public work is live yet. Use the Studio page to publish the first upload.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
