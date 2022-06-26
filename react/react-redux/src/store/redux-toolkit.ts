import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./slices/count";

const store = configureStore({
  reducer: {
    count: countReducer,
  },
});
export default store;

