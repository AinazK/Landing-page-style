import { GarmentDrawing } from "./garment";
import { buildRoute, garmentById } from "./model";

const example = buildRoute("work", "cool", "tee")!;
const base = example.outfits[0].ids;

export default function WardrobeLab() {
  return (
    <section className="lab-section" id="wardrobe-lab" aria-labelledby="lab-heading">
      <div className="wrap">
        <div className="example-heading">
          <div>
            <span className="eyebrow">Пример работы</span>
            <h2 id="lab-heading">Как один комплект проходит через день</h2>
          </div>
          <p>Встреча утром, прогулка при +11° и ужин вечером. Основу сохраняем, верхние слои меняем по ситуации.</p>
        </div>

        <div className="example-base">
          <p>Основа на весь день</p>
          <ul>{base.map(id => <li key={id}><GarmentDrawing id={id} color={garmentById[id].color} /><span>{garmentById[id].name}</span></li>)}</ul>
        </div>

        <div className="example-stages">
          <article>
            <div className="example-time"><span>Утро</span><time>09:00</time></div>
            <h3>Рабочая встреча</h3>
            <p>Футболка, брюки и кеды остаются привычной основой. Жакет делает комплект более собранным.</p>
            <span className="example-action">Надеть базовый комплект</span>
          </article>
          <article>
            <div className="example-time"><span>День</span><time>14:00</time></div>
            <h3>Прогулка по городу</h3>
            <p>На улице прохладно. Поверх того же комплекта добавляем плащ и шарф из гардероба.</p>
            <span className="example-action">Добавить плащ и шарф</span>
          </article>
          <article>
            <div className="example-time"><span>Вечер</span><time>19:00</time></div>
            <h3>Ужин с друзьями</h3>
            <p>В помещении верхние слои можно снять. Основа с жакетом уже подходит для вечера.</p>
            <span className="example-action">Снять плащ и шарф</span>
          </article>
        </div>

        <div className="example-caption">
          <p><strong>Взять с собой:</strong> плащ и шарф. Остальные вещи уже на вас.</p>
          <p>Это иллюстрация на готовом гардеробе. Персональный подбор из ваших вещей разрабатывается для приложения.</p>
        </div>
      </div>
    </section>
  );
}
