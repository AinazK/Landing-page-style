export default function WardrobeLab() {
  return (
    <section className="lab-section" id="wardrobe-lab" aria-labelledby="lab-heading">
      <div className="example-heading wrap">
        <div><span className="eyebrow">Знакомые вещи, новые сочетания</span><h2 id="lab-heading">У вашего гардероба<br />есть продолжение</h2></div>
      </div>

      <div className="wrap">
        <div className="example-stages">
          <article><div className="example-time"><span>Утро</span><time>09:00</time></div><h3>Рабочая встреча</h3><p>Футболка, брюки, кеды и жакет — основа на весь день.</p></article>
          <article><div className="example-time"><span>День</span><time>14:00</time></div><h3>Прогулка по городу</h3><p>Стало прохладнее — добавьте плащ и шарф.</p></article>
          <article><div className="example-time"><span>Вечер</span><time>19:00</time></div><h3>Ужин с друзьями</h3><p>Снимите верхние слои. Знакомый комплект готов к вечеру.</p></article>
        </div>

        <p className="example-caption">Пример на готовом гардеробе. Персональный подбор разрабатываем для веб-приложения.</p>
      </div>

      <figure className="wardrobe-panorama">
        <img src="/images/capsule-panorama.webp" width={1672} height={941} loading="lazy" alt="Капсула одежды на большом столе: хлопковые футболка и рубашки, джинсы, брюки, жакет, плащ, три пары обуви и шерстяной шарф" />
      </figure>
    </section>
  );
}
