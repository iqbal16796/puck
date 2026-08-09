import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Render } from "@measured/puck";
import { createClient } from "@/utils/supabase/server";

import { getTemplateConfig } from "@/configs";

export const revalidate = 0;

// Private link: exists the moment a draft is autosaved, regardless of
// is_published. Marked noindex so it never gets crawled or indexed.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function PreviewSitePage({ params }: { params: Promise<{ siteId: string }> }) {
  const { siteId } = await params;

  const supabase = await createClient();

  const { data: site } = await supabase
    .from("sites")
    .select("puck_data, template_id")
    .eq("site_name", siteId)
    .single();

  if (!site) {
    notFound();
  }

  const config = getTemplateConfig(site.template_id, site.puck_data);

  return (
    <Render config={config} data={site.puck_data} />
  );
}
