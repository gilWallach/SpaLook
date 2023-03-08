import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, ImageList, ImageListItem, InputAdornment, OutlinedInput } from "@mui/material";
import TextField from "@mui/material/TextField";
import { UploadImage } from "../cmps/UploadImage";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { ReactSVG } from "react-svg";

export function AdminSpaEditPack(props) {
  const [pack, setPack] = useState(props.pack);

  useEffect(() => {
    setPack(props.pack);
  }, [props.pack]);

  useEffect(() => {
    if (pack === props.pack) return;
    props.handleUpdatePack(pack);
  }, [pack]);



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

    setPack((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  function onDeletePack(ev) {
    ev.preventDefault();
    props.deletePack(pack);
  }

  function handleImageSave(imgUrl) {
    setPack((prevPack) => ({ ...prevPack, imgUrl }))
  }

  function onRemoveImage() {
    setPack((prevPack) => ({ ...prevPack, imgUrl: '' }))
  }

  if (!props.pack) return;
  const { name, duration, price, guests } = pack;

  return (
    <section className="spa-edit-pack sec-top-margin">
      <FormControl sx={{ m: 1, width: 300 }}>
        <TextField
          name="name"
          id="outlined-name"
          label="Name"
          value={name}
          onChange={handleChange}
        />

        <TextField
          name="duration"
          id="outlined-duration-flexible"
          label="Duration (minutes)"
          onChange={handleChange}
          value={duration}
          multiline
          margin="normal"
        />

        <FormControl>

          <InputLabel htmlFor="outlined-price">Price</InputLabel>
          <OutlinedInput
            name="price"
            id="outlined-price"
            label="price"
            value={price}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Guests</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pack.guests || ''}
            label="Age"
            onChange={handleChange}
            name="guests"
          >
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={'group'}>Group</MenuItem>
          </Select>
        </FormControl>
      </FormControl>

      <div className="img-container flex">
        {pack.imgUrl ? <>
          <img src={pack.imgUrl} alt="" />
          <Button variant="contained" onClick={onRemoveImage}><DeleteOutlinedIcon /></Button>
        </>
          :
          <UploadImage handleSave={handleImageSave} />
        }
      </div>
      {/* <button onClick={onDeletePack}>Delete</button> */}
      <Button variant="outlined" onClick={onDeletePack} >Remove pack</Button>
      <hr className="sec-top-margin" />
    </section>
  );
}
