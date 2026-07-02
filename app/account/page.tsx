import ProtectedRoute from "../_ui/ProtectedRoute";

export default function AccountPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-slate-800 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-slate-400">Account</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Manage your profile and preferences.</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            This area can host account settings, subscriptions, and profile details.
          </p>
        </div>
      </main>
    </ProtectedRoute>
  );
}
