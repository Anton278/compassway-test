import type { RootState } from "../store";

export const selectEmails = (state: RootState) => state.emails.emails.results;
