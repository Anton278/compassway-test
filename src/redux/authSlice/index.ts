import { createSlice } from "@reduxjs/toolkit";

import { getCurrentUser, register } from "./thunks";
import type { User } from "../../models/User";
import { LS_KEYS } from "../../utils/const";

export interface AuthState {
  isAuthed: boolean;
  user: User;
}

const initialState: AuthState = {
  isAuthed: !!(
    localStorage.getItem(LS_KEYS.username) &&
    localStorage.getItem(LS_KEYS.password)
  ),
  user: {
    email: "",
    id: -1,
    username: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthed = false;
      state.user = { email: "", id: -1, username: "" };
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthed = true;
    });
    // login
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthed = true;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.isAuthed = false;
      state.user = { email: "", id: -1, username: "" };
    });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;
