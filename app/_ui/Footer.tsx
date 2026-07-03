import { footerSections, socialLinks } from "./siteContent";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/50 px-4 py-8 backdrop-blur-2xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.10)] sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <div className="flex flex-col">
              <img src={"/logo.png"} 
                width={200}
              />
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">Actively, Evolve.</p>
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