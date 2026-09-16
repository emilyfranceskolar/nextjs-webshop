import { isAdmin } from "@/lib/admin";
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedTypes: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No image selected" }, { status: 400 });
    }

    const extension = allowedTypes[file.type];

    if (!extension) {
      return NextResponse.json(
        { error: "Only JPG, JPEG, PNG and WEBP are allowed" },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image must be smaller than 5 MB" },
        { status: 400 },
      );
    }

    const originalName = path.basename(file.name, path.extname(file.name));

    const safeName =
      originalName
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "") || "image";

    const fileName = `${Date.now()}-${safeName}${extension}`;

    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "assets",
      "images",
    );

    await mkdir(uploadDirectory, { recursive: true });

    const bytes = await file.arrayBuffer();

    await writeFile(path.join(uploadDirectory, fileName), Buffer.from(bytes));

    return NextResponse.json({
      imageUrl: `/assets/images/${fileName}`,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not upload image" },
      { status: 500 },
    );
  }
}
