const INITIAL_STATE = {
  categories: null,
  spasByCategory: null,
}

export function categoryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.categories,
      }
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
    case "SET_SPAS_BY_CATEGORY":
      return {
        ...state,
        spasByCategory: action.spasByCategory,
      }
    case "GET_LOCATIONS":
      return {
        ...state,
        locations: action.locations,
      }
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.category],
      }
    case "REMOVE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((category) => category._id !== action.categoryId),
      }
    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === action.category._id ? action.category : category
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
