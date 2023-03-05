import { combineReducers } from "redux";

// question slice
import questionSlice from "../question.slice";

export default combineReducers({
  question: questionSlice,
});
