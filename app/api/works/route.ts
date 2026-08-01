import { NextResponse } from "next/server";
import { getPublishedWorks, saveUploadedWork, type StudioUpload } from "../../lib/works-store";

export async function GET() {
  const works = await getPublishedWorks();
  return NextResponse.json(works);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Omit<StudioUpload, "id" | "createdAt">;

    if (!payload.title?.trim() || !payload.summary?.trim() || !payload.mediaUrl?.trim()) {
      return NextResponse.json({ error: "Title, summary, and media link are required." }, { status: 400 });
    }

    const saved = await saveUploadedWork(payload);
    return NextResponse.json(saved, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to save the upload right now." }, { status: 500 });
  }
}
