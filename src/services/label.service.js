import { async } from "q";
import { storageService } from "./async-storage.service.js";
// import { httpService } from "./http.service.js";
import { utilService } from "./util.service.js";
// import { userService } from './user.service.js'

export const labelService = {
  getLabels,
  getGuests,
  getById,
  getSelectedLabelByUrl,
  getEmptyLabel,
  save,
  remove,
};
window.ss = labelService;

const STORAGE_KEY = "labels";
async function getLabels() {
  // return httpService.get(STORAGE_KEY, filterBy)
  var labels = await storageService.query(STORAGE_KEY);
  if (!labels || !labels.length) {
    labels = _getLabels();
    // return await storageService.post(STORAGE_KEY, labels);
    // label = await httpService.post('label', label)
  }
  return labels;
}

async function getSelectedLabelByUrl({ labelUrl }) {
  let labels = null;
  if (!labels || !labels.length) labels = await getLabels();

  let selectedLabel = null;
  labels.forEach((label) => {
    if (label.url.includes(labelUrl)) selectedLabel = label;
  });
  return selectedLabel;
}

async function getById(labelId) {
  return await storageService.get(STORAGE_KEY, labelId);
  // return httpService.get(`spa/${spaId}`)
}

async function getGuests() {
  // return httpService.get(STORAGE_KEY, filterBy)
  var guests = await storageService.query("guests");
  if (!guests || !guests.length) guests = _getGuests();
  return guests;
}

async function remove(labelId) {
  return await storageService.remove(STORAGE_KEY, labelId);
  // return httprvice.delete(`label/${labelId}`)
}
async function save(label) {
  var savedLabel;
  if (label._id) {
    savedLabel = await storageService.put(STORAGE_KEY, label);
    // savedLabel = await httpService.put(`label/${label._id}`, label)
  } else {
    // Later, owner is set by the backend
    // label.owner = userService.getLoggedinUser()
    savedLabel = await storageService.post(STORAGE_KEY, label);
    // savedLabel = await httpService.post('label', label)
  }
  return savedLabel;
}

function getEmptyLabel() {
  return {
    name: "",
    svgUrl: "",
    filterBy: {
      txt: "",
      minPrice: 0,
      maxPrice: 0,
      guests: "",
      facilities: [],
    },
    url: "",
  };
}

function _getLabels() {
  const labels = [
    {
      _id: utilService.makeId(),
      name: "Pool",
      svgUrl: "https://res.cloudinary.com/spaplus2023/image/upload/v1675611105/Relax_ukliov.svg",
      filterBy: {
        facilities: ["Pool"]
      },
      url: "/spa_pool",
    },
    {
      _id: utilService.makeId(),
      name: "Hammam",
      svgUrl: "http://res.cloudinary.com/spaplus2023/image/upload/v1677791469/FacialMask_ukmflg.svg",
      filterBy: {
        facilities: ["Hammam"]
      },
      url: "/spa_hammam",
    },
    {
      _id: utilService.makeId(),
      name: "Jacuzzi",
      svgUrl: "http://res.cloudinary.com/spaplus2023/image/upload/v1677791424/FootMassage_c4avhe.svg",
      filterBy: {
        facilities: ["Jacuzzi"]
      },
      url: "/spa_jacuzzi",
    },

    {
      _id: utilService.makeId(),
      name: "Meal",
      svgUrl: "https://res.cloudinary.com/spaplus2023/image/upload/v1675611105/Relax_ukliov.svg",
      filterBy: {
        facilities: ["Meal"],
      },
      url: "/spa_meal",
    },
    {
      _id: utilService.makeId(),
      name: "Facial",
      svgUrl: "http://res.cloudinary.com/spaplus2023/image/upload/v1677791469/FacialMask_ukmflg.svg",
      filterBy: {
        facilities: ["Facial"],
      },
      url: "/spa_facial",
    },
    {
      _id: utilService.makeId(),
      name: "Wet Sauna",
      svgUrl: "http://res.cloudinary.com/spaplus2023/image/upload/v1677791424/FootMassage_c4avhe.svg",
      filterBy: {
        facilities: ["Wet Sauna"]
      },
      url: "/spa_wet_sauna",
    },
    {
      _id: utilService.makeId(),
      name: "Dry Sauna",
      svgUrl: "https://res.cloudinary.com/spaplus2023/image/upload/v1675611105/Relax_ukliov.svg",
      filterBy: {
        facilities: ["Dry Sauna"]
      },
      url: "/spa_dry_sauna",
    },
    {
      _id: utilService.makeId(),
      name: "Hot tub",
      svgUrl: "http://res.cloudinary.com/spaplus2023/image/upload/v1677791469/FacialMask_ukmflg.svg",
      filterBy: {
        facilities: ["Hot tub"]
      },
      url: "/spa_hot_tub",
    },
    {
      _id: utilService.makeId(),
      name: "Shower",
      svgUrl: "http://res.cloudinary.com/spaplus2023/image/upload/v1677791424/FootMassage_c4avhe.svg",
      filterBy: {
        facilities: ["Shower"]
      },
      url: "/spa_shower",
    },
    {
      _id: utilService.makeId(),
      name: "Flip flops",
      svgUrl: "https://res.cloudinary.com/spaplus2023/image/upload/v1675611105/Relax_ukliov.svg",
      filterBy: {
        facilities: ["Flip flops"]
      },
      url: "/spa_flipflops",
    },
  ];
  localStorage[STORAGE_KEY] = JSON.stringify(labels)
  return new Promise((resolve) => setTimeout(() => resolve(labels), 500));
}

function _getGuests() {
  const guests = [
    {
      _id: utilService.makeId(),
      name: "Single",
      svgName: "Single",
      filterBy: {
        guests: "1",
      },
      url: "/single_spa",
    },
    {
      _id: utilService.makeId(),
      name: "Couple",
      svgName: "Double",
      filterBy: {
        guests: "2",
      },
      url: "/couple_spa",
    },
    {
      _id: utilService.makeId(),
      name: "Group",
      svgName: "Group",
      filterBy: {
        guests: "group",
      },
      url: "/group_spa",
    },
  ];
  localStorage["guests"] = JSON.stringify(guests)
  return new Promise((resolve) => setTimeout(() => resolve(guests), 500));
}
