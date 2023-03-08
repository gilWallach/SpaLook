import { useState } from "react";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { SortByMenu } from "./SortByMenu";
import { Screen } from "./Screen";

export function SortByDropdown({spas, isMenuOpen, setSortByBtnTxt, setIsMenuOpen }) {
  const [sortBy, setSortBy] = useState();

  useEffectUpdate(() => {
    spas.sort(sortFn);
    setIsMenuOpen(false);
  }, [sortBy]);

  function handleChangeSortBy(name, value) {
    setSortBy(value);
    setSortByBtnTxt(name);
  }

  function calcMinPrice({ packs }) {
    if (!packs.length) return "0";
    const reduceMinPrice = packs.reduce((acc, pack) => {
      return acc < pack.price ? acc : pack.price.toFixed(2);
    }, 1000000);
    return reduceMinPrice;
  }

  function calcReviewAvg({ reviews }) {
    const sum = reviews.reduce((acc, review) => acc + review.rate, 0);
    const avg = (sum / reviews.length).toFixed(2);
    return avg;
  }

  function sortFn(a, b) {
    const minPriceA = calcMinPrice(a);
    const minPriceB = calcMinPrice(b);
    const avgRateA = calcReviewAvg(a);
    const avgRateB = calcReviewAvg(b);

    let comparison;
    switch (sortBy) {
      case "minPrice":
        comparison = minPriceA < minPriceB ? -1 : 1;
        return comparison;
      case "maxPrice":
        comparison = minPriceA < minPriceB ? 1 : -1;
        return comparison;
      case "topRated":
        comparison = avgRateA < avgRateB ? 1 : -1;
        return comparison;
      case "recommended":
        comparison = a.reviews.length < b.reviews.length ? 1 : -1;
        return comparison;
      case "mostPopular":
        comparison =
          a.reviews.length < b.reviews.length && avgRateA < avgRateB ? 1 : -1;
        return comparison;
    }
  }

  return (
    <>
      <SortByMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setSortBy={setSortBy}
        setSortByBtnTxt={setSortByBtnTxt}
        handleChangeSortBy={handleChangeSortBy}
      />
      <Screen
        isSortByDropdown={true}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
    </>
  );
}