import { NextResponse } from "next/server";
import { createInteraction, readInteractions } from "../../lib/user-store";

export async function GET() {
  const items = await readInteractions();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      userId: string;
      type: "page_view" | "upload" | "playback" | "search" | "save";
      page: string;
      metadata?: Record<string, string | number | boolean>;
    };

    if (!payload.userId || !payload.type || !payload.page) {
      return NextResponse.json({ error: "User ID, event type, and page are required." }, { status: 400 });
    }

    const interaction = await createInteraction(payload);
    return NextResponse.json(interaction, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to record the interaction." }, { status: 500 });
  }
}
