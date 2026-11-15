// Embla's loop progress wraps once per complete strip, not once per slide.
export function loopProgressDelta(previous: number, current: number) {
  let delta = current - previous;
  if (delta > 0.5) delta -= 1;
  if (delta < -0.5) delta += 1;
  return delta;
}

// Start in the middle copy, so each seam blends over the previous panorama.
export function fabricTranslation(distance: number, period: number) {
  const phase = ((distance % period) + period) % period;
  return -period - phase;
}
