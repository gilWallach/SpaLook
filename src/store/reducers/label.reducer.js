const INITIAL_STATE = {
  labels: null,
  selectedLabel: null,
  guests: null
}

export function labelReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_SELECTED_LABEL":
      return {
        ...state,
        selectedLabel: action.selectedLabel,
      }
    case "SET_LABELS":
      return {
        ...state,
        labels: action.labels,
      }
    case "SET_GUESTS":
      return {
        ...state,
        guests: action.guests,
      }
    case "GET_LOCATIONS":
      return {
        ...state,
        locations: action.locations,
      }
    case "ADD_LABEL":
      return {
        ...state,
        labels: [...state.labels, action.label],
      }
    case "REMOVE_LABEL":
      return {
        ...state,
        labels: state.labels.filter((label) => label._id !== action.labelId),
      }
    case "UPDATE_LABEL":
      return {
        ...state,
        labels: state.labels.map((label) =>
          label._id === action.label._id ? action.label : label
        ),
      }
    case "SET_FILTER_BY":
      return {
        ...state,
        filterBy: { ...action.filterBy },
      }

    default:
      return state
  }
}
