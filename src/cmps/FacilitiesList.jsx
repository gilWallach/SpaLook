import { useState } from "react";
import { Icon } from "./Icon";

export function FacilitiesList({ facilities, id }) {
  const [shownFacilities, setShownFacilities] = useState(
    facilities.length <= 5 ? facilities : facilities.slice(0, 5)
  );

  return (
    <>
      <ul>
        {shownFacilities.map((facility) => {
          return (
            <li key={`${id}_${facility}`} className="flex align-center">
              <div className="icon-container">
                <Icon name="Checkmark" />
              </div>
              <span>{facility}</span>
            </li>
          );
        })}
      </ul>
      {facilities.length > 5 && shownFacilities.length <= 5 && (
        <div className="btn-container flex">
          <button
            className="full-grow"
            onClick={() => {
              setShownFacilities(facilities);
            }}
          >
            Show All {facilities.length} Facilities
          </button>
        </div>
      )}
    </>
  );
}
