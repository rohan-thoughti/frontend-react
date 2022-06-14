import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToken, removeToken } from "../helper/helperFunction";
import { lib } from "../helper/httpClient";
import history from "../helper/history";
import { toast } from "react-toastify";
export const login = createAsyncThunk("auth/login", async (payload) => {
  const methodUrl = { url: "/login", method: "POST" };
  const response = await lib.request(methodUrl, payload);
  if (response.status === 200) {
    setToken(response.data.token);
    toast.success("Login Successfully");
    return response.data;
  }
  return toast.error("Invaild Credential");
});

export const signout = createAsyncThunk("auth/signout", async () => {
  removeToken();
  history.push({ pathname: "/login" });
});
