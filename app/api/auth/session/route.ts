import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { deleteSessionById, getSessionById, getSessionCookieName, verifySignedSessionToken } from "../../../lib/session-store";
import { readUsers } from "../../../lib/user-store";

export async function GET() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(getSessionCookieName())?.value;

  if (!cookie) {
    return NextResponse.json(null, { status: 200 });
  }

  const sessionId = verifySignedSessionToken(cookie);
  if (!sessionId) {
    return NextResponse.json(null, { status: 200 });
  }

  const session = await getSessionById(sessionId);
  if (!session) {
    return NextResponse.json(null, { status: 200 });
  }

  const users = await readUsers();
  const user = users.find((item) => item.id === session.userId);

  if (!user) {
    return NextResponse.json(null, { status: 200 });
  }

  return NextResponse.json(user, { status: 200 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(getSessionCookieName())?.value;

  if (cookie) {
    const sessionId = verifySignedSessionToken(cookie);
    if (sessionId) {
      await deleteSessionById(sessionId);
    }
  }

  const response = NextResponse.json({ ok: true }, { status: 200 });
  response.cookies.set(getSessionCookieName(), "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  return response;
}
