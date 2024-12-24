import { $api } from "../http/api";

export const addApiAuth = (username: string, password: string) => {
  $api.defaults.headers.common["Authorization"] = `Basic ${btoa(
    `${username}:${password}`
  )}`;
};
