"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, Battery, Check, Signal, SlidersHorizontal, Wifi } from "lucide-react";
import { GarmentDrawing } from "./garment";
import type { GarmentKind } from "./model";
import "./wardrobe-phone.css";

const categories = ["Все", "Верх", "Низ", "Обувь"] as const;
type Category = typeof categories[number];
const colors = [
  { id: "cream", name: "Молочный", value: "#e9e2d5" },
  { id: "brown", name: "Коричневый", value: "#694735" },
  { id: "graphite", name: "Графитовый", value: "#4d504b" },
  { id: "blue", name: "Голубой", value: "#a9bdc5" },
  { id: "beige", name: "Бежевый", value: "#baa98c" },
];
const clothes: { id: GarmentKind; name: string; category: Exclude<Category, "Все">; color: string; season: string }[] = [
  { id: "tee", name: "Молочная футболка", category: "Верх", color: "cream", season: "Лето" },
  { id: "shirt", name: "Голубая рубашка", category: "Верх", color: "blue", season: "Демисезон" },
  { id: "blazer", name: "Шоколадный жакет", category: "Верх", color: "brown", season: "Демисезон" },
  { id: "coat", name: "Бежевый плащ", category: "Верх", color: "beige", season: "Демисезон" },
  { id: "trousers", name: "Графитовые брюки", category: "Низ", color: "graphite", season: "Демисезон" },
  { id: "sneakers", name: "Светлые кеды", category: "Обувь", color: "cream", season: "Демисезон" },
];

export default function WardrobePhone() {
  const [category, setCategory] = useState<Category>("Все");
  const [color, setColor] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selected, setSelected] = useState<typeof clothes[number] | null>(null);
  const headingId = useId();
  const headerButton = useRef<HTMLButtonElement>(null);
  const itemButtons = useRef(new Map<string, HTMLButtonElement>());
  const visible = clothes.filter(item => (category === "Все" || item.category === category) && (!color || item.color === color));

  useEffect(() => {
    if (selected || filtersOpen) headerButton.current?.focus({ preventScroll: true });
  }, [selected, filtersOpen]);

  function returnToCatalog() {
    const itemId = selected?.id;
    setSelected(null);
    setFiltersOpen(false);
    requestAnimationFrame(() => (itemId ? itemButtons.current.get(itemId) : headerButton.current)?.focus({ preventScroll: true }));
  }

  function resetFilters() {
    setCategory("Все");
    setColor(null);
  }

  const chosenColor = colors.find(option => option.id === selected?.color);

  return <>
    <div className="fp-phone" role="group" aria-labelledby={headingId}>
      <div className="fp-phone-screen">
        <div className="fp-phone-status" aria-hidden="true"><span>9:41</span><i /><span><Signal /><Wifi /><Battery /></span></div>
        <div className="fp-phone-app">
          <div className="fp-phone-toolbar">
            <h4 id={headingId}>{selected ? "Карточка вещи" : filtersOpen ? "Фильтры" : "Гардероб"}</h4>
            <button ref={headerButton} type="button" aria-label={selected || filtersOpen ? "Назад к гардеробу" : "Открыть фильтры гардероба"} onClick={() => selected || filtersOpen ? returnToCatalog() : setFiltersOpen(true)}>{selected || filtersOpen ? <ArrowLeft /> : <SlidersHorizontal />}</button>
          </div>
          {selected ? <div className="fp-phone-detail">
            <div className="fp-phone-detail-photo"><GarmentDrawing id={selected.id} color="#e8e2d5" /></div>
            <strong>{selected.name}</strong>
            <dl><div><dt>Категория</dt><dd>{selected.category}</dd></div><div><dt>Цвет</dt><dd><i style={{ background: chosenColor?.value }} />{chosenColor?.name}</dd></div><div><dt>Сезон</dt><dd>{selected.season}</dd></div></dl>
            <p className="fp-phone-saved"><Check size={11} aria-hidden="true" />В вашем гардеробе</p>
          </div> : filtersOpen ? <div className="fp-phone-filters">
            <fieldset><legend>Категория</legend><div className="fp-phone-filter-categories">{categories.map(option => <button key={option} type="button" aria-pressed={category === option} onClick={() => setCategory(option)}>{option}</button>)}</div></fieldset>
            <fieldset><legend>Цвет</legend><div className="fp-phone-colors"><button type="button" className="fp-phone-any-color" aria-pressed={!color} onClick={() => setColor(null)}>Любой</button>{colors.map(option => <button key={option.id} type="button" aria-label={option.name} title={option.name} aria-pressed={color === option.id} onClick={() => setColor(option.id)} style={{ background: option.value, color: option.id === "brown" || option.id === "graphite" ? "#fff" : "#252923" }}>{color === option.id && <Check size={12} aria-hidden="true" />}</button>)}</div></fieldset>
            <div className="fp-phone-filter-actions"><button type="button" onClick={resetFilters}>Сбросить</button><button type="button" onClick={returnToCatalog}>Показать вещи ({visible.length})</button></div>
          </div> : <>
            <div className="fp-phone-categories" role="group" aria-label="Категории вещей">{categories.map(option => <button key={option} type="button" aria-pressed={category === option} onClick={() => setCategory(option)}>{option}</button>)}</div>
            <div className="fp-phone-count"><span aria-live="polite">{visible.length} из {clothes.length} вещей</span>{color && <button type="button" onClick={() => setColor(null)}>Все цвета</button>}</div>
            {visible.length ? <div className="fp-phone-gallery">{visible.map(item => <button key={item.id} ref={element => { if (element) itemButtons.current.set(item.id, element); else itemButtons.current.delete(item.id); }} type="button" aria-label={`Открыть: ${item.name}`} onClick={() => setSelected(item)}><span className="fp-phone-item-image"><GarmentDrawing id={item.id} color="#e8e2d5" /></span><span>{item.name}</span></button>)}</div> : <div className="fp-phone-empty"><p>Вещей с такими параметрами пока нет</p><button type="button" onClick={resetFilters}>Сбросить фильтры</button></div>}
          </>}
        </div>
        <div className="fp-phone-home" aria-hidden="true" />
      </div>
    </div>
    <p className="fp-phone-caption">Пример интерфейса · нажмите на вещь</p>
  </>;
}
