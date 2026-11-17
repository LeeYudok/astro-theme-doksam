import { withBase } from "../lib/i18n.js";

export function GET({ site }) {
  const lines = ["User-agent: *", "Allow: /"];
  if (site) lines.push(`Sitemap: ${new URL(withBase("/sitemap-index.xml"), site).href}`);
  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
