import { createHmac, randomUUID, timingSafeEqual } from "crypto";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

export type SessionRecord = {
  id: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
};

const SESSIONS_FILE_PATH = path.join(process.cwd(), "data", "sessions.json");
const SESSION_SECRET = process.env.SESSION_SECRET ?? "silas-barimah-development-secret";
const SESSION_COOKIE_NAME = "silas_session";

async function ensureStore(filePath: string, fallback: unknown) {
  await mkdir(path.dirname(filePath), { recursive: true });

  try {
    await readFile(filePath, "utf8");
  } catch {
    await writeFile(filePath, JSON.stringify(fallback, null, 2), "utf8");
  }
}

export async function readSessions() {
  await ensureStore(SESSIONS_FILE_PATH, [] as SessionRecord[]);
  const file = await readFile(SESSIONS_FILE_PATH, "utf8");
  return JSON.parse(file) as SessionRecord[];
}

export async function writeSessions(items: SessionRecord[]) {
  await ensureStore(SESSIONS_FILE_PATH, [] as SessionRecord[]);
  await writeFile(SESSIONS_FILE_PATH, JSON.stringify(items, null, 2), "utf8");
}

function signValue(value: string) {
  return createHmac("sha256", SESSION_SECRET).update(value).digest("hex");
}

export function createSignedSessionToken(sessionId: string) {
  return `${sessionId}.${signValue(sessionId)}`;
}

export function getSessionCookieName() {
  return SESSION_COOKIE_NAME;
}

export function verifySignedSessionToken(token: string) {
  const [sessionId, signature] = token.split(".");

  if (!sessionId || !signature) {
    return null;
  }

  const expected = signValue(sessionId);
  const provided = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  if (provided.length !== expectedBuffer.length) {
    return null;
  }

  const isValid = timingSafeEqual(provided, expectedBuffer);
  return isValid ? sessionId : null;
}

export async function createSession(userId: string) {
  const sessions = await readSessions();
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString();
  const session: SessionRecord = {
    id: randomUUID(),
    userId,
    createdAt,
    expiresAt,
  };

  await writeSessions([session, ...sessions.filter((item) => item.userId !== userId)]);
  return session;
}

export async function getSessionById(sessionId: string) {
  const sessions = await readSessions();
  return sessions.find((item) => item.id === sessionId && new Date(item.expiresAt).getTime() > Date.now()) ?? null;
}

export async function deleteSessionById(sessionId: string) {
  const sessions = await readSessions();
  await writeSessions(sessions.filter((item) => item.id !== sessionId));
}
