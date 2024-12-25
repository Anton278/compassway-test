import type { Email } from "../Email";

export interface GetEmailsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Email[];
}
