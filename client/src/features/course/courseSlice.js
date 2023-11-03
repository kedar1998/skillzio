import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  count: 0,
};

export const courseSlice = createSlice({
  name: "course",
  initialState: initialStateValues,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement } = courseSlice.actions;

export default courseSlice.reducer;
