import { Check } from "lucide-react";
import "./capsule-preview.css";

const pieces = [
  { id: "swimsuit", name: "Купальник" },
  { id: "linen-shirt", name: "Льняная рубашка" },
  { id: "tee", name: "Лёгкая футболка" },
  { id: "shorts", name: "Льняные шорты" },
  { id: "linen-trousers", name: "Льняные брюки" },
  { id: "dress", name: "Лёгкое платье" },
  { id: "sandals", name: "Сандалии" },
  { id: "sneakers", name: "Кеды" },
  { id: "hat", name: "Шляпа" },
  { id: "tote", name: "Пляжная сумка" },
] as const;
type CapsulePiece = typeof pieces[number]["id"];
const looks: { id: string; title: string; pieces: CapsulePiece[] }[] = [
  { id: "beach", title: "Пляж", pieces: ["swimsuit", "linen-shirt", "shorts", "sandals", "hat", "tote"] },
  { id: "walk", title: "Прогулка", pieces: ["tee", "linen-trousers", "sneakers", "hat", "tote"] },
  { id: "evening", title: "Ужин у моря", pieces: ["dress", "linen-shirt", "sandals", "tote"] },
];
const usedPieces = new Set(looks.flatMap(look => look.pieces));
const packingList = pieces.filter(piece => usedPieces.has(piece.id));

export default function CapsulePreview() {
  return <>
    <div className="cp-plan">
      <div><span className="cp-example">Капсула для отпуска</span><h4>Неделя у моря</h4></div>
      <div className="cp-counts" aria-label={`${packingList.length} вещей для семи дней у моря`}><span><strong>{packingList.length}</strong> вещей</span><span className="cp-count-separator">на</span><span><strong>7</strong> дней</span></div>
    </div>
    <div className="cp-looks" aria-label="Примеры сочетаний для пляжа, прогулки и ужина у моря">
      {looks.map((look, index) => <figure key={look.id} className="cp-look">
        <span className="cp-look-number" aria-hidden="true">0{index + 1}</span>
        <div className="cp-look-drawing" aria-hidden="true"><img src={`/images/sea-capsule/${look.id}.webp`} width={1024} height={1536} loading="lazy" alt="" /></div>
        <figcaption><strong>{look.title}</strong><span className="sr-only">: {look.pieces.map(id => pieces.find(piece => piece.id === id)?.name).join(", ")}</span></figcaption>
      </figure>)}
    </div>
    <div className="cp-packing">
      <span>Взять с собой на неделю</span>
      <ul aria-label="Состав капсулы">{packingList.map(piece => <li key={piece.id}><Check size={11} strokeWidth={1.5} aria-hidden="true" />{piece.name}</li>)}</ul>
      <p>Три примера сочетаний из одной отпускной капсулы.</p>
    </div>
  </>;
}
