import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigateSearch } from "../customHooks/useNavigateSearch";
import { setSelectedLabel } from "../store/actions/label.actions";

import { LabelCarousel } from "./LabelCarousel";
import { LabelPreview } from "./LabelPreview";

export function LabelList({
  labels,
  isGuestsList,
  isCarousel,
  handleClick,
  selectedGuest,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigateSearch();

  const selectedLabel = useSelector((state) => state.spaModule.selectedLabel);
  const [selectedLabelIdx, setSelectedLabelIdx] = useState(null);

  if (labels) {
    async function onSelectLabel(label, idx) {
      if (handleClick) {
        setSelectedLabelIdx(idx);
        handleClick(label);
      } else {
        dispatch(setSelectedLabel(selectedLabel));
        navigate(`${label.url}`);
      }
    }

    if (isCarousel)
      return (
        <div className="label-carousel-wrapper">
          <LabelCarousel labels={labels} isCircleStyle={true} />
        </div>
      );

    if (isGuestsList)
      return (
        <div className="guests-list">
          {labels.map((label, idx) => {
            return (
              <div className="flex column "
                key={`guests-${label._id}`}
              >
                <li
                  onClick={() => onSelectLabel(label, idx)}
                  className={`label-preview flex column ${selectedGuest === label.filterBy.guests ? "selected" : ""
                    }`}
                >
                  <LabelPreview label={label} isGuestsList={true} />
                </li>
                <p>{label.name}</p>
              </div>
            );
          })}
        </div>
      );
  }
}
