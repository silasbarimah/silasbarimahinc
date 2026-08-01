export type StudioUpload = {
  id: string;
  creatorName: string;
  title: string;
  category: "Music" | "Lyrics" | "Film" | "Poetry" | "Visual" | "Shorts";
  year: string;
  summary: string;
  mediaUrl: string;
  mood: string;
  createdAt: string;
};

export const WORK_STORAGE_KEY = "silasbarimah.uploads";

export const sampleUploads: StudioUpload[] = [
  {
    id: "sample-1",
    creatorName: "Sonia Lune",
    title: "Midnight Transit",
    category: "Music",
    year: "2026",
    summary: "A transportive single shaped by soft percussion and luminous synth textures.",
    mediaUrl: "https://example.com/sonia-lune-midnight-transit",
    mood: "Dreamy",
    createdAt: "2026-08-01T09:00:00.000Z",
  },
  {
    id: "sample-2",
    creatorName: "Mika Ross",
    title: "After the Door Closes",
    category: "Poetry",
    year: "2026",
    summary: "A spoken-word suite about ambition, grief, and reinvention.",
    mediaUrl: "https://example.com/mika-ross-after-the-door-closes",
    mood: "Intimate",
    createdAt: "2026-08-01T09:15:00.000Z",
  },
];

export function getPublishedWorks(): StudioUpload[] {
  const storedUploads = readStoredUploads();

  return [...storedUploads, ...sampleUploads].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export function readStoredUploads(): StudioUpload[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(WORK_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as StudioUpload[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    window.localStorage.removeItem(WORK_STORAGE_KEY);
    return [];
  }
}

export function writeStoredUploads(items: StudioUpload[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(WORK_STORAGE_KEY, JSON.stringify(items));
}
