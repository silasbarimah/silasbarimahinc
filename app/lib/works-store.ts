import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type StudioUpload = {
  id: string;
  creatorName: string;
  title: string;
  category: "Music" | "Lyrics" | "Film" | "Poetry" | "Visual" | "Shorts";
  year: string;
  summary: string;
  mediaUrl: string;
  mediaType: string;
  mood: string;
  createdAt: string;
};

const WORKS_FILE_PATH = path.join(process.cwd(), "data", "works.json");
const defaultWorks: StudioUpload[] = [];

async function ensureStore() {
  await mkdir(path.dirname(WORKS_FILE_PATH), { recursive: true });

  try {
    await readFile(WORKS_FILE_PATH, "utf8");
  } catch {
    await writeFile(WORKS_FILE_PATH, JSON.stringify(defaultWorks, null, 2), "utf8");
  }
}

export async function getPublishedWorks() {
  await ensureStore();

  const file = await readFile(WORKS_FILE_PATH, "utf8");
  const parsed = JSON.parse(file) as StudioUpload[];

  return [...parsed].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export async function saveUploadedWork(input: Omit<StudioUpload, "id" | "createdAt">) {
  await ensureStore();

  const currentWorks = await getPublishedWorks();
  const nextWork: StudioUpload = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const nextWorks = [nextWork, ...currentWorks];
  await writeFile(WORKS_FILE_PATH, JSON.stringify(nextWorks, null, 2), "utf8");

  return nextWork;
}
