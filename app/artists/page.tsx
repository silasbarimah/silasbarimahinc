import Link from "next/link";
import { artists, curatedCollections } from "../_ui/artistCatalog";

export default function ArtistsPage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-8 lg:p-10">
        <section className="grid gap-6 rounded-[1.75rem] bg-slate-950 px-6 py-8 text-white sm:px-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.32em] text-slate-300">Artists</p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              A catalogue-first space for creators to share their work.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              Music, lyrics, films, poems, and visual stories all live in one polished discovery experience—made to feel closer to Apple Music, but with richer artist identity and community depth.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Now spotlighting</p>
            <div className="mt-3 space-y-3">
              {artists.slice(0, 3).map((artist) => (
                <div key={artist.slug} className="rounded-2xl bg-white/6 p-3">
                  <p className="text-base font-semibold">{artist.name}</p>
                  <p className="text-sm text-slate-300">{artist.featuredProject}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {curatedCollections.map((collection) => (
            <article key={collection.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Collection</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">{collection.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{collection.description}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {artists.map((artist) => (
            <article key={artist.slug} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">{artist.location}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">{artist.name}</h2>
                  <p className="mt-1 text-sm text-slate-600">{artist.focus}</p>
                </div>
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${artist.accent} text-lg font-semibold text-white`}>
                  {artist.name.slice(0, 2).toUpperCase()}
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-700">{artist.bio}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {artist.catalog.slice(0, 3).map((project) => (
                  <span key={`${artist.slug}-${project.title}`} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                    {project.type}
                  </span>
                ))}
              </div>

              <Link href={`/artists/${artist.slug}`} className="mt-6 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                View catalogue
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
