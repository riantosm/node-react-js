//Menggabungkan beberapa reducer menjadi 1 fungsi reducer
//Menggunakan CombineReducers
import { combineReducers } from "redux";
// import countReducer from "./count";
import userReducer from "./user";

const reducers = combineReducers({
  // count: countReducer,
  user: userReducer
});

export default reducers;
