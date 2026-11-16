# Seaside capsule illustrations

Mode: built-in `image_gen.imagegen`, new images with transparent backgrounds. No CLI/API fallback.

Delivery encoding: lossless WebP, 1024 × 1536, with the original alpha channel and no resizing or visual edits. Original PNGs are retained locally in `work/sea-capsule-originals/`.

Each illustration is one complete outfit flat lay. The ten-piece packing list is shared across all three examples. The walking outfit also received a targeted edit to match the shared hat and tote.

## Consistency edit for walking outfit

Final consistency edit for `walk.webp` (Image 1: original walking outfit; Image 2: beach outfit as hat/tote reference):

```text
Use case: precise-object-edit. Image 1 is the edit target: the five-item seaside walk flat lay. Image 2 is a reference only for the exact hat and straw tote used in the same travel capsule. Change ONLY the straw hat and woven tote in Image 1: replace the hat with the unbanded straw sun hat from Image 2, and replace the striped tote with the plain woven straw tote from Image 2, with no red stripes. Keep their current overall placement and size in Image 1. Keep the cream T-shirt, ivory linen trousers, cream top-view sneakers, illustration style, lighting, texture, composition and dimensions of Image 1 unchanged. Preserve the existing genuinely transparent alpha background and transparency between objects. No new objects, no text, no floor or background.
```

## beach

Saved asset: `public/images/sea-capsule/beach.webp`

Final prompt:

```text
Use case: stylized-concept.
Asset type: one finished illustration for a Russian fashion website's seaside travel capsule; used inside a tall narrow outfit card.
Style: refined low-fi hand-painted watercolor and colored-pencil fashion flat lay, textured fabric rendering, subtle fine dark contours, warm muted cream/sand/terracotta palette, relaxed vacation clothing. Not photorealistic, not generic vector icons.
Viewpoint: strictly overhead orthographic flat lay. Complete objects, carefully spaced with only slight natural overlaps, tall portrait composition, generous transparent margins. Shoes must be viewed directly from above, not at an oblique angle.
Background: genuinely transparent alpha, no white rectangle, no scene or floor, no scenery, no text, no logos, no watermark, no people or mannequins, no hangers. No objects other than those explicitly listed.
Primary request: Exactly SIX items for a beach day: an open ivory lightweight linen button-down shirt with rolled sleeves; a plain muted terracotta adult one-piece swimsuit; sand beige linen shorts; one matching PAIR of simple tan leather flat sandals viewed directly from above; a natural straw wide-brim sun hat; a medium woven straw tote bag with two rounded handles. Make all six distinct and fully visible. Keep the open shirt visibly separate from the swimsuit. Relaxed sun-ready vacation style.
```

## walk

Saved asset: `public/images/sea-capsule/walk.webp`

Final prompt:

```text
Use case: stylized-concept.
Asset type: one finished illustration for a Russian fashion website's seaside travel capsule; used inside a tall narrow outfit card.
Style: refined low-fi hand-painted watercolor and colored-pencil fashion flat lay, textured fabric rendering, subtle fine dark contours, warm muted cream/sand/terracotta palette, relaxed vacation clothing. Not photorealistic, not generic vector icons.
Viewpoint: strictly overhead orthographic flat lay. Complete objects, carefully spaced with only slight natural overlaps, tall portrait composition, generous transparent margins. Shoes must be viewed directly from above, not at an oblique angle.
Background: genuinely transparent alpha, no white rectangle, no scene or floor, no scenery, no text, no logos, no watermark, no people or mannequins, no hangers. No objects other than those explicitly listed.
Primary request: Exactly FIVE items for a seaside town walk: a plain cream cotton short-sleeve crew-neck T-shirt; ivory lightweight full-length wide-leg linen trousers; one matching PAIR of cream canvas low-top sneakers viewed directly from above with tan soles and tiny muted rust heel tabs; a natural straw wide-brim sun hat; a medium woven straw tote bag with two rounded handles. All five distinct and fully visible. The straw hat and tote should be simple classic pieces coordinated with an ivory-and-terracotta vacation capsule.
```

## evening

Saved asset: `public/images/sea-capsule/evening.webp`

Final prompt:

```text
Use case: stylized-concept.
Asset type: one finished illustration for a Russian fashion website's seaside travel capsule; used inside a tall narrow outfit card.
Style: refined low-fi hand-painted watercolor and colored-pencil fashion flat lay, textured fabric rendering, subtle fine dark contours, warm muted cream/sand/terracotta palette, relaxed vacation clothing. Not photorealistic, not generic vector icons.
Viewpoint: strictly overhead orthographic flat lay. Complete objects, carefully spaced with only slight natural overlaps, tall portrait composition, generous transparent margins. Shoes must be viewed directly from above, not at an oblique angle.
Background: genuinely transparent alpha, no white rectangle, no scene or floor, no scenery, no text, no logos, no watermark, no people or mannequins, no hangers. No objects other than those explicitly listed.
Primary request: Exactly FOUR items for dinner on a seaside terrace: a muted terracotta sleeveless midi slip dress with thin shoulder straps and a soft flowing hem; an ivory lightweight linen button-down shirt with rolled sleeves, folded beside the dress as a light evening layer; one matching PAIR of simple tan leather flat sandals viewed directly from above; a medium woven straw tote bag with two rounded handles. All four distinct and fully visible. Same relaxed natural-material vacation capsule as an ivory linen shirt, straw hat and terracotta swimsuit. Do not add jewelry, sunglasses, a hat, or other extras.
```
