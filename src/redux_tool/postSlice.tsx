import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { db } from "../firebase";
import { Post, Posts } from "../types";

export type PostsState = {
  order: number;
  posts: {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    body: string;
  }[];
  comments: { sentence: string; createdAt: string }[];
};

const initialState: PostsState = {
  order: 0,
  posts: [],
  comments: [],
};

// --------記事の全件取得

export const fetchPosts = createAsyncThunk("post/getAllPosts", async () => {
  const res = await db.collection("posts").orderBy("order", "desc").get();

  const allPosts = res.docs.map((doc) => ({
    id: doc.id,
    createdAt: doc.data().createdAt,
    updatedAt: doc.data().updatedAt,
    title: doc.data().title,
    body: doc.data().body,
  }));

  const postNumber = allPosts.length;
  const passData = { allPosts, postNumber };
  return passData;
});

// --------指定した記事のコメントの取得

export const fetchComments = createAsyncThunk(
  "comments/getComments",
  async (id: string) => {
    const res = await db
      .collection("posts")
      .doc(id)
      .collection("comments")
      .orderBy("order", "desc")
      .get();

    const getComments = res.docs.map((doc) => ({
      sentence: doc.data().sentence,
      createdAt: doc.data().createdAt,
    }));

    const commentsData = { getComments };
    return commentsData;
  }
);

// --------記事の新規作成
export const createPost = async (
  createdAt: string,
  title: string,
  body: string
): Promise<void> => {
  const day = new Date();

  try {
    await db.collection("posts").add({
      order: day,
      createdAt: createdAt,
      updatedAt: createdAt,
      title: title,
      body: body,
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

// ---------コメントの追加

export const createComment = async (
  id: string,
  sentence: string,
  createdAt: string
): Promise<void> => {
  try {
    let order = new Date();
    await db
      .collection("posts")
      .doc(id)
      .collection("comments")
      .add({ order: order, sentence: sentence, createdAt: createdAt });
  } catch (err) {
    console.log("Error updating document:", err);
  }
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload.allPosts;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload.getComments;
    });
  },
});

export const selectPosts = (state: RootState) => state.post.posts;

export const selectComments = (state: RootState) => state.post.comments;

export default postSlice.reducer;
