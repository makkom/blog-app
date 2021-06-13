import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import postReducer from "../redux_tool/postSlice";
import userReducer from "../redux_tool/userSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
