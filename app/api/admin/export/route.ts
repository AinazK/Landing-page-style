import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { applications } from "@/db/schema";
import { canReadApplications } from "@/app/admin/access";

export const dynamic = "force-dynamic";
function cell(value: string) {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replaceAll('"', '""')}"`;
}
export async function GET() {
  if (!await canReadApplications()) return new Response("Доступ запрещён", { status: 403, headers: { "Cache-Control": "no-store" } });
  const rows = await getDb().select().from(applications).orderBy(desc(applications.createdAt));
  const csv = [["Дата, МСК", "Имя", "Возрастная группа", "Telegram", "Телефон", "Согласие"], ...rows.map(row => [new Date(row.createdAt).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }), row.name, row.ageGroup, `@${row.telegram}`, row.phone || "", row.consentVersion])].map(row => row.map(cell).join(";")).join("\r\n");
  return new Response(`\uFEFF${csv}`, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": "attachment; filename=ai-stylist-applications.csv", "Cache-Control": "private, no-store" } });
}
