type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export default function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">{eyebrow}</p>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{title}</h1>
      <p className="max-w-2xl text-lg text-gray-600">{description}</p>
      {children}
    </section>
  );
}
