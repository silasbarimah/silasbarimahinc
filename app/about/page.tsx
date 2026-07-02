import PageHero from "../_ui/PageHero";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(248,250,252,1))] px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-8 lg:p-10">
        <PageHero
          eyebrow="About"
          title="Silas Barimah Incorporated builds thoughtful digital experiences."
          description="We blend strategy, design, and engineering to create calm, polished products that help teams move with clarity."
        />
      </div>
    </main>
  );
}
