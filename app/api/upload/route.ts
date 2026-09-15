import { isAdmin } from "@/lib/admin";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedTypes: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

export async function POST(request: Request) {
  // Only logged-in admins can upload product images
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No image selected" }, { status: 400 });
    }

    // Check if the image format is allowed
    const extension = allowedTypes[file.type];

    if (!extension) {
      return NextResponse.json(
        { error: "Only JPG, JPEG, PNG and WEBP are allowed" },
        { status: 400 },
      );
    }

    // Limit image size to 5 MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image must be smaller than 5 MB" },
        { status: 400 },
      );
    }

    // Get the original filename without the extension
    const originalName = path.basename(file.name, path.extname(file.name));

    // Make the filename safe
    const safeName =
      originalName
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "") || "image";

    // Create a unique filename
    const fileName = `${Date.now()}-${safeName}${extension}`;

    // Save images inside public/assets/images
    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "assets",
      "images",
    );

    // Create the folder if it does not exist
    await mkdir(uploadDirectory, { recursive: true });

    // Convert the uploaded file to bytes
    const bytes = await file.arrayBuffer();

    // Save the image
    await writeFile(path.join(uploadDirectory, fileName), Buffer.from(bytes));

    // Return the image path to the product form
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
