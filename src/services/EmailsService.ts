import { $api } from "../http/api";
import { GetEmailsRequest } from "../models/requests/GetEmails";
import type { SendEmailRequest } from "../models/requests/SendEmail";
import type { GetEmailsResponse } from "../models/responses/GetEmails";
import type { SendEmailResponse } from "../models/responses/SendEmail";

class EmailsService {
  async send(payload: SendEmailRequest): Promise<SendEmailResponse> {
    return (await $api.post("/emails/", payload)).data;
  }

  async getAll({
    limit = 30,
    ...restPayload
  }: GetEmailsRequest): Promise<GetEmailsResponse> {
    return (await $api.get("/emails/", { params: { limit, ...restPayload } }))
      .data;
  }
}

export default new EmailsService();
