"use client";

import { useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import NavbarActions from "./NavbarActions";
import NavbarBrand from "./NavbarBrand";
import NavbarSearch from "./NavbarSearch";
import SidePanel from "./SidePanel";
import { useAuth } from "./AuthProvider";
import { companyApps, siteNavItems } from "./siteContent";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const navRef = useRef<HTMLElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, loading, openAuthModal, logout } = useAuth();

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      return;
    }

    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.id ?? "guest",
        type: "search",
        page: "/search",
        metadata: { query: trimmedQuery },
      }),
    }).catch(() => undefined);

    setMenuOpen(false);
    setIsSearchOpen(false);
    startTransition(() => router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        navRef.current &&
        !navRef.current.contains(target) &&
        menuPanelRef.current &&
        !menuPanelRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full ">
      <div className="mx-auto max-w-7xl px-3 pt-3 pb-2 sm:px-4 lg:px-6">
        <nav
          ref={navRef}
          className="flex flex-col rounded-[1.75rem] border border-slate-200/80 bg-white/80 px-2.5 py-2 shadow-[0_18px_55px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-950/80 sm:px-4 lg:px-6"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <NavbarBrand
            onMenuToggle={() => setMenuOpen((value) => !value)}
            isMenuOpen={menuOpen}
          />

          <div className="hidden items-center gap-1 md:flex">
            {siteNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                    isActive ? "font-bold text-slate-950 dark:text-white" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="flex flex-1 items-center justify-end gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-[0_6px_20px_rgba(15,23,42,0.06)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2" aria-hidden="true">
                <circle cx="11" cy="11" r="6" />
                <path d="m20 20-4.2-4.2" />
              </svg>
            </button>
            <NavbarActions
              onCreate={() => {
                if (!isAuthenticated) {
                  openAuthModal("signin");
                  return;
                }
                router.push("/upload");
              }}
              onNotifications={() => {
                if (!isAuthenticated) {
                  openAuthModal("signin");
                  return;
                }
                router.push("/notifications");
              }}
              onProfile={() => {
                if (!isAuthenticated) {
                  openAuthModal("signin");
                  return;
                }
                router.push("/account");
              }}
              isAuthenticated={isAuthenticated}
              userName={user?.name}
              onSignIn={() => openAuthModal("signin")}
              onSignUp={() => openAuthModal("signup")}
              onLogout={logout}
              isLoading={loading}
            />
          </div>
        </div>

        {isSearchOpen ? (
          <div className="fixed inset-0 z-[90] flex min-h-screen w-full items-start justify-center overflow-hidden bg-white/80 px-4 pt-20 backdrop-blur-3xl dark:bg-slate-950/80">
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-3xl" aria-hidden="true" />
            <div className="relative w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-white/30 bg-white/70 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.24)] backdrop-saturate-150 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Search</p>
                <button
                  type="button"
                  className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
                  aria-label="Close search"
                  onClick={() => setIsSearchOpen(false)}
                >
                  ✕
                </button>
              </div>
              <NavbarSearch
                value={searchQuery}
                onChange={setSearchQuery}
                onSubmit={handleSearchSubmit}
                loading={isPending}
              />
            </div>
          </div>
        ) : null}
      </nav>

      <div ref={menuPanelRef}>
        <SidePanel
          open={menuOpen}
          title={<p className="text-sm font-semibold text-slate-900">More from Silas Barimah Incorporated</p>}
          onClose={() => setMenuOpen(false)}
          closeLabel="Close apps menu"
        >
          <div className="space-y-5">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Apps</p>
              <div className="space-y-2">
                {companyApps.map((app) => (
                  <a
                    key={app.name}
                    href={app.href}
                    className="flex items-center gap-3 rounded-[1rem] border border-slate-200/80 bg-white/80 p-3 transition hover:bg-slate-50"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${app.accent} text-sm font-semibold text-white`}>
                      {app.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{app.name}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Explore</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Music", href: "/explore" },
                  { label: "Video", href: "/shorts" },
                  { label: "Writing", href: "/library" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </SidePanel>
      </div>
    </div>
  </header>
  );
}