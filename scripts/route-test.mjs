import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { buildRoute, changesAt, explanation, garmentById, routeSummary, wardrobe } from "../app/wardrobe/model.ts";

const start = performance.now();
let valid = 0; let conflicts = 0;
for (const plan of ["work", "study"]) for (const weather of ["warm", "cool", "rain"]) for (const anchor of ["tee", "trousers", "sneakers"]) {
  const route = buildRoute(plan, weather, anchor);
  if (weather === "rain" && anchor === "sneakers") {
    assert.equal(route, null, "Dry-weather pinned shoes must produce an explicit conflict"); conflicts++; continue;
  }
  assert.ok(route); valid++;
  assert.equal(route.outfits.length, 3);
  route.outfits.forEach((outfit, i) => {
    assert.ok(outfit.ids.includes(anchor), "The pinned item cannot disappear");
    for (const category of ["top", "bottom", "shoes"]) assert.equal(outfit.ids.filter(id => garmentById[id].category === category).length, 1);
    assert.ok(outfit.ids.every(id => wardrobe.some(item => item.id === id)), "No invented garments");
    const stop = route.stops[i];
    assert.ok(outfit.ids.reduce((n, id) => n + garmentById[id].formality, 0) >= stop.formality);
    if (stop.walking) assert.ok(outfit.ids.filter(id => garmentById[id].category === "shoes").every(id => garmentById[id].walking));
    if (weather === "rain") assert.ok(outfit.ids.includes("boots"));
    if (stop.outdoors && weather !== "warm") assert.ok(outfit.ids.includes("coat"));
    if (stop.outdoors && weather === "cool") assert.ok(outfit.ids.includes("scarf"));
    if (stop.outdoors && weather === "warm") assert.ok(!outfit.ids.includes("coat") && !outfit.ids.includes("blazer"));
    assert.ok(explanation(route, i).length >= 2);
    const delta = changesAt(route, i);
    if (i) {
      const reconstructed = route.outfits[i - 1].ids.filter(id => !delta.removed.includes(id)).concat(delta.added).sort();
      assert.deepEqual(reconstructed, [...outfit.ids].sort(), "Change receipts must match the displayed outfit");
    }
  });
  assert.deepEqual(route.packed.slice().sort(), route.unique.filter(id => !route.outfits[0].ids.includes(id)).sort());
  assert.ok(routeSummary(route).length <= 800);
  assert.deepEqual(route, buildRoute(plan, weather, anchor), "Results must be deterministic");
}
const elapsed = performance.now() - start;
assert.ok(elapsed < 4000, "Interactive search should remain responsive");
console.log(`PASS: ${valid} valid day routes, ${conflicts} explicit conflicts; pinned items, weather, walking, dress code, change receipts, packing lists and summaries (${Math.round(elapsed)} ms).`);
