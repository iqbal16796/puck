import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

const BUCKET = "site-images";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File exceeds 5 MB limit" }, { status: 400 });
    }

    const supabase = await createClient();

    // Build a unique path so uploads never collide
    const ext = file.name.split(".").pop() ?? "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const path = `uploads/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      // Bucket may not exist yet — surface a clear message
      if (uploadError.message.includes("Bucket not found") || uploadError.message.includes("bucket")) {
        return NextResponse.json(
          { error: `Storage bucket "${BUCKET}" not found. Create it in your Supabase dashboard under Storage → New bucket.` },
          { status: 500 }
        );
      }
      throw uploadError;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);

    return NextResponse.json({ url: data.publicUrl });
  } catch (err: any) {
    console.error("Image upload error:", err);
    return NextResponse.json({ error: err.message ?? "Upload failed" }, { status: 500 });
  }
}
