import { GarmentDrawing } from "./garment";

export default function WardrobeLab() {
  return (
    <section className="lab-section" id="wardrobe-lab" aria-labelledby="lab-heading">
      <div className="example-heading wrap">
        <div><span className="eyebrow">Знакомые вещи, новые сочетания</span><h2 id="lab-heading">У вашего гардероба<br />есть продолжение</h2></div>
      </div>

      <div className="wrap">
        <div className="day-composition">
          <div className="day-base">
            <span className="eyebrow">Основа остаётся с вами</span>
            <div className="day-garments"><GarmentDrawing id="tee" color="#eee9dd" /><GarmentDrawing id="trousers" color="#65665b" /><GarmentDrawing id="sneakers" color="#ddd9cb" /></div>
            <p>Футболка, брюки и удобные кеды.</p>
          </div>
          <div className="day-changes">
            <h3>Меняются планы —<br />не весь комплект.</h3>
            <ol>
              <li><time>09:00</time><div><strong>На встречу</strong><p>Добавьте жакет — образ собран.</p></div></li>
              <li><time>14:00</time><div><strong>На прогулку</strong><p>Стало прохладно? Возьмите плащ и шарф.</p></div></li>
              <li><time>19:00</time><div><strong>На ужин</strong><p>Снимите верхний слой. Вы уже готовы.</p></div></li>
            </ol>
          </div>
        </div>
        <p className="example-caption">Иллюстрация идеи на готовом гардеробе. Персональный подбор — в разработке.</p>
      </div>

      <figure className="wardrobe-panorama">
        <img src="/images/capsule-panorama.webp" width={1672} height={941} loading="lazy" alt="Капсула одежды на большом столе: хлопковые футболка и рубашки, джинсы, брюки, жакет, плащ, три пары обуви и шерстяной шарф" />
      </figure>
    </section>
  );
}
