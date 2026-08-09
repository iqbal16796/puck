import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// List versions (lightweight, no puck_data) for the history slider, or fetch
// one version's full data (?versionId=) so the editor can restore it.
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get("siteId");
    const versionId = searchParams.get("versionId");

    if (!siteId) {
      return NextResponse.json({ error: "Missing siteId" }, { status: 400 });
    }

    const supabase = await createClient();

    if (versionId) {
      const { data, error } = await supabase
        .from("site_versions")
        .select("id, puck_data, template_id, created_at")
        .eq("id", versionId)
        .eq("site_name", siteId)
        .single();

      if (error || !data) {
        return NextResponse.json({ error: "Version not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, version: data });
    }

    const { data, error } = await supabase
      .from("site_versions")
      .select("id, created_at")
      .eq("site_name", siteId)
      .order("created_at", { ascending: true })
      .limit(50);

    if (error) throw error;

    return NextResponse.json({ success: true, versions: data ?? [] });
  } catch (error: any) {
    console.error("List site versions error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
