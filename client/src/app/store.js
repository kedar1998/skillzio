import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "../features/course/courseSlice.js";

export const store = configureStore({
  reducer: {
    course: courseReducer,
  },
});
