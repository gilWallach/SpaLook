import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigateSearch } from "../customHooks/useNavigateSearch";

import { spaService } from "../services/spa.service";

import { SpaFilter } from "./SpaFilter";
import { DynamicModal } from "./DynamicModal";
import { BurgerMenu } from "./BurgerMenu";
import { Screen } from "./Screen";

import { FilterModal } from "./FilterModal";
import {
  loadCategories,
  loadSpasByCategory,
} from "../store/actions/category.actions";
import {
  loadGuests,
  loadLabels,
  loadLocations,
} from "../store/actions/label.actions";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { Icon } from "./Icon";

export function AppHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigateSearch();

  const filterBy = useSelector((state) => state.spaModule.filterBy);
  const categories = useSelector((state) => state.categoryModule.categories);
  const spas = useSelector((state) => state.spaModule.spas);

  const [facilities, setFacilities] = useState([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isBurgerMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullFacilityList, setIsFullFacilityList] = useState(true);
  const [spaPrices, setSpaPrices] = useState(null);

  useEffect(() => {
    loadFacilities();
    dispatch(loadGuests());
    dispatch(loadLocations());
    dispatch(loadCategories());
    dispatch(loadLabels());
  }, []);

  useEffectUpdate(() => {
    dispatch(loadSpasByCategory());
  }, [categories]);

  useEffectUpdate(() => {
    // generating objects of {price, count} pairs
    getSpaPrices();
  }, [spas]);

  const loadFacilities = async () => {
    const facilities = await spaService.getFacilities();
    setFacilities(facilities);
    if (facilities.length > 5) setIsFullFacilityList(false);
  };

  const onChangeFilter = (ev, filterBy) => {
    ev.preventDefault();
    if (isSearchModalOpen) setIsSearchModalOpen(false);
    if (isFilterModalOpen) setIsFilterModalOpen(false);
    navigate("/search", filterBy);
  };

  const handleFullFacilityList = () => {
    setIsFullFacilityList(true);
  };

  function getSpaPrices() {
    const spasPerPrice = [];

    const spaPrices = spas.reduce((acc, { packs }) => {
      const minPack = packs?.reduce((acc, pack) => {
        if (pack.price < acc) acc = pack.price;
        return acc;
      }, Infinity);
      if (!acc[minPack]) acc[minPack] = 0;
      acc[minPack]++;
      return acc;
    }, {});
    for (const key in spaPrices) {
      spasPerPrice.push({
        price: key,
        count: spaPrices[key],
      });
    }
    const sortedSpaPrices = spasPerPrice.sort((a, b) => {
      return a.price - b.price;
    });
    setSpaPrices(sortedSpaPrices);
  }

  function closeModals() {
    setIsFilterModalOpen(false);
    setIsSearchModalOpen(false);
    setIsMenuOpen(false);
  }

  return (
    <div className={`main-header full main-layout`}>
      <div className="top-btns flex space-between">
        <div
          className="burger-btn flex align-center justify-center"
          onClick={() => setIsMenuOpen(!isBurgerMenuOpen)}
        >
          <Icon name="Hamburger" />
          <BurgerMenu
            isMenuOpen={isBurgerMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
        <div className="right-sec-btns flex align-center justify-center">
          {/* <button className="lang-btn flex align-center justify-center">
            <Icon name="Logo" />
          </button> */}
          {/* <button className="spa-btn flex align-center justify-center">
            <img
              src={require("../assets/imgs/logo.png")}
              alt={"logo"}
            />
          </button> */}
        </div>
      </div>
      <div className="header-title">
        <h1>Spa Look</h1>
        <h4>Spa Booking App</h4>
      </div>
      <div className="header-btns-container flex space-between">
        <button className="back-btn" onClick={() => navigate("/")}>
          <Icon name="Back" />
          Back
        </button>
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="full-grow flex"
        >
          <div className="search-svg-container flex auto-center">
            <Icon name="Search" />
          </div>
          <div className="content-container text-left">
            <h4>Where to?</h4>
            <div className="options-container flex auto-center">
              <span>All Spas</span>
              <span>All Regions</span>
              <span>All Towns</span>
            </div>
          </div>
        </button>
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="flex auto-center"
        >
          <Icon name="Filter" />
        </button>
      </div>

      <DynamicModal
        isOpen={isSearchModalOpen}
        onCloseModal={() => setIsSearchModalOpen(false)}
      >
        <SpaFilter
          closeModal={() => setIsSearchModalOpen(false)}
          filterBy={filterBy}
          onChangeFilter={onChangeFilter}
        />
      </DynamicModal>
      <DynamicModal
        isOpen={isFilterModalOpen}
        onCloseModal={() => setIsFilterModalOpen(false)}
      >
        <FilterModal
          onChangeFilter={onChangeFilter}
          spaPrices={spaPrices}
          facilities={isFullFacilityList ? facilities : facilities.slice(0, 5)}
          filterBy={filterBy}
          isFullFacilityList={isFullFacilityList}
          openFullFacilityList={handleFullFacilityList}
        />
      </DynamicModal>
      <Screen
            isMenuOpen={
              isBurgerMenuOpen || isFilterModalOpen || isSearchModalOpen
            }
            setIsMenuOpen={closeModals}
          />
    </div>
  );
}
