import { env } from "cloudflare:workers";
import { z } from "zod";
import { BodyError, readJson } from "../request-body";

const schema = z.object({ event: z.enum(["page_view", "demo_interaction", "route_download", "form_view"]) });
export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  if (request.headers.get("origin") && request.headers.get("origin") !== new URL(request.url).origin) return new Response(null, { status: 403, headers });
  let parsed;
  try { parsed = schema.safeParse(await readJson(request, 128)); }
  catch (error) { return new Response(null, { status: error instanceof BodyError ? error.status : 400, headers }); }
  if (!parsed.success) return new Response(null, { status: 400, headers });
  try {
    if (!env.DB) throw new Error("Database unavailable");
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(request.headers.get("cf-connecting-ip") || "local"));
    const hash = Array.from(new Uint8Array(digest)).map(value => value.toString(16).padStart(2, "0")).join("");
    const window = Math.floor(Date.now() / 3600000);
    const rate = await env.DB.prepare("INSERT INTO rate_limits (key, window, hits) VALUES (?, ?, 1) ON CONFLICT(key) DO UPDATE SET hits = hits + 1 RETURNING hits").bind(`event:${hash}:${window}`, window).first<{ hits: number }>();
    if (rate && rate.hits > 600) return new Response(null, { status: 429, headers });
    const day = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Moscow" });
    await env.DB.prepare("INSERT INTO metric_totals (key, day, event, count) VALUES (?, ?, ?, 1) ON CONFLICT(key) DO UPDATE SET count = count + 1").bind(`${day}:${parsed.data.event}`, day, parsed.data.event).run();
    return new Response(null, { status: 204, headers });
  } catch { return new Response(null, { status: 503, headers }); }
}
