import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../index'

const userSlice = createSlice({
  name: "user",
  initialState: { isLogin: false },
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const getIsLogin = (state: RootState) => state.user.isLogin;
export default userSlice.reducer;
