"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading, openAuthModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      openAuthModal("signin");
      router.replace("/");
    }
  }, [loading, isAuthenticated, openAuthModal, router]);

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-2xl rounded-[1.5rem] border border-white/10 bg-white/10 p-8 text-center backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Access required</p>
          <h1 className="mt-3 text-3xl font-semibold">Please sign in to continue.</h1>
          <p className="mt-3 text-slate-300">You will be redirected to the home experience shortly.</p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
