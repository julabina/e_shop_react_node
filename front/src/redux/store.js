import { applyMiddleware, combineReducers, createStore } from "redux";
import telescopeReducer from './telescope/telescopeReducer';
import thunk from "redux-thunk";

const rootReducer = combineReducers({   
    telescopeReducer    
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;