import { createSlice } from "@reduxjs/toolkit";

const name = localStorage.getItem("user") || null;
const id = localStorage.getItem("id");
const email = localStorage.getItem("email");
const token = localStorage.getItem("token");
const enrolledCourse = JSON.parse(localStorage.getItem("enrolledCourse"));
let user = null;
if (name == null && id == null && token == null) {
  user = null;
} else {
  user = { name, email, id, enrolledCourse, token };
}

const initialStateValues = {
  user: user || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialStateValues,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state, action) => {
      state.user = null;
      localStorage.clear();
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
