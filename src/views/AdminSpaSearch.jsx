import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useOutletContext } from "react-router";
import { NavLink } from "react-router-dom";
import { SpaList } from "../cmps/SpaList";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

export function AdminSpaSearch() {
  const [spas] = useOutletContext();
  const [spasForDisplay, setSpasForDisplay] = useState(spas);
  const [spasForAutoComplete] = useState(spas.map((spa) => spa.name));
  const [filterBy, setFilterBy] = useState({ txt: "" });

  useEffectUpdate(() => {
    loadSpas();
  }, [filterBy.txt, spas]);

  function loadSpas() {
    const regex = new RegExp(filterBy.txt, "i");
    let spasForDisplay;
    if (spas) spasForDisplay = spas.filter((spa) => regex.test(spa.name));
    setSpasForDisplay(spasForDisplay);
  }

  return (
    <section className="spa-search-admin flex column">
      {spas && (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={spasForAutoComplete}
          sx={{ paddingBlock: 2 }}
          // value={filterBy.txt}
          // inputValue={filterBy.txt}
          onInputChange={(ev, txt) =>
            setFilterBy((prevFilterBy) => ({ ...prevFilterBy, txt }))
          }
          renderInput={(params) => <TextField {...params} label="Search Spa" />}
        />
      )}
      <NavLink to="/admin/add" className="simple-button">
        Add Spa
      </NavLink>
      {!spasForDisplay.length && <h1>No spas added yet</h1>}
      {spasForDisplay && <SpaList spas={spasForDisplay} isAdmin={true} />}
    </section>
  );
}
