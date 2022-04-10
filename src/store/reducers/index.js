import makeProductReducer from "./makeProduct";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  allProducts: makeProductReducer,
});

export default allReducers;
