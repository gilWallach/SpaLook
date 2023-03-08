import { categoryService } from "../../services/category.service"
import { locationService } from "../../services/location.service"
import { labelService } from "../../services/label.service"
import { spaService } from "../../services/spa.service"

export function loadLabels() {
  return async (dispatch, getState) => {
    try {
      const labels = await labelService.getLabels()
      dispatch({ type: "SET_LABELS", labels })
    } catch (err) {
      console.log("err:", err)
    }
  }
}

export function loadGuests() {
  return async (dispatch, getState) => {
    try {
      const guests = await labelService.getGuests()

      dispatch({ type: "SET_GUESTS", guests })
    } catch (err) {
      console.log("err:", err)
    }
  }
}

export function loadLocations() {
  return async (dispatch, getState) => {
    try {
      const locations = await locationService.getLocations()
      dispatch({ type: "GET_LOCATIONS", locations })
    } catch (err) {
      console.log("err:", err)
    }
  }
}

export function loadSelectedLabel(labelUrl) {
  return async (dispatch, getState) => {
    try {
      const selectedLabel = await labelService.getSelectedLabelByUrl(labelUrl)
      dispatch({ type: "SET_SELECTED_LABEL", selectedLabel })
    } catch (err) {
      console.log("err:", err)
    }
  }
}

export function setSelectedLabel(selectedLabel){
  return async (dispatch) => {
    try {
      dispatch({type: "SET_SELECTED_LABEL", selectedLabel})
    } catch (err) {
      console.log("err", err)
    }
  }
}

export function saveLabel(labelToSave) {

  return async (dispatch) => {
      try {
          const label = await labelService.save(labelToSave)
          labelToSave._id
              ? dispatch({ type: 'UPDATE_LABEL', label })
              : dispatch({ type: 'ADD_LABEL', label })
      } catch (err) {
          console.log('err:', err)
      }
  }
}

export function removeLabel(labelId) {

  return async (dispatch) => {
      try {
          const labels = await labelService.remove(labelId)
          dispatch({ type: 'REMOVE_LABEL', labelId })
      } catch (err) {
          console.log('err:', err)
      }
  }
}