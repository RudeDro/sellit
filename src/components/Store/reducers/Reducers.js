import { combineReducers } from "redux";
import User from "./UserReducer";
import Articles from "./ArticlesReducer";

const rootReducer = combineReducers({
  User,
  Articles
});

export default rootReducer;
