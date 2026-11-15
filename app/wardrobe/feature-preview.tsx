import { ArrowUpRight, Bookmark, Check, CloudRain, Heart, Layers, ScanLine } from "lucide-react";
import { GarmentDrawing } from "./garment";
import type { GarmentKind } from "./model";
import "./feature-preview.css";

export type FeatureKind = "consultation" | "capsule" | "palette" | "community" | "weather" | "recognition" | "wardrobe";

function Piece({ id, className = "" }: { id: GarmentKind; className?: string }) {
  return <span className={`fp-piece ${className}`}><GarmentDrawing id={id} color={id === "coat" ? "#b5a286" : "#e8e2d5"} /></span>;
}

export default function FeaturePreview({ kind }: { kind: FeatureKind }) {
  return <div className={`fp-scene fp-${kind}`} aria-hidden="true">
    {kind === "consultation" && <>
      <div className="fp-chat-top"><span className="fp-ai-badge">ИИ</span><span>Ваш стилист</span></div>
      <div className="fp-chat-question">Этот жакет подойдёт к моим вещам?</div>
      <div className="fp-chat-answer"><p>Попробуйте с белой футболкой и тёмными брюками.</p><div className="fp-chat-look"><Piece id="blazer" /><Piece id="tee" /><Piece id="trousers" /></div></div>
      <span className="fp-footnote">Совет с опорой на ваш гардероб</span>
    </>}
    {kind === "capsule" && <>
      <div className="fp-caption"><span><Layers size={16} strokeWidth={1.5} />Капсула на выходные</span><Bookmark size={17} strokeWidth={1.5} /></div>
      <div className="fp-capsule-pieces"><Piece id="shirt" className="fp-capsule-shirt" /><Piece id="blazer" className="fp-capsule-blazer" /><Piece id="trousers" className="fp-capsule-trousers" /><Piece id="tee" className="fp-capsule-tee" /><Piece id="sneakers" className="fp-capsule-shoes" /></div>
      <span className="fp-capsule-note">Прогулка · Встреча · Ужин</span>
    </>}
    {kind === "palette" && <>
      <div className="fp-caption"><span>Цвета, которые хочется носить</span><span className="fp-small-mark"><Check size={15} /></span></div>
      <div className="fp-swatches"><span className="fp-swatch-cream" /><span className="fp-swatch-rust" /><span className="fp-swatch-olive" /><span className="fp-swatch-blue" /></div>
      <div className="fp-palette-look"><Piece id="shirt" /><Piece id="trousers" /><Piece id="sneakers" /></div>
      <span className="fp-footnote">Одна палитра — разные сочетания</span>
    </>}
    {kind === "community" && <>
      <div className="fp-community-card fp-community-back"><img src="/images/capsule-panorama.webp" width={1672} height={941} loading="lazy" alt="" /><div><span>Любимая база</span><Bookmark size={14} /></div></div>
      <div className="fp-community-card fp-community-front"><div className="fp-community-look"><Piece id="blazer" /><Piece id="trousers" /><Piece id="sneakers" /></div><div><span>Городские выходные</span><Heart size={15} fill="currentColor" /></div></div>
      <span className="fp-community-note">Чужая идея. Ваше сочетание.</span>
    </>}
    {kind === "weather" && <>
      <div className="fp-weather-forecast"><CloudRain size={37} strokeWidth={1.25} /><div><strong>+12°</strong><span>Возможен дождь</span></div><span className="fp-weather-auto">Прогноз учтён</span></div>
      <div className="fp-weather-clothes"><Piece id="coat" /><Piece id="tee" /><Piece id="trousers" /></div>
      <span className="fp-weather-note"><Check size={14} />На прогулку — дополнительный слой</span>
    </>}
    {kind === "recognition" && <>
      <div className="fp-recognition-photo"><img src="/images/chat-outfit.webp" width={1024} height={1536} loading="lazy" alt="" /><span className="fp-scan-corner fp-scan-tl" /><span className="fp-scan-corner fp-scan-tr" /><span className="fp-scan-corner fp-scan-bl" /><span className="fp-scan-corner fp-scan-br" /></div>
      <span className="fp-photo-label fp-photo-jacket"><span />Жакет <small>Коричневый</small></span>
      <span className="fp-photo-label fp-photo-tee"><span />Футболка <small>Светлая</small></span>
      <span className="fp-photo-label fp-photo-trousers"><span />Брюки <small>Тёмные</small></span>
      <span className="fp-recognition-note"><ScanLine size={15} />От фотографии — к цифровой вещи</span>
    </>}
    {kind === "wardrobe" && <>
      <div className="fp-caption"><span>Мои вещи</span><ArrowUpRight size={17} strokeWidth={1.5} /></div>
      <div className="fp-wardrobe-grid">{([['tee', 'Футболка'], ['shirt', 'Рубашка'], ['blazer', 'Жакет'], ['trousers', 'Брюки'], ['sneakers', 'Кеды'], ['coat', 'Плащ']] as const).map(([id, name]) => <div key={id}><Piece id={id} /><span>{name}</span></div>)}</div>
      <span className="fp-footnote">Вещи собраны в одном месте</span>
    </>}
  </div>;
}
