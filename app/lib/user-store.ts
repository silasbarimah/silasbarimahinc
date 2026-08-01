import { randomUUID } from "crypto";
import {
  addInteraction,
  createUser,
  getUserByEmail,
  listInteractions,
  listUsers,
  putUser,
  updateUser,
  verifyCredentials,
} from "./db-user-store";
import { hashPassword, verifyPassword } from "./password-utils";

export type UserProfile = {
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

export type SiteInteraction = {
  id: string;
  userId: string;
  type: "page_view" | "upload" | "playback" | "search" | "save";
  page: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: string;
};

const PASSWORD_ITERATIONS = 120_000;

export function readUsers() {
  return listUsers();
}

export function writeUsers(users: UserProfile[]) {
  users.forEach((user) => putUser(user));
}

export function readInteractions() {
  return listInteractions();
}

export function writeInteractions(items: SiteInteraction[]) {
  items.forEach((item) => addInteraction({
    userId: item.userId,
    type: item.type,
    page: item.page,
    metadata: JSON.stringify(item.metadata ?? {}),
  }));
}

export function readUserByEmail(email: string) {
  return getUserByEmail(email);
}

export function authenticateUser(email: string, password: string) {
  return verifyCredentials(email, password);
}

export async function upsertUser(input: Omit<UserProfile, "id" | "createdAt"> & { id?: string }) {
  const users = await readUsers();
  const existing = users.find((item) => item.email === input.email);

  if (existing) {
    const nextUser: UserProfile = {
      ...existing,
      name: input.name,
      location: input.location,
      bio: input.bio,
      profilePhoto: input.profilePhoto,
      password: hashPassword(input.password),
      role: input.role,
    };

    updateUser(nextUser);
    return nextUser;
  }

  const nextUser: UserProfile = {
    ...input,
    password: hashPassword(input.password),
    id: input.id ?? randomUUID(),
    createdAt: new Date().toISOString(),
  };

  createUser(nextUser);
  return nextUser;
}

export async function createInteraction(input: Omit<SiteInteraction, "id" | "createdAt">) {
  const nextInteraction: SiteInteraction = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  addInteraction({
    ...nextInteraction,
    metadata: JSON.stringify(input.metadata ?? {}),
  });

  return nextInteraction;
}

export { hashPassword, verifyPassword };
