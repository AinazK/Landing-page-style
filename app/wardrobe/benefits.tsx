import { Bookmark, Sun } from "lucide-react";
import { GarmentDrawing } from "./garment";

export default function WardrobeBenefits() {
  return <div className="benefit-grid">
    <article className="benefit-card">
      <div className="benefit-preview wardrobe-preview" aria-label="Пример цифрового гардероба">
        <span><GarmentDrawing id="tee" color="#eee9dd" /><small>Футболка</small></span>
        <span><GarmentDrawing id="shirt" color="#bac8cf" /><small>Рубашка</small></span>
        <span><GarmentDrawing id="trousers" color="#65665b" /><small>Брюки</small></span>
      </div>
      <h3>Вещи перед глазами</h3>
      <p>Соберите гардероб в одном месте. Вспомните даже то, что давно не носили.</p>
    </article>
    <article className="benefit-card">
      <div className="benefit-preview plans-preview" aria-label="Пример планов и погоды">
        <div><span>Ваш день</span><span><Sun size={17} strokeWidth={1.4} aria-hidden="true" /> +11°</span></div>
        <strong>Встреча <span aria-hidden="true">→</span> Прогулка</strong>
        <small>Один комплект. Под разные планы.</small>
      </div>
      <h3>Сочетания под ваши планы</h3>
      <p>Из вашей одежды — с учётом погоды, повода и того, в чём вам удобно.</p>
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
