import { randomUUID } from "crypto";
import { getDb } from "./db";
import { hashPassword, verifyPassword } from "./user-store";

export type DbUserProfile = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "member" | "admin";
  location: string;
  bio: string;
  profilePhoto: string;
  createdAt: string;
};

export type DbSiteInteraction = {
  id: string;
  userId: string;
  type: "page_view" | "upload" | "playback" | "search" | "save";
  page: string;
  metadata?: string;
  createdAt: string;
};

export function listUsers() {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM users ORDER BY createdAt DESC").all() as DbUserProfile[];
  return rows;
}

export function putUser(user: DbUserProfile) {
  const db = getDb();
  db.prepare(
    `INSERT INTO users (id, name, email, password, role, location, bio, profilePhoto, createdAt)
     VALUES (@id, @name, @email, @password, @role, @location, @bio, @profilePhoto, @createdAt)
     ON CONFLICT(id) DO UPDATE SET
       name = excluded.name,
       email = excluded.email,
       password = excluded.password,
       role = excluded.role,
       location = excluded.location,
       bio = excluded.bio,
       profilePhoto = excluded.profilePhoto,
       createdAt = excluded.createdAt`,
  ).run(user);
}

export function getUserByEmail(email: string) {
  const db = getDb();
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email) as DbUserProfile | undefined;
}

export function createUser(input: Omit<DbUserProfile, "id" | "createdAt"> & { id?: string }) {
  const now = new Date().toISOString();
  const user: DbUserProfile = {
    ...input,
    id: input.id ?? randomUUID(),
    createdAt: now,
    password: hashPassword(input.password),
  };

  putUser(user);
  return user;
}

export function updateUser(input: Omit<DbUserProfile, "createdAt">) {
  const db = getDb();
  db.prepare(
    `UPDATE users
     SET name = @name,
         email = @email,
         password = @password,
         role = @role,
         location = @location,
         bio = @bio,
         profilePhoto = @profilePhoto
     WHERE id = @id`,
  ).run(input);

  return input;
}

export function verifyCredentials(email: string, password: string) {
  const user = getUserByEmail(email);
  if (!user) {
    return null;
  }

  return verifyPassword(password, user.password) ? user : null;
}

export function listInteractions() {
  const db = getDb();
  return db.prepare("SELECT * FROM interactions ORDER BY createdAt DESC").all() as DbSiteInteraction[];
}

export function addInteraction(input: Omit<DbSiteInteraction, "id" | "createdAt">) {
  const db = getDb();
  const interaction: DbSiteInteraction = {
    ...input,
    id: randomUUID(),
    metadata: JSON.stringify(input.metadata ?? {}),
    createdAt: new Date().toISOString(),
  };

  db.prepare(
    `INSERT INTO interactions (id, userId, type, page, metadata, createdAt)
     VALUES (@id, @userId, @type, @page, @metadata, @createdAt)`,
  ).run(interaction);

  return interaction;
}
