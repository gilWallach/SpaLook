import { SpaPreview } from "./SpaPreview";

export function SpaList({ spas, isAdmin = false }) {
  return (
    <section className="spa-list">
      <ul className="carousel-list">
        {spas.map((spa) => (
          <SpaPreview key={spa._id} spa={spa} isAdmin={isAdmin} />
        ))}
      </ul>
    </section>
  );
}
