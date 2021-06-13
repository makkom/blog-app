import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Post, Posts } from "../types";

const URL = "http://localhost:3001";

export type PostsState = {
  posts: [
    id: number,
    createdAt: string,
    updatedAt: string,
    title: string,
    body: string,
    like?: number
  ];
  selectPost: Post;
};

const initialState = {
  idCount: 0,
  posts: [
    {
      id: 0,
      createdAt: "2021/6/12 11:10:29",
      updatedAt: "",
      title: "最初の記事",
      body: "",
      like: 0,
    },
  ],
  pickUpPost: {
    id: 0,
    createdAt: "",
    updatedAt: "",
    title: "",
    body: "",
    like: 0,
  },
};

// export const fetchPosts = createAsyncThunk(
//   "posts/fetchPosts",
//   async (_, thunkApi) => {
//     const response = await axios.get<Posts>(`${URL}/posts`).catch((err) => {
//       thunkApi.rejectWithValue(err);
//       throw err;
//     });
//     return response.data;
//   }
// );

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    //ここから下、非同期通信を想定した記述
    // setSelectPost: (state, action) => {
    //   const posts = state.posts.filter((post) => post.id !== action.payload.id);
    //   state.posts = [action.payload, ...posts];
    // },
    // extraReducers: (builder) => {
    //   builder
    //     .addCase(fetchPosts.fulfilled, (state, action) => {
    //       if (action.payload !== undefined) {
    //         state.posts = action.payload;
    //       }
    //     })
    //     .addCase(fetchPosts.rejected, (action) => {
    //       alert(action);
    //     });
    // },
    //ここから下、ReduxToolKitの練習

    //記事の作成
    createPost: (state, action) => {
      state.idCount++;
      const newPost = {
        id: state.idCount,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt,
        title: action.payload.title,
        body: action.payload.body,
        like: action.payload.like,
      };
      state.posts = [...state.posts, newPost];
    },
    //どの記事が選択されているか管理
    setPickUpPost: (state, action) => {
      const pickUpPost = state.posts.find((post) => post.id === action.payload);

      if (pickUpPost) {
        state.pickUpPost = pickUpPost;
      }
    },
    //記事の編集
    editPost: (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload.id);
      let updateLog = new Date();
      if (post) {
        post.updatedAt = updateLog.toLocaleString();
        post.title = action.payload.title;
        post.body = action.payload.body;
      }
    },
    //記事の削除
    deletePost: (state, action) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload.id);
      state.idCount--;
    },
  },
});

export const selectPosts = (state: RootState) => state.post.posts;

export const getPickUpPost = (state: RootState) => state.post.pickUpPost;

export const { createPost, setPickUpPost, editPost, deletePost } =
  postSlice.actions;

export default postSlice.reducer;
