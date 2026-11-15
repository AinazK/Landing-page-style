import assert from "node:assert/strict";
import { fabricTranslation, loopProgressDelta } from "../app/wardrobe/fabric-motion.ts";
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-7, `${actual} != ${expected}`);
close(loopProgressDelta(.98, .02), .04);
close(loopProgressDelta(.02, .98), -.04);
close(fabricTranslation(10, 9000), -9010);
close(fabricTranslation(9010, 9000), -9010);
close(fabricTranslation(-10, 9000), -17990);
for (const viewport of [320, 768, 1440, 2560]) {
  const length = viewport * 7, period = Math.max(viewport * 3, 1100 * 9);
  for (const direction of [1, -1]) {
    let previous = 0, distance = 0;
    for (let i = 1; i <= 1300; i++) {
      const actualDistance = direction * i * 53;
      const progress = ((actualDistance / length) % 1 + 1) % 1;
      distance += loopProgressDelta(previous, progress) * period;
      close(distance, actualDistance / length * period);
      const phase = fabricTranslation(distance, period);
      assert.ok(phase > -2 * period - 1e-7 && phase <= -period + 1e-7, "Three copies must always cover the viewport and blend over the preceding panel");
      close(fabricTranslation(distance + period, period), phase);
      previous = progress;
    }
  }
  // Seven selected functions each see a different section; only the full loop repeats.
  const positions=Array.from({length:7},(_,index)=>fabricTranslation(index / 7 * period,period));
  assert.equal(new Set(positions).size,7);
  close(fabricTranslation(period,period),fabricTranslation(0,period));
}
console.log("PASS: seven distinct panorama positions, continuous forward/backward looping, full coverage at four viewport widths.");
