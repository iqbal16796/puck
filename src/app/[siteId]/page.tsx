import { notFound } from "next/navigation";
import { Render } from "@measured/puck";
import { createClient } from "@/utils/supabase/server";

// Load the right block config for this site's template
import { getTemplateConfig } from "@/configs";
import { RemixButton } from "@/components/RemixButton";
import { ExportButton } from "@/components/ExportButton";

export const revalidate = 0; // Force Next.js to always fetch the freshest site data

export default async function PublicSitePage({ params }: { params: Promise<{ siteId: string }> }) {
  const { siteId } = await params;
  
  // CRITICAL FIX: Because createClient is now async, we MUST await it!
  const supabase = await createClient();

  // 2. Fetch the site data based on the URL parameter
  const { data: site } = await supabase
    .from("sites")
    .select("puck_data, template_id, is_published")
    .eq("site_name", siteId)
    .single();

  // 3. If no site exists, or it's still a private draft, show a 404 —
  // only an explicit Publish makes a site indexable at this URL.
  if (!site || !site.is_published) {
    notFound();
  }

  // 4. Render the raw JSON data into a beautiful React website!
  const config = getTemplateConfig(site.template_id, site.puck_data);

  return (
    <>
      <Render config={config} data={site.puck_data} />
      <ExportButton siteId={siteId} />
      <RemixButton siteId={siteId} />
    </>
  );
}
