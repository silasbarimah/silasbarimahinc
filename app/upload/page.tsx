import ProtectedRoute from "../_ui/ProtectedRoute";
import UploadStudioForm from "../_ui/UploadStudioForm";

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_rgba(2,6,23,0.98))] px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-[0_24px_90px_rgba(15,23,42,0.5)] backdrop-blur sm:p-8 lg:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-amber-300">Studio</p>
            <h1 className="text-4xl font-semibold sm:text-5xl">Share your next feature with the audience.</h1>
            <p className="mt-4 text-lg text-slate-300">
              Creators and artists can publish a new release, project, visual story, or short-form work here and make it visible in the explore feed.
            </p>
          </div>

          <UploadStudioForm />
        </div>
      </main>
    </ProtectedRoute>
  );
}
