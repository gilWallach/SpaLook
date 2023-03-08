import { storageService } from "./async-storage.service.js";
// import { httpService } from "./http.service.js";
import { utilService } from "./util.service.js";
// import { userService } from './user.service.js'

export const locationService = {
    save,
    remove,
    getLocations,
}
window.ss = locationService

const STORAGE_KEY = 'locations'
async function getLocations(locationName = "") {
  // return httpService.get(STORAGE_KEY, filterBy)
  var locations = await storageService.query(STORAGE_KEY);
  if (!locations || !locations.length) locations = _getLocations();
  if (locationName) {
    const regex = new RegExp(locationName, "i");
    const location = locations.filter((location) => {
      return regex.test(location)
    });
    return location
  }
  return locations;
}

async function remove(locationId) {
  return await storageService.remove(STORAGE_KEY, locationId);
  // return httpService.delete(`location/${locationId}`)
}
async function save(location) {
  var savedSpa;
  if (location._id) {
    savedSpa = await storageService.put(STORAGE_KEY, location);
    // savedSpa = await httpService.put(`location/${location._id}`, location)
  } else {
    // Later, owner is set by the backend
    // location.owner = userService.getLoggedinUser()
    savedSpa = await storageService.post(STORAGE_KEY, location);
    // savedSpa = await httpService.post('location', location)
  }
  return savedSpa;
}

function _getLocations(){
  const locations = [
    {
      name: "Tel aviv",
      imgUrl:
        "http://res.cloudinary.com/spaplus2023/image/upload/v1677839960/map_dzhy2t.webp",
      filterBy: {
        txt: "Tel aviv",
      },
    },
    {
      name: "Haifa",
      imgUrl:
        "http://res.cloudinary.com/spaplus2023/image/upload/v1677839960/map_dzhy2t.webp",
      filterBy: {
        txt: "Haifa",
      },
    },
    {
      name: "Beer Sheva",
      imgUrl:
        "http://res.cloudinary.com/spaplus2023/image/upload/v1677839960/map_dzhy2t.webp",
      filterBy: {
        txt: "Beer Sheva",
      },
    },
    {
      name: "Jerusalem",
      imgUrl:
        "http://res.cloudinary.com/spaplus2023/image/upload/v1677839960/map_dzhy2t.webp",
      filterBy: {
        txt: "Jerusalem",
      },
    },
    {
      name: "Kiryat Ono",
      imgUrl:
        "http://res.cloudinary.com/spaplus2023/image/upload/v1677839960/map_dzhy2t.webp",
      filterBy: {
        txt: "Kiryat Ono",
      },
    },
  ]
  return new Promise(resolve => setTimeout(() => resolve(locations), 500))
}
