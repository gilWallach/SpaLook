import { storageService } from "./async-storage.service.js";
import { httpService } from "./http.service.js";
import { utilService } from "./util.service.js";
// import { userService } from './user.service.js'

export const categoryService = {
    save,
    remove,
    getCategories,
}
window.ss = categoryService

const STORAGE_KEY = 'categories'
async function getCategories(categoryName = "") {
  // return httpService.get(STORAGE_KEY, filterBy)
  var categories = await storageService.query(STORAGE_KEY);
  if (!categories || !categories.length) categories = _getCategories();
  if (categoryName) {
    const regex = new RegExp(categoryName, "i");
    const category = categories.filter((category) => {
      return regex.test(category)
    });
    return category
  }
  return categories;
}

async function remove(categoryId) {
  return await storageService.remove(STORAGE_KEY, categoryId);
  // return httpService.delete(`category/${categoryId}`)
}
async function save(category) {
  var savedCategory;
  if (category._id) {
    savedCategory = await storageService.put(STORAGE_KEY, category);
    // savedCategory = await httpService.put(`category/${category._id}`, category)
  } else {
    // Later, owner is set by the backend
    // category.owner = userService.getLoggedinUser()
    savedCategory = await storageService.post(STORAGE_KEY, category);
    // savedCategory = await httpService.post('category', category)
  }
  return savedCategory;
}

function _getCategories() {
  const categories = [
    'Popular',
    'Top location',
    'Most Viewed',
    'New'
  ]
  return new Promise(resolve => setTimeout(() => resolve(categories), 500))
}
