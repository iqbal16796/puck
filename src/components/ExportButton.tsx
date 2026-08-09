"use client";

import { useState } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import JSZip from "jszip";
import { Render } from "@measured/puck";
import { createClient } from "@/utils/supabase/client";
import { getTemplateConfig } from "@/configs";

// Runs entirely client-side: Next.js Route Handlers can't import
// react-dom/server, so instead we render <Render> into a detached DOM node
// (the same client-side technique PuckRenderer already uses) and read back
// the resulting markup.
export function ExportButton({ siteId }: { siteId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data: site, error } = await supabase
        .from("sites")
        .select("puck_data, template_id")
        .eq("site_name", siteId)
        .single();

      if (error || !site) throw new Error(error?.message || "Site not found");

      const config = getTemplateConfig(site.template_id, site.puck_data);

      const container = document.createElement("div");
      const root = createRoot(container);
      flushSync(() => {
        root.render(React.createElement(Render, { config, data: site.puck_data }));
      });
      const bodyHtml = container.innerHTML;
      root.unmount();

      const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${siteId}</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
${bodyHtml}
</body>
</html>
`;

      const readme = `Static export of "${siteId}"

- Structural HTML/CSS only. Hover/scroll animations from the visual editor
  need the original React bundle and won't replay here — text, images, and
  layout are all preserved.
- Styling loads Tailwind's CDN script at runtime, so index.html needs an
  internet connection when opened. Swap that <script> tag for your own
  compiled Tailwind CSS file to remove that dependency.
- To use: open index.html directly, or upload this folder to any static
  host (Netlify, GitHub Pages, S3, Cloudflare Pages, etc.) to self-host.
`;

      const zip = new JSZip();
      zip.file("index.html", html);
      zip.file("README.txt", readme);
      const blob = await zip.generateAsync({ type: "blob" });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${siteId}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      alert(err.message || "Export failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isLoading}
      className="fixed bottom-5 right-[190px] z-[9998] rounded-full border border-zinc-700 bg-zinc-900/90 px-5 py-3 text-sm font-medium text-zinc-200 backdrop-blur-sm transition-all hover:bg-zinc-800 disabled:opacity-70"
    >
      {isLoading ? "Exporting…" : "Export ZIP"}
    </button>
  );
}
