import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // CRITICAL FIX: Accept either siteId or siteName from the frontend!
    const rawSiteName = body.siteName || body.siteId;
    const { puckData, templateId, publish } = body;

    if (!rawSiteName) {
      return NextResponse.json({ error: "Missing required field: siteName or siteId" }, { status: 400 });
    }

    const cleanSiteName = rawSiteName.toLowerCase().replace(/[^a-z0-9-]/g, '');
    const supabase = await createClient();

    const finalPuckData = puckData || {};

    // Preview vs live split: an explicit `publish: true` is the only path that
    // makes a site indexable. Draft autosaves must never flip an already-
    // published site back to private, so look up its current state first and
    // default brand-new rows to unpublished (private preview from save #1).
    let isPublished = true;
    if (!publish) {
      const { data: existing } = await supabase
        .from("sites")
        .select("is_published")
        .eq("site_name", cleanSiteName)
        .maybeSingle();
      isPublished = existing?.is_published ?? false;
    }

    // CRITICAL FIX: Changed .insert() to .upsert() so it updates existing sites instead of crashing!
    const { data, error } = await supabase
      .from("sites")
      .upsert(
        {
          site_name: cleanSiteName,
          template_id: templateId || "default",
          puck_data: finalPuckData,
          is_published: isPublished
        },
        { onConflict: 'site_name' } // Match the existing site by its unique URL
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase Upsert Error:", error);
      throw error;
    }

    // Version history: snapshot on every save. Skip if it's identical to the
    // last snapshot (autosave fires on every keystroke-debounce, so plenty of
    // saves would otherwise duplicate the same content).
    const { data: lastVersion } = await supabase
      .from("site_versions")
      .select("puck_data")
      .eq("site_name", cleanSiteName)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const isSameAsLast = lastVersion && JSON.stringify(lastVersion.puck_data) === JSON.stringify(finalPuckData);
    if (!isSameAsLast) {
      const { error: versionError } = await supabase.from("site_versions").insert({
        site_name: cleanSiteName,
        template_id: templateId || "default",
        puck_data: finalPuckData,
      });
      // Non-fatal: the site table save already succeeded. Log and move on —
      // e.g. the site_versions table may not exist yet if the SQL in
      // sql/site_versions.sql hasn't been run against this Supabase project.
      if (versionError) console.error("Version snapshot failed:", versionError);
    }

    return NextResponse.json({ success: true, site: data });

  } catch (error: any) {
    console.error("Save site error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}