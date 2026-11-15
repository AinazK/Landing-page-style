"use client";

import { useId, useRef } from "react";
import { ArrowUpRight, Check, CloudRain, ScanLine, X } from "lucide-react";
import { GarmentDrawing } from "./garment";
import type { GarmentKind } from "./model";
import "./feature-preview.css";

export type FeatureKind = "consultation" | "capsule" | "palette" | "community" | "weather" | "recognition" | "wardrobe";

function Piece({ id, className = "" }: { id: GarmentKind; className?: string }) {
  return <span className={"fp-piece " + className}><GarmentDrawing id={id} color={id === "coat" ? "#b5a286" : "#e8e2d5"} /></span>;
}
function Hanger() {
  return <svg className="fp-hanger" viewBox="0 0 100 32" fill="none"><path d="M50 14v-3c0-8 13-8 13-1 0 4-6 5-13 4L12 29h76L50 14Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>;
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
  return <div className={"fp-scene fp-" + kind} aria-hidden={kind === "consultation" ? undefined : true}>
    {kind === "consultation" && <ConsultationPreview />}
    {kind === "capsule" && <>
      <div className="fp-capsule-pieces"><Piece id="shirt" className="fp-capsule-shirt" /><Piece id="blazer" className="fp-capsule-blazer" /><Piece id="trousers" className="fp-capsule-trousers" /><Piece id="tee" className="fp-capsule-tee" /><Piece id="sneakers" className="fp-capsule-shoes" /></div>
      <div className="fp-travel-tag"><span>На выходные</span><small>Прогулка · Встреча · Ужин</small></div>
    </>}
    {kind === "palette" && <>
      <div className="fp-swatch-fan"><span className="fp-swatch-cream" /><span className="fp-swatch-rust" /><span className="fp-swatch-olive" /><span className="fp-swatch-blue" /></div>
      <span className="fp-palette-label">Ваша палитра <ArrowUpRight size={20} strokeWidth={1.4} /></span>
      <div className="fp-palette-look"><Piece id="shirt" className="fp-palette-shirt" /><Piece id="trousers" className="fp-palette-trousers" /><Piece id="sneakers" className="fp-palette-shoes" /></div>
    </>}
    {kind === "community" && <>
      <figure className="fp-editorial-photo fp-editorial-flatlay"><img src="/images/capsule-panorama.webp" width={1672} height={941} loading="lazy" alt="" /><figcaption>Детали любимой базы</figcaption></figure>
      <figure className="fp-editorial-photo fp-editorial-look"><img src="/images/chat-outfit.webp" width={1024} height={1536} loading="lazy" alt="" /><figcaption>Идея для выходных</figcaption></figure>
      <span className="fp-loose-caption fp-community-caption">Вдохновение — рядом</span>
    </>}
    {kind === "weather" && <>
      <div className="fp-weather-forecast"><span className="fp-weather-auto">Пример прогноза</span><div><CloudRain size={64} strokeWidth={1.15} /><strong>+12°</strong></div><span className="fp-weather-rain">Прохладно, возможен дождь</span></div>
      <div className="fp-weather-clothes"><Piece id="coat" className="fp-weather-coat" /><Piece id="tee" className="fp-weather-tee" /><Piece id="trousers" className="fp-weather-trousers" /></div>
      <span className="fp-weather-note"><Check size={15} />Плащ уже в подборке</span>
    </>}
    {kind === "recognition" && <>
      <div className="fp-recognition-photo"><img src="/images/chat-outfit.webp" width={1024} height={1536} loading="lazy" alt="" /></div>
      <Piece id="blazer" className="fp-recognized-jacket" />
      <span className="fp-photo-label fp-photo-jacket">Жакет <small>Коричневый</small></span>
      <span className="fp-photo-label fp-photo-tee">Футболка <small>Светлая</small></span>
      <span className="fp-photo-label fp-photo-trousers">Брюки <small>Тёмные</small></span>
      <span className="fp-recognition-note"><ScanLine size={17} />Снимок становится гардеробом</span>
    </>}
    {kind === "wardrobe" && <>
      <div className="fp-wardrobe-rail" />
      <div className="fp-hanging-wardrobe">
        <div className="fp-hung fp-hung-shirt"><Hanger /><Piece id="shirt" /><span>Рубашка</span></div>
        <div className="fp-hung fp-hung-blazer"><Hanger /><Piece id="blazer" /><span>Жакет</span></div>
        <div className="fp-hung fp-hung-tee"><Hanger /><Piece id="tee" /><span>Футболка</span></div>
      </div>
      <Piece id="trousers" className="fp-wardrobe-trousers" /><Piece id="sneakers" className="fp-wardrobe-shoes" />
      <span className="fp-loose-caption fp-wardrobe-caption">Весь шкаф — в одном месте</span>
    </>}
  </div>;
}
