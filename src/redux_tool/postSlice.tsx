import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { db } from "../firebase";
import { Post, Posts } from "../types";

export type PostsState = {
  idCount: number;
  posts: {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    body: string;
    like: number;
  }[];
  pickUpPost: Post;
};

const initialState: PostsState = {
  idCount: 0,
  posts: [],
  pickUpPost: {
    id: "",
    createdAt: "",
    updatedAt: "",
    title: "",
    body: "",
    like: 0,
  },
};

// --------記事の全件取得

export const fetchPosts = createAsyncThunk("post/getAllPosts", async () => {
  const res = await db.collection("posts").orderBy("createdAt", "desc").get();

  const allPosts = res.docs.map((doc) => ({
    id: doc.id,
    createdAt: doc.data().createdAt,
    updatedAt: doc.data().updatedAt,
    title: doc.data().title,
    body: doc.data().body,
    like: doc.data().like,
  }));

  const postNumber = allPosts.length;
  const passData = { allPosts, postNumber };
  return passData;
});

// --------記事の新規作成
export const createPost = async (
  createdAt: string,
  title: string,
  body: string,
  like: number
): Promise<void> => {
  try {
    await db.collection("posts").add({
      createdAt: createdAt,
      updatedAt: "",
      title: title,
      body: body,
      like: like,
    });
  } catch (err) {
    console.log("Error writing document: ", err);
  }
};

// --------記事の編集

export const editPost = async (submitData: {
  id: string;
  updatedAt: string;
  title: string;
  body: string;
}): Promise<void> => {
  const { id, updatedAt, title, body } = submitData;
  try {
    await db
      .collection("posts")
      .doc(id)
      .set({ updatedAt, title, body }, { merge: true });
  } catch (err) {
    console.log("Error updating document:", err);
  }
};

// --------記事の削除

export const deletePost = async (id: string): Promise<void> => {
  try {
    await db.collection("posts").doc(id).delete();
  } catch (err) {
    console.log("Error removing document: ", err);
  }
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPickUpPost: (state, action) => {
      // const pickUpPost = state.posts.find((post) => post.id === action.payload);
      // if (pickUpPost) {
      //   state.pickUpPost = pickUpPost;
      // }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload.allPosts;
      state.idCount = action.payload.postNumber;
    });
  },
});

export const selectPosts = (state: RootState) => state.post.posts;

export const getPickUpPost = (state: RootState) => state.post.pickUpPost;

export const { setPickUpPost } = postSlice.actions;

export default postSlice.reducer;
