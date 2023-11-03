import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "../features/course/courseSlice.js";
import userReducer from "../features/user/userSlice.js";

export const store = configureStore({
  reducer: {
    course: courseReducer,
    user: userReducer,
  },
});
