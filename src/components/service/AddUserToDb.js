import axios from "axios";

const REGISTER_API = "http://localhost:8080/api/v1/auth/register";

export const addUser = (user) => {
  axios.post(REGISTER_API, user);
};
