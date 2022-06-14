import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import userReducer from "./slice/userSlice";
import postReducer from "./slice/postSlice";
export default configureStore({
  reducer: {
    login: loginReducer,
    users: userReducer,
    posts: postReducer,
  },
});
