import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { signupSchema } from "./SignupSchema";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signupService } from "../../services/auth-services/signupService";

const Signup: React.FC = () => {
  const { auth, setAuth, setIsOpen } = useAuth();
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
      agree: false,
    },
    validationSchema: signupSchema,
    onSubmit: async (values, action) => {
      try {
        const { data } = await signupService(
          values.email,
          values.password,
          values.firstname,
          values.lastname
        );
        setAuth({ token: data, isAuth: true });
        localStorage.setItem("token", data);
        action.resetForm();
        navigate("/");
        toast.success("success");
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data);
        }
      }
    },
  });

  useEffect(() => (auth?.isAuth ? navigate("/") : undefined));

  return (
    <form onSubmit={handleSubmit}>
      <article className="max-w-screen-md mx-auto flex flex-col gap-4">
        <section className="py-4">
          <h2 className="text-3xl font-bold my-2">Create new account.</h2>
          <span className="font-light">
            Already A Member?{" "}
            <a
              onClick={() => setIsOpen(true)}
              className="font-medium cursor-pointer underline"
            >
              Log In
            </a>
          </span>
        </section>

        <section className="flex gap-4">
          <label className="flex flex-col w-full">
            <p className="mb-2">Firstname</p>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className={`border p-2 ${
                errors.firstname && touched.firstname ? "border-red-500" : ""
              }`}
              value={values.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.firstname && touched.firstname ? (
              <small className="text-red-500 lowercase">
                {errors.firstname}
              </small>
            ) : null}
          </label>

          <label className="flex flex-col w-full">
            <p className="mb-2">Lastname</p>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className={`border p-2 ${
                errors.lastname && touched.lastname ? "border-red-500" : null
              }`}
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lastname && touched.lastname ? (
              <small className="text-red-500 lowercase">
                {errors.lastname}
              </small>
            ) : null}
          </label>
        </section>

        <label className="flex flex-col w-full">
          <p className="mb-2">Email</p>
          <input
            type="email"
            id="email"
            name="email"
            className={`border p-2 ${
              errors.email && touched.email ? "border-red-500" : null
            }`}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? (
            <small className="text-red-500 lowercase"> {errors.email}</small>
          ) : null}
        </label>

        <section className="flex gap-4">
          <label className="flex flex-col w-full">
            <p className="mb-2">Password</p>
            <input
              type="password"
              id="password"
              name="password"
              className={`border p-2 ${
                errors.password && touched.password ? "border-red-500" : null
              }`}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <small className="text-red-500 lowercase">
                {errors.password}
              </small>
            ) : null}
          </label>

          <label className="flex flex-col w-full">
            <p className="mb-2">Confrim Password</p>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`border p-2 ${
                errors.confirmPassword && touched.confirmPassword
                  ? "border-red-500"
                  : null
              }`}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <small className="text-red-500 lowercase">
                {errors.confirmPassword}
              </small>
            ) : null}
          </label>
        </section>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            onChange={handleChange}
          />
          <span
            className={`${
              errors.agree && touched.agree ? "text-red-500" : null
            }`}
          >
            I agree to{" "}
            <a className="font-medium underline">Terms and Conditions</a>
          </span>
        </label>

        <section className="flex justify-end space-x-2">
          <button
            type="reset"
            className="bg-zinc-400 font-medium rounded-md py-2 px-16"
            onClick={handleReset}
          >
            Clear
          </button>
          <button
            type="submit"
            className="bg-yellow-400 font-medium rounded-md py-2 px-8"
          >
            Create account
          </button>
        </section>
      </article>
    </form>
  );
};

export default Signup;
