import { mkdirSync } from "fs";
import path from "path";
import Database from "better-sqlite3";

const databasePath = path.join(process.cwd(), "data", "site.db");
mkdirSync(path.dirname(databasePath), { recursive: true });

const db = new Database(databasePath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    location TEXT NOT NULL,
    bio TEXT NOT NULL,
    profilePhoto TEXT NOT NULL,
    emailVerified INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    expiresAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS interactions (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    type TEXT NOT NULL,
    page TEXT NOT NULL,
    metadata TEXT,
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS verification_tokens (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    createdAt TEXT NOT NULL,
    expiresAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    createdAt TEXT NOT NULL,
    expiresAt TEXT NOT NULL
  );
`);

const userColumns = db.prepare("PRAGMA table_info(users)").all() as Array<{ name: string }>;
if (!userColumns.some((column) => column.name === "emailVerified")) {
  db.exec("ALTER TABLE users ADD COLUMN emailVerified INTEGER NOT NULL DEFAULT 0");
}

export function getDb() {
  return db;
}
