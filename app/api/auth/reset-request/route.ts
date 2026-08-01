import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getDb } from "../../../lib/db";
import { readUsers } from "../../../lib/user-store";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { email?: string };
    if (!payload.email?.trim()) {
      return NextResponse.json({ error: "An email is required to request a password reset." }, { status: 400 });
    }

    const users = await readUsers();
    const user = users.find((item) => item.email === payload.email.trim().toLowerCase());
    if (!user) {
      return NextResponse.json({ error: "No account exists for this email." }, { status: 404 });
    }

    const token = randomUUID();
    const db = getDb();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60).toISOString();

    db.prepare(
      `INSERT INTO password_reset_tokens (id, userId, token, createdAt, expiresAt)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(token) DO UPDATE SET
         userId = excluded.userId,
         createdAt = excluded.createdAt,
         expiresAt = excluded.expiresAt`,
    ).run(randomUUID(), user.id, token, new Date().toISOString(), expiresAt);

    return NextResponse.json({ token, email: user.email, expiresAt }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to start the password reset flow." }, { status: 500 });
  }
}
