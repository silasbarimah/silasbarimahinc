import { footerSections, socialLinks } from "./siteContent";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.7),rgba(248,250,252,0.9))] px-4 py-8 backdrop-blur-2xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.10)] sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white shadow-[0_10px_30px_rgba(2,6,23,0.2)]">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M12 6.5 5.5 17.5h13L12 6.5Zm0 3.3 3.9 6.2H8.1l3.9-6.2Z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight text-slate-900">Silas Barimah Incorporated</p>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">Actively, Evolve.</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Building polished digital experiences with clarity, craft, and calm confidence.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {section.title}
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="transition hover:text-slate-950">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-200/70 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Silas Barimah Incorporated. All rights reserved.</p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-sm font-semibold text-slate-700 shadow-[0_6px_18px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:text-slate-950"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}