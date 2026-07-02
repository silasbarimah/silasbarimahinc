import ProtectedRoute from "../_ui/ProtectedRoute";

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-amber-950 via-orange-900 to-slate-900 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-slate-400">Upload</p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Share your next great upload.</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            A production-ready upload flow can live here with drag-and-drop and metadata fields.
          </p>
        </div>
      </main>
    </ProtectedRoute>
  );
}
