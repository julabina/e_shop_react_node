import { applyMiddleware, combineReducers, createStore } from "redux";
import productReducer from './products/productReducer';
import thunk from "redux-thunk";

const rootReducer = combineReducers({   
    productReducer    
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;