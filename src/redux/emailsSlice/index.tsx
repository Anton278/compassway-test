import { createSlice } from "@reduxjs/toolkit";
import type { Email } from "../../models/Email";
import { sendEmail } from "./thunks";

export interface EmailsState {
  emails: Email[];
}

const initialState: EmailsState = { emails: [] };

const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendEmail.fulfilled, (state, action) => {
      state.emails.unshift(action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = emailsSlice.actions;

export default emailsSlice.reducer;
