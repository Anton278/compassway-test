import { createSlice } from "@reduxjs/toolkit";
import { getEmails, sendEmail } from "./thunks";
import { GetEmailsResponse } from "../../models/responses/GetEmails";

export interface EmailsState {
  emails: GetEmailsResponse;
  isLoading: boolean;
}

const initialState: EmailsState = {
  emails: { results: [] } as unknown as GetEmailsResponse,
  isLoading: false,
};

const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendEmail.fulfilled, (state, action) => {
      state.emails.results.push(action.payload);
    });
    //
    builder.addCase(getEmails.fulfilled, (state, action) => {
      state.emails = action.payload;
    });
  },
});

export default emailsSlice.reducer;
