import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { uploadToFivage } from "@/lib/fivage-upload";

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/quicktime",
  "video/webm",
]);

export async function POST(request: Request) {
  await requireAdmin();

  try {
    const formData = await request.formData();
    const files = formData
      .getAll("files")
      .filter((file): file is File => file instanceof File);

    if (!files.length) {
      return NextResponse.json(
        { message: "At least one file is required." },
        { status: 400 }
      );
    }

    const invalidFile = files.find(
      (file) =>
        !ALLOWED_FILE_TYPES.has(file.type) || file.size > MAX_FILE_SIZE_BYTES
    );

    if (invalidFile) {
      return NextResponse.json(
        {
          message:
            "Uploads must be images or videos and each file must be 25MB or smaller.",
        },
        { status: 400 }
      );
    }

    const result = await uploadToFivage(files);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Admin upload failed:", error);
    return NextResponse.json(
      { message: "Upload failed unexpectedly." },
      { status: 500 }
    );
  }
}
