import { useDispatch, useSelector } from "react-redux";

import { LocationList } from "../cmps/LocationList";
import { SpasCategoriesList } from "../cmps/SpasCategoriesList";
import { LabelList } from "../cmps/LabelList";
import { useEffect } from "react";
import { loadSpas, setFilterBy } from "../store/actions/spa.actions";
import { spaService } from "../services/spa.service";
import { HomepageSkeleton } from "../cmps/HomepageSkeleton";
import { LabelsSkeleton } from "../cmps/LabelsSkeleton";
import { Skeleton } from "@mui/material";

// category filterBy -> spas -> 10 random
export function HomePage() {
  const spasByCategory = useSelector(
    (state) => state.categoryModule.spasByCategory
  );
  const labels = useSelector((state) => state.categoryModule.labels);
  const guests = useSelector((state) => state.categoryModule.guests);
  const locations = useSelector((state) => state.categoryModule.locations);

  const dispatch = useDispatch()

  useEffect(() => {
    // resetting filterBy every time homepage is loaded
    dispatch(setFilterBy(spaService.getemptyFilterBy()))
    dispatch(loadSpas())
  }, [])

  if(spasByCategory && spasByCategory.length) return (
    <section className="homepage">
      {labels && labels.length && (
        <section className="label-searches">
          <LabelList labels={labels} isCircleStyle={true} isCarousel={true} />
        </section>
      )}

      {spasByCategory && spasByCategory.length && (
        <section className="spas-by-categories sec-top-margin">
          <SpasCategoriesList spasByCategory={spasByCategory[0]} />
        </section>
      )}

      {locations && locations.length && (
        <section className="location-list sec-top-margin">
          <LocationList labels={locations} />
        </section>
      )}

      {guests && guests.length && (
        <section className="label-searches sec-top-margin">
          <h2>Who's coming?</h2>
          <LabelList labels={guests} isGuestsList={true} />
        </section>
      )}

      {spasByCategory && spasByCategory.length && (
        <section className="spas-by-categories sec-top-margin">
          <SpasCategoriesList spasByCategory={spasByCategory[1]} />
        </section>
      )}
    </section>
  );
  else return (
  <>
  <LabelsSkeleton/>
  <Skeleton variant="text" sx={{ fontSize: "20px" }} width="120px" />
  <HomepageSkeleton/>
  <Skeleton variant="text" sx={{ fontSize: "20px" }} width="120px" />
  <HomepageSkeleton/>
  <Skeleton variant="text" sx={{ fontSize: "20px" }} width="120px" />
  <HomepageSkeleton/>
  <Skeleton variant="text" sx={{ fontSize: "20px" }} width="120px" />
  <HomepageSkeleton/>
  </>
  )
}
