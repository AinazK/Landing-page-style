export type Weather = "warm" | "cool" | "rain";
export type Anchor = "tee" | "trousers" | "sneakers";
export type DayPlan = "work" | "study";
export type GarmentKind = "tee" | "shirt" | "trousers" | "jeans" | "blazer" | "overshirt" | "coat" | "sneakers" | "loafers" | "boots" | "scarf";
export type Garment = { id: GarmentKind; name: string; color: string; category: "top" | "bottom" | "layer" | "outer" | "shoes" | "accessory"; formality: number; walking: boolean; rain: boolean };
export const wardrobe: Garment[] = [
  { id: "tee", name: "Белая футболка", color: "#e9e3d7", category: "top", formality: 0, walking: true, rain: false },
  { id: "shirt", name: "Голубая рубашка", color: "#98a9b1", category: "top", formality: 1, walking: true, rain: false },
  { id: "trousers", name: "Графитовые брюки", color: "#51524b", category: "bottom", formality: 1, walking: true, rain: false },
  { id: "jeans", name: "Прямые джинсы", color: "#526b7b", category: "bottom", formality: 0, walking: true, rain: false },
  { id: "blazer", name: "Шоколадный жакет", color: "#644838", category: "layer", formality: 2, walking: true, rain: false },
  { id: "overshirt", name: "Оливковая рубашка", color: "#7a7a5c", category: "layer", formality: 0, walking: true, rain: false },
  { id: "coat", name: "Бежевый плащ", color: "#b5a286", category: "outer", formality: 1, walking: true, rain: true },
  { id: "sneakers", name: "Светлые кеды", color: "#d8d4c7", category: "shoes", formality: 0, walking: true, rain: false },
  { id: "loafers", name: "Кожаные лоферы", color: "#654937", category: "shoes", formality: 1, walking: false, rain: false },
  { id: "boots", name: "Тёмные ботинки", color: "#3d3d36", category: "shoes", formality: 1, walking: true, rain: true },
  { id: "scarf", name: "Шерстяной шарф", color: "#8a4c45", category: "accessory", formality: 0, walking: true, rain: false },
];
export const garmentById = Object.fromEntries(wardrobe.map(item => [item.id, item])) as Record<GarmentKind, Garment>;
export const weatherLabels: Record<Weather, string> = { warm: "Тепло, +20°", cool: "Прохладно, +11°", rain: "Дождь, +13°" };
export type Stop = { time: string; title: string; location: string; outdoors: boolean; formality: number; walking: boolean };
export const plans: Record<DayPlan, Stop[]> = {
  work: [{ time: "09:00", title: "Рабочая встреча", location: "В помещении", outdoors: false, formality: 3, walking: false }, { time: "14:00", title: "Прогулка по городу", location: "Час на улице", outdoors: true, formality: 0, walking: true }, { time: "19:00", title: "Ужин с друзьями", location: "В помещении", outdoors: false, formality: 3, walking: false }],
  study: [{ time: "09:00", title: "Учёба и дела", location: "В помещении", outdoors: false, formality: 1, walking: false }, { time: "14:00", title: "Долгая прогулка", location: "На улице", outdoors: true, formality: 0, walking: true }, { time: "19:00", title: "Встреча на выставке", location: "В помещении", outdoors: false, formality: 2, walking: false }],
};
export type Outfit = { ids: GarmentKind[]; mask: number; penalty: number };
export type Route = { outfits: Outfit[]; stops: Stop[]; packed: GarmentKind[]; unique: GarmentKind[]; changes: number; weather: Weather; anchor: Anchor; plan: DayPlan };
const bit = (id: GarmentKind) => 1 << wardrobe.findIndex(item => item.id === id);
const countBits = (value: number) => { let n = value; let count = 0; while (n) { n &= n - 1; count++; } return count; };

function candidates(stop: Stop, weather: Weather, anchor: Anchor): Outfit[] {
  const outfits: Outfit[] = [];
  const tops = wardrobe.filter(item => item.category === "top");
  const bottoms = wardrobe.filter(item => item.category === "bottom");
  const shoes = wardrobe.filter(item => item.category === "shoes");
  for (const top of tops) for (const bottom of bottoms) for (const shoe of shoes) for (const layer of [null, "blazer", "overshirt"] as const) {
    const ids: GarmentKind[] = [top.id, bottom.id, shoe.id];
    if (layer) ids.push(layer);
    if (!ids.includes(anchor)) continue;
    if (stop.walking && !shoe.walking) continue;
    // In this sample wardrobe only the boots are marked suitable for rain.
    // Keep them for the day instead of carrying a second pair of shoes.
    if (weather === "rain" && !shoe.rain) continue;
    const formality = ids.reduce((sum, id) => sum + garmentById[id].formality, 0);
    if (formality < stop.formality) continue;
    if (stop.outdoors && weather !== "warm") ids.push("coat");
    if (stop.outdoors && weather === "cool") ids.push("scarf");
    if (stop.outdoors && weather === "warm" && layer) continue;
    if (!stop.outdoors && layer === "overshirt" && stop.formality >= 3) continue;
    const penalty = (layer ? 2 : 0) + (shoe.id === "boots" && weather !== "rain" ? 5 : 0) + (shoe.id === "loafers" ? 1 : 0) + (top.id === "shirt" ? 1 : 0);
    outfits.push({ ids, mask: ids.reduce((mask, id) => mask | bit(id), 0), penalty });
  }
  return outfits;
}

/** Exhaustive search over the small sample wardrobe; no AI or forecast API. */
export function buildRoute(plan: DayPlan, weather: Weather, anchor: Anchor): Route | null {
  const stops = plans[plan];
  const options = stops.map(stop => candidates(stop, weather, anchor));
  if (options.some(list => !list.length)) return null;
  let best: { outfits: Outfit[]; mask: number; changes: number; cost: number } | null = null;
  for (const a of options[0]) for (const b of options[1]) for (const c of options[2]) {
    const mask = a.mask | b.mask | c.mask;
    const changes = countBits(a.mask ^ b.mask) + countBits(b.mask ^ c.mask);
    const packed = countBits(mask & ~a.mask);
    const cost = countBits(mask) * 3 + changes * 2 + packed * 4 + a.penalty + b.penalty + c.penalty;
    if (!best || cost < best.cost) best = { outfits: [a, b, c], mask, changes, cost };
  }
  if (!best) return null;
  const unique = wardrobe.filter(item => best!.mask & bit(item.id)).map(item => item.id);
  return { outfits: best.outfits, stops, unique, packed: unique.filter(id => !best!.outfits[0].ids.includes(id)), changes: best.changes, weather, anchor, plan };
}

export function changesAt(route: Route, index: number) {
  const before = index ? route.outfits[index - 1].ids : [];
  const after = route.outfits[index].ids;
  return { added: after.filter(id => !before.includes(id)), removed: before.filter(id => !after.includes(id)), kept: after.filter(id => before.includes(id)) };
}

export function explanation(route: Route, index: number): string[] {
  const stop = route.stops[index];
  const outfit = route.outfits[index];
  const reasons = [`${garmentById[route.anchor].name} остаётся во всех трёх комплектах.`];
  if (stop.walking) reasons.push("Для долгой прогулки выбрана обувь, отмеченная в демогардеробе как удобная для ходьбы.");
  if (stop.outdoors && route.weather === "rain") reasons.push("Плащ и ботинки отмечены в этом примере как подходящие для дождя.");
  if (stop.outdoors && route.weather === "cool") reasons.push("Для прохладного этапа добавлены плащ и шарф. В помещении их можно снять.");
  if (stop.outdoors && route.weather === "warm") reasons.push("В тёплом сценарии прогулка обходится без верхнего слоя.");
  if (stop.formality >= 2) {
    const formalPieces = outfit.ids.filter(id => garmentById[id].formality > 0 && garmentById[id].category !== "outer").map(id => garmentById[id].name.toLowerCase()).join(", ");
    reasons.push(outfit.ids.includes("blazer") ? "Жакет делает комплект более собранным для встречи." : `Для встречи использованы более собранные вещи: ${formalPieces}.`);
  }
  if (!stop.walking && stop.formality < 2) reasons.push("У этого этапа повседневный дресс-код: можно сохранить простую и удобную основу.");
  if (index > 0 && changesAt(route, index).added.length === 0 && changesAt(route, index).removed.length === 0) reasons.push("Комплект уже подходит следующему этапу: менять вещи не нужно.");
  return reasons;
}

export function routeSummary(route: Route) {
  return `${route.stops.map(stop => stop.title).join(" → ")}. ${weatherLabels[route.weather]}. Постоянная вещь: ${garmentById[route.anchor].name}. Всего вещей: ${route.unique.length}. Дополнительно: ${route.packed.map(id => garmentById[id].name).join(", ") || "ничего"}.`;
}
