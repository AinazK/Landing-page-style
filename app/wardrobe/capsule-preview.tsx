import { ArrowRight, Check } from "lucide-react";
import { GarmentDrawing } from "./garment";
import "./capsule-preview.css";

const pieces = [
  { id: "tee", name: "Футболка" },
  { id: "shirt", name: "Рубашка" },
  { id: "blazer", name: "Жакет" },
  { id: "trousers", name: "Брюки" },
  { id: "sneakers", name: "Кеды" },
] as const;
type CapsulePiece = typeof pieces[number]["id"];
const looks: { title: string; pieces: CapsulePiece[] }[] = [
  { title: "Прогулка", pieces: ["tee", "trousers", "sneakers"] },
  { title: "Встреча", pieces: ["shirt", "trousers", "sneakers"] },
  { title: "Ужин", pieces: ["tee", "blazer", "trousers", "sneakers"] },
];
const usedPieces = new Set(looks.flatMap(look => look.pieces));
const packingList = pieces.filter(piece => usedPieces.has(piece.id));

export default function CapsulePreview() {
  return <>
    <div className="cp-plan">
      <div><span className="cp-example">Пример капсулы</span><h4>Выходные в городе</h4></div>
      <div className="cp-counts" aria-label={`${packingList.length} вещей из гардероба — ${looks.length} готовых образа`}><span><strong>{packingList.length}</strong> вещей</span><ArrowRight size={18} strokeWidth={1.4} aria-hidden="true" /><span><strong>{looks.length}</strong> образа</span></div>
    </div>
    <div className="cp-looks" aria-label="Три готовых сочетания из одной капсулы">
      {looks.map((look, index) => <figure key={look.title} className={`cp-look${look.pieces.includes("blazer") ? " cp-look-layered" : ""}`}>
        <span className="cp-look-number" aria-hidden="true">0{index + 1}</span>
        <div className="cp-look-drawing" aria-hidden="true">{look.pieces.map(id => <span key={id} className={`cp-garment cp-garment-${id}`}><GarmentDrawing id={id} color="#e8e2d5" /></span>)}</div>
        <figcaption><strong>{look.title}</strong><span className="sr-only">: {look.pieces.map(id => pieces.find(piece => piece.id === id)?.name).join(", ")}</span></figcaption>
      </figure>)}
    </div>
    <div className="cp-packing">
      <span>Взять с собой</span>
      <ul aria-label="Состав капсулы">{packingList.map(piece => <li key={piece.id}><Check size={11} strokeWidth={1.5} aria-hidden="true" />{piece.name}</li>)}</ul>
      <p>Брюки и кеды — одни и те же во всех трёх образах.</p>
    </div>
  </>;
}
