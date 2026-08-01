"use client";

import { useMemo, useState } from "react";
import { useAuth } from "./AuthProvider";

type UploadFormState = {
  title: string;
  category: "Music" | "Lyrics" | "Film" | "Poetry" | "Visual" | "Shorts";
  year: string;
  summary: string;
  mood: string;
};

const defaultFormValues: UploadFormState = {
  title: "",
  category: "Music",
  year: new Date().getFullYear().toString(),
  summary: "",
  mood: "",
};

export default function UploadStudioForm() {
  const { user } = useAuth();
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const creatorName = useMemo(() => user?.name ?? "Anonymous creator", [user?.name]);

  const handleChange = (key: keyof UploadFormState, value: string) => {
    setFormValues((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = formValues.title.trim();
    const trimmedSummary = formValues.summary.trim();

    if (!trimmedTitle || !trimmedSummary || !selectedFile) {
      setStatus("Please add a title, summary, and a media file before publishing.");
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", selectedFile);
      uploadFormData.append("title", trimmedTitle);
      uploadFormData.append("creatorName", creatorName);
      uploadFormData.append("category", formValues.category);
      uploadFormData.append("year", formValues.year);
      uploadFormData.append("summary", trimmedSummary);
      uploadFormData.append("mood", formValues.mood.trim() || "Fresh");

      const uploadResponse = await fetch("/api/works/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        const payload = (await uploadResponse.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Unable to upload the file right now.");
      }

      const uploaded = (await uploadResponse.json()) as {
        title: string;
        creatorName: string;
        category: UploadFormState["category"];
        year: string;
        summary: string;
        mood: string;
        mediaUrl: string;
        mediaType: string;
      };

      const saveResponse = await fetch("/api/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorName: uploaded.creatorName,
          title: uploaded.title,
          category: uploaded.category,
          year: uploaded.year,
          summary: uploaded.summary,
          mediaUrl: uploaded.mediaUrl,
          mediaType: uploaded.mediaType,
          mood: uploaded.mood,
        }),
      });

      if (!saveResponse.ok) {
        const payload = (await saveResponse.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Unable to publish the upload metadata.");
      }

      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id ?? "guest",
          type: "upload",
          page: "/upload",
          metadata: { title: trimmedTitle, category: formValues.category },
        }),
      });

      setStatus(`Published “${trimmedTitle}” to the explore feed.`);
      setFormValues(defaultFormValues);
      setSelectedFile(null);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to publish the work right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-200">Work title</span>
            <input
              value={formValues.title}
              onChange={(event) => handleChange("title", event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none ring-0 transition focus:border-amber-300"
              placeholder="e.g. Midnight Transit"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-200">Category</span>
            <select
              value={formValues.category}
              onChange={(event) => handleChange("category", event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-amber-300"
            >
              <option value="Music">Music</option>
              <option value="Lyrics">Lyrics</option>
              <option value="Film">Film</option>
              <option value="Poetry">Poetry</option>
              <option value="Visual">Visual</option>
              <option value="Shorts">Shorts</option>
            </select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-200">Year</span>
            <input
              value={formValues.year}
              onChange={(event) => handleChange("year", event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-amber-300"
              placeholder="2026"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-200">Mood</span>
            <input
              value={formValues.mood}
              onChange={(event) => handleChange("mood", event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-amber-300"
              placeholder="Dreamy, Bold, Intimate"
            />
          </label>

          <label className="space-y-2 text-sm md:col-span-2">
            <span className="font-medium text-slate-200">Upload media file</span>
            <input
              type="file"
              onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-amber-300"
            />
          </label>

          <label className="space-y-2 text-sm md:col-span-2">
            <span className="font-medium text-slate-200">Description</span>
            <textarea
              value={formValues.summary}
              onChange={(event) => handleChange("summary", event.target.value)}
              className="min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-amber-300"
              placeholder="Describe the project, its theme, and why the audience should explore it."
            />
          </label>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Publishing..." : "Publish to Explore"}
          </button>
          <span className="text-sm text-slate-300">Signed in as {creatorName}</span>
        </div>

        {status ? (
          <p className="mt-4 rounded-2xl border border-emerald-300/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
            {status}
          </p>
        ) : null}
      </div>

      <aside className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-slate-200 backdrop-blur sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">Creator guidance</p>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
          <li>• Select a real media file such as audio, video, or image content to publish directly to the site.</li>
          <li>• Add a vivid title, short summary, and an emotional mood to make the discovery experience feel curated.</li>
          <li>• Every submission is stored on the server so the public explore feed can play the uploaded item immediately.</li>
        </ul>
      </aside>
    </form>
  );
}
