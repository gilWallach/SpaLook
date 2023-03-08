import { spaService } from "../../services/spa.service";

const INITIAL_STATE = {
  spas: null,
  spasCount: null,
  filterBy: spaService.getemptyFilterBy()
};

export function spaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_SPAS":
      return {
        ...state,
        spas: action.spas,
      };
    case "ADD_SPA":
      return {
        ...state,
        spas: [...state.spas, action.spa],
      };
    case "REMOVE_SPA":
      return {
        ...state,
        spas: state.spas.filter((spa) => spa._id !== action.spaId),
      };
    case "SET_COUNT":
      return {
        ...state,
        spasCount: action.spasCount,
      };
    case "UPDATE_SPA":
      return {
        ...state,
        spas: state.spas.map((spa) =>
          spa._id === action.spa._id ? action.spa : spa
        ),
      };
    case "SET_FILTER_BY":
      return {
        ...state,
        filterBy: { ...action.filterBy },
      };
    default:
      return state;
  }
}
