import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Pure database copy — clones a published site's puck_data into a new row
// under a new name, as a private draft. No AI, no third-party calls.
export async function POST(request: Request) {
  try {
    const { siteId } = await request.json();

    if (!siteId) {
      return NextResponse.json({ error: "Missing required field: siteId" }, { status: 400 });
    }

    const supabase = await createClient();

    const { data: source, error: fetchError } = await supabase
      .from("sites")
      .select("puck_data, template_id, is_published")
      .eq("site_name", siteId)
      .single();

    if (fetchError || !source || !source.is_published) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    const newSiteName = `${siteId}-remix-${Math.random().toString(36).slice(2, 8)}`;

    const { data, error } = await supabase
      .from("sites")
      .insert({
        site_name: newSiteName,
        template_id: source.template_id,
        puck_data: source.puck_data,
        is_published: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase Remix Insert Error:", error);
      throw error;
    }

    return NextResponse.json({ success: true, site: data });
  } catch (error: any) {
    console.error("Remix site error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
