//Menggabungkan beberapa reducer menjadi 1 fungsi reducer
//Menggunakan CombineReducers
import { combineReducers } from "redux";
// import countReducer from "./count";
import userReducer from "./user";
import categoryReducer from "./category";

const reducers = combineReducers({
  // count: countReducer,
  user: userReducer,
  category: categoryReducer
});

export default reducers;
