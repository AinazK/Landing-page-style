import type { GarmentKind } from "./model";

const paths: Record<GarmentKind, string> = {
  tee: "M31 18 20 23 10 42 24 49 28 42 28 91 72 91 72 42 76 49 90 42 80 23 69 18Q66 31 50 31 34 31 31 18Z",
  shirt: "M36 16 22 24 10 49 24 55 31 41 28 92 72 92 69 41 76 55 90 49 78 24 64 16 50 27Z M36 16 41 36 50 27 59 36 64 16 M50 28V92",
  trousers: "M29 15H71L77 94H55L50 45 45 94H23Z M29 25H71 M50 16V40",
  jeans: "M29 15H71L77 94H55L50 45 45 94H23Z M29 25H71 M50 16V40 M30 27Q29 42 44 41 M70 27Q71 42 56 41",
  blazer: "M36 15 22 23 10 87 28 91 34 47 31 94 69 94 66 47 72 91 90 87 78 23 64 15 50 36Z M36 15 31 34 41 42 36 51 50 73 64 51 59 42 69 34 64 15 M50 36V94 M36 72H45 M57 72H66",
  overshirt: "M35 16 21 25 11 87 27 90 33 47 29 94H71L67 47 73 90 89 87 79 25 65 16 50 28Z M35 16 40 37 50 28 60 37 65 16 M50 28V94 M34 46H45V59H34Z M56 46H67V59H56Z",
  coat: "M36 12 22 23 10 83 27 87 34 46 29 99H71L66 46 73 87 90 83 78 23 64 12 50 34Z M36 12 31 31 42 41 37 50 50 67 63 50 58 41 69 31 64 12 M50 34V99 M32 70H68",
  sneakers: "M16 46 32 39 44 57 65 63 84 69 88 80H11L10 67Z M12 80H89V87H11Z M37 52 49 48 M43 59 55 55 M51 64 61 61",
  loafers: "M15 48 28 41 47 53 61 64 83 69 88 79H10L11 65Z M10 79H89V86H11Z M22 56 47 62 43 70 20 65Z",
  boots: "M23 20H50L52 57 68 65 84 70 88 80H16L14 65Z M16 80H89V88H15Z M23 30H48 M25 40H49 M28 50H50",
  scarf: "M35 15Q49 8 63 17L71 37 58 44 57 94H38L42 43 29 36Z M38 84H57 M39 89H56 M42 43 58 44 M35 15 42 43 63 17",
};
export function GarmentDrawing({ id, color }: { id: GarmentKind; color: string }) {
  const lofi = { tee: "tee", shirt: "shirt", trousers: "trousers", blazer: "blazer", sneakers: "sneakers" } as Partial<Record<GarmentKind,string>>;
  if (lofi[id]) return <img src={`/images/lofi/${lofi[id]}.webp`} width={512} height={512} alt="" aria-hidden="true" loading="lazy" className="garment-drawing" data-style="lofi" />;
  return <svg viewBox="0 0 100 110" aria-hidden="true" className="garment-drawing"><path d={paths[id]} fill={color} stroke="#37372e" strokeWidth="1.15" strokeLinejoin="round" /><path d={paths[id]} fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth=".4" transform="translate(-1 -1)" /></svg>;
}
export function LabelMark({ className = "" }: { className?: string }) {
  return <svg className={className} width="28" height="32" viewBox="0 0 28 32" fill="none" aria-hidden="true"><path d="M5 6h18v23H5Z" stroke="currentColor" strokeWidth="1.1" /><path d="M8 10h12v15H8Z" stroke="currentColor" strokeWidth=".65" strokeDasharray="1.5 2" /><path d="M14 12V5c0-5 8-5 8-1 0 3-4 4-8 2" stroke="currentColor" strokeWidth="1.1" /><path d="m10 20 4-5 4 5Z" stroke="currentColor" strokeWidth=".9" /></svg>;
}
