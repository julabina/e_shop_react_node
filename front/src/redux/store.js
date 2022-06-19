import { applyMiddleware, combineReducers, createStore } from "redux";
import cartReducer from "./cart/cartReducer";
import loggedReducer from "./loggedReducer/loggedReducer";
import thunk from "redux-thunk";

const persistedState = localStorage.getItem('cart')
? JSON.parse(localStorage.getItem('cart'))
: {};

const rootReducer = combineReducers({   
    cartReducer,
    loggedReducer
});

const store = createStore(rootReducer,persistedState, applyMiddleware(thunk));

store.subscribe(() => {
    localStorage.setItem('cart', JSON.stringify(store.getState()));
});
export default store;