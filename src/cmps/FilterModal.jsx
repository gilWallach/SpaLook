import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { spaService } from "../services/spa.service";
import { setSpasCount } from "../store/actions/spa.actions";
import { Icon } from "./Icon";
import { LabelList } from "./LabelList";
import { PriceRange } from "./PriceRange";

export function FilterModal(props) {
  const dispatch = useDispatch();

  const guests = useSelector((state) => state.categoryModule.guests);
  const spasCount = useSelector((state) => state.spaModule.spasCount);

  const [filterBy, setFilterBy] = useState(props.filterBy);
  // const [checkedFacilities, setCheckedFacilities] = useState([])

  useEffectUpdate(() => {
    setFilterBy({ ...props.filterBy });
  }, [props.filterBy]);

  useEffectUpdate(() => {
    dispatch(setSpasCount(filterBy));
  }, [filterBy]);

  const onSelectGuests = useCallback(({ filterBy }) => {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }));
  });

  function handleFacilityChange({ target }) {
    // if (target.checked) setCheckedFacilities(prev => [...prev, target.value])
    if (target.checked)
      setFilterBy((prevFilterBy) => ({
        ...prevFilterBy,
        facilities: [...prevFilterBy.facilities, target.value],
      }));
    else
      setFilterBy((prevFilterBy) => ({
        ...prevFilterBy,
        facilities: prevFilterBy.facilities.filter(
          (facility) => facility !== target.value
        ),
      }));
    // else setCheckedFacilities(prev => prev.filter(facility => facility !== target.value))
  }

  function handleSubmit(ev) {
    props.onChangeFilter(ev, { ...filterBy });
  }

  const handleSliderChange = (values) => {
    setFilterBy((prevFilterBy) => ({
      ...prevFilterBy,
      minPrice: values[0],
      maxPrice: values[1],
    }));
    dispatch(setSpasCount({ ...filterBy }));
  };

  return (
    <div className="filter-modal">
      <div className="price-range">
        <h2>Price Range</h2>
        <PriceRange
          spaPrices={props.spaPrices}
          handleFilterBy={handleSliderChange}
          ranges={[filterBy.minPrice, filterBy.maxPrice]}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="guests">
          <h3>Who's Coming?</h3>
          {guests && guests.length && (
            <section className="label-searches sec-top-margin">
              <LabelList
                handleClick={onSelectGuests}
                labels={guests}
                isGuestsList={true}
                selectedGuest={filterBy.guests}
              />
            </section>
          )}
        </div>
        <div className="facilities">
          <h3>Facilities</h3>
          <ul className="clean-list">
            <FormGroup name="facilities">
              {props.facilities.map((facility) => {
                {
                  return (
                    filterBy.facilities && (
                      <li key={facility}>
                        {typeof facility === "string" ? (
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={handleFacilityChange}
                                name="facilities"
                                checked={filterBy.facilities.includes(facility)}
                                value={facility}
                              />
                            }
                            label={facility}
                          />
                        ) : (
                          <div className="nested-facility-container">
                            <Accordion
                              sx={{
                                backgroundColor: "transparent",
                                boxShadow: 0,
                                margin: 0,
                                padding: 0,
                                color: "#2E3A59",
                              }}
                            >
                              <AccordionSummary
                                sx={{
                                  margin: 0,
                                  padding: 0,
                                  justifyContent: "flex-start",
                                  gap: "4.5px",
                                  minHeight: "36px",
                                }}
                                expandIcon={<Icon name="FacilityDownArrow" />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <FormControlLabel
                                  sx={{ margin: 0 }}
                                  label={facility[0]}
                                  control={
                                    <Checkbox
                                      sx={{
                                        paddingBlock: 0,
                                        paddingInlineStart: 0,
                                        color: "#8F9BB",
                                      }}
                                      checked={filterBy.facilities.some((amen) =>
                                        amen.includes(facility[0])
                                      )}
                                      // indeterminate={checked[0] !== checked[1]}
                                      // onChange={handleFacilityChange}
                                    />
                                  }
                                />
                              </AccordionSummary>
                              <AccordionDetails sx={{ paddingBlock: 0 }}>
                                <ul className="nested-facility">
                                  {facility[1].map((facility) => {
                                    return (
                                      <li key={facility}>
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              sx={{ color: "#8F9BB" }}
                                              onChange={handleFacilityChange}
                                              name="facilities"
                                              checked={filterBy.facilities.includes(
                                                facility
                                              )}
                                              value={facility}
                                            />
                                          }
                                          label={facility}
                                        />
                                      </li>
                                    );
                                  })}
                                </ul>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        )}
                      </li>
                    )
                  );
                }
              })}
            </FormGroup>
          </ul>
          {!props.isFullFacilityList && (
            <div className="view-more">
              <button onClick={props.openFullFacilityList}>View More</button>
            </div>
          )}
        </div>
        <div className="btns-container flex align-center">
          <button
            type="button"
            className="full-grow"
            onClick={() => setFilterBy(spaService.getemptyFilterBy())}
          >
            Clear All
          </button>
          <button type="submit" className="full-grow simple-button dark">
            {`Show ${spasCount} Spas`}
          </button>
        </div>
      </form>
    </div>
  );
}
