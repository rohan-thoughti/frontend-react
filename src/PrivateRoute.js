import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "./app/helper/helperFunction";
import { updateToken } from "./app/slice/loginSlice";
const useAuth = () => {
  // const gettoken = localStorage.getItem("token");

  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  if (getToken()) {
    if (token == null) {
      dispatch(updateToken({ token: getToken() }));
    }
    return true;
  } else {
    return false;
  }
};
const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
