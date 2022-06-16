import { createSlice } from "@reduxjs/toolkit";
import { lib } from "../helper/httpClient";
import { toast } from "react-toastify";
export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    getUser: (state, action) => {
      state.users = action.payload;
    },
    saveUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    updateUser: (state, action) => {
      state.users = state.users.map((item, index) =>
        item.user_id === action.payload.user_id ? action.payload : item
      );
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((item) => item.id !== action.payload);
    },
  },
});

export const { getUser, saveUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;

export const fetchUsers = (props) => {
  return async function fetchUsers(dispatch) {
    const urlMethods = {
      url: `/users`,
      method: "get",
    };
    const { data } = await lib.authRequest(urlMethods, props);
    if (data.code === 200) {
      dispatch(getUser(data.result.rows));
    }
  };
};

export const saveUsers = (props) => {
  return async function saveUsers(dispatch) {
    const urlMethods = {
      url: "/users",
      method: "post",
    };
    const { data } = await lib.authRequest(urlMethods, props);
    debugger;
    if (data.code === 200) {
      let newPayload = {
        user_id: data.result.user_id,
        name: props.name,
        email: props.email,
        password: props.password,
      };
      dispatch(saveUser(newPayload));
      toast.success("User Created Successfully");
    } else {
      debugger;
      toast.error(data.error);
    }
  };
};

export const updateUsers = (props) => {
  return async function updateUser(dispatch) {
    const urlMethod = {
      url: `/users/${props.user_id}`,
      method: "patch",
    };
    const { data } = await lib.authRequest(urlMethod, props);

    if (data.code === 200) {
      let payload = {
        user_id: props.user_id,
        name: props.name,
        email: props.email,
        password: props.password,
      };
      dispatch(updateUser(payload));
    }
  };
};

export const deleteUsers = (props) => {
  return async function deleteUsers(dispatch) {
    const urlMethods = {
      url: `/users/${props.user_id}`,
      method: "delete",
    };
    const { data } = await lib.authRequest(urlMethods, props);
    let payload = props.user_id;

    if (data.code === 200) {
      dispatch(deleteUser(payload));
    }
  };
};
