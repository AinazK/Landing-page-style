import { desc, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { applications, metricTotals } from "@/db/schema";
import { canReadApplications } from "./access";
import { chatGPTSignInPath, getChatGPTUser } from "../chatgpt-auth";

export const dynamic = "force-dynamic";
export const metadata = { title: "Заявки — ИИ-стилист", robots: { index: false, follow: false } };
const platformLabels: Record<string, string> = { android: "Android", ios: "iPhone", both: "Оба" };
const priorityLabels: Record<string, string> = { daily: "Выбор одежды утром", wardrobe: "Новые сочетания", "day-route": "Маршрут дня" };
export default async function Admin() {
  if (!await canReadApplications()) {
    const user = await getChatGPTUser();
    return <main className="admin-page wrap"><a href="/">← На сайт</a><h1>Заявки на тестирование</h1><p>{user ? "Эта страница доступна только владельцу проекта." : "Войдите в аккаунт владельца проекта, чтобы посмотреть заявки."}</p>{!user && <a className="button button-dark" href={chatGPTSignInPath("/admin")} target="_top">Войти через ChatGPT</a>}</main>;
  }
  const entries = await getDb().select().from(applications).orderBy(desc(applications.createdAt));
  const totals = await getDb().select({ event: metricTotals.event, total: sql<number>`sum(${metricTotals.count})` }).from(metricTotals).groupBy(metricTotals.event);
  const counts = Object.fromEntries(totals.map(item => [item.event, item.total]));
  return <main className="admin-page wrap"><a href="/">← На сайт</a><h1>Первые участники</h1><div className="admin-metrics">{[["Открытия страницы", counts.page_view || 0], ["Использовали демо", counts.demo_interaction || 0], ["Скачали маршрут", counts.route_download || 0], ["Дошли до формы", counts.form_view || 0], ["Сохранённые заявки", entries.length]].map(([label, count]) => <div key={label}><strong>{count}</strong><span>{label}</span></div>)}</div><p className="admin-metric-note">Счётчики событий с момента запуска версии с маршрутом. Это не уникальные пользователи: не вычисляйте из них точную конверсию. Счётчики не содержат контактов и могут включать ваши собственные просмотры.</p><div className="admin-toolbar"><p>Заявок: {entries.length}. Доступ только у владельца проекта.</p><a className="button button-dark" href="/api/admin/export">Скачать CSV ↓</a></div>{entries.length === 0 ? <p className="muted">Пока заявок нет. Отправленные анкеты появятся здесь.</p> : <div className="admin-table-wrap"><table><thead><tr><th>Дата, МСК</th><th>Имя</th><th>Возраст</th><th>Telegram</th><th>Телефон</th><th>Устройство</th><th>Задача</th><th>Маршрут</th><th>Согласие</th></tr></thead><tbody>{entries.map(entry => <tr key={entry.id}><td>{new Date(entry.createdAt).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}</td><td>{entry.name}</td><td>{entry.ageGroup}</td><td><a href={`https://t.me/${entry.telegram}`} target="_blank" rel="noreferrer">@{entry.telegram}</a></td><td>{entry.phone || "—"}</td><td>{platformLabels[entry.platform || ""] || "—"}</td><td>{priorityLabels[entry.priority || ""] || "—"}</td><td>{entry.routeSummary ? <details className="admin-route"><summary>Открыть</summary><p>{entry.routeSummary}</p></details> : "—"}</td><td>{entry.consentVersion}</td></tr>)}</tbody></table></div>}</main>;
}
