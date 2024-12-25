import { $api } from "../http/api";
import type { SendEmailRequest } from "../models/requests/SendEmail";
import type { SendEmailResponse } from "../models/responses/SendEmail";

class EmailsService {
  async send(payload: SendEmailRequest): Promise<SendEmailResponse> {
    return (await $api.post("/emails/", payload)).data;
  }
}

export default new EmailsService();
