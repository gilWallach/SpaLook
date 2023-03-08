import { storageService } from "./async-storage.service.js";
import { httpService } from "./http.service.js";
import { utilService } from "./util.service.js";
// import { userService } from './user.service.js'

const STORAGE_KEY = "spa";

export const spaService = {
  query,
  getById,
  getByName,
  save,
  remove,
  count,
  getEmptySpa,
  addSpaReview,
  getFacilities,
  getEmptyPack,
  getemptyFilterBy,
  savePacks,
};
window.ss = spaService;

async function query(
  filterBy = { txt: "", minPrice: 0, maxPrice: 0, guests: "", facilities: [] }
) {
  // return httpService.get(STORAGE_KEY, filterBy)
  var spas = await storageService.query(STORAGE_KEY);
  if (!spas || !spas.length) spas = _getDemoSpas();
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, "i");
    spas = spas.filter((spa) => {
      return (
        regex.test(spa.name) ||
        regex.test(spa.location.city) ||
        regex.test(spa.categories)
      );
    });
  }
  if (filterBy.minPrice) {
    spas = spas.filter((spa) =>
      spa.packs.some((pack) => pack.price >= filterBy.minPrice)
    );
  }
  if (filterBy.maxPrice) {
    spas = spas.filter((spa) =>
      spa.packs.some((pack) => pack.price <= filterBy.maxPrice)
    );
  }

  if (filterBy.guests) {
    spas = spas.filter((spa) => {
      return spa.packs.some((pack) => {
        if (filterBy.guests === "1") return pack.guests === 1;
        if (filterBy.guests === "2") return pack.guests === 2;
        return pack.guests > 2;
      });
    });
  }

  if (filterBy.facilities?.length) {
    spas = spas.filter((spa) =>
      filterBy.facilities.every((facility) => spa.facilities.includes(facility))
    );
  }
  if (filterBy.city) {
    spas = spas.filter(
      (spa) => spa.location.city.toLowerCase() === filterBy.city.toLowerCase()
    );
  }
  return spas;
}

async function getById(spaId) {
  return await storageService.get(STORAGE_KEY, spaId);
  // return httpService.get(`spa/${spaId}`)
}

async function getByName(name) {
  const spas = await query();
  return spas.filter((spa) => spa.name.includes(name));
}

async function remove(spaId) {
  return await storageService.remove(STORAGE_KEY, spaId);
  // return httpService.delete(`spa/${spaId}`)
}
async function count(filterBy) {
  const filteredSpas = await query(filterBy)
  return filteredSpas.length
}
async function save(spa) {
  var savedSpa;
  if (spa._id) {
    savedSpa = await storageService.put(STORAGE_KEY, spa);
    // savedSpa = await httpService.put(`spa/${spa._id}`, spa)
  } else {
    // Later, owner is set by the backend
    // spa.owner = userService.getLoggedinUser()
    savedSpa = await storageService.post(STORAGE_KEY, spa);
    // savedSpa = await httpService.post('spa', spa)
  }
  return savedSpa;
}

async function savePacks(packs, spaId) {
  const spa = await getById(spaId);
  spa.packs = [...packs];
  return await storageService.put(STORAGE_KEY, spa);
  //  return await httpService.put(`spa/${spaId}`, packs)
}

async function addSpaReview(spaId, review) {
  const spa = getById(spaId);
  spa.reviews.push(review);
  await storageService.put(STORAGE_KEY, spa);
  // const savedReview = await httpService.post(`spa/${spaId}/review`, {txt})
  return review;
}

// async function addSpaPackage(spaId, review) {
//     const spa = getById(spaId)
//     spa.reviews.push(review)
//     await storageService.put(STORAGE_KEY, spa)
//     // const savedReview = await httpService.post(`spa/${spaId}/review`, {txt})
//     return review
// }

// async function removeSpaPackage(spaId, review) {
//     const spa = getById(spaId)
//     spa.reviews.push(review)
//     await storageService.put(STORAGE_KEY, spa)
//     // const savedReview = await httpService.post(`spa/${spaId}/review`, {txt})
//     return review
// }

function getEmptySpa() {
  return {
    name: "",
    description: "",
    phone: "",
    activityHours: {
      sunday: { from: "", to: "" },
      monday: { from: "", to: "" },
      tuesday: { from: "", to: "" },
      wednesday: { from: "", to: "" },
      thursday: { from: "", to: "" },
      friday: { from: "", to: "" },
      saturday: { from: "", to: "" },
    },
    facilities: [],
    categories: [],
    location: {
      city: "",
      street: "",
      // Calculating lat lng after submittion from an api
    },
    reviews: [],
    packs: [],
    imgUrls: [],
  };
}

function _getDemoSpas() {
  const spas = [
    {
      _id: "spa11",
      name: "Fine Spa",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis debitis velit sunt eum dicta vitae unde nam repudiandae laboriosam est magni assumenda dolorum accusantium quod incidunt, veritatis, odio commodi.",
      phone: "12345678",
      activityHours: {
        sunday: { from: "9:00", to: "18:00" },
        monday: { from: "9:00", to: "18:00" },
        tuesday: { from: "9:00", to: "13:00" },
        wednesday: { from: "9:00", to: "18:00" },
        thursday: { from: "9:00", to: "18:00" },
        friday: { from: "8:00", to: "13:00" },
        saturday: { from: "10:00", to: "16:00" },
      },
      facilities: ["Wet Sauna", "Hot tub", "Pool", "Meal"],
      categories: ["Popular"],
      location: {
        city: "Haifa",
        street: "Herzel 17",
        lat: 32.80718,
        lng: 35.10857,
      },
      reviews: [
        {
          _id: utilService.makeId(),
          by: "Ezra",
          description: "I loved it! it's the best spa ever!",
          rate: 4.5,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Jac",
          description: "I loved the Jacuzzi, great experience",
          rate: 5,
          createdAt: Date.now(),
        },
      ],
      packs: [
        {
          _id: utilService.makeId(),
          name: "Foot Massage",
          duration: 45,
          price: 195,
          guests: 1,
          imgUrl:
            "https://static-bebeautiful-in.unileverservices.com/1200/900/10-Reasons-Why-You-Should-get-a-Foot-%20Massage_mobilehome.jpg",
        },
        {
          _id: utilService.makeId(),
          name: "Couple Massage",
          duration: 50,
          price: 295,
          guests: 2,
          imgUrl:
            "https://images.squarespace-cdn.com/content/v1/5bedda4455b02c223c7c4132/5f4174fe-7537-417b-b63c-71cf572b5d7b/romantic-couples-massage.jpg",
        },
      ],
      imgUrls: [
        "https://a0.muscache.com/im/pictures/ad439973-f1b2-4d61-a34e-8a9eca410d00.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/fb9317b7-7b6e-444c-bb1a-df37b468610c.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/4fbce29b-15ab-4160-8acd-c6ca4d498905.jpg?im_w=720",
      ],
      logoUrl: "",
      webUrl: "www.best-spa.com",
    },
    {
      _id: "spa22",
      name: "Finest Spa",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis debitis velit sunt eum dicta vitae unde nam repudiandae laboriosam est magni assumenda dolorum accusantium quod incidunt, veritatis, odio commodi.",
      phone: "98765432",
      activityHours: {
        sunday: { from: "9:00", to: "19:00" },
        monday: { from: "9:00", to: "19:00" },
        tuesday: { from: "9:00", to: "19:00" },
        wednesday: { from: "9:00", to: "19:00" },
        thursday: { from: "9:00", to: "19:00" },
        friday: { from: "8:00", to: "14:00" },
        saturday: { from: "10:00", to: "16:00" },
      },
      facilities: ["Hot tub", "Flip flops", "Jacuzzi", "Hammam"],
      categories: ["Top Location"],
      location: {
        city: "Tel Aviv",
        street: "Bugrashuv 29",
        lat: 32.07358,
        lng: 34.78805,
      },
      reviews: [
        {
          _id: utilService.makeId(),
          by: "Momo",
          description: "No hot water in the showers",
          rate: 4.7,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Dubi",
          description: "The staff was rude",
          rate: 4.9,
          createdAt: Date.now(),
        },
      ],
      packs: [
        {
          _id: utilService.makeId(),
          name: "Couple Massage",
          duration: 25,
          price: 195,
          guests: 2,
          imgUrl:
            "https://images.squarespace-cdn.com/content/v1/5bedda4455b02c223c7c4132/5f4174fe-7537-417b-b63c-71cf572b5d7b/romantic-couples-massage.jpg",
        },
        {
          _id: utilService.makeId(),
          name: "Facial Treatment",
          duration: 25,
          price: 195,
          guests: 1,
          imgUrl:
            "https://introlift.com/wp-content/uploads/Introlift-Facials-for-Spring-Revive.jpg",
        },
      ],
      imgUrls: [
        "https://images.unsplash.com/photo-1590079083219-5bc40d5a9d69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8",
        "https://a0.muscache.com/im/pictures/c2620ed0-ec78-4876-a04b-6ced7142d09d.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/2dd177d8-6220-419c-a806-3348baa0a0da.jpg?im_w=720",
      ],
      logoUrl: "",
      webUrl: "www.worst-spa.com",
    },
    {
      _id: utilService.makeId(),
      name: "Amazing Spa",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis debitis velit sunt eum dicta vitae unde nam repudiandae laboriosam est magni assumenda dolorum accusantium quod incidunt, veritatis, odio commodi.",
      phone: "98765432",
      activityHours: {
        sunday: { from: "9:00", to: "19:00" },
        monday: { from: "9:00", to: "19:00" },
        tuesday: { from: "9:00", to: "19:00" },
        wednesday: { from: "9:00", to: "19:00" },
        thursday: { from: "9:00", to: "19:00" },
        friday: { from: "8:00", to: "14:00" },
        saturday: { from: "10:00", to: "16:00" },
      },
      facilities: ["Hot tub", "Shower", "Meal", "Facial"],
      categories: ["Popular", "Top Location"],
      location: {
        city: "Beer Sheva",
        street: "Avraham Avinu 54",
        lat: 32.07358,
        lng: 34.78805,
      },
      reviews: [
        {
          _id: utilService.makeId(),
          by: "Abraham",
          description:
            "Nunc sed augue lacus viverra vitae congue eu. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Tristique risus nec feugiat in fermentum posuere urna.",
          rate: 4.7,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Dubi",
          description: "The staff was rude",
          rate: 3.5,
          createdAt: Date.now(),
        },
      ],
      packs: [
        {
          _id: utilService.makeId(),
          name: "Couple Massage",
          duration: 25,
          price: 195,
          guests: 2,
          imgUrl:
            "https://images.squarespace-cdn.com/content/v1/5bedda4455b02c223c7c4132/5f4174fe-7537-417b-b63c-71cf572b5d7b/romantic-couples-massage.jpg",
        },
        {
          _id: utilService.makeId(),
          name: "Facial Treatment",
          duration: 25,
          price: 195,
          guests: 1,
          imgUrl:
            "https://introlift.com/wp-content/uploads/Introlift-Facials-for-Spring-Revive.jpg",
        },
      ],
      imgUrls: [
        "https://images.unsplash.com/photo-1529290130-4ca3753253ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODZ8fHNwYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        "https://a0.muscache.com/im/pictures/ee4cb83e-b28e-4144-aa12-2da650e79185.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/2dd177d8-6220-419c-a806-3348baa0a0da.jpg?im_w=720",
      ],
      logoUrl: "",
      webUrl: "www.abraham-spa.com",
    },
    {
      _id: utilService.makeId(),
      name: "Chill Spa",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis debitis velit sunt eum dicta vitae unde nam repudiandae laboriosam est magni assumenda dolorum accusantium quod incidunt, veritatis, odio commodi.",
      phone: "98765432",
      activityHours: {
        sunday: { from: "9:00", to: "19:00" },
        monday: { from: "9:00", to: "19:00" },
        tuesday: { from: "9:00", to: "19:00" },
        wednesday: { from: "9:00", to: "19:00" },
        thursday: { from: "9:00", to: "19:00" },
        friday: { from: "8:00", to: "14:00" },
        saturday: { from: "10:00", to: "16:00" },
      },
      facilities: ["Dry Sauna", "Shower", "Hot Tub", "Pool", "Jacuzzi"],
      categories: ["Popular", "Top Location"],
      location: {
        city: "Tel Aviv",
        street: "Bugrashov 43",
        lat: 32.07358,
        lng: 34.78805,
      },
      reviews: [
        {
          _id: utilService.makeId(),
          by: "Anna",
          description:
            "Nunc sed augue lacus viverra vitae congue eu. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Tristique risus nec feugiat in fermentum posuere urna.",
          rate: 4.7,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Lucy",
          description: "Nulla at volutpat diam ut venenatis tellus.",
          rate: 4.8,
          createdAt: Date.now(),
        },
      ],
      packs: [
        {
          _id: utilService.makeId(),
          name: "Couple Massage",
          duration: 25,
          price: 200,
          guests: 2,
          imgUrl:
            "https://images.squarespace-cdn.com/content/v1/5bedda4455b02c223c7c4132/5f4174fe-7537-417b-b63c-71cf572b5d7b/romantic-couples-massage.jpg",
        },
        {
          _id: utilService.makeId(),
          name: "Facial Treatment",
          duration: 25,
          price: 350,
          guests: 1,
          imgUrl:
            "https://introlift.com/wp-content/uploads/Introlift-Facials-for-Spring-Revive.jpg",
        },
      ],
      imgUrls: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVzb3J0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1610036615605-636de68a306e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHJlc29ydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        "https://a0.muscache.com/im/pictures/ee4cb83e-b28e-4144-aa12-2da650e79185.jpg?im_w=720",
      ],
      logoUrl: "",
      webUrl: "www.chill-spa.com",
    },
    {
      _id: utilService.makeId(),
      name: "Country Spa",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis debitis velit sunt eum dicta vitae unde nam repudiandae laboriosam est magni assumenda dolorum accusantium quod incidunt, veritatis, odio commodi.",
      phone: "98765432",
      activityHours: {
        sunday: { from: "9:00", to: "19:00" },
        monday: { from: "9:00", to: "19:00" },
        tuesday: { from: "9:00", to: "19:00" },
        wednesday: { from: "9:00", to: "19:00" },
        thursday: { from: "9:00", to: "19:00" },
        friday: { from: "8:00", to: "14:00" },
        saturday: { from: "10:00", to: "16:00" },
      },
      facilities: ["Hot tub", "Wet Sauna", "Meal", "Facial"],
      categories: ["Top Location"],
      location: {
        city: "Matat",
        street: "Hashvil 2",
        lat: 32.07358,
        lng: 34.78805,
      },
      reviews: [
        {
          _id: utilService.makeId(),
          by: "Adam",
          description:
            "Nunc sed augue lacus viverra vitae congue eu. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Tristique risus nec feugiat in fermentum posuere urna.",
          rate: 4.7,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Eve",
          description: "Nulla at volutpat diam ut venenatis tellus.",
          rate: 4.2,
          createdAt: Date.now(),
        },
      ],
      packs: [
        {
          _id: utilService.makeId(),
          name: "Couple Massage",
          duration: 25,
          price: 200,
          guests: 2,
          imgUrl:
            "https://images.squarespace-cdn.com/content/v1/5bedda4455b02c223c7c4132/5f4174fe-7537-417b-b63c-71cf572b5d7b/romantic-couples-massage.jpg",
        },
        {
          _id: utilService.makeId(),
          name: "Facial Treatment",
          duration: 25,
          price: 350,
          guests: 1,
          imgUrl:
            "https://introlift.com/wp-content/uploads/Introlift-Facials-for-Spring-Revive.jpg",
        },
      ],
      imgUrls: [
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTg0fHxzcGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "https://a0.muscache.com/im/pictures/2dd177d8-6220-419c-a806-3348baa0a0da.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/c2620ed0-ec78-4876-a04b-6ced7142d09d.jpg?im_w=720",
      ],
      logoUrl: "",
      webUrl: "www.country-spa.com",
    },
    {
      _id: utilService.makeId(),
      name: "Mountain Spa",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis debitis velit sunt eum dicta vitae unde nam repudiandae laboriosam est magni assumenda dolorum accusantium quod incidunt, veritatis, odio commodi.",
      phone: "98765432",
      activityHours: {
        sunday: { from: "9:00", to: "19:00" },
        monday: { from: "9:00", to: "19:00" },
        tuesday: { from: "9:00", to: "19:00" },
        wednesday: { from: "9:00", to: "19:00" },
        thursday: { from: "9:00", to: "19:00" },
        friday: { from: "8:00", to: "14:00" },
        saturday: { from: "10:00", to: "16:00" },
      },
      facilities: ["Hot tub", "Dry Sauna", "Flip Flops", "Hammam"],
      categories: ["Top Location"],
      location: {
        city: "Carmel Mountain",
        street: "Har Yelalat Hatanim",
        lat: 32.07358,
        lng: 34.78805,
      },
      reviews: [
        {
          _id: utilService.makeId(),
          by: "Sarah",
          description:
            "Nunc sed augue lacus viverra vitae congue eu. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Tristique risus nec feugiat in fermentum posuere urna.",
          rate: 4.6,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Joe",
          description: "Nulla at volutpat diam ut venenatis tellus.",
          rate: 4.7,
          createdAt: Date.now(),
        },
      ],
      packs: [
        {
          _id: utilService.makeId(),
          name: "Couple Massage",
          duration: 25,
          price: 350,
          guests: 2,
          imgUrl:
            "https://images.squarespace-cdn.com/content/v1/5bedda4455b02c223c7c4132/5f4174fe-7537-417b-b63c-71cf572b5d7b/romantic-couples-massage.jpg",
        },
        {
          _id: utilService.makeId(),
          name: "Facial Treatment",
          duration: 25,
          price: 275,
          guests: 1,
          imgUrl:
            "https://introlift.com/wp-content/uploads/Introlift-Facials-for-Spring-Revive.jpg",
        },
      ],
      imgUrls: [
        "https://images.unsplash.com/photo-1598095737054-5ee69f318b5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzh8fHNwYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        "https://a0.muscache.com/im/pictures/c2620ed0-ec78-4876-a04b-6ced7142d09d.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/ee4cb83e-b28e-4144-aa12-2da650e79185.jpg?im_w=720",
      ],
      logoUrl: "",
      webUrl: "www.mountain-spa.com",
    },
    {
      _id: utilService.makeId(),
      name: "Desert Spa",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis debitis velit sunt eum dicta vitae unde nam repudiandae laboriosam est magni assumenda dolorum accusantium quod incidunt, veritatis, odio commodi.",
      phone: "98765432",
      activityHours: {
        sunday: { from: "9:00", to: "19:00" },
        monday: { from: "9:00", to: "19:00" },
        tuesday: { from: "9:00", to: "19:00" },
        wednesday: { from: "9:00", to: "19:00" },
        thursday: { from: "9:00", to: "19:00" },
        friday: { from: "8:00", to: "14:00" },
        saturday: { from: "10:00", to: "16:00" },
      },
      facilities: ["Hot tub", "Wet Sauna", "Flip Flops", "Pool", "Jacuzzi", "Dry Sauna", "Breakfast"],
      categories: ["Top Location"],
      location: {
        city: "Mizpe Ramon",
        street: "Havazelet 12",
        lat: 32.07358,
        lng: 34.78805,
      },
      reviews: [
        {
          _id: utilService.makeId(),
          by: "Ben",
          description:
            "Nunc sed augue lacus viverra vitae congue eu. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Tristique risus nec feugiat in fermentum posuere urna.",
          rate: 4.6,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Edgar",
          description: "Nulla at volutpat diam ut venenatis tellus.",
          rate: 4.1,
          createdAt: Date.now(),
        },
      ],
      packs: [
        {
          _id: utilService.makeId(),
          name: "Couple Massage",
          duration: 25,
          price: 350,
          guests: 2,
          imgUrl:
            "https://images.squarespace-cdn.com/content/v1/5bedda4455b02c223c7c4132/5f4174fe-7537-417b-b63c-71cf572b5d7b/romantic-couples-massage.jpg",
        },
        {
          _id: utilService.makeId(),
          name: "Facial Treatment",
          duration: 25,
          price: 200,
          guests: 1,
          imgUrl:
            "https://introlift.com/wp-content/uploads/Introlift-Facials-for-Spring-Revive.jpg",
        },
      ],
      imgUrls: [
        "https://images.unsplash.com/photo-1563095356-416819488465?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjM1fHxzcGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "https://a0.muscache.com/im/pictures/c2620ed0-ec78-4876-a04b-6ced7142d09d.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/ee4cb83e-b28e-4144-aa12-2da650e79185.jpg?im_w=720",
      ],
      logoUrl: "",
      webUrl: "www.desert-spa.com",
    },
    {
      _id: utilService.makeId(),
      name: "Luxary Spa",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis debitis velit sunt eum dicta vitae unde nam repudiandae laboriosam est magni assumenda dolorum accusantium quod incidunt, veritatis, odio commodi.",
      phone: "98765432",
      activityHours: {
        sunday: { from: "9:00", to: "19:00" },
        monday: { from: "9:00", to: "19:00" },
        tuesday: { from: "9:00", to: "19:00" },
        wednesday: { from: "9:00", to: "19:00" },
        thursday: { from: "9:00", to: "19:00" },
        friday: { from: "8:00", to: "14:00" },
        saturday: { from: "10:00", to: "16:00" },
      },
      facilities: ["Hot tub", "Wet Sauna", "Shower", "Meal"],
      categories: ["Popular", "Top Location"],
      location: {
        city: "Kiryat Ono",
        street: "Bnei Israel 120",
        lat: 32.07358,
        lng: 34.78805,
      },
      reviews: [
        {
          _id: utilService.makeId(),
          by: "Liah",
          description:
            "Nunc sed augue lacus viverra vitae congue eu. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Tristique risus nec feugiat in fermentum posuere urna.",
          rate: 4.8,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Sasha",
          description: "Nulla at volutpat diam ut venenatis tellus.",
          rate: 4.5,
          createdAt: Date.now(),
        },
      ],
      packs: [
        {
          _id: utilService.makeId(),
          name: "Couple Massage",
          duration: 25,
          price: 320,
          guests: 2,
          imgUrl:
            "https://images.squarespace-cdn.com/content/v1/5bedda4455b02c223c7c4132/5f4174fe-7537-417b-b63c-71cf572b5d7b/romantic-couples-massage.jpg",
        },
        {
          _id: utilService.makeId(),
          name: "Facial Treatment",
          duration: 25,
          price: 250,
          guests: 1,
          imgUrl:
            "https://introlift.com/wp-content/uploads/Introlift-Facials-for-Spring-Revive.jpg",
        },
      ],
      imgUrls: [
        "https://images.unsplash.com/photo-1518860308377-800f02d5498a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI0fHxzcGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "https://a0.muscache.com/im/pictures/2dd177d8-6220-419c-a806-3348baa0a0da.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/ee4cb83e-b28e-4144-aa12-2da650e79185.jpg?im_w=720",
      ],
      logoUrl: "",
      webUrl: "www.luxary-spa.com",
    },
    {
      _id: utilService.makeId(),
      name: "Wedding Spa",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis debitis velit sunt eum dicta vitae unde nam repudiandae laboriosam est magni assumenda dolorum accusantium quod incidunt, veritatis, odio commodi.",
      phone: "98765432",
      activityHours: {
        sunday: { from: "9:00", to: "19:00" },
        monday: { from: "9:00", to: "19:00" },
        tuesday: { from: "9:00", to: "19:00" },
        wednesday: { from: "9:00", to: "19:00" },
        thursday: { from: "9:00", to: "19:00" },
        friday: { from: "8:00", to: "14:00" },
        saturday: { from: "10:00", to: "16:00" },
      },
      facilities: ["Dry Sauna", "Shower", "Flip Flops", "Facial"],
      categories: ["Popular", "Top Location"],
      location: {
        city: "Jerusalem",
        street: "Hamedina 65",
        lat: 32.07358,
        lng: 34.78805,
      },
      reviews: [
        {
          _id: utilService.makeId(),
          by: "David",
          description:
            "Nunc sed augue lacus viverra vitae congue eu. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Tristique risus nec feugiat in fermentum posuere urna.",
          rate: 4.5,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Lola",
          description: "Nulla at volutpat diam ut venenatis tellus.",
          rate: 4.8,
          createdAt: Date.now(),
        },
      ],
      packs: [
        {
          _id: utilService.makeId(),
          name: "Couple Massage",
          duration: 25,
          price: 300,
          guests: 2,
          imgUrl:
            "https://images.squarespace-cdn.com/content/v1/5bedda4455b02c223c7c4132/5f4174fe-7537-417b-b63c-71cf572b5d7b/romantic-couples-massage.jpg",
        },
        {
          _id: utilService.makeId(),
          name: "Facial Treatment",
          duration: 25,
          price: 180,
          guests: 1,
          imgUrl:
            "https://introlift.com/wp-content/uploads/Introlift-Facials-for-Spring-Revive.jpg",
        },
      ],
      imgUrls: [
        "https://images.unsplash.com/photo-1583416750470-965b2707b355?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHNwYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        "https://a0.muscache.com/im/pictures/2dd177d8-6220-419c-a806-3348baa0a0da.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/ee4cb83e-b28e-4144-aa12-2da650e79185.jpg?im_w=720",
      ],
      logoUrl: "",
      webUrl: "www.wedding-spa.com",
    },
    {
      _id: utilService.makeId(),
      name: "Lola Spa",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis debitis velit sunt eum dicta vitae unde nam repudiandae laboriosam est magni assumenda dolorum accusantium quod incidunt, veritatis, odio commodi.",
      phone: "98765432",
      activityHours: {
        sunday: { from: "9:00", to: "19:00" },
        monday: { from: "9:00", to: "19:00" },
        tuesday: { from: "9:00", to: "19:00" },
        wednesday: { from: "9:00", to: "19:00" },
        thursday: { from: "9:00", to: "19:00" },
        friday: { from: "8:00", to: "14:00" },
        saturday: { from: "10:00", to: "16:00" },
      },
      facilities: ["Wet Sauna", "Shower", "Hot Tub", "Meal", "Hammam"],
      categories: ["Top Location"],
      location: {
        city: "Tel Aviv",
        street: "Frishman 43",
        lat: 32.07358,
        lng: 34.78805,
      },
      reviews: [
        {
          _id: utilService.makeId(),
          by: "Natasha",
          description:
            "Nunc sed augue lacus viverra vitae congue eu. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Tristique risus nec feugiat in fermentum posuere urna.",
          rate: 4.7,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Bruce",
          description: "Nulla at volutpat diam ut venenatis tellus.",
          rate: 4.8,
          createdAt: Date.now(),
        },
      ],
      packs: [
        {
          _id: utilService.makeId(),
          name: "Couple Massage",
          duration: 25,
          price: 450,
          guests: 2,
          imgUrl:
            "https://images.squarespace-cdn.com/content/v1/5bedda4455b02c223c7c4132/5f4174fe-7537-417b-b63c-71cf572b5d7b/romantic-couples-massage.jpg",
        },
        {
          _id: utilService.makeId(),
          name: "Facial Treatment",
          duration: 25,
          price: 375,
          guests: 1,
          imgUrl:
            "https://introlift.com/wp-content/uploads/Introlift-Facials-for-Spring-Revive.jpg",
        },
      ],
      imgUrls: [
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1630595633877-9918ee257288?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE3fHxzcGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "https://a0.muscache.com/im/pictures/ee4cb83e-b28e-4144-aa12-2da650e79185.jpg?im_w=720",
      ],
      logoUrl: "",
      webUrl: "www.lola-spa.com",
    },
    {
      _id: utilService.makeId(),
      name: "Dog Spa",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis debitis velit sunt eum dicta vitae unde nam repudiandae laboriosam est magni assumenda dolorum accusantium quod incidunt, veritatis, odio commodi.",
      phone: "98765432",
      activityHours: {
        sunday: { from: "9:00", to: "19:00" },
        monday: { from: "9:00", to: "19:00" },
        tuesday: { from: "9:00", to: "19:00" },
        wednesday: { from: "9:00", to: "19:00" },
        thursday: { from: "9:00", to: "19:00" },
        friday: { from: "8:00", to: "14:00" },
        saturday: { from: "10:00", to: "16:00" },
      },
      facilities: ["Dry Sauna", "Shower", "Flip Flops", "Pool", "Meal"],
      categories: ["Top Location"],
      location: {
        city: "Tel Aviv",
        street: "Frishman 43",
        lat: 32.07358,
        lng: 34.78805,
      },
      reviews: [
        {
          _id: utilService.makeId(),
          by: "Shalom",
          description:
            "Nunc sed augue lacus viverra vitae congue eu. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Tristique risus nec feugiat in fermentum posuere urna.",
          rate: 4.6,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Iris",
          description: "Nulla at volutpat diam ut venenatis tellus.",
          rate: 3.9,
          createdAt: Date.now(),
        },
      ],
      packs: [
        {
          _id: utilService.makeId(),
          name: "Couple Massage",
          duration: 25,
          price: 400,
          guests: 2,
          imgUrl:
            "https://images.squarespace-cdn.com/content/v1/5bedda4455b02c223c7c4132/5f4174fe-7537-417b-b63c-71cf572b5d7b/romantic-couples-massage.jpg",
        },
        {
          _id: utilService.makeId(),
          name: "Facial Treatment",
          duration: 25,
          price: 280,
          guests: 1,
          imgUrl:
            "https://introlift.com/wp-content/uploads/Introlift-Facials-for-Spring-Revive.jpg",
        },
      ],
      imgUrls: [
        "https://images.unsplash.com/photo-1453227588063-bb302b62f50b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nJTIwc3BhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1516222338250-863216ce01ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nJTIwc3BhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://a0.muscache.com/im/pictures/ee4cb83e-b28e-4144-aa12-2da650e79185.jpg?im_w=720",
      ],
      logoUrl: "",
      webUrl: "www.dog-spa.com",
    },
    {
      _id: utilService.makeId(),
      name: "Music Spa",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis debitis velit sunt eum dicta vitae unde nam repudiandae laboriosam est magni assumenda dolorum accusantium quod incidunt, veritatis, odio commodi.",
      phone: "98765432",
      activityHours: {
        sunday: { from: "9:00", to: "19:00" },
        monday: { from: "9:00", to: "19:00" },
        tuesday: { from: "9:00", to: "19:00" },
        wednesday: { from: "9:00", to: "19:00" },
        thursday: { from: "9:00", to: "19:00" },
        friday: { from: "8:00", to: "14:00" },
        saturday: { from: "10:00", to: "16:00" },
      },
      facilities: ["Hot tub", "Dry Sauna", "Shower", "Jacuzzi"],
      categories: ["Popular"],
      location: {
        city: "Jerusalem",
        street: "David Hamelech 45",
        lat: 32.07358,
        lng: 34.78805,
      },
      reviews: [
        {
          _id: utilService.makeId(),
          by: "Martha",
          description:
            "Nunc sed augue lacus viverra vitae congue eu. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Tristique risus nec feugiat in fermentum posuere urna.",
          rate: 4.9,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Lily",
          description: "Nulla at volutpat diam ut venenatis tellus.",
          rate: 4.2,
          createdAt: Date.now(),
        },
      ],
      packs: [
        {
          _id: utilService.makeId(),
          name: "Couple Massage",
          duration: 25,
          price: 450,
          guests: 2,
          imgUrl:
            "https://images.squarespace-cdn.com/content/v1/5bedda4455b02c223c7c4132/5f4174fe-7537-417b-b63c-71cf572b5d7b/romantic-couples-massage.jpg",
        },
        {
          _id: utilService.makeId(),
          name: "Facial Treatment",
          duration: 25,
          price: 350,
          guests: 1,
          imgUrl:
            "https://introlift.com/wp-content/uploads/Introlift-Facials-for-Spring-Revive.jpg",
        },
      ],
      imgUrls: [
        "https://images.unsplash.com/photo-1610402601271-5b4bd5b3eba4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fHNwYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        "https://a0.muscache.com/im/pictures/2dd177d8-6220-419c-a806-3348baa0a0da.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/ee4cb83e-b28e-4144-aa12-2da650e79185.jpg?im_w=720",
      ],
      logoUrl: "",
      webUrl: "www.music-spa.com",
    },
    {
      _id: "spa1",
      name: "Best Spa",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis debitis velit sunt eum dicta vitae unde nam repudiandae laboriosam est magni assumenda dolorum accusantium quod incidunt, veritatis, odio commodi.",
      phone: "12345678",
      activityHours: {
        sunday: { from: "9:00", to: "18:00" },
        monday: { from: "9:00", to: "18:00" },
        tuesday: { from: "9:00", to: "13:00" },
        wednesday: { from: "9:00", to: "18:00" },
        thursday: { from: "9:00", to: "18:00" },
        friday: { from: "8:00", to: "13:00" },
        saturday: { from: "10:00", to: "16:00" },
      },
      facilities: ["Wet Sauna", "Hot tub", "Hammam", "Facial"],
      categories: ["Popular"],
      location: {
        city: "Haifa",
        street: "Herzel 17",
        lat: 32.80718,
        lng: 35.10857,
      },
      reviews: [
        {
          _id: utilService.makeId(),
          by: "Ezra",
          description: "I loved it! it's the best spa ever!",
          rate: 4.5,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Puki",
          description: "I loved it! it's the best spa ever!",
          rate: 4.5,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Dudu",
          description: "I loved it! it's the best spa ever!",
          rate: 4.5,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Mumu",
          description: "I loved it! it's the best spa ever!",
          rate: 4.5,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Shuki",
          description: "I loved it! it's the best spa ever!",
          rate: 4.5,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Jac",
          description: "I loved the Jacuzzi, great experience",
          rate: 5,
          createdAt: Date.now(),
        },
      ],
      packs: [
        {
          _id: utilService.makeId(),
          name: "Foot Massage",
          duration: 45,
          price: 150,
          guests: 1,
          imgUrl:
            "https://static-bebeautiful-in.unileverservices.com/1200/900/10-Reasons-Why-You-Should-get-a-Foot-%20Massage_mobilehome.jpg",
        },
        {
          _id: utilService.makeId(),
          name: "Couple Massage",
          duration: 50,
          price: 250,
          guests: 2,
          imgUrl:
            "https://images.squarespace-cdn.com/content/v1/5bedda4455b02c223c7c4132/5f4174fe-7537-417b-b63c-71cf572b5d7b/romantic-couples-massage.jpg",
        },
      ],
      imgUrls: [
        "https://a0.muscache.com/im/pictures/fb9317b7-7b6e-444c-bb1a-df37b468610c.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/ad439973-f1b2-4d61-a34e-8a9eca410d00.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/4fbce29b-15ab-4160-8acd-c6ca4d498905.jpg?im_w=720",
      ],
      logoUrl: "",
      webUrl: "www.best-spa.com",
    },
    {
      _id: "spa2",
      name: "Worst Spa",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis debitis velit sunt eum dicta vitae unde nam repudiandae laboriosam est magni assumenda dolorum accusantium quod incidunt, veritatis, odio commodi.",
      phone: "98765432",
      activityHours: {
        sunday: { from: "9:00", to: "19:00" },
        monday: { from: "9:00", to: "19:00" },
        tuesday: { from: "9:00", to: "19:00" },
        wednesday: { from: "9:00", to: "19:00" },
        thursday: { from: "9:00", to: "19:00" },
        friday: { from: "8:00", to: "14:00" },
        saturday: { from: "10:00", to: "16:00" },
      },
      facilities: ["Hot tub", "Flip flops", "Pool", "Meal"],
      categories: ["Top Location"],
      location: {
        city: "Tel Aviv",
        street: "Bugrashuv 29",
        lat: 32.07358,
        lng: 34.78805,
      },
      reviews: [
        {
          _id: utilService.makeId(),
          by: "Momo",
          description: "No hot water in the showers",
          rate: 2,
          createdAt: Date.now(),
        },
        {
          _id: utilService.makeId(),
          by: "Dubi",
          description: "The staff was rude",
          rate: 3.5,
          createdAt: Date.now(),
        },
      ],
      packs: [
        {
          _id: utilService.makeId(),
          name: "Couple Massage",
          duration: 25,
          price: 185,
          guests: 2,
          imgUrl:
            "https://images.squarespace-cdn.com/content/v1/5bedda4455b02c223c7c4132/5f4174fe-7537-417b-b63c-71cf572b5d7b/romantic-couples-massage.jpg",
        },
        {
          _id: utilService.makeId(),
          name: "Facial Treatment",
          duration: 25,
          price: 100,
          guests: 1,
          imgUrl:
            "https://introlift.com/wp-content/uploads/Introlift-Facials-for-Spring-Revive.jpg",
        },
      ],
      imgUrls: [
        "https://a0.muscache.com/im/pictures/2dd177d8-6220-419c-a806-3348baa0a0da.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/ee4cb83e-b28e-4144-aa12-2da650e79185.jpg?im_w=720",
        "https://a0.muscache.com/im/pictures/c2620ed0-ec78-4876-a04b-6ced7142d09d.jpg?im_w=720",
      ],
      logoUrl: "",
      webUrl: "www.worst-spa.com",
    },
  ];
  localStorage[STORAGE_KEY] = JSON.stringify(spas);
  return spas;
}

function getEmptyPack() {
  return {
    _id: utilService.makeId(),
    name: "",
    duration: 0,
    price: 0,
    guests: 0,
  };
}

function getFacilities() {
  const facilities = [
    ["Sauna", ["Wet Sauna", "Dry Sauna"]],
    "Hot tub",
    "Shower",
    "Flip flops",
    "Hammam",
    "Facial",
    "Pool"
  ];
  return new Promise((resolve) => setTimeout(() => resolve(facilities), 500));
}

function getemptyFilterBy() {
  return { txt: "", minPrice: 0, maxPrice: 0, guests: "", facilities: [] };
}
