import assert from "node:assert/strict";
import { buildRoute, routeSummary } from "../app/wardrobe/model.ts";

const base = process.env.TEST_BASE_URL || "http://127.0.0.1:5173";
if (!["127.0.0.1", "localhost"].includes(new URL(base).hostname)) throw new Error("This test writes disposable data and is restricted to a local preview.");
const telegram = `smoke_${Date.now()}`;
const application = { name: "=Тестовая анкета", ageGroup: "25–34", gender: "female", telegram: `@${telegram}`, phone: "", consent: true, website: "", platform: "android", priority: "day-route", routeSummary: routeSummary(buildRoute("work", "cool", "tee")) };
const send = (value, origin = base) => fetch(`${base}/api/applications`, { method: "POST", headers: { "Content-Type": "application/json", Origin: origin }, body: JSON.stringify(value) });

const home = await fetch(base);
assert.equal(home.status, 200);
assert.match(await home.text(), /name="gender"/);
for (const asset of ["city-day-hero", "capsule-panorama"]) {
  const image = await fetch(`${base}/images/${asset}.webp`);
  assert.equal(image.status, 200);
  assert.match(image.headers.get("content-type"), /image\/webp/);
}
assert.equal((await send(application, "https://unrelated.example")).status, 403);
assert.equal((await send({ ...application, consent: false })).status, 400);
assert.equal((await send({ ...application, telegram: "bad name" })).status, 400);
assert.equal((await send({ ...application, phone: "hello" })).status, 400);
assert.equal((await send({ ...application, platform: "unknown" })).status, 400);
assert.equal((await send({ ...application, gender: "unknown" })).status, 400);
assert.equal((await send({ ...application, routeSummary: "x".repeat(801) })).status, 400);
assert.equal((await send({ ...application, routeSummary: "x".repeat(5000) })).status, 413);
assert.equal((await fetch(`${base}/api/admin/export`)).status, 403);
assert.equal((await send(application)).status, 200);
assert.equal((await send({ ...application, telegram: `https://t.me/${telegram.toUpperCase()}` })).status, 200);
assert.equal((await send({ ...application, gender: "male", ageGroup: "18–24", telegram: `${telegram}_male` })).status, 200);
const { gender: _gender, ...legacyApplication } = application;
assert.equal((await send({ ...legacyApplication, ageGroup: "До 18", telegram: `${telegram}_legacy` })).status, 200);

const login = await fetch(`${base}/signin-with-chatgpt?return_to=/admin`, { redirect: "manual" });
const cookie = login.headers.getSetCookie().map(value => value.split(";")[0]).join("; ");
assert.ok(cookie, "Local preview sign-in should set a cookie");
const admin = await fetch(`${base}/admin`, { headers: { Cookie: cookie } });
assert.equal(admin.status, 200);
const adminHtml = await admin.text();
assert.match(adminHtml, new RegExp(telegram));
assert.match(adminHtml, /Возраст участников/);
assert.ok(!adminHtml.includes("Использовали демо") && !adminHtml.includes("Скачали маршрут"));
const exported = await fetch(`${base}/api/admin/export`, { headers: { Cookie: cookie } });
assert.equal(exported.status, 200);
assert.match(exported.headers.get("content-type"), /text\/csv/);
const csv = await exported.text();
assert.equal(csv.split(`@${telegram}"`).length - 1, 1, "Duplicate Telegram usernames should produce one record");
assert.ok(csv.includes("'=Тестовая анкета"), "CSV must escape formula prefixes");
assert.ok(csv.includes("beta-2026-11-15"), "Consent version must be saved");
assert.ok(csv.includes('"Пол"'), "CSV must include gender");
assert.ok(csv.includes(`"Женский";"'@${telegram}"`), "Gender must persist on the matching application");
assert.ok(csv.includes(`"Мужской";"'@${telegram}_male"`));
assert.ok(csv.includes(`"Не указан";"'@${telegram}_legacy"`), "Older clients may omit gender");
assert.ok(csv.includes(application.routeSummary), "The explicitly attached route should be available to the owner");
assert.ok(csv.includes("Android"));
// Compare the rendered chart with the owner's exported records, including existing rows.
const records = [];
let cells = [], field = "", quoted = false;
const csvText = csv.replace(/^\uFEFF/, "");
for (let i = 0; i < csvText.length; i++) {
  const char = csvText[i];
  if (char === '"') {
    if (quoted && csvText[i + 1] === '"') { field += '"'; i++; }
    else quoted = !quoted;
  } else if (!quoted && char === ";") { cells.push(field); field = ""; }
  else if (!quoted && char === "\r" && csvText[i + 1] === "\n") {
    cells.push(field); records.push(cells); cells = []; field = ""; i++;
  } else field += char;
}
if (field || cells.length) records.push([...cells, field]);
const chart = [...adminHtml.matchAll(/class="admin-age-label">([^<]+)<\/span>[\s\S]*?class="admin-age-count"><strong>(\d+)<\/strong>/g)];
assert.equal(chart.length, 5, "All five age groups must remain visible");
const ageColumn = records[0].indexOf("Возрастная группа");
for (const [, group, count] of chart) {
  assert.equal(Number(count), records.slice(1).filter(row => row[ageColumn] === group).length, `Chart must match saved applications for ${group}`);
}
const event = value => fetch(`${base}/api/events`, { method: "POST", headers: { "Content-Type": "application/json", Origin: base }, body: JSON.stringify(value) });
assert.equal((await event({ event: "demo_interaction" })).status, 204);
assert.equal((await event({ event: "invented_event" })).status, 400);
assert.equal((await fetch(`${base}/api/events`, { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://unrelated.example" }, body: JSON.stringify({ event: "page_view" }) })).status, 403);
console.log("PASS: gender persistence and validation, omitted gender compatibility, age chart matches CSV, deduplication, owner-only access, CSV safety, request protections and aggregate events.");
