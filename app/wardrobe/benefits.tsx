import { Bookmark, CloudRain } from "lucide-react";
import { GarmentDrawing } from "./garment";

export default function WardrobeBenefits() {
  return <div className="benefit-grid">
    <article className="benefit-card">
      <div className="benefit-preview wardrobe-preview" aria-label="Пример цифрового гардероба">
        <span><GarmentDrawing id="tee" color="#eee9dd" /><small>Футболка</small></span>
        <span><GarmentDrawing id="shirt" color="#bac8cf" /><small>Рубашка</small></span>
        <span><GarmentDrawing id="trousers" color="#65665b" /><small>Брюки</small></span>
      </div>
      <h3>Гардероб из фотографии</h3>
      <p>Загрузите фото на человеке. ИИ автоматически определит категорию, цвет и другие характеристики одежды.</p>
    </article>
    <article className="benefit-card">
      <div className="benefit-preview plans-preview" aria-label="Пример капсулы для поездки на три дня">
        <div><span>Поездка · 3 дня</span><span><CloudRain size={17} strokeWidth={1.4} aria-hidden="true" /> +12°</span></div>
        <strong>Прогулки <span aria-hidden="true">+</span> Ужин</strong>
        <small>Одна капсула. Несколько сочетаний.</small>
      </div>
      <h3>Капсула для поездки</h3>
      <p>Расскажите, куда едете и что планируете. Соберём сочетающиеся вещи под поездку, погоду и поводы.</p>
    </article>
    <article className="benefit-card">
      <div className="benefit-preview saved-preview" aria-label="Пример сохранённого сочетания">
        <div className="saved-garments"><GarmentDrawing id="blazer" color="#75604e" /><GarmentDrawing id="tee" color="#eee9dd" /></div>
        <div><Bookmark size={18} strokeWidth={1.4} aria-hidden="true" /><strong>Тот самый образ</strong><small>Сохранён в избранное</small></div>
      </div>
      <h3>Удачные образы под рукой</h3>
      <p>Сохраните понравившееся сочетание, чтобы быстро вернуться к нему перед выходом.</p>
    </article>
  </div>;
}
