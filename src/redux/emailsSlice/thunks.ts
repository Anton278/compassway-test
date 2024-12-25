import { createAsyncThunk } from "@reduxjs/toolkit";

import type { SendEmailRequest } from "../../models/requests/SendEmail";
import emailsService from "../../services/EmailsService";

export const sendEmail = createAsyncThunk(
  "emails/send",
  async (payload: SendEmailRequest, { rejectWithValue }) => {
    try {
      return await emailsService.send(payload);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
