"use client";

import { Render } from "@measured/puck";

export function PuckRenderer({ config, data }: { config: any; data: any }) {
  return <Render config={config} data={data} />;
}
