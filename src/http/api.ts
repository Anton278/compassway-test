import axios from "axios";

import { addApiAuth } from "../utils/addApiAuth";
import { LS_KEYS } from "../utils/const";

export const $api = axios.create({
  baseURL: "http://68.183.74.14:4005/api",
});

const username = localStorage.getItem(LS_KEYS.username);
const password = localStorage.getItem(LS_KEYS.password);

if (username && password) {
  addApiAuth(username, password);
}
