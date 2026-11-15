# Панорама льна

Создана встроенным `image_gen.imagegen`, режим редактирования/расширения по референсу `public/images/linen-edge.webp`, `transparent_background: true`. Фрагменты не зеркалируются. Формат преобразован в WebP с сохранением alpha (quality 88, alphaQuality 100), без изменения композиции.

Файлы 2172×724:

- `public/images/fabric-panorama/drape.webp`
- `public/images/fabric-panorama/diagonal.webp`
- `public/images/fabric-panorama/roll.webp`

Три изображения соединяются в CSS с перекрытием и мягкой маской. Это позволяет сохранить натуральную текстуру и органичный нижний край без сильного растягивания одного изображения.

В интерфейсе используются верхние 82% каждого изображения, без его собственного полупрозрачного подола. Общая векторная маска `public/images/fabric-panorama/edge-mask.svg` задаёт один нижний контур всей движущейся полосы. Это исключает двойной край при наложении разных панелей; концы контура совпадают по высоте и горизонтальной касательной.

## Промпты

### drape

Use case: precise-object-edit / outpainting. Edit target: the attached cream linen textile website background. Create a NEW MUCH WIDER panoramic extension, ultra-wide 7:1 aspect ratio, ideally 7168 x 1024. This is one single continuous long sheet of ivory linen for a fashion landing-page carousel, NOT seven duplicated or mirrored panels. Preserve the same soft warm cream colour, natural fine linen weave, diffuse daylight, restrained low contrast and gentle couture fabric feeling. Extend horizontally into several distinct gently flowing cloth folds: a soft drape near the first fifth, a shallow rolling fold near the middle, a thin diagonal fold in the last third, lots of calm cloth area for dark UI text. Upper 85% of canvas must be fully opaque linen across the entire width with no transparent holes. Along the lowest 10–15% only, let a natural fabric hem form shallow organic waves with genuine transparent alpha beneath it. Keep this edge low everywhere so website controls remain on fabric. Far left and far right edges should be calm nearly flat linen with matching lighting and texture, suitable for a subtle loop join. No vertical seams, no duplicated composition, no mirrored folds, no vignette, no objects, no clothing items, no text, no gradients to white, no checkerboard baked in. The fabric is itself the background; preserve transparency below the hem. Important: output an extremely wide panorama, not a square or ordinary landscape.

### diagonal

Edit target: cream linen background reference. Generate a NEW middle continuation panel for a very long horizontal website cloth panorama. Output extra-wide landscape 3:1. Same ivory cream linen weave and soft neutral daylight, light low-contrast off-white, NOT yellow. Entire upper90% opaque. This panel is DIFFERENT from reference: no large piled drape at left. Instead a very shallow elegant diagonal linen fold crosses from upper middle towards right lower quarter; small gentle rolling hem below. Keep almost all central area calm finely woven linen for dark text. Along lowest8% a small irregular natural hem, actual transparent alpha under it. At both vertical edges keep flat plain uniform ivory linen and shallow level matching low hem, no dramatic folds, no shadows: will meet other panorama panels. No text, no objects, no decorations, no duplicated reference composition, no mirrored fabric. Don't add checkerboard. Need a quiet continuous extension with DISTINCT fold placement, maintaining reference material and lighting.

### roll

Edit target cream linen image. Create a NEW right-hand extension panel for a continuous extra-wide linen fabric website panorama, landscape 3:1. Same warm off-white linen, fine authentic woven texture, diffuse lowcontrast daylight as reference. Do NOT repeat the large left folds of reference. Here a broad very soft rolling fold rises gently from lowerleft to upperright in the far-right third, with a calm smooth generous textile field in firsttwo-thirds. No dramaticshadow; textmustremainreadableoverit. Top90% entirely opaque cloth. Lowest8% only natural subtly undulating fabrichem with genuine transparent alpha underneath. Make both left and right vertical edges plain nearflat matching-ivory weave and uniform illumination, no contrastingborder; designedfor seamlesssoftblendintoothertextilepanels. Verylightlowcontrast. No objects, no labels, no text, no checkerboard, no artificialwaves, no mirrors. A distinct photographic detail of ONE long flowing sheet, not duplicated copy of reference.
