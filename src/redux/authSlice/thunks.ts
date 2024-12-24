import { createAsyncThunk } from "@reduxjs/toolkit";

import authService from "../../services/AuthService";
import type { RegisterRequest } from "../../models/requests/Register";
import type { GetCurrentUserRequest } from "../../models/requests/GetCurrentUser";

export const register = createAsyncThunk(
  "auth/register",
  async (payload: RegisterRequest, { rejectWithValue }) => {
    try {
      return await authService.register(payload);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/login",
  async (payload: GetCurrentUserRequest, { rejectWithValue }) => {
    try {
      return await authService.getCurrentUser(payload);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
