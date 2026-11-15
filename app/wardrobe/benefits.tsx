"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FeaturePreview, { type FeatureKind } from "./feature-preview";
import { fabricTranslation, loopProgressDelta } from "./fabric-motion";

const features: { id: FeatureKind; title: string; benefit?: string; description: string[] }[] = [
  { id: "consultation", title: "Консультация с ИИ-стилистом", description: ["ИИ-стилист анализирует вашу капсулу или гардероб и отвечает на вопросы о вещах.", "Упрощает шоппинг сразу подбирая образы из Вашего гардероба.", "Просто спросите, подходит ли вещь, и получите конкретные советы по сочетаниям и созданию образов для любого случая!"] },
  { id: "capsule", title: "Капсула гардероба", benefit: "Готовые комплекты без долгих раздумий", description: ["Приложение анализирует ваши вещи и предлагает готовые капсулы."] },
  { id: "palette", title: "Подбор образа по палитре", description: ["Выберите цвета в палитре и приложение подберёт гармоничные комбинации!"] },
  { id: "community", title: "Пользовательский контент", benefit: "Вдохновляйтесь образами других людей", description: ["Изучайте рекомендации, готовые луки и идеи от блогеров и пользователей платформы."] },
  { id: "weather", title: "Образы под погоду", benefit: "Одевайтесь комфортно в любую погоду", description: ["Приложение учитывает температуру и осадки в вашем городе и предлагает подходящие сочетания вещей."] },
  { id: "recognition", title: "Автоматическое распознавание вещи", benefit: "Добавляйте вещи за секунды", description: ["Сделайте фото одежды, а приложение автоматически определит категорию, цвет и основные характеристики вещи."] },
  { id: "wardrobe", title: "Виртуальный гардероб", benefit: "Весь гардероб всегда под рукой", description: ["Добавляйте одежду в приложение и храните цифровую версию своего шкафа прямо в телефоне."] },
];

export default function WardrobeBenefits() {
  const [viewportRef, api] = useEmblaCarousel({
    loop: true, align: "start", slidesToScroll: 1, containScroll: false, skipSnaps: false,
    watchDrag: (_api, event) => !(event.target instanceof Element && event.target.closest("dialog, button")),
  });
  const [selected, setSelected] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const fabricRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    update();
    api.on("select", update).on("reInit", update);
    return () => { api.off("select", update).off("reInit", update); };
  }, [api]);

  useEffect(() => {
    if (!api || !fabricRef.current) return;
    const fabric = fabricRef.current;
    let previous = api.scrollProgress();
    let distance = 0;
    let period = 9000;
    const paint = () => {
      const progress = api.scrollProgress();
      distance += loopProgressDelta(previous, progress) * period;
      previous = progress;
      const x = fabricTranslation(reducedMotion ? 0 : distance, period);
      fabric.style.transform = `translate3d(${x}px,0,0)`;
    };
    const measure = () => {
      const bounds = carouselRef.current?.getBoundingClientRect();
      if (!bounds) return;
      // Three distinct 3:1 photographs form a panorama, traversed once per seven slides.
      period = Math.max(bounds.width * 3, bounds.height * 9);
      fabric.style.setProperty("--fabric-period", `${period}px`);
      previous = api.scrollProgress();
      distance = previous * period;
      paint();
    };
    measure();
    const resize = new ResizeObserver(measure);
    if (carouselRef.current) resize.observe(carouselRef.current);
    api.on("scroll", paint).on("reInit", measure);
    return () => { resize.disconnect(); api.off("scroll", paint).off("reInit", measure); };
  }, [api, reducedMotion]);

  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") { event.preventDefault(); api?.scrollPrev(reducedMotion); }
    if (event.key === "ArrowRight") { event.preventDefault(); api?.scrollNext(reducedMotion); }
    if (event.key === "Home") { event.preventDefault(); api?.scrollTo(0, reducedMotion); }
    if (event.key === "End") { event.preventDefault(); api?.scrollTo(features.length - 1, reducedMotion); }
  }

  return <div className="feature-carousel" ref={carouselRef} role="region" aria-roledescription="карусель" aria-labelledby="how-heading" data-ready={Boolean(api)}>
    <div className="feature-fabric" aria-hidden="true"><div className="feature-fabric-strip" ref={fabricRef}>
      {[0, 1, 2].map(copy => <div className="feature-fabric-panorama" key={copy}>
        {["drape", "diagonal", "roll"].map((panel, index) => <img key={panel} className={`feature-fabric-panel feature-fabric-panel-${index}`} src={`/images/fabric-panorama/${panel}.webp`} width={2172} height={724} loading="lazy" alt="" />)}
      </div>)}
    </div></div>
    <div className="wrap feature-content">
    <h2 className="feature-section-heading" id="how-heading">Что даст Стилистика?</h2>
    </div>
    <div className="feature-viewport" ref={viewportRef} tabIndex={0} onKeyDown={navigate} aria-label="Возможности Стилистики. Листайте свайпом или стрелками на клавиатуре">
      <div className="feature-track" id="feature-track">
        {features.map((feature, index) => <article className="feature-slide" key={feature.id} role="group" aria-roledescription="слайд" aria-label={`${index + 1} из ${features.length}: ${feature.title}`} aria-hidden={selected !== index} inert={selected !== index}>
          <div className="wrap feature-slide-layout">
          <div className="feature-copy">
            <span className="feature-number" aria-hidden="true">{String(index + 1).padStart(2, "0")} <span>/ {String(features.length).padStart(2, "0")}</span></span>
            <h3>{feature.title}</h3>
            {feature.benefit && <p className="feature-benefit">{feature.benefit}</p>}
            {feature.description.map(paragraph => <p className="feature-description" key={paragraph}>{paragraph}</p>)}
          </div>
          <FeaturePreview kind={feature.id} />
          </div>
        </article>)}
      </div>
    </div>
    <div className="wrap feature-content">
    <div className="feature-controls">
      <button className="feature-arrow" type="button" aria-label="Предыдущая возможность" aria-controls="feature-track" onClick={() => api?.scrollPrev(reducedMotion)}><ArrowLeft size={20} strokeWidth={1.5} aria-hidden="true" /></button>
      <div className="feature-dots" role="group" aria-label="Выбрать возможность">
        {features.map((feature, index) => <button key={feature.id} className="feature-dot" type="button" aria-label={`Показать ${index + 1} из ${features.length}: ${feature.title}`} aria-current={selected === index ? "true" : undefined} aria-controls="feature-track" title={feature.title} onClick={() => api?.scrollTo(index, reducedMotion)}><span /></button>)}
      </div>
      <button className="feature-arrow" type="button" aria-label="Следующая возможность" aria-controls="feature-track" onClick={() => api?.scrollNext(reducedMotion)}><ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" /></button>
    </div>
    <p className="feature-status" aria-live="polite" aria-atomic="true">{selected + 1} / {features.length} · {features[selected].title}</p>
    <p className="feature-development-note">Эти возможности готовим для веб-приложения. Сейчас собираем первую пилотную группу.</p>
    </div>
  </div>;
}
