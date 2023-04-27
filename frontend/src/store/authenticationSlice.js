import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {
  user: !!Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {},
  isLogin: !!Cookies.get('user') ? true : false,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // console.log(action.payload);
      Cookies.set("user", JSON.stringify(action.payload), {
        path: "/",
        expires: (1 / 24 / 60) * 10,
      });
      state.user = action.payload;
      state.isLogin = true;
    },
    removeUser: (state) => {
      Cookies.remove("user", { path: "/" });
      state.user = {};
      state.isLogin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = authenticationSlice.actions;
export default authenticationSlice.reducer;
