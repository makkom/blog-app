import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { User } from "../types";

const URL = "http://localhost:3001";

const initialState = {
  user: {
    email: "test@test.com",
    password: "00000000",
    auth: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //ユーザーのログイン状態を管理
    userAuth: (state, action) => {
      state.user = action.payload;
      if (
        state.user.email === action.payload.email &&
        state.user.password === action.payload.password
      ) {
        state.user.auth = true;
      }
    },
  },
});

export const confirmAuth = (state: RootState) => state.user.user;

export const { userAuth } = userSlice.actions;

export default userSlice.reducer;
