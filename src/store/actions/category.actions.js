import { categoryService } from "../../services/category.service"
import { locationService } from "../../services/location.service"
import { labelService } from "../../services/label.service"
import { spaService } from "../../services/spa.service"

export function loadCategories() {
  return async (dispatch) => {
    try {
      const categories = await categoryService.getCategories()
      dispatch({ type: "SET_CATEGORIES", categories })
    } catch (err) {
      console.log("err:", err)
    }
  }
}

export function loadSpasByCategory() {
  return async (dispatch, getState) => {
    try {
      const categories = getState().categoryModule.categories
      const spasByCategoryPrms = categories.map(async (category) => {
        // return spaService.query({ txt: category })
        let tenSpasByCategory = await spaService.query({ txt: category })
        tenSpasByCategory = tenSpasByCategory.sort(() => .5 - Math.random()).slice(0, 10)
        return tenSpasByCategory
      })
      Promise.all(spasByCategoryPrms).then((res) => {
        dispatch({ type: "SET_SPAS_BY_CATEGORY", spasByCategory: res })
      })
    } catch (err) {
      console.log("err:", err)
    }
  }
}

export function removeCategory(categoryId) {
  return async (dispatch) => {
    try {
      const category = await spaService.remove(categoryId)
      dispatch({ type: "REMOVE_CATEGORY", categoryId })
    } catch (err) {
      console.log("err:", err)
    }
  }
}

export function saveCategory(category) {
  return async (dispatch) => {
    try {
      const savedCategory = await spaService.save(category)
      category._id
        ? dispatch({ type: "UPDATE_CATEGORY", savedCategory })
        : dispatch({ type: "ADD_CATEGORY", savedCategory })
    } catch (err) {
      console.log("err:", err)
    }
  }
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    try {
      dispatch({ type: "SET_FILTER_BY", filterBy: { ...filterBy } })
    } catch (err) {
      console.log("err:", err)
    }
  }
}