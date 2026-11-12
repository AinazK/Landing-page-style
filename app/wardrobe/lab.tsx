"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, CloudRain, Download, Pin } from "lucide-react";
import { GarmentDrawing } from "./garment";
import { buildRoute, changesAt, garmentById, routeSummary, weatherLabels, type Anchor, type DayPlan, type Route, type Weather } from "./model";
import { track } from "../telemetry";

function downloadRoute(route: Route) {
  const escape = (s: string) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
  const rows = route.outfits.map((outfit, i) => {
    const stop = route.stops[i];
    return `<g transform="translate(48 ${205 + i * 164})"><text class="time" y="0">${stop.time} / ${escape(stop.title)}</text><text class="detail" y="32">${escape(outfit.ids.slice(0, 3).map(id => garmentById[id].name).join(" · "))}</text><text class="detail" y="58">${escape(outfit.ids.slice(3).map(id => garmentById[id].name).join(" · ") || "Базовый комплект")}</text>${outfit.ids.map((id, j) => `<rect x="${j * 34}" y="79" width="24" height="24" rx="12" fill="${garmentById[id].color}" stroke="#aaa597" stroke-width=".5"/>`).join("")}</g>`;
  }).join("");
  const packed = route.packed.map(id => garmentById[id].name).join(", ") || "Ничего дополнительно";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="880" viewBox="0 0 800 880"><style>text{fill:#282921;font-family:Arial,sans-serif}.time{font-size:18px}.detail{font-size:15px;fill:#66665b}</style><rect width="800" height="880" fill="#f8f6f0"/><rect width="800" height="7" fill="#e64c2e"/><text x="48" y="70" font-size="13" letter-spacing="2">ИИ.СТИЛИСТ / МАРШРУТ ДНЯ</text><text x="48" y="125" font-size="39" font-family="Georgia,serif">Один гардероб. Весь ваш день.</text><text x="48" y="158" class="detail">${escape(weatherLabels[route.weather])} · Постоянная вещь: ${escape(garmentById[route.anchor].name)}</text>${rows}<path d="M48 698H752" stroke="#d1ccbe"/><text x="48" y="735" class="time">Взять дополнительно: ${route.packed.length}</text><text x="48" y="765" class="detail">${escape(packed)}</text><text x="48" y="812" font-size="11" fill="#77766b">Пример на демонстрационном гардеробе. Погода условная. ИИ-стилист в разработке.</text></svg>`;
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url; a.download = "мой-маршрут-ии-стилист.svg"; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function DayOutfit({ route, index }: { route: Route; index: number }) {
  const outfit = route.outfits[index];
  const stop = route.stops[index];
  const changes = changesAt(route, index);
  const names = (ids: typeof outfit.ids) => ids.map(id => garmentById[id].name.toLowerCase()).join(", ");
  const note = index === 0
    ? (route.plan === "work" ? "Собранный комплект для рабочей встречи." : "Повседневная основа для учёбы и дел.")
    : index === 1
      ? ({ warm: "Лёгкий комплект для тёплой прогулки.", cool: "Плащ и шарф согреют на прохладной прогулке.", rain: "В этом примере плащ и ботинки подходят для дождя." }[route.weather])
      : "Сочетание для вечерних планов в помещении.";

  return <article className={`day-outfit ${index === 1 ? "day-outfit-outdoors" : ""}`} aria-labelledby={`outfit-title-${index}`}>
    <header className="day-outfit-header"><span className="day-period">{["Утро", "День", "Вечер"][index]}</span><span className="day-time">{stop.time}</span><h3 id={`outfit-title-${index}`}>{stop.title}</h3></header>
    <div className="day-clothes">{outfit.ids.map(id => <div className="day-garment" key={id}><GarmentDrawing id={id} color={garmentById[id].color} /><span>{garmentById[id].name}</span></div>)}</div>
    <div className="day-outfit-notes"><p>{note}</p>{index > 0 && <div className="outfit-change">{changes.removed.length > 0 && <p><strong>Снять:</strong> {names(changes.removed)}.</p>}{changes.added.length > 0 && <p><strong>Добавить:</strong> {names(changes.added)}.</p>}{!changes.removed.length && !changes.added.length && <p>Всё уже подходит — можно оставить как есть.</p>}</div>}</div>
  </article>;
}

export default function WardrobeLab({ onRoute }: { onRoute: (summary: string | null) => void }) {
  const [plan, setPlan] = useState<DayPlan>("work");
  const [weather, setWeather] = useState<Weather>("cool");
  const [anchor, setAnchor] = useState<Anchor>("tee");
  const [saved, setSaved] = useState(false);
  const route = useMemo(() => buildRoute(plan, weather, anchor), [plan, weather, anchor]);
  useEffect(() => { onRoute(route ? routeSummary(route) : null); }, [route, onRoute]);
  function interact() { track("demo_interaction"); setSaved(false); }

  return <section className="lab-section" id="wardrobe-lab" aria-labelledby="lab-heading"><div className="wrap">
    <div className="section-marker"><span>02 / ПОПРОБУЙТЕ САМИ</span><span>ИЗ ТЕХ ЖЕ ЛЮБИМЫХ ВЕЩЕЙ</span></div>
    <div className="lab-intro"><div><h2 id="lab-heading">Один день.<br /><em>Три готовых образа.</em></h2><p>Выберите погоду — и посмотрите, что надеть утром, на прогулку и вечером.</p></div></div>

    <div className="simple-demo-controls"><label className="demo-weather" htmlFor="demo-weather">Какая погода в вашем примере?<span className="demo-select-wrap"><select id="demo-weather" value={weather} onChange={e => { setWeather(e.target.value as Weather); interact(); }}><option value="warm">Тепло и сухо, +20°</option><option value="cool">Прохладно, +11°</option><option value="rain">Дождь, +13°</option></select><ChevronDown size={18} aria-hidden="true" /></span></label>
      <details className="demo-extra"><summary>Изменить планы и любимую вещь<ChevronDown size={16} aria-hidden="true" /></summary><div className="demo-extra-fields"><label htmlFor="demo-plan">Ваши планы<span className="demo-select-wrap"><select id="demo-plan" value={plan} onChange={e => { setPlan(e.target.value as DayPlan); interact(); }}><option value="work">Работа, прогулка и ужин</option><option value="study">Учёба, прогулка и выставка</option></select><ChevronDown size={16} aria-hidden="true" /></span></label><label htmlFor="demo-anchor">Вещь, которую оставим во всех образах<span className="demo-select-wrap"><select id="demo-anchor" value={anchor} onChange={e => { setAnchor(e.target.value as Anchor); interact(); }}><option value="tee">Белая футболка</option><option value="trousers">Графитовые брюки</option><option value="sneakers">Светлые кеды</option></select><ChevronDown size={16} aria-hidden="true" /></span></label></div></details>
    </div>

    {!route ? <div className="route-conflict" role="status"><CloudRain size={30} strokeWidth={1.2} /><h3>Эти кеды — для сухой погоды.</h3><p>Для дождливой прогулки в примере нужны ботинки. Можно оставить любимую футболку во всех трёх образах, а обувь подобрать по погоде.</p><button className="text-link" type="button" onClick={() => { setAnchor("tee"); interact(); }}>Оставить футболку <ArrowUpRight size={18} /></button></div> : <>
      <p className="route-anchor"><Pin size={15} strokeWidth={1.5} aria-hidden="true" /><span>В основе каждого образа — <strong>{garmentById[anchor].name.toLowerCase()}.</strong></span></p>
      <p className="sr-only" role="status">{weatherLabels[weather]}. Три образа готовы. Всего вещей: {route.unique.length}.</p>
      <div className="day-outfits">{route.stops.map((stop, index) => <DayOutfit key={stop.time} route={route} index={index} />)}</div>
      <div className="day-packing"><div><span className="eyebrow">ВЗЯТЬ С СОБОЙ</span><p>{route.packed.length ? route.packed.map(id => garmentById[id].name).join(" и ") : "Ничего дополнительно — всё уже в первом образе."}</p></div><button className="save-route-link" type="button" onClick={() => { downloadRoute(route); track("route_download"); setSaved(true); }}><Download size={16} />{saved ? "Сохранить ещё раз" : "Сохранить эти образы"}</button></div>
    </>}

    <div className="lab-bottom"><p>Пример на готовом гардеробе с условной погодой. В приложении можно будет использовать свои вещи.</p><a href="#join" className="text-link">Оставить заявку на тестирование <ArrowUpRight size={18} /></a></div>
  </div></section>;
}
