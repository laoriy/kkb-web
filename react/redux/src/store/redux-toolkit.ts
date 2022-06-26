import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./slices/count";

export default configureStore({
  reducer: {
    countReducer,
  },
});
