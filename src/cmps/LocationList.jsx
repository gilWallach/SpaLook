import { useNavigateSearch } from "../customHooks/useNavigateSearch";
import { LocationCarousel } from "./LocationCarousel";

export function LocationList({ labels , handleClick, selectedCity }) {
  if (labels) {
    return (
      <section className="spa-list carousel-list">
        <LocationCarousel labels={labels} handleClick={handleClick} selectedCity={selectedCity} />
      </section>
    );
  }
}
