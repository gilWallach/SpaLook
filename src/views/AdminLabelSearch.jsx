import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useOutletContext } from "react-router";
import { NavLink } from "react-router-dom";
import { SpaList } from "../cmps/SpaList";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { AdminLabelList } from "./AdminLabelList";

export function AdminLabelSearch() {
  const [spas, labels] = useOutletContext();
  const [labelsForDisplay, setLabelsForDisplay] = useState(labels);
  const [labelsForAutoComplete] = useState(labels.map((label) => label.name));
  const [filterBy, setFilterBy] = useState({ txt: "" });

  useEffectUpdate(() => {
    loadLabels();
  }, [filterBy.txt, labels]);

  function loadLabels() {
    const regex = new RegExp(filterBy.txt, "i");
    let labelsForDisplay;
    if (labels) labelsForDisplay = labels.filter((label) => regex.test(label.name));
    setLabelsForDisplay(labelsForDisplay);
  }

  return (
    <section className="label-search-admin flex column">
      {labels && (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={labelsForAutoComplete}
          sx={{ paddingBlock: 2 }}
          // value={filterBy.txt}
          // inputValue={filterBy.txt}
          onInputChange={(ev, txt) =>
            setFilterBy((prevFilterBy) => ({ ...prevFilterBy, txt }))
          }
          renderInput={(params) => <TextField {...params} label="Search Label" />}
        />
      )}
      <NavLink to="/admin/label/add" className="simple-button">
        Add Label
      </NavLink>
      {!labelsForDisplay.length && <h1>No labels added yet</h1>}
      {labelsForDisplay && <AdminLabelList labels={labelsForDisplay} isAdmin={true} />}
    </section>
  );
}
