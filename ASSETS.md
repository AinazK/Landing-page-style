# Визуальные материалы

## linen-edge — ткань с естественным прозрачным краем

Отредактирован встроенным ImageGen по исходнику `work/original-assets/linen-background.png`.
Новый PNG: `public/images/linen-edge.png` (1672 × 941, RGBA). Локальная копия: `work/original-assets/linen-edge.png`.
Для сайта используется `public/images/linen-edge.webp` (около 205 КиБ) с сохранённой прозрачностью. PNG сохранён отдельно как редактируемый материал.
Край вырезан в самом изображении; CSS не имитирует его волной. Нижняя область действительно прозрачная, а граница идёт вдоль складки. При проверке нижняя непрозрачная точка в разных столбцах находилась на высотах 738–872 пикселя.

Полный промпт правки:

> Use case: background-extraction / precise-object-edit. Edit target: the supplied ivory linen photograph used as a website section backdrop. Preserve the upper 65 percent of the image, the fine natural weave, its warm ivory palette, lighting, left draped folds and quiet central space. Change ONLY the bottom silhouette: make the photographed linen a single full-width draped cloth with a real exposed lower fabric edge, gently undulating along the existing broad folds, and REMOVE everything below that physical edge to real alpha transparency. The cloth should occupy the top 75-90 percent of the canvas, flush to the full top edge and side edges; bottom 10-25 percent is completely transparent. Bottom silhouette roughly flows from 82 percent height at left, gently up to 74 percent around left-center, down to 90 percent at center-right, then up to 76 percent at far right, naturally following the fold geometry. Preserve subtle woven fibers at the edge, but no torn paper scallops, no huge fringe, no hard rectangular crop, no geometric sinewave or white fade. Slight soft drape shadow attached to fabric is fine. Broad usable opaque center for dark text placed later in code. Same landscape 16:9 composition. Output a genuine RGBA PNG with transparent bottom; NOT a baked checkerboard, not a solid-colored replacement background. No text, no new objects, no graphic shapes.

## linen-background — фон секции «Как это будет работать»

Файл: `public/images/linen-background.webp` (1672 × 941, около 151 КиБ).
Исходник: `work/original-assets/linen-background.png` (локально, не публикуется).
Создан встроенным ImageGen, преобразован в WebP без изменения композиции.

Полный промпт:

> Use case: photorealistic-natural. Asset type: subtle photographic background for a Russian digital wardrobe website. Generate a wide 16:9 landscape editorial macro photograph of softly draped pale warm ivory linen and cotton fabric, with a few large gentle folds entering from the far left and lower right corners, and broad quiet almost flat negative space across the center and upper right. A tiny suggestion of muted sage cloth near the very bottom edge, not a separate object. Real fine woven textile fibers, beautiful diffuse morning window light, delicate soft shadows, sophisticated understated fashion atelier feeling. High key but tactile, all light creamy neutral colors, restrained tonal contrast suitable behind dark text and near-white UI cards. No dramatic dark folds, no bright colors, no red, no objects, no clothing silhouettes, no people, no hands, no logos, no writing, no typography, no border, no UI. One coherent natural photograph, not a gradient or collage. Save a copy into C:/ITMO/sites/ai-stylist/work/original-assets/linen-background.png if filesystem saving is supported.

Созданы встроенным инструментом ImageGen, затем преобразованы в WebP без изменения композиции.

## editorial-wardrobe

Предыдущий вариант, сохранённый в проекте: `public/images/editorial-wardrobe.webp`.
Исходный PNG сохранён локально в `work/original-assets/editorial-wardrobe.png` (не публикуется).

Полный промпт:

> Use case: photorealistic-natural. Asset type: premium fashion editorial image board for a Russian AI wardrobe landing page. Create a landscape 3:2 composition, minimum 1536x1024. A refined contact-sheet composition on warm ivory #f2efe8 background. Exactly the LEFT 58 percent: full-body natural fashion editorial photograph of an adult woman, around 28, dark bob haircut, standing casually against a pale warm stone Parisian-looking wall in diffuse daylight, wearing an oversized dark chocolate brown blazer, ivory plain T-shirt tucked into cream tailored wide-leg trousers, dark brown leather loafers, small structured dark-brown leather handbag. Real texture, understated wearable modern style, unretouched natural beauty, relaxed confident pose looking slightly off camera, full outfit including shoes visible with generous margins. Exactly the RIGHT 42 percent: matching individual garments as clean realistic catalog flatlays on the same ivory background, arranged vertically with generous space: chocolate blazer at top, folded ivory trousers at middle, a pair of brown loafers and small brown bag at bottom. The right garments must closely match what she is wearing. Simple, elegant, sunlit, honest, sophisticated fashion magazine aesthetic, muted film tones, subtle grain. No typography, no labels, no UI, no logos, no border lines, no watermarks, no decorative objects, no additional garments. This is a visual example, not a screenshot.

## city-editorial

Предыдущий вариант, сохранённый в проекте: `public/images/city-editorial.webp`.
Исходный PNG сохранён локально в `work/original-assets/city-editorial.png` (не публикуется).

Полный промпт:

> Use case: photorealistic-natural. Asset type: premium editorial fashion image for a neutral, inclusive AI stylist website. Landscape 3:2 photo, at least 1536x1024. Full-body street-style photograph of an adult man around 30, casually walking beside a light warm limestone architectural wall. He wears an olive-brown relaxed unbuttoned overshirt over a clean white T-shirt, charcoal wide straight trousers, minimal ivory sneakers. One hand in pocket, naturally looking aside, full shoes visible. Natural soft afternoon light, realistic fabric texture, muted warm film tones, premium understated European fashion magazine aesthetic, candid photography. Subject centered in the right half; left half has stone wall and subtle urban architectural lines. No logos, no text, no UI, no watermarks, no advertisements. Tasteful accessible everyday style, not runway costume.



## city-day-hero — текущий первый экран

Файл: `public/images/city-day-hero.webp` (1672 × 941).
Исходник: `work/original-assets/city-day-hero.png`.
Создан встроенным ImageGen, преобразован в WebP без изменения композиции.

Полный промпт:

> Use case: photorealistic-natural. Asset type: full-bleed photographic hero for a sophisticated Russian digital wardrobe and personal stylist website. Generate a very wide cinematic landscape photograph, aspect ratio 16:9, ideally 2048x1152 or larger. A candid real fashion editorial in a quiet European city street, late afternoon after light rain. TWO ADULT FRIENDS around 28-35 walking and talking naturally in the RIGHT HALF of the frame, an adult woman with natural dark shoulder-length hair wearing a relaxed navy overshirt over an ivory cotton T-shirt, graphite straight trousers, ivory sneakers and a small burnt red-orange leather shoulder bag; an adult man in a taupe trench coat, dark knit top, straight indigo denim and brown shoes. Expressive natural movement, candid smiles, not posed as a couple, authentic diverse everyday bodies, clothing clearly visible. The LEFT 45 percent is uncluttered deep shaded olive-grey stone facade and a softly lit dark doorway, intentionally quiet, dark enough for white website text that will be added separately. Full-body subjects with all shoes visible; reserve extra room above heads and below shoes for responsive cropping. Street texture, subtle puddle reflections, a few scattered leaves, beautiful lived-in stone architecture, linen/cotton/leather texture, realistic hands and facial proportions, tactile fabric movement. Cinematic premium documentary photography, 35mm film character, natural color, rich but restrained warm-cool contrast. No visible brands, NO TYPOGRAPHY, no captions, no logos, no watermarks, no UI, no montage, no split screen, no artificial glow, no glossy plastic skin. The picture should be worth looking at in full screen.

## capsule-panorama — текущая большая фотосекция

Файл: `public/images/capsule-panorama.webp` (1672 × 941).
Исходник: `work/original-assets/capsule-panorama.png`.
Создан встроенным ImageGen, преобразован в WebP без изменения композиции.

Полный промпт:

> Use case: product-mockup / photorealistic-natural. Asset type: huge photographic wardrobe panorama for a digital wardrobe website, a highly detailed scene people want to look at. Create a wide landscape 16:9 photograph, ideally 2048x1152 or larger. Straight overhead documentary fashion still-life of a thoughtfully chosen everyday capsule wardrobe laid out on a large warm pale canvas-covered worktable, with gentle window light from the upper left. EXACTLY these eleven garment groups, each clearly recognizable and separated enough to read: an ivory plain cotton T-shirt; a sky-blue cotton button-down shirt; charcoal tailored trousers; straight indigo jeans; a chocolate-brown relaxed blazer; an olive overshirt; a beige trench coat; a pair of minimal off-white sneakers; a pair of brown leather loafers; a pair of dark charcoal ankle boots; a rust red-orange wool scarf. Garments naturally folded or lightly draped, not a perfect rigid grid: some overlap and a few diagonal sleeves, carefully composed like a skilled wardrobe stylist's real working table. The trench is open on the upper right with its belt resting naturally; denim and knit textures on the left; a white T-shirt near the center; the red-orange scarf casually crossing the bottom middle adds a vivid but small accent. Lots of tactile detail: cotton seams, wool fibers, leather grain, the inside lining of a jacket, believable wrinkles, soft real shadows. A slightly imperfect arrangement, sophisticated natural colors, quiet and human. Every garment should look like a genuine ordinary owned item, not an AI fantasy garment or a shiny new commercial product. All items within the frame; wide balanced composition with meaningful detail across the full image. No people, no mannequins, no floating cutout items, no labels, no text, no typography, no logos, no watermarks, no UI, no border or split-screen. This is one cohesive photograph of a real capsule wardrobe, not a collage.

