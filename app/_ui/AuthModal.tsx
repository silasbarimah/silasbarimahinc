"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

export default function AuthModal() {
  const { isAuthModalOpen, authMode, closeAuthModal, login, signup } = useAuth();
  const [mode, setMode] = useState(authMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMode(authMode);
  }, [authMode]);

  if (!isAuthModalOpen) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (mode === "signup") {
        await signup(name, email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/65 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[1.5rem] border border-white/50 bg-white/90 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.24)]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Authentication</p>
            <h2 className="text-2xl font-semibold text-slate-900">{mode === "signup" ? "Create account" : "Welcome back"}</h2>
          </div>
          <button type="button" className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100" onClick={closeAuthModal}>
            ✕
          </button>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {mode === "signup" ? (
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Name</span>
              <input value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none ring-0" placeholder="Ada Morgan" />
            </label>
          ) : null}

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Email</span>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none ring-0" placeholder="you@example.com" />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Password</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none ring-0" placeholder="At least 6 characters" />
          </label>

          {error ? <p className="rounded-2xl bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p> : null}

          <button type="submit" disabled={isSubmitting} className="w-full rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70">
            {isSubmitting ? "Please wait..." : mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-slate-600">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button type="button" className="font-semibold text-slate-900" onClick={() => setMode("signin")}>Sign in</button>
            </>
          ) : (
            <>
              New here?{" "}
              <button type="button" className="font-semibold text-slate-900" onClick={() => setMode("signup")}>Create account</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
