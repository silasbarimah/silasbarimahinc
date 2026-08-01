import { notFound } from "next/navigation";
import { artists } from "../../_ui/artistCatalog";

type ArtistPageProps = {
  params: Promise<{
    artist: string;
  }>;
};

export function generateStaticParams() {
  return artists.map((artist) => ({ artist: artist.slug }));
}

export default async function ArtistCataloguePage({ params }: ArtistPageProps) {
  const { artist } = await params;
  const profile = artists.find((item) => item.slug === artist);

  if (!profile) {
    notFound();
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-8 lg:p-10">
        <section className="rounded-[1.75rem] bg-slate-950 px-6 py-8 text-white sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-300">Artist profile</p>
              <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{profile.name}</h1>
              <p className="mt-2 text-lg text-slate-300">{profile.headline}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Focus</p>
              <p className="mt-2 text-base font-semibold">{profile.focus}</p>
              <p className="mt-1 text-sm text-slate-300">{profile.location}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Biography</p>
            <p className="mt-4 text-base leading-8 text-slate-700">{profile.bio}</p>
          </article>

          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Featured work</p>
            <div className={`mt-4 rounded-[1.25rem] bg-gradient-to-br ${profile.accent} p-[1px]`}>
              <div className="rounded-[1.2rem] bg-slate-950 p-4 text-white">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-300">Signature release</p>
                <h2 className="mt-2 text-2xl font-semibold">{profile.featuredProject}</h2>
              </div>
            </div>
          </article>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Catalogue</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950">Curated releases and projects</h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {profile.catalog.map((project) => (
              <article key={`${profile.slug}-${project.title}`} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-600">
                    {project.type}
                  </span>
                  <span className="text-sm text-slate-500">{project.year}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-950">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{project.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                  <span>{project.meter}</span>
                  <span className="font-semibold text-slate-900">Open project</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
