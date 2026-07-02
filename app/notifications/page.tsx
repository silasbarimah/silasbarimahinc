import ProtectedRoute from "../_ui/ProtectedRoute";

export default function NotificationsPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-sky-950 via-blue-900 to-slate-900 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-slate-400">Notifications</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Stay updated with what matters.</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            This screen can display activity, updates, and mentions from the community.
          </p>
        </div>
      </main>
    </ProtectedRoute>
  );
}
