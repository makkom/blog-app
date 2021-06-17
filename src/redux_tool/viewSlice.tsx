import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const initialState = {
  firstRead: {
    alreadyRead: false,
  },
};

export const viewSlice = createSlice({
  name: "firstRead",
  initialState,
  reducers: {
    //最初にサイトを見たとき、アニメーションを表示させる
    checkRead: (state, action) => {
      state.firstRead.alreadyRead = action.payload;
    },
  },
});

export const alreadyRead = (state: RootState) => state.view.firstRead;

export const { checkRead } = viewSlice.actions;

export default viewSlice.reducer;
