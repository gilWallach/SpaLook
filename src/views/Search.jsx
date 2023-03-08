import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

import { loadSpas, setFilterBy } from "../store/actions/spa.actions";
import { loadSelectedLabel, setSelectedLabel } from "../store/actions/label.actions";

import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { useNavigateSearch } from "../customHooks/useNavigateSearch";

import { spaService } from "../services/spa.service";

import { SpaList } from "../cmps/SpaList";
import { FacilityChip } from "../cmps/FacilityChip";
import { SortByDropdown } from "../cmps/SortByDropdown";
import { Icon } from "../cmps/Icon";
import { SpaListSkeleton } from "../cmps/SpaListSkeleton";
import { CardSkeleton } from "../cmps/CardSkeleton";
import { Skeleton } from "@mui/material";

export function Search({ isLabelSearch = false }) {
  const dispatch = useDispatch();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const navigate = useNavigateSearch();

  const spas = useSelector((state) => state.spaModule.spas);
  const filterBy = useSelector((state) => state.spaModule.filterBy);
  const selectedLabel = useSelector(
    (state) => state.categoryModule.selectedLabel
  );

  const [sortByBtnTxt, setSortByBtnTxt] = useState("Sort By");
  const [isSortByMenuOpen, setIsMenuOpen] = useState(false);

  const emptyFilterBy = spaService.getemptyFilterBy();
  const { txt, facilities, guests } = filterBy;

  // ----- Scrolling to top once loaded for better ux -----
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },[])

  // ----- loading by label-----
  useEffect(() => {
    if (isLabelSearch) {
      const labelUrl = params.labelUrl;
      dispatch(loadSelectedLabel({ labelUrl }));
    }
  }, []);

  useEffectUpdate(() => {
    if (selectedLabel) {
      const query = selectedLabel.filterBy;
      dispatch(setFilterBy({ ...emptyFilterBy, ...query }));
      dispatch(loadSpas());
    }
  }, [selectedLabel]);

  // ----- loading by params-----
  useEffect(() => {
    if (!isLabelSearch) {
      let query = {};
      searchParams.forEach((value, key) => {
        query = JSON.parse(key);
      });
      dispatch(setFilterBy({ ...filterBy, ...query }));
      dispatch(loadSpas());
    }
  }, [searchParams]);

  useEffectUpdate(() => {
    if (!selectedLabel) {
      navigate("/search", filterBy);
    }
  }, [filterBy]);

  function handleDeleteFacility(facility) {
    dispatch(setSelectedLabel(null))
    const newFacilities = [...facilities].filter((currFacility) => {
      return currFacility !== facility;
    });
    dispatch(setFilterBy({ ...filterBy, facilities: newFacilities }));
    dispatch(loadSpas());
  }

  const guestsFormat = () => {
    if (guests === "1") return <h2>Single Spa</h2>;
    if (guests === "2") return <h2>Couple Spa</h2>;
    if (+guests > 2) return <h2>Group Spa</h2>;
  };

  if (spas && spas.length) {
    return (
      <section className="search main-layout full">
        <div className="title">
          {txt && <h2>{txt}</h2>}
          {guests && guestsFormat()}
        </div>
        <FacilityChip
          facilities={facilities}
          handleDeleteFacility={handleDeleteFacility}
        />
        <div className="flex space-between main-layout full sortBy-results-container">
          <div className="sortBy-container flex align-center space-between">
            {spas.length ? <p>{spas.length} Results</p> : <p>No Results</p>}

            <button onClick={() => setIsMenuOpen(!isSortByMenuOpen)}>
              <span>{sortByBtnTxt}</span>
              <Icon name="ArrowDown"/>
            </button>
          </div>
          <SortByDropdown
            spas={spas}
            isMenuOpen={isSortByMenuOpen}
            setSortByBtnTxt={setSortByBtnTxt}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
        {isLabelSearch && ( // Spas by labels
          <ul>
            <SpaList
              spas={spas}
              isLabelSearch={isLabelSearch}
              selectedLabel={selectedLabel}
            />
          </ul>
        )}
        {!isLabelSearch && ( // Spas by params
          <ul>
            <SpaList spas={spas} />
          </ul>
        )}
        {/* <button className="map-btn flex align-center justify-center">
        <Icon name="Map"/>
          <span>Map</span>
        </button> */}
      </section>
    );
  } else if (!spas) { // loading
    return (
      <div>
        <Skeleton variant="text" sx={{ fontSize: "20px" }} width="120px" />
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
      </div>    );
  } else // no search results
    return (
      <section className="search main-layout full">
        <h1>No Spas Found</h1>
        {facilities && (
          <FacilityChip
            facilities={facilities}
            handleDeleteFacility={handleDeleteFacility}
          />
        )}
      </section>
    );
}