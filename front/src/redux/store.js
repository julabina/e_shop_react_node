import { applyMiddleware, combineReducers, createStore } from "redux";
import cartReducer from "./cart/cartReducer";
import thunk from "redux-thunk";

const persistedState = sessionStorage.getItem('cart')
? JSON.parse(sessionStorage.getItem('cart'))
: {}

const rootReducer = combineReducers({   
    cartReducer  
})

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
    sessionStorage.setItem('cart', JSON.stringify(store.getState()))
})
export default store;