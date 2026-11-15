"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FeaturePreview, { type FeatureKind } from "./feature-preview";

const features: { id: FeatureKind; title: string; benefit: string; description: string }[] = [
  { id: "consultation", title: "Консультация с ИИ-стилистом", benefit: "Советы с опорой на ваши вещи", description: "Стилист проанализирует гардероб или капсулу и подскажет, с чем сочетать вещь. Перед покупкой можно будет спросить, впишется ли она в ваши образы, и получить идеи для разных случаев." },
  { id: "capsule", title: "Капсула гардероба", benefit: "Готовые комплекты без долгих раздумий", description: "Сервис поможет собрать капсулу из ваших вещей — для поездки, работы или выходных. Готовые сочетания сократят время на выбор одежды." },
  { id: "palette", title: "Подбор образа по палитре", benefit: "Сочетания в любимых цветах", description: "Выберите цвета, которые хочется носить. Стилистика предложит гармоничные комбинации из вашего гардероба и поможет собрать образ в выбранной палитре." },
  { id: "community", title: "Пользовательский контент", benefit: "Вдохновляйтесь образами других людей", description: "Изучайте образы, рекомендации и идеи от блогеров и пользователей платформы. Находите готовые сочетания и вдохновение для собственного гардероба." },
  { id: "weather", title: "Образы под погоду", benefit: "Одевайтесь комфортно в любую погоду", description: "Сервис сам получит прогноз для вашего города и учтёт температуру и осадки. Подборка подскажет, что надеть и какой слой взять с собой." },
  { id: "recognition", title: "Автоматическое распознавание вещи", benefit: "Добавляйте вещи за секунды", description: "Добавьте фото одежды или образа на человеке. ИИ определит категорию, цвет и основные характеристики вещи, чтобы её было проще сохранить в гардеробе." },
  { id: "wardrobe", title: "Виртуальный гардероб", benefit: "Весь гардероб всегда под рукой", description: "Одежда, обувь и аксессуары будут собраны в одном месте. Открывайте цифровую версию своего шкафа в браузере телефона или компьютера и возвращайтесь к любимым вещам." },
];

export default function WardrobeBenefits() {
  const [viewportRef, api] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1, containScroll: false, skipSnaps: false });
  const [selected, setSelected] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

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

  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") { event.preventDefault(); api?.scrollPrev(reducedMotion); }
    if (event.key === "ArrowRight") { event.preventDefault(); api?.scrollNext(reducedMotion); }
    if (event.key === "Home") { event.preventDefault(); api?.scrollTo(0, reducedMotion); }
    if (event.key === "End") { event.preventDefault(); api?.scrollTo(features.length - 1, reducedMotion); }
  }

  return <div className="feature-carousel" role="region" aria-roledescription="карусель" aria-labelledby="how-heading" data-ready={Boolean(api)}>
    <div className="feature-viewport" ref={viewportRef} tabIndex={0} onKeyDown={navigate} aria-label="Возможности Стилистики. Листайте свайпом или стрелками на клавиатуре">
      <div className="feature-track" id="feature-track">
        {features.map((feature, index) => <article className="feature-slide" key={feature.id} role="group" aria-roledescription="слайд" aria-label={`${index + 1} из ${features.length}: ${feature.title}`}>
          <div className="feature-copy">
            <span className="feature-number" aria-hidden="true">{String(index + 1).padStart(2, "0")} <span>/ {String(features.length).padStart(2, "0")}</span></span>
            <h3>{feature.title}</h3>
            <p className="feature-benefit">{feature.benefit}</p>
            <p className="feature-description">{feature.description}</p>
          </div>
          <FeaturePreview kind={feature.id} />
        </article>)}
      </div>
    </div>
    <div className="feature-controls">
      <button className="feature-arrow" type="button" aria-label="Предыдущая возможность" aria-controls="feature-track" onClick={() => api?.scrollPrev(reducedMotion)}><ArrowLeft size={20} strokeWidth={1.5} aria-hidden="true" /></button>
      <div className="feature-dots" role="group" aria-label="Выбрать возможность">
        {features.map((feature, index) => <button key={feature.id} className="feature-dot" type="button" aria-label={`Показать ${index + 1} из ${features.length}: ${feature.title}`} aria-current={selected === index ? "true" : undefined} aria-controls="feature-track" title={feature.title} onClick={() => api?.scrollTo(index, reducedMotion)}><span /></button>)}
      </div>
      <button className="feature-arrow" type="button" aria-label="Следующая возможность" aria-controls="feature-track" onClick={() => api?.scrollNext(reducedMotion)}><ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" /></button>
    </div>
    <p className="feature-status" aria-live="polite" aria-atomic="true">{selected + 1} / {features.length} · {features[selected].title}</p>
  </div>;
}
