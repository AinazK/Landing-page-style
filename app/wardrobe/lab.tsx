export default function WardrobeLab() {
  return (
    <section className="wardrobe-gallery" id="wardrobe-lab" aria-label="Пример капсульного гардероба">
      <figure className="wardrobe-panorama">
        <img src="/images/capsule-panorama.webp" width={1672} height={941} loading="lazy" alt="Капсула сочетающейся одежды на большом столе: футболка, рубашки, брюки, джинсы, жакет, плащ, обувь и шарф" />
        <figcaption className="sr-only">Иллюстрация капсулы из знакомых вещей. Персональные капсулы для поездок готовим для веб-приложения.</figcaption>
      </figure>
    </section>
  );
}
