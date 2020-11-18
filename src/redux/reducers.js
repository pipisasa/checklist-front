import { combineReducers } from "redux";

import authReducer from "./auth/reducer";
import checklistReducer from "./checklist/reducer";


const rootReducer = combineReducers({
  auth: authReducer,
  checklist: checklistReducer
});

export default rootReducer;