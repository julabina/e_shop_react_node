import { applyMiddleware, combineReducers, createStore } from "redux";
import telescopeReducer from './telescope/telescopeReducer';
import cartReducer from "./cart/cartReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({   
    telescopeReducer, cartReducer  
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;