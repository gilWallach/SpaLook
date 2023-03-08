import { Button, FormControl, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UploadImage } from "../cmps/UploadImage";
import { showSuccessMsg } from "../services/event-bus.service";
import { labelService } from "../services/label.service";
import { spaService } from "../services/spa.service";
import { removeLabel, saveLabel } from "../store/actions/label.actions";

export function AdminLabelEditPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [label, setLabel] = useState();
  const [facilitiesItems, setFacilitiesItems] = useState([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    getLabel();
    getFacilities();
  }, []);

  async function getLabel() {
    const labelId = params.id;
    const label = labelId
      ? await labelService.getById(labelId)
      : labelService.getEmptyLabel();
    setLabel(label);
  }

  async function getFacilities() {
    setFacilitiesItems(await spaService.getFacilities());
  }

  async function onSaveLabel(ev) {
    ev.preventDefault();
    try {
      dispatch(saveLabel(label));
      showSuccessMsg('Label Saved Successfully!')
      navigate("/admin/label")
    } catch (err) {
      console.log("err: ", err);
    }
  }

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;
    switch (target.type) {
      case "number":
      case "range":
        value = +value;
        break;
      case "checkbox":
        value = target.checked;
        break;
      default:
        break;
    }

    setLabel((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  function handleFilterByChange({ target }) {
    const field = target.name;
    let value = target.value;
    if (field === "facilities") {
      setLabel((prevState) => ({
        ...prevState,
        filterBy: {
          ...prevState.filterBy,
          facilities: [...filterBy.facilities, value],
        },
      }));
    } else {
      setLabel((prevState) => ({
        ...prevState,
        filterBy: {
          ...prevState.location,
          [field]: value,
        },
      }));
    }
  }

  function handleSvgUrlSave(url) {
    setLabel((prevState) => ({
      ...prevState,
      svgUrl: url,
    }));
  }

  function onRemoveLabel() {
    try {
      dispatch(removeLabel(label._id));
      navigate("/admin/label");
    } catch (err) {
      console.log("err: ", err);
    }
  }

  if (!label) return;
  const { name, svgUrl, filterBy, url } = label;
  return (
    <section className="label-edit">
      <form onSubmit={onSaveLabel}>
        <div className="label-page-inputs flex space-between sec-top-margin">
          <FormControl sx={{ m: 1, width: 300 }}>
            <TextField
              name="name"
              id="outlined-labelName"
              label="Name"
              value={name}
              onChange={handleChange}
            />
            <TextField
              name="url"
              id="outlined-labeUrl"
              label="Url"
              value={url}
              onChange={handleChange}
            />
            <TextField
              name="svgUrl"
              id="outlined-labeUrl"
              label="svgUrl"
              value={svgUrl}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }}>
            <h3>Filter By:</h3>
            <TextField
              name="txt"
              id="outlined-labeTxt"
              label="Text"
              value={filterBy.txt}
              onChange={handleFilterByChange}
            />
            <TextField
              name="minPrice"
              id="outlined-labeMinPrice"
              label="Min Price"
              value={filterBy.minPrice}
              onChange={handleFilterByChange}
            />
            <TextField
              name="maxPrice"
              id="outlined-labeMaxPrice"
              label="Max Price"
              value={filterBy.maxPrice}
              onChange={handleFilterByChange}
            />
            <TextField
              name="guests"
              id="outlined-labeGuests"
              label="Guests"
              value={filterBy.guests}
              onChange={handleFilterByChange}
            />

            {filterBy.facilities && (
              <Select
                labelId="facilities-label"
                id="demo-multiple-name"
                name="facilities"
                multiple
                value={filterBy.facilities}
                onChange={handleFilterByChange}
                label="Facilities"
                MenuProps={MenuProps}
              >
                {facilitiesItems.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
        </div>
        <UploadImage handleSave={handleSvgUrlSave} />
        <div className="flex space-between sec-top-margin">
        <button className="simple-button">Save</button>
        <Button onClick={onRemoveLabel}>Remove Label</Button>
        </div>
      </form>
    </section>
  );
}