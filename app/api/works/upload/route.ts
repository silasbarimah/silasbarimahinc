import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = String(formData.get("title") ?? "").trim();
    const creatorName = String(formData.get("creatorName") ?? "").trim();
    const category = String(formData.get("category") ?? "Music").trim();
    const year = String(formData.get("year") ?? new Date().getFullYear()).trim();
    const summary = String(formData.get("summary") ?? "").trim();
    const mood = String(formData.get("mood") ?? "Fresh").trim();

    if (!file || !title || !creatorName || !summary) {
      return NextResponse.json({ error: "File, title, creator name, and summary are required." }, { status: 400 });
    }

    const extension = path.extname(file.name) || ".bin";
    const safeName = `${Date.now()}-${title.replace(/[^a-z0-9-]+/gi, "-").toLowerCase()}`;
    const filePath = path.join(UPLOADS_DIR, `${safeName}${extension}`);

    await mkdir(UPLOADS_DIR, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const mediaUrl = `/uploads/${path.basename(filePath)}`;
    const mediaType = file.type || "application/octet-stream";

    return NextResponse.json({
      title,
      creatorName,
      category,
      year,
      summary,
      mood,
      mediaUrl,
      mediaType,
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to save the uploaded file." }, { status: 500 });
  }
}
