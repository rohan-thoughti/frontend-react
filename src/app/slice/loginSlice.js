import { createSlice } from "@reduxjs/toolkit";
import { login, signout } from "./loginThunk";

export const loginSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userData: {},
  },
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const { accessToken, users } = action.payload;
      state.token = accessToken;
      state.userData = users;
    },
    [signout.fulfilled]: (state, action) => {
      state.userData = {};
      state.token = null;
    },
  },
});

export const {} = loginSlice.actions;

export default loginSlice.reducer;
