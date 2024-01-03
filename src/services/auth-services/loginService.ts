import axios from "axios";

export const loginService = async (email: string, password: string) =>
  await axios.post("http://localhost:8000/api/login", {
    email,
    password,
  });
