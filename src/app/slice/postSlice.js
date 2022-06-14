import { createSlice } from "@reduxjs/toolkit";
import { lib } from "../helper/httpClient";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    getposts: (state, action) => {
      state.posts = action.payload;
    },
    savePost: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
    updatePost: (state, action) => {
      state.posts = state.posts.map((item, index) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((item) => item.id !== action.payload);
    },
  },
});

export const { getposts, savePost, updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer;

export const fetchPosts = (props) => {
  return async function fetchPosts(dispatch) {
    const urlMethods = {
      url: `/posts`,
      method: "get",
    };
    const { data } = await lib.authRequest(urlMethods, props);
    if (data.code === 200) {
      dispatch(getposts(data.result.rows));
    }
  };
};

export const savePosts = (props) => {
  return async function savePosts(dispatch) {
    const urlMethods = {
      url: "/posts",
      method: "post",
    };
    const { data } = await lib.authRequest(urlMethods, props);
    let newPayload = {
      id: data.result.id,
      user_id: props.user_id,
      title: props.title,
      description: props.description,
    };
    if (data.code === 200) {
      dispatch(savePost(newPayload));
    }
  };
};

export const updatePosts = (props) => {
  return async function updatePosts(dispatch) {
    const urlMethod = {
      url: `/posts/${props.id}`,
      method: "patch",
    };
    const { data } = await lib.authRequest(urlMethod, props);

    if (data.code === 200) {
      let payload = {
        id: props.id,
        user_id: props.user_id,
        title: props.title,
        description: props.description,
      };
      dispatch(updatePost(payload));
    }
  };
};

export const deletePosts = (props) => {
  return async function deletePosts(dispatch) {
    const urlMethods = {
      url: `/posts/${props.id}`,
      method: "delete",
    };
    const { data } = await lib.authRequest(urlMethods, props);
    let payload = props.id;
    if (data.code === 200) {
      dispatch(deletePost(payload));
    }
  };
};
