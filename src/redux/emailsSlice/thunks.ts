import { createAsyncThunk } from "@reduxjs/toolkit";

import type { SendEmailRequest } from "../../models/requests/SendEmail";
import emailsService from "../../services/EmailsService";
import { GetEmailsRequest } from "../../models/requests/GetEmails";

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

export const getEmails = createAsyncThunk(
  "emails/getAll",
  async (payload: GetEmailsRequest, { rejectWithValue }) => {
    try {
      return await emailsService.getAll(payload);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
