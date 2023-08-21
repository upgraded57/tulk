import { combineReducers } from "redux";

import { AuthReducer } from "./Reducers/AuthReducer";
import { RegisterReducer } from "./Reducers/RegisterReducer";
import { UserdataReducer } from "./Reducers/UserdataReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  register: RegisterReducer,
  userdata: UserdataReducer,
});

export default rootReducer;
