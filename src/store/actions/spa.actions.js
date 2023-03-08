import { spaService } from "../../services/spa.service"

export function loadSpas() {
    return async (dispatch, getState) => {
        try {
            const filterBy = getState().spaModule.filterBy
            const spas = await spaService.query(filterBy)
            dispatch({ type: 'SET_SPAS', spas })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function loadEmptySpas() {

    return async (dispatch, getState) => {
        try {
            const spas = []
            dispatch({ type: 'SET_SPAS', spas })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeSpa(spaId) {

    return async (dispatch) => {
        try {
            const spas = await spaService.remove(spaId)
            dispatch({ type: 'REMOVE_SPA', spaId })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setSpasCount(filterBy) {

    return async (dispatch, getState) => {
        try {
            const count = await spaService.count(filterBy)
            dispatch({ type: 'SET_COUNT', spasCount: count })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function saveSpa(spaToSave) {

    return async (dispatch) => {
        try {
            const spa = await spaService.save(spaToSave)
            spaToSave._id
                ? dispatch({ type: 'UPDATE_SPA', spa })
                : dispatch({ type: 'ADD_SPA', spa })
        } catch (err) {
            console.log('err:', err)
        }
    }
}


export function setFilterBy(filterBy) {
    return (dispatch) => {
        try {
            dispatch({ type: 'SET_FILTER_BY', filterBy: { ...filterBy } })
        } catch (err) {
            console.log('err:', err)
        }
    }
}