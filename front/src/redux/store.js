import { applyMiddleware, combineReducers, createStore } from "redux";
import cartReducer from "./cart/cartReducer";
import thunk from "redux-thunk";

const persistedState = localStorage.getItem('cart')
? JSON.parse(localStorage.getItem('cart'))
: {}

const rootReducer = combineReducers({   
    cartReducer
});

const store = createStore(rootReducer,persistedState, applyMiddleware(thunk));

store.subscribe(() => {
    localStorage.setItem('cart', JSON.stringify(store.getState()));
})
export default store;