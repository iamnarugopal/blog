import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: !!localStorage.getItem("token") ? localStorage.getItem("token") : null,
  user: !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  isLogin:
    !!localStorage.getItem("token") && !!localStorage.getItem("user")
      ? true
      : false,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const token = action.payload.token;
      const userdata = { ...action.payload };
      delete userdata.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userdata));
      state.token = token;
      state.user = userdata;
      state.isLogin = true;
    },
    removeUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.token = null;
      state.user = null;
      state.isLogin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = authenticationSlice.actions;
export default authenticationSlice.reducer;
