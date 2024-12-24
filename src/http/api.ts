import axios from "axios";

import { addApiAuth } from "../utils/addApiAuth";

export const $api = axios.create({
  baseURL: "http://68.183.74.14:4005/api",
});

const username = localStorage.getItem("username");
const password = localStorage.getItem("username");

if (username && password) {
  addApiAuth(username, password);
}
