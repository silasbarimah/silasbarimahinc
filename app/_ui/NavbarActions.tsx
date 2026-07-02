"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import MenuSectionList from "./MenuSectionList";

type NavbarActionsProps = {
  onCreate?: () => void;
  onNotifications?: () => void;
  onProfile?: () => void;
  isAuthenticated?: boolean;
  userName?: string;
  onSignIn?: () => void;
  onSignUp?: () => void;
  onLogout?: () => void;
  isLoading?: boolean;
};

type MenuItem = {
  label: string;
  icon: ReactNode;
  description: string;
  iconColor?: string;
  danger?: boolean;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

export default function NavbarActions({
  onCreate,
  onNotifications,
  onProfile,
  isAuthenticated = false,
  userName = "Guest",
  onSignIn,
  onSignUp,
  onLogout,
  isLoading = false,
}: NavbarActionsProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sections: MenuSection[] = [
    {
      title: "Account",
      items: [
        {
          label: "Account",
          icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2" aria-hidden="true">
              <path d="M5 20a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4" />
              <circle cx="12" cy="8" r="3.5" />
            </svg>
          ),
          description: "Manage your account",
          iconColor: "text-sky-600",
        },
        {
          label: "Profile",
          icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2" aria-hidden="true">
              <path d="M4 19a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4" />
              <circle cx="12" cy="8" r="3.5" />
            </svg>
          ),
          description: "Update your profile",
          iconColor: "text-violet-600",
        },
        {
          label: "Support",
          icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2" aria-hidden="true">
              <path d="M7 10a5 5 0 1 1 10 0v1a5 5 0 0 1-5 5h-1" />
              <path d="M9 18v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-2" />
            </svg>
          ),
          description: "Get help and contact us",
          iconColor: "text-emerald-600",
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        { label: "Settings", icon: "⚙", description: "Control your preferences", iconColor: "text-amber-600" },
        { label: "Location", icon: "◎", description: "Set your region", iconColor: "text-rose-600" },
        { label: "Send feedback", icon: "✦", description: "Share your thoughts", iconColor: "text-indigo-600" },
      ],
    },
    {
      title: "More",
      items: [
        { label: "Purchases & membership", icon: "◷", description: "View plans and orders", iconColor: "text-fuchsia-600" },
        { label: "Watch later", icon: "▶", description: "Saved for later", iconColor: "text-cyan-600" },
        { label: "Your channel", icon: "▣", description: "Manage your content", iconColor: "text-lime-600" },
        { label: "Sign out", icon: "→", danger: true, description: "Exit your account", iconColor: "text-rose-600" },
      ],
    },
  ];

  return (
    <div className="relative flex items-center gap-2" ref={menuRef}>
      {isAuthenticated ? (
        <>
          <button
            type="button"
            className="rounded-full bg-white/70 p-2.5 text-gray-700 shadow-[0_6px_20px_rgba(15,23,42,0.06)] transition hover:bg-white"
            aria-label="Create"
            onClick={onCreate}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </button>

          <button
            type="button"
            className="rounded-full bg-white/70 p-2.5 text-gray-700 shadow-[0_6px_20px_rgba(15,23,42,0.06)] transition hover:bg-white"
            aria-label="Notifications"
            onClick={onNotifications}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2" aria-hidden="true">
              <path d="M8 18h8" />
              <path d="M9 18V10a3 3 0 1 1 6 0v8" />
              <path d="M10 5h4" />
            </svg>
          </button>
        </>
      ) : null}

      {!isAuthenticated ? (
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white"
            onClick={onSignIn}
          >
            Sign in
          </button>
          <button
            type="button"
            className="rounded-full bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            onClick={onSignUp}
          >
            Create account
          </button>
        </div>
      ) : null}

      <button
        type="button"
        className="rounded-full p-0.5 transition hover:bg-white/70"
        aria-label="Account"
        aria-expanded={menuOpen}
        onClick={() => {
          if (!isAuthenticated) {
            onSignIn?.();
            return;
          }
          setMenuOpen((value) => !value);
        }}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-purple-600 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(59,130,246,0.25)]">
          {isLoading ? "..." : userName.charAt(0).toUpperCase()}
        </div>
      </button>

      {menuOpen && isAuthenticated ? (
        <div className="fixed right-0 top-0 z-50 flex h-screen w-80 max-w-[90vw] flex-col overflow-hidden rounded-l-[1.5rem] border border-white/50 bg-white/55 p-2 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-2xl">
          <div className="flex items-center gap-3 rounded-[1rem] border border-white/70 bg-white/70 p-3 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-purple-600 text-base font-semibold text-white">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">{userName}</p>
              <p className="truncate text-sm text-slate-500">Signed in</p>
            </div>
          </div>

          <div className="mt-3 flex-1 overflow-y-auto pr-1">
            <MenuSectionList
              sections={sections}
              onItemClick={(item) => {
                setMenuOpen(false);
                if (item.label === "Profile") {
                  onProfile?.();
                }
                if (item.label === "Sign out") {
                  onLogout?.();
                }
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
