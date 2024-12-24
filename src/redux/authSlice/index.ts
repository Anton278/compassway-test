import { createSlice } from "@reduxjs/toolkit";

import { login, register } from "./thunks";
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
  reducers: {},
  extraReducers: (builder) => {
    // register
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthed = true;
    });
    // login
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthed = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;

export default authSlice.reducer;
