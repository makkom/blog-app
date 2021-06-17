import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const initialState = {
  user: {
    auth: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //ユーザーのログイン状態を管理
    userAuth: (state, action) => {
      state.user.auth = action.payload;
    },
  },
});

export const confirmAuth = (state: RootState) => state.user.user;

export const { userAuth } = userSlice.actions;

export default userSlice.reducer;
