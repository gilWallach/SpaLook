import React, { useEffect, useState } from "react";
import { AdminSpaEditPack } from "./AdminSpaEditPack";
import { useDispatch } from "react-redux";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { spaService } from "../services/spa.service";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { removeSpa, saveSpa } from "../store/actions/spa.actions";
import { categoryService } from "../services/category.service";
import { Button, ImageList, ImageListItem } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { UploadImage } from "../cmps/UploadImage";
import { Icon } from "../cmps/Icon";
import { ActivityHoursPicker } from "../cmps/ActivityHoursPicker";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

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

export function AdminSpaEdit() {
  const dispatch = useDispatch();
  const params = useParams();

  const [spa, setSpa] = useState(null);
  const [facilitiesItems, setFacilitiesItems] = useState([]);
  const [categoriesItems, setCategories] = useState([]);
  const [isPack, setIsPack] = useState(false);
  const urlLocation = useLocation();
  const navigate = useNavigate();
  const emptyPack = spaService.getEmptyPack();

  useEffect(() => {
    getSpa();
    getFacilities();
    getCategories();
  }, [params]);

  async function getSpa() {
    const spaId = params.id;
    const spa = spaId
      ? await spaService.getById(spaId)
      : spaService.getEmptySpa();
    setSpa(spa);
  }

  async function getFacilities() {
    setFacilitiesItems(await spaService.getFacilities());
  }

  async function getCategories() {
    setCategories(await categoryService.getCategories());
  }

  async function onSaveSpa(ev) {
    ev?.preventDefault();
    try {
      dispatch(saveSpa(spa));
      showSuccessMsg('Spa Saved Successfully!')
      if (!isPack) navigate("/admin/spas")
      setIsPack(false);
    } catch (err) {
      console.log("err: ", err);
      showErrorMsg('Could not save spa')
    }
  }

  function onRemoveSpa() {
    try {
      dispatch(removeSpa(spa._id));
      showSuccessMsg('Spa was deleted successfully')
      setIsPack(false)
      navigate("/admin")
    } catch (err) {
      showErrorMsg('Could not delete spa')
      console.log("err: ", err);
    }
  }

  async function addPack() {
    const pack = spaService.getEmptyPack();
    setSpa((prevSpa) => ({ ...prevSpa, packs: [...prevSpa.packs, pack] }))
    // await spaService.save(newSpa);
  }

  async function handleUpdatePack(packToEdit) {
    let packs;
    const pack = spa.packs.find((pack) => pack._id === packToEdit._id)
    pack
      ? (packs = spa.packs.map((pack) =>
        pack._id === packToEdit._id ? packToEdit : pack
      ))
      : (packs = [...spa.packs, packToEdit]);
    setSpa((prevSpa) => ({ ...prevSpa, packs }))
  }

  async function deletePack(packToDelete) {
    const packs = spa.packs.filter((pack) => pack._id !== packToDelete._id);
    setSpa((prevSpa) => ({ ...prevSpa, packs }))
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

    setSpa((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  function handleLocationChange({ target }) {
    const field = target.name;
    let value = target.value;
    setSpa((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        [field]: value,
      },
    }));
  }

  function handleActivityHoursChange(day, value) {
    setSpa((prevState) => ({
      ...prevState,
      activityHours: {
        ...prevState.activityHours,
        [day]: { from: value[0], to: value[1] },
      },
    }));
  }

  function handleImageSave(imgUrl) {
    setSpa((prevSpa) => ({
      ...prevSpa,
      imgUrls: [...prevSpa.imgUrls, imgUrl],
    }));
    console.log(spa)
  }

  function onRemoveImage(imgIdx) {
    const imgUrls = spa.imgUrls.filter((imgUrl, idx) => idx !== imgIdx);
    setSpa((prevSpa) => ({ ...prevSpa, imgUrls }));
  }

  if (!spa) return;
  const {
    name,
    description,
    phone,
    facilities,
    categories,
    location,
    webUrl,
    activityHours,
  } = spa;

  return (
    <section className="spa-edit sec-top-margin">
      <form onSubmit={onSaveSpa}>
        {/* Render based inPack Value */}
        {!isPack ? (
          <div className="edit-page-inputs">
            <div>
              <div className="edit-container flex column space-between">
                <div className="content-container flex column">

                  <FormControl sx={{ m: 1, width: 300 }}>
                    <TextField
                      name="name"
                      id="outlined-name"
                      label="Name"
                      value={name}
                      onChange={handleChange}
                    />

                    <TextField
                      name="description"
                      id="outlined-description-flexible"
                      label="Description"
                      onChange={handleChange}
                      value={description}
                      multiline
                      maxRows={4}
                      margin="normal"
                    />

                    <TextField
                      name="phone"
                      id="outlined-phone"
                      label="Phone"
                      value={phone}
                      onChange={handleChange}
                      margin="normal"
                    />
                    <TextField
                      name="street"
                      id="outlined-street"
                      label="Street"
                      value={location.street}
                      onChange={handleLocationChange}
                      margin="normal"
                    />
                    <TextField
                      name="city"
                      id="outlined-city"
                      label="City"
                      value={location.city}
                      onChange={handleLocationChange}
                      margin="normal"
                    />
                    <TextField
                      name="webUrl"
                      id="outlined-webUrl"
                      label="Website"
                      value={webUrl}
                      onChange={handleChange}
                      margin="normal"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="facilities-label">Facilities</InputLabel>
                    <Select
                      labelId="facilities-label"
                      id="demo-multiple-name"
                      name="facilities"
                      multiple
                      value={facilities}
                      onChange={handleChange}
                      label="Facilities"
                      MenuProps={MenuProps}
                    >
                      {facilitiesItems.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="Categories-label">Categories</InputLabel>
                    <Select
                      labelId="Categories-label"
                      id="demo-multiple-name"
                      name="categories"
                      multiple
                      value={categories}
                      onChange={handleChange}
                      label="Facilities"
                      MenuProps={MenuProps}
                    >
                      {categoriesItems.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="opening-hours-wrapper">
                  <h3>Activity hours:</h3>
                  {Object.keys(activityHours).map((key) => {
                    return (
                      <ActivityHoursPicker
                        day={key}
                        activityHours={activityHours[key]}
                        key={`${spa._id}${key}`}
                        handleActivityHoursChange={handleActivityHoursChange}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="imgs-container">
                <ImageList variant="masonry" cols={3} gap={8}>
                  {spa.imgUrls.map((imgSrc, idx) => (
                    <ImageListItem key={imgSrc}>
                      <div className="img-container flex">
                        <img
                          src={`${imgSrc}`}
                          alt={"spa-image-idx"}
                          loading="lazy"
                        />
                        <Button
                          variant="contained"
                          className="rounded-button"
                          onClick={() => onRemoveImage(idx)}
                        >
                          <DeleteOutlinedIcon />
                        </Button>
                      </div>
                    </ImageListItem>
                  ))}
                </ImageList>
                <UploadImage handleSave={handleImageSave} />
              </div>
            </div>
          </div>
        ) : (
          <div className="packs-input">
            {/* If PACK RETURN This */}
            <h2>packs</h2>
            {spa && spa.packs.length
              ? spa.packs.map((pack) => (
                <AdminSpaEditPack
                  key={pack._id}
                  pack={pack}
                  deletePack={deletePack}
                  handleUpdatePack={handleUpdatePack}
                />
              ))
              : addPack()}
          </div>
        )}
        <div className="btns-container flex space-between sec-top-margin">
          {isPack ? (
            <div className="btn-container">
              <Button className="back-btn" onClick={() => setIsPack(false)}>
                <Icon name="Back" />
                back
              </Button>
              <Button variant="contained" onClick={addPack}>
                Add Pack
              </Button>
            </div>
          ) : (
            <button className="simple-button" onClick={() => setIsPack(true)}>
              {spa.packs.length ? "Edit Packs" : "Add Packs"}
            </button>
          )}
          {<button className="simple-button">Save</button>}
          {!isPack && <Button onClick={onRemoveSpa}>Remove Spa</Button>}
        </div>
      </form>
    </section>
  );
}
