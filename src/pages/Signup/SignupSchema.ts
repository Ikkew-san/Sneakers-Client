import * as Yup from "yup";

export const signupSchema = Yup.object({
  firstname: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Firstname must contain only letters. Please try again.")
    .required("Firstname is required"),
  lastname: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Lastname must contain only letters. Please try again.")
    .required("Lastname is required"),
  email: Yup.string().email().required("Email id is required"),
  password: Yup.string()
    .min(8)
    .required("Please enter your password")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at one uppercase, one number and one special case character. Please try again."
    ),
  confirmPassword: Yup.string()
    .min(6)
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), ""], "Password must match"),
  agree: Yup.bool().oneOf([true], "You must accept the terms and conditions"),
});
