"use client";

import { useId, useRef } from "react";
import { ArrowRight, ArrowUpRight, CloudRain, ScanLine, X } from "lucide-react";
import { GarmentDrawing } from "./garment";
import type { GarmentKind } from "./model";
import "./feature-preview.css";

export type FeatureKind = "consultation" | "capsule" | "palette" | "community" | "weather" | "recognition" | "wardrobe";

function Piece({ id, className = "" }: { id: GarmentKind; className?: string }) {
  return <span className={"fp-piece " + className}><GarmentDrawing id={id} color={id === "coat" ? "#b5a286" : "#e8e2d5"} /></span>;
}
function ConsultationPreview() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const dialogId = useId();
  const titleId = useId();
  const noteId = useId();

  return <>
    <div className="fp-chat-thread" aria-label="Пример консультации со стилистом">
      <div className="fp-chat-question">С чем носить этот жакет?</div>
      <div className="fp-chat-answer">
        <span className="fp-chat-brand">Стилистика</span>
        <p>Я бы сочетал этот жакет с белой футболкой, тёмными брюками и светлыми кедами из вашего гардероба. Получится спокойный образ для прогулки или встречи.</p>
        <button ref={opener} type="button" className="fp-chat-outfit" aria-haspopup="dialog" aria-controls={dialogId} onClick={() => {
          if (!dialog.current?.open) dialog.current?.showModal();
        }}>
          <img src="/images/chat-outfit.webp" width={1024} height={1536} loading="lazy" alt="" />
          <span>Посмотрите образ,<br />который я собрал для вас</span>
          <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
    <div className="fp-chat-look" aria-hidden="true"><Piece id="blazer" className="fp-chat-blazer" /><Piece id="tee" className="fp-chat-tee" /><Piece id="trousers" className="fp-chat-trousers" /><Piece id="sneakers" className="fp-chat-shoes" /></div>
    <dialog ref={dialog} id={dialogId} className="fp-outfit-dialog" aria-labelledby={titleId} aria-describedby={noteId} onClose={() => opener.current?.focus()} onKeyDown={event => event.stopPropagation()} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
    }}>
      <button type="button" className="fp-outfit-close" autoFocus onClick={() => dialog.current?.close()} aria-label="Закрыть образ"><X size={20} strokeWidth={1.5} aria-hidden="true" /></button>
      <div className="fp-outfit-layout">
        <figure className="fp-outfit-photo"><img src="/images/chat-outfit.webp" width={1024} height={1536} alt="Образ с белой футболкой, шоколадным жакетом, тёмными брюками и светлыми кедами. Плащ — на руке." /></figure>
        <div className="fp-outfit-details">
          <span className="fp-outfit-kicker">Собрано стилистом</span>
          <h3 id={titleId}>Ваши вещи.<br /><span>Один готовый образ.</span></h3>
          <p className="fp-outfit-occasion">Для прогулки или встречи</p>
          <dl className="fp-outfit-items">
            <div><dt>01</dt><dd>Белая футболка</dd></div>
            <div><dt>02</dt><dd>Шоколадный жакет</dd></div>
            <div><dt>03</dt><dd>Тёмные брюки</dd></div>
            <div><dt>04</dt><dd>Светлые кеды</dd></div>
          </dl>
          <p id={noteId} className="fp-outfit-note">Пример будущей рекомендации Стилистики. На прохладный вечер можно взять плащ.</p>
        </div>
      </div>
    </dialog>
  </>;
}

export default function FeaturePreview({ kind }: { kind: FeatureKind }) {
  return <div className={"fp-scene fp-" + kind}>
    {kind === "consultation" && <ConsultationPreview />}
    {kind === "capsule" && <>
      <div className="fp-capsule-pieces"><Piece id="shirt" className="fp-capsule-shirt" /><Piece id="blazer" className="fp-capsule-blazer" /><Piece id="trousers" className="fp-capsule-trousers" /><Piece id="tee" className="fp-capsule-tee" /><Piece id="sneakers" className="fp-capsule-shoes" /></div>
      <div className="fp-travel-tag"><span>На выходные</span><small>Прогулка · Встреча · Ужин</small></div>
    </>}
    {kind === "palette" && <>
      <div className="fp-swatch-fan" aria-hidden="true"><span className="fp-swatch-cream" /><span className="fp-swatch-chocolate" /><span className="fp-swatch-graphite" /></div>
      <div className="fp-palette-tones"><span>Молочный</span><span>Шоколадный</span><span>Графитовый</span></div>
      <div className="fp-palette-look" aria-hidden="true"><Piece id="tee" className="fp-palette-tee" /><Piece id="blazer" className="fp-palette-blazer" /><Piece id="trousers" className="fp-palette-trousers" /></div>
    </>}
    {kind === "community" && <>
      <span className="fp-example-label">Пример публикаций</span>
      <div className="fp-community-posts">
        <article className="fp-community-post">
          <figure className="fp-post-photo"><img src="/images/chat-outfit.webp" width={1024} height={1536} loading="lazy" alt="Повседневный образ с шоколадным жакетом, белой футболкой и тёмными брюками" /></figure>
          <div className="fp-post-copy"><span>Подпись автора</span><p>Собрала образ для прогулки: футболка, жакет и светлые кеды.</p></div>
          <div className="fp-post-comment"><span>Пример обсуждения</span><p><b>Вопрос:</b> А если вечером прохладно?</p><p><b>Автор:</b> Добавила бы плащ поверх жакета.</p></div>
        </article>
        <article className="fp-community-post">
          <figure className="fp-post-photo"><img src="/images/community-city-look.webp" width={1024} height={1536} loading="lazy" alt="Другой повседневный образ в городе: светлый верх, тёмный низ и нейтральные кеды" /></figure>
          <div className="fp-post-copy"><span>Подпись автора</span><p>Светлый верх, тёмный низ и кеды — мой вариант на весь день.</p></div>
        </article>
      </div>
    </>}
    {kind === "weather" && <>
      <div className="fp-weather-forecast">
        <span className="fp-example-label">Пример автоматического прогноза</span>
        <strong>+12°</strong><div className="fp-weather-conditions"><CloudRain size={40} strokeWidth={1.2} aria-hidden="true" /><span>Дождь<small>Погода в вашем городе</small></span></div>
      </div>
      <div className="fp-weather-selection">
        <figure className="fp-weather-layer"><Piece id="coat" /><figcaption><strong>Плащ</strong><span>Верхний слой от дождя</span></figcaption></figure>
        <figure className="fp-weather-base"><div className="fp-weather-basics" aria-hidden="true"><Piece id="tee" /><Piece id="trousers" /><Piece id="sneakers" /></div><figcaption><strong>Базовый комплект</strong><span>Футболка, брюки и кеды</span></figcaption></figure>
      </div>
    </>}
    {kind === "recognition" && <>
      <div className="fp-recognition-heading"><ScanLine size={18} strokeWidth={1.5} aria-hidden="true" /><span>Пример распознавания по фото</span></div>
      <div className="fp-recognition-process">
        <figure className="fp-recognition-source"><figcaption>Фото на человеке</figcaption><div className="fp-recognition-photo"><img src="/images/chat-outfit.webp" width={1024} height={1536} loading="lazy" alt="На фотографии отмечены жакет — 1, футболка — 2 и брюки — 3" /><span className="fp-photo-marker fp-marker-jacket" aria-hidden="true">1</span><span className="fp-photo-marker fp-marker-tee" aria-hidden="true">2</span><span className="fp-photo-marker fp-marker-trousers" aria-hidden="true">3</span></div></figure>
        <ArrowRight className="fp-recognition-arrow" size={21} strokeWidth={1.4} aria-hidden="true" />
        <div className="fp-recognition-results"><span className="fp-result-heading">Пример результата</span><ol>
          <li><span className="fp-result-number" aria-hidden="true">1</span><dl><div><dt>Категория</dt><dd>Жакет</dd></div><div><dt>Цвет</dt><dd>Коричневый</dd></div><div><dt>Крой</dt><dd>Прямой, длинный рукав</dd></div></dl></li>
          <li><span className="fp-result-number" aria-hidden="true">2</span><dl><div><dt>Категория</dt><dd>Футболка</dd></div><div><dt>Цвет</dt><dd>Белый</dd></div><div><dt>Вырез</dt><dd>Круглый</dd></div></dl></li>
          <li><span className="fp-result-number" aria-hidden="true">3</span><dl><div><dt>Категория</dt><dd>Брюки</dd></div><div><dt>Цвет</dt><dd>Графитовый</dd></div><div><dt>Крой</dt><dd>Прямой</dd></div></dl></li>
        </ol></div>
      </div>
    </>}
    {kind === "wardrobe" && <>
      <span className="fp-example-label">Вещи в вашем цифровом гардеробе</span>
      <div className="fp-wardrobe-grid">
        <figure><Piece id="shirt" /><figcaption>Рубашка</figcaption></figure>
        <figure><Piece id="blazer" /><figcaption>Жакет</figcaption></figure>
        <figure><Piece id="tee" /><figcaption>Футболка</figcaption></figure>
        <figure><Piece id="trousers" /><figcaption>Брюки</figcaption></figure>
        <figure><Piece id="sneakers" /><figcaption>Кеды</figcaption></figure>
      </div>
    </>}
  </div>;
}
