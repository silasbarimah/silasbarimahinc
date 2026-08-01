import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getDb } from "../../../lib/db";
import { readUsers, upsertUser } from "../../../lib/user-store";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { email?: string; token?: string; password?: string };

    if (!payload.email?.trim() || !payload.token?.trim() || !payload.password || payload.password.length < 6) {
      return NextResponse.json({ error: "Please provide an email, a reset token, and a new password with at least 6 characters." }, { status: 400 });
    }

    const db = getDb();
    const tokenRow = db.prepare("SELECT * FROM password_reset_tokens WHERE token = ?").get(payload.token.trim()) as { userId?: string; expiresAt?: string } | undefined;

    if (!tokenRow || !tokenRow.userId || !tokenRow.expiresAt || new Date(tokenRow.expiresAt).getTime() < Date.now()) {
      return NextResponse.json({ error: "This reset token is invalid or expired." }, { status: 401 });
    }

    const users = await readUsers();
    const user = users.find((item) => item.email === payload.email.trim().toLowerCase());
    if (!user || user.id !== tokenRow.userId) {
      return NextResponse.json({ error: "The reset token does not match the provided account." }, { status: 401 });
    }

    const updatedUser = await upsertUser({
      id: user.id,
      name: user.name,
      email: user.email,
      password: payload.password,
      role: user.role,
      location: user.location,
      bio: user.bio,
      profilePhoto: user.profilePhoto,
      createdAt: user.createdAt,
    });

    db.prepare("DELETE FROM password_reset_tokens WHERE token = ?").run(payload.token.trim());

    return NextResponse.json(updatedUser, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to reset the password right now." }, { status: 500 });
  }
}
