import { $api } from "../http/api";
import type { GetCurrentUserRequest } from "../models/requests/GetCurrentUser";
import type { RegisterRequest } from "../models/requests/Register";
import type { RegisterResponse } from "../models/responses/Register";
import type { User } from "../models/User";

class AuthSerice {
  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    return (await $api.post("/users/", payload)).data;
  }

  async getCurrentUser({
    username,
    password,
  }: GetCurrentUserRequest): Promise<User> {
    return (
      await $api.get("/users/current/", {
        headers: { Authorization: `Basic ${btoa(`${username}:${password}`)}` },
      })
    ).data;
  }
}

export default new AuthSerice();
