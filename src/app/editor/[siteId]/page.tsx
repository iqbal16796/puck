import { createClient } from "@/utils/supabase/server";
import { templateData } from "@/configs";
import { EditorClient } from "./EditorClient";

export default async function EditorPage({
  params,
  searchParams,
}: {
  params: Promise<{ siteId: string }>;
  searchParams: Promise<{ template?: string }>;
}) {
  const { siteId } = await params;
  const { template } = await searchParams;

  const supabase = await createClient();

  const { data: site } = await supabase
    .from("sites")
    .select("puck_data, template_id")
    .eq("site_name", siteId)
    .single();

  // Use the template chosen on the home page gallery (passed via ?template=
  // since the site row isn't created until the user publishes). Once a row
  // exists, its own template_id takes over.
  const templateId = site?.template_id ?? template ?? "salon";
  const initialData = site?.puck_data ?? templateData[templateId] ?? templateData.salon;

  return (
    <EditorClient
      siteId={siteId}
      templateId={templateId}
      initialData={initialData}
    />
  );
}
