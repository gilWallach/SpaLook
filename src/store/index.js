import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import { spaReducer } from './reducers/spa.reducer'
import { categoryReducer } from './reducers/category.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    spaModule: spaReducer,
    categoryModule: categoryReducer,
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
