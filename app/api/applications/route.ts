import { env } from "cloudflare:workers";
import { z } from "zod";
import { applications } from "@/db/schema";
import { getDb } from "@/db";
import { BodyError, readJson } from "../request-body";

const schema = z.object({
  name: z.string().trim().min(2).max(60),
  ageGroup: z.enum(["До 18", "18–24", "25–34", "35–44", "45+"]),
  gender: z.enum(["female", "male"]).nullable().optional(),
  telegram: z.string().trim().max(80).transform(value => value.replace(/^https?:\/\/(?:www\.)?t\.me\//i, "").replace(/^t\.me\//i, "").replace(/^@/, "").replace(/\/$/, "").toLowerCase()).pipe(z.string().regex(/^[a-z][a-z0-9_]{4,31}$/)),
  phone: z.string().trim().max(24).transform(value => value.replace(/[\s()\-]/g, "")).refine(value => !value || /^\+?\d{10,15}$/.test(value)),
  website: z.string().max(200).optional(),
  consent: z.literal(true),
  platform: z.enum(["android", "ios", "both"]).nullable().optional(),
  priority: z.enum(["daily", "wardrobe", "day-route"]).nullable().optional(),
  routeSummary: z.string().trim().max(800).nullable().optional(),
});
function json(body: object, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({ error: "Откройте форму на сайте проекта." }, 403);
  let input: unknown;
  try { input = await readJson(request); }
  catch (error) { return json({ error: error instanceof BodyError ? error.message : "Не удалось прочитать заявку." }, error instanceof BodyError ? error.status : 400); }
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    const field = parsed.error.issues[0]?.path[0];
    const errors: Record<string, string> = { name: "Укажите имя от 2 до 60 символов.", ageGroup: "Выберите возрастную группу.", telegram: "Проверьте Telegram: нужен @username из 5–32 букв, цифр или символов подчёркивания, начинающийся с буквы.", phone: "Проверьте номер телефона или оставьте поле пустым.", consent: "Для отправки нужно согласие на связь по поводу тестирования." };
    return json({ error: errors[String(field)] || "Проверьте поля заявки." }, 400);
  }
  if (parsed.data.website) return json({ ok: true });
  try {
    if (!env.DB) throw new Error("Database unavailable");
    const address = request.headers.get("cf-connecting-ip") || "local";
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(address));
    const hash = Array.from(new Uint8Array(digest)).map(value => value.toString(16).padStart(2, "0")).join("");
    const window = Math.floor(Date.now() / 3600000);
    const counter = await env.DB.prepare("INSERT INTO rate_limits (key, window, hits) VALUES (?, ?, 1) ON CONFLICT(key) DO UPDATE SET hits = hits + 1 RETURNING hits").bind(`${hash}:${window}`, window).first<{ hits: number }>();
    if (counter && counter.hits > 10) return json({ error: "Слишком много заявок. Попробуйте через час или напишите @DuImaran." }, 429);
    await env.DB.prepare("DELETE FROM rate_limits WHERE window < ?").bind(window - 48).run();
    await getDb().insert(applications).values({ id: crypto.randomUUID(), name: parsed.data.name, ageGroup: parsed.data.ageGroup, gender: parsed.data.gender || null, telegram: parsed.data.telegram, phone: parsed.data.phone || null, platform: parsed.data.platform || null, priority: parsed.data.priority || null, routeSummary: parsed.data.routeSummary || null, consentVersion: "beta-2026-11-15", createdAt: Date.now() }).onConflictDoNothing({ target: applications.telegram });
    return json({ ok: true });
  } catch {
    return json({ error: "Не удалось сохранить заявку. Попробуйте позже или напишите @DuImaran в Telegram." }, 503);
  }
}
