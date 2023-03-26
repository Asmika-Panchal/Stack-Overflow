import { combineReducers } from "redux";
import authReducer from "./authReducer";
import currentUserReducer from "./currentUserReducer";
import questionReducer from "./questionReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  authReducer,
  currentUserReducer,
  questionReducer,
  usersReducer,
});
