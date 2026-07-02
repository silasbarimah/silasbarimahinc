import PageHero from "../_ui/PageHero";

type SearchPageProps = {
  searchParams?: {
    q?: string;
  };
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = typeof searchParams?.q === "string" ? searchParams.q : "";
  const hasQuery = Boolean(query.trim());
  const normalizedQuery = query.trim();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(248,250,252,1))] px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-8 lg:p-10">
        <PageHero
          eyebrow="Search"
          title={hasQuery ? `Search results for “${normalizedQuery}”` : "Search the site"}
          description={
            hasQuery
              ? "Discover pages, articles, and ideas from across the site that match your query."
              : "Use the navbar search to find profiles, projects, and key content instantly."
          }
        />

        {hasQuery ? (
          <section className="space-y-6">
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-600">Top matches</p>
              <ul className="mt-4 space-y-4">
                {[
                  {
                    title: "Product design and strategy",
                    description: "Explore how Silas Barimah Incorporated crafts polished digital products with clarity and momentum.",
                    href: "/about",
                  },
                  {
                    title: "Open roles and career growth",
                    description: "Learn how our team works, and see what it’s like to join a culture that values craft and collaboration.",
                    href: "/careers",
                  },
                  {
                    title: "Contact the team",
                    description: "Send a message about product direction, design systems, or a new project opportunity.",
                    href: "/contact",
                  },
                ].map((item) => (
                  <li key={item.href} className="rounded-[1.5rem] border border-white/60 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:bg-white">
                    <a href={item.href} className="block">
                      <p className="text-base font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Search tips</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li>Use keywords like “about”, “careers”, or “contact” for fast navigation.</li>
                  <li>Try exact phrases for more precise page matches.</li>
                  <li>Search from any page using the glassy navbar search button.</li>
                </ul>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Results overview</p>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  If we were indexing this site for search, your query would return the most relevant pages, routes, and resources in a single experience.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-8 text-center shadow-sm">
            <p className="text-base font-semibold text-slate-900">No search term provided yet.</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Open the search overlay and submit a query to see the site’s results page in action.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
