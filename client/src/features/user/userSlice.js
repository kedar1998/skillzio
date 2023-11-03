import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  user: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialStateValues,
  reducers: {
    addUser: (state, payload) => {
      state.user = payload.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser } = userSlice.actions;

export default userSlice.reducer;
