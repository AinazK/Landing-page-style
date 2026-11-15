import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { applications } from "@/db/schema";
import { canReadApplications } from "@/app/admin/access";

export const dynamic = "force-dynamic";
function cell(value: string) {
  const safe = /^[=+\-@]/.test(value.trimStart()) || /^[\t\r\n]/.test(value) ? `'${value}` : value;
  return `"${safe.replaceAll('"', '""')}"`;
}
export async function GET() {
  if (!await canReadApplications()) return new Response("Доступ запрещён", { status: 403, headers: { "Cache-Control": "no-store" } });
  const rows = await getDb().select().from(applications).orderBy(desc(applications.createdAt));
  const platforms: Record<string, string> = { android: "Android", ios: "iPhone", both: "Оба" };
  const priorities: Record<string, string> = { daily: "Выбор одежды утром", wardrobe: "Новые сочетания", "day-route": "Маршрут дня" };
  const genders: Record<string, string> = { female: "Женский", male: "Мужской" };
  const csv = [["Дата, МСК", "Имя", "Возрастная группа", "Пол", "Telegram", "Телефон", "Устройство", "Задача", "Маршрут", "Согласие"], ...rows.map(row => [new Date(row.createdAt).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }), row.name, row.ageGroup, genders[row.gender || ""] || "Не указан", `@${row.telegram}`, row.phone || "", platforms[row.platform || ""] || "", priorities[row.priority || ""] || "", row.routeSummary || "", row.consentVersion])].map(row => row.map(cell).join(";")).join("\r\n");
  return new Response(`\uFEFF${csv}`, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": "attachment; filename=ai-stylist-applications.csv", "Cache-Control": "private, no-store" } });
}
