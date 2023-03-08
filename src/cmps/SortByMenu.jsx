import { useSelector } from "react-redux";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

export function SortByMenu({ isMenuOpen, handleChangeSortBy, setSortByBtnTxt, setSortBy }) {
  const filterBy = useSelector((state) => state.spaModule.filterBy);

  const sortBy = [
    { name: "Recommended", value: "recommended" },
    { name: "Most Popular", value: "mostPopular" },
    { name: "Price Low to High", value: "minPrice" },
    { name: "Price High to Low", value: "maxPrice" },
    { name: "Top Rated", value: "topRated" },
  ];

  useEffectUpdate(() => {
    setSortByBtnTxt("Sort By")
    setSortBy()
  }, [filterBy])

  return (
    <ul
      className={`sortBy-menu main-layout full sortBy-container ${isMenuOpen ? "open" : ""}`}
    >
      {sortBy.map((obj) => {
        const {name, value} = obj
        return (
          <li key={value} onClick={() => {handleChangeSortBy(name, value)}}>
            {name}
          </li>
        );
      })}
    </ul>
  );
}
