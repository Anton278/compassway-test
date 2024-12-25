export interface SendEmailResponse {
  id: number;
  sender: number;
  recipient: string;
  subject: string;
  message: string;
}
