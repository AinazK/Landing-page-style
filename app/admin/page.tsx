import { desc, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { applications, metricTotals } from "@/db/schema";
import { canReadApplications } from "./access";
import { chatGPTSignInPath, getChatGPTUser } from "../chatgpt-auth";

export const dynamic = "force-dynamic";
export const metadata = { title: "Заявки — ИИ-стилист", robots: { index: false, follow: false } };
const platformLabels: Record<string, string> = { android: "Android", ios: "iPhone", both: "Оба" };
const priorityLabels: Record<string, string> = { daily: "Выбор одежды утром", wardrobe: "Новые сочетания", "day-route": "Маршрут дня" };
const genderLabels: Record<string, string> = { female: "Женский", male: "Мужской" };
const ageGroups = ["До 18", "18–24", "25–34", "35–44", "45+"];
function applicationLabel(count: number) {
  const lastTwo = count % 100;
  if (lastTwo >= 11 && lastTwo <= 14) return "заявок";
  if (count % 10 === 1) return "заявка";
  if (count % 10 >= 2 && count % 10 <= 4) return "заявки";
  return "заявок";
}
export default async function Admin() {
  if (!await canReadApplications()) {
    const user = await getChatGPTUser();
    return <main className="admin-page wrap"><a href="/">← На сайт</a><h1>Заявки на тестирование</h1><p>{user ? "Эта страница доступна только владельцу проекта." : "Войдите в аккаунт владельца проекта, чтобы посмотреть заявки."}</p>{!user && <a className="button button-dark" href={chatGPTSignInPath("/admin")} target="_top">Войти через ChatGPT</a>}</main>;
  }
  const entries = await getDb().select().from(applications).orderBy(desc(applications.createdAt));
  const totals = await getDb().select({ event: metricTotals.event, total: sql<number>`sum(${metricTotals.count})` }).from(metricTotals).groupBy(metricTotals.event);
  const counts = Object.fromEntries(totals.map(item => [item.event, item.total]));
  const ageCounts = ageGroups.map(group => ({ group, count: entries.filter(entry => entry.ageGroup === group).length }));
  const largestAgeCount = Math.max(1, ...ageCounts.map(item => item.count));

  return <main className="admin-page wrap">
    <a href="/">← На сайт</a>
    <h1>Первые участники</h1>
    <div className="admin-metrics">
      {[["Открытия страницы", counts.page_view || 0], ["Просмотры формы", counts.form_view || 0], ["Сохранённые заявки", entries.length]].map(([label, count]) => <div key={label}><strong>{count}</strong><span>{label}</span></div>)}
    </div>
    <p className="admin-metric-note">Открытия страницы и просмотры формы — события, а не уникальные посетители. Они могут включать ваши просмотры и не подходят для расчёта точной конверсии. Сохранённые заявки — записи в базе.</p>

    <section className="admin-age-chart" aria-labelledby="age-chart-heading">
      <div className="admin-chart-heading"><div><h2 id="age-chart-heading">Возраст участников</h2><p>Количество сохранённых заявок по возрастным группам.</p></div><span>{entries.length} {applicationLabel(entries.length)}</span></div>
      <ol className="admin-age-bars">
        {ageCounts.map(({ group, count }) => <li key={group}>
          <span className="admin-age-label">{group}</span>
          <span className="admin-age-track" aria-hidden="true"><span style={{ width: `${count / largestAgeCount * 100}%` }} /></span>
          <span className="admin-age-count"><strong>{count}</strong> <span>{applicationLabel(count)}</span></span>
        </li>)}
      </ol>
      {entries.length === 0 && <p className="admin-chart-empty">Пока заявок нет. График заполнится после отправки первых анкет.</p>}
    </section>

    <div className="admin-toolbar"><p>Заявок: {entries.length}. Доступ только у владельца проекта.</p><a className="button button-dark" href="/api/admin/export">Скачать CSV ↓</a></div>
    {entries.length === 0 ? <p className="muted">Отправленные анкеты появятся здесь.</p> : <div className="admin-table-wrap"><table>
      <thead><tr><th>Дата, МСК</th><th>Имя</th><th>Возраст</th><th>Пол</th><th>Telegram</th><th>Телефон</th><th>Устройство</th><th>Задача</th><th>Маршрут</th><th>Согласие</th></tr></thead>
      <tbody>{entries.map(entry => <tr key={entry.id}><td>{new Date(entry.createdAt).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}</td><td>{entry.name}</td><td>{entry.ageGroup}</td><td>{genderLabels[entry.gender || ""] || "Не указан"}</td><td><a href={`https://t.me/${entry.telegram}`} target="_blank" rel="noreferrer">@{entry.telegram}</a></td><td>{entry.phone || "—"}</td><td>{platformLabels[entry.platform || ""] || "—"}</td><td>{priorityLabels[entry.priority || ""] || "—"}</td><td>{entry.routeSummary ? <details className="admin-route"><summary>Открыть</summary><p>{entry.routeSummary}</p></details> : "—"}</td><td>{entry.consentVersion}</td></tr>)}</tbody>
    </table></div>}
  </main>;
}
