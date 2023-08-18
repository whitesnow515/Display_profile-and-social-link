import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import profileReducer from "./profileReducer";
import formsReducer from "./formsReducer";

const rootReducer = combineReducers({
  profileData: profileReducer,
  forms: formsReducer 
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
