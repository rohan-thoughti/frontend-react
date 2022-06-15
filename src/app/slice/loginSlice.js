import { createSlice } from "@reduxjs/toolkit";
import { login, signout } from "./loginThunk";
import jwtDecode from "jwt-decode";
export const loginSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userData: {},
  },
  reducers: {
    updateToken: (state, action) => {
      let { token } = action.payload;
      let user = jwtDecode(token);
      state.userData = user;
      state.token = token;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const { token: accessToken } = action.payload;
      const user = jwtDecode(accessToken);
      state.token = accessToken;
      state.userData = user;
    },
    [signout.fulfilled]: (state, action) => {
      state.userData = {};
      state.token = null;
    },
  },
});

export const { updateToken } = loginSlice.actions;

export default loginSlice.reducer;
