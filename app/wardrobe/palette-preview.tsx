"use client";

import { useId, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import "./palette-preview.css";

const palettes = [
  {
    name: "Тёплая база", image: "/images/chat-outfit.webp",
    result: "Шоколадный жакет и светлая основа",
    alt: "Образ с шоколадным жакетом, молочной футболкой, графитовыми брюками, бежевым плащом и светлыми кедами",
    colors: [
      { name: "Молочный", hex: "#e9e3d7", weight: 3 },
      { name: "Шоколадный", hex: "#694735", weight: 2 },
      { name: "Графитовый", hex: "#484b46", weight: 1 },
      { name: "Бежевый", hex: "#b5a38a", weight: 1 },
      { name: "Песочный", hex: "#d2c5af", weight: 1 },
    ],
  },
  {
    name: "Прохладный контраст", image: "/images/community-city-look.webp",
    result: "Голубая рубашка и графитовый низ",
    alt: "Образ с серо-голубой рубашкой, молочной футболкой, тёмными брюками и светлыми кедами",
    colors: [
      { name: "Серо-голубой", hex: "#77858e", weight: 3 },
      { name: "Молочный", hex: "#ece7dd", weight: 2 },
      { name: "Графитовый", hex: "#3b3e40", weight: 1 },
      { name: "Жемчужный", hex: "#c7c5be", weight: 1 },
      { name: "Тауп", hex: "#a69989", weight: 1 },
    ],
  },
  {
    name: "Светлая гамма", image: "/images/sea-capsule/walk.webp",
    result: "Светлый лён и плетёные аксессуары",
    alt: "Сочетание молочной футболки, светлых льняных брюк, кремовых кед, соломенной шляпы и плетёной сумки",
    colors: [
      { name: "Айвори", hex: "#f0e8d9", weight: 3 },
      { name: "Льняной", hex: "#d9cbb3", weight: 2 },
      { name: "Соломенный", hex: "#c7ad7f", weight: 1 },
      { name: "Карамельный", hex: "#ac8253", weight: 1 },
      { name: "Терракотовый", hex: "#b76a4b", weight: 1 },
    ],
  },
  {
    name: "Терракотовый акцент", image: "/images/sea-capsule/evening.webp",
    result: "Платье, светлая рубашка и тёплая кожа",
    alt: "Сочетание терракотового платья, светлой льняной рубашки, кожаных сандалий и плетёной сумки",
    colors: [
      { name: "Терракотовый", hex: "#b76547", weight: 3 },
      { name: "Молочный", hex: "#ede2cf", weight: 2 },
      { name: "Медовый", hex: "#c59b64", weight: 1 },
      { name: "Пшеничный", hex: "#d4bb91", weight: 1 },
      { name: "Коньячный", hex: "#956b46", weight: 1 },
    ],
  },
] as const;

export default function PalettePreview() {
  const [selected, setSelected] = useState(0);
  const resultId = useId();
  const active = palettes[selected];

  return <>
    <div className="pp-direction"><span>Выберите палитру</span><ArrowRight size={17} strokeWidth={1.4} aria-hidden="true" /><span>Посмотрите образ</span></div>
    <div className="pp-workspace">
      <div className="pp-library" role="group" aria-label="Примеры цветовых палитр">
        <span className="pp-library-label">Коллекция сочетаний</span>
        {palettes.map((palette, index) => <button key={palette.name} type="button" className="pp-palette" aria-pressed={selected === index} aria-controls={resultId} aria-label={`${palette.name}: ${palette.colors.map(color => color.name).join(", ")}`} onClick={() => setSelected(index)}>
          <span className="pp-palette-heading"><span>{palette.name}</span><Check size={13} strokeWidth={1.5} aria-hidden="true" /></span>
          <span className="pp-color-strip" aria-hidden="true">{palette.colors.map(color => <span key={color.name} style={{ backgroundColor: color.hex, flex: color.weight }} />)}</span>
        </button>)}
        <span className="pp-library-hint">Нажмите на цветовую ленту</span>
      </div>
      <figure className="pp-result" id={resultId}>
        <div className="pp-result-media">
          <img src={active.image} width={1024} height={1536} loading="lazy" alt={active.alt} />
          <span className="pp-result-rail" aria-hidden="true">{active.colors.map(color => <span key={color.name} style={{ backgroundColor: color.hex, flex: color.weight }} />)}</span>
        </div>
        <figcaption aria-live="polite"><span>Пример сочетания</span><strong>{active.result}</strong></figcaption>
      </figure>
    </div>
    <p className="pp-selected-tones"><span className="sr-only">Цвета палитры «{active.name}»: </span>{active.colors.map(color => color.name).join(" · ")}</p>
  </>;
}
