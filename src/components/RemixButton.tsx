"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RemixButton({ siteId }: { siteId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRemix = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/remix-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId }),
      });
      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Failed to remix this site.");
        setIsLoading(false);
        return;
      }

      router.push(`/editor/${result.site.site_name}`);
    } catch (err) {
      console.error(err);
      alert("A network error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleRemix}
      disabled={isLoading}
      className="fixed bottom-5 right-5 z-[9998] rounded-full bg-gradient-to-r from-rose-600 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-900/50 transition-all hover:scale-[1.03] disabled:opacity-70"
    >
      {isLoading ? "Remixing..." : "Remix this site"}
    </button>
  );
}
