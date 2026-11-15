import assert from "node:assert/strict";
import { fabricTranslation, loopProgressDelta } from "../app/wardrobe/fabric-motion.ts";
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-7, `${actual} != ${expected}`);
close(loopProgressDelta(.98, .02), .04);
close(loopProgressDelta(.02, .98), -.04);
close(fabricTranslation(10, 1280), -10);
close(fabricTranslation(2570, 1280), -10);
close(fabricTranslation(-10, 1280), -2550);
for (const viewport of [320, 768, 1440, 2560]) {
  const length = viewport * 7, tile = Math.max(1280, viewport);
  for (const direction of [1, -1]) {
    let previous = 0, distance = 0;
    for (let i = 1; i <= 1300; i++) {
      const actualDistance = direction * i * 53;
      const progress = ((actualDistance / length) % 1 + 1) % 1;
      distance += loopProgressDelta(previous, progress) * length;
      close(distance, actualDistance);
      const phase = fabricTranslation(distance, tile);
      assert.ok(phase > -2 * tile && phase <= 0, "Four tiles must always cover the viewport");
      close(fabricTranslation(distance + 2 * tile, tile), phase);
      previous = progress;
    }
  }
}
console.log("PASS: fabric follows forward/backward scrolling through repeated loop boundaries; mirrored-tile phase remains continuous at four viewport widths.");
