import axios from "axios";

export const signupService = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string
) =>
  await axios.post("http://localhost:8000/api/signup", {
    email,
    password,
    firstname,
    lastname,
  });
