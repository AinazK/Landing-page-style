import { buildRoute, garmentById } from "./model";

const example = buildRoute("work", "cool", "tee")!;
const baseNames = example.outfits[0].ids.map(id => garmentById[id].name.toLowerCase()).join(", ");

export default function WardrobeLab() {
  return (
    <section className="lab-section" id="wardrobe-lab" aria-labelledby="lab-heading">
      <div className="example-heading wrap">
        <div><span className="eyebrow">Знакомые вещи, новые сочетания</span><h2 id="lab-heading">У вашего гардероба<br />есть продолжение</h2></div>
        <p>Любимая футболка, удобная обувь, жакет, который давно с вами. Начнём с этих вещей и посмотрим, как они могут работать вместе в течение дня.</p>
      </div>

      <figure className="wardrobe-panorama">
        <img src="/images/capsule-panorama.webp" width={1672} height={941} loading="lazy" alt="Капсула одежды на большом столе: хлопковые футболка и рубашки, джинсы, брюки, жакет, плащ, три пары обуви и шерстяной шарф" />
        <figcaption>Один гардероб — много поводов выйти из дома.</figcaption>
      </figure>

      <div className="wrap">
        <div className="example-base">
          <div><span className="eyebrow">Основа на день</span><p>{baseNames}.</p></div>
          <div><span className="eyebrow">С собой на прогулку</span><p>Плащ и шарф. Основной комплект остаётся с вами.</p></div>
        </div>

        <div className="example-stages">
          <article><div className="example-time"><span>Утро</span><time>09:00</time></div><h3>Рабочая встреча</h3><p>Футболка, брюки и кеды остаются привычной основой. Жакет делает комплект более собранным.</p><span className="example-action">Надеть базовый комплект</span></article>
          <article><div className="example-time"><span>День</span><time>14:00</time></div><h3>Прогулка по городу</h3><p>На улице прохладно. Поверх того же комплекта добавляем плащ и шарф из гардероба.</p><span className="example-action">Добавить плащ и шарф</span></article>
          <article><div className="example-time"><span>Вечер</span><time>19:00</time></div><h3>Ужин с друзьями</h3><p>В помещении верхние слои можно снять. Основа с жакетом уже подходит для вечера.</p><span className="example-action">Снять плащ и шарф</span></article>
        </div>

        <p className="example-caption">Это иллюстрация на готовом гардеробе. Персональный подбор из ваших вещей разрабатывается для приложения.</p>
      </div>
    </section>
  );
}
