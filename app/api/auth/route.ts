import { NextResponse } from "next/server";
import { createSession, createSignedSessionToken, getSessionCookieName } from "../../lib/session-store";
import { readUsers, upsertUser, verifyPassword } from "../../lib/user-store";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
      location?: string;
      bio?: string;
      profilePhoto?: string;
      role?: "member" | "admin";
    };

    if (!payload.email?.trim() || !payload.password || payload.password.length < 6) {
      return NextResponse.json({ error: "Please provide a valid email and a password with at least 6 characters." }, { status: 400 });
    }

    const users = await readUsers();
    const normalizedEmail = payload.email.trim().toLowerCase();
    const existing = users.find((item) => item.email === normalizedEmail);

    if (!payload.name?.trim()) {
      if (!existing) {
        return NextResponse.json({ error: "No account found. Please create one first." }, { status: 404 });
      }

      if (!verifyPassword(payload.password, existing.password)) {
        return NextResponse.json({ error: "The password you entered is incorrect." }, { status: 401 });
      }

      const session = await createSession(existing.id);
      const response = NextResponse.json(existing, { status: 200 });
      response.cookies.set(getSessionCookieName(), createSignedSessionToken(session.id), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    const user = await upsertUser({
      id: existing?.id,
      name: payload.name.trim(),
      email: normalizedEmail,
      password: payload.password,
      location: payload.location?.trim() || existing?.location || "Accra, Ghana",
      bio: payload.bio?.trim() || existing?.bio || "Creative storyteller and audience-first maker.",
      profilePhoto: payload.profilePhoto || existing?.profilePhoto || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      role: payload.role ?? existing?.role ?? "member",
    });

    const session = await createSession(user.id);
    const response = NextResponse.json(user, { status: existing ? 200 : 201 });
    response.cookies.set(getSessionCookieName(), createSignedSessionToken(session.id), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Unable to save the account right now." }, { status: 500 });
  }
}
