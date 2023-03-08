import { PreviewCarousel } from "./PreviewCarousel";

export function SpasCategoriesList({ spasByCategory }) {

  return (
    <section key={`${spasByCategory.name}`} className="category-list">
      <PreviewCarousel spas={spasByCategory} />
    </section>
  );
}
