import React, { useRef, useState } from "react";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import { loginService } from "../../services/auth-services/loginService";

// import logo_google from "../../assets/img/logo/google.svg";
// import logo_fb from "../../assets/img/logo/facebook.svg";
// import logo_x from "../../assets/img/logo/logo_x.svg";

type IErrors = {
  email: boolean;
  password: boolean;
};

const Login: React.FC = () => {
  const { isOpen, setIsOpen, setAuth } = useAuth();
  const formLogin = useRef() as React.MutableRefObject<HTMLFormElement>;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [errors, setErrors] = useState<IErrors>({
    email: false,
    password: false,
  });
  const [message, setMessage] = useState<string>();
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const { data } = await loginService(email, password);
      if (remember) {
        localStorage.setItem("token", data);
        setAuth({ token: data, isAuth: true });
      } else {
        sessionStorage.setItem("token", data);
        setAuth({ token: data, isAuth: true });
      }
      setIsOpen(false);
      navigate(0);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrors({
          email: error.response?.data.email,
          password: error.response?.data.password,
        });
        setMessage(error.response?.data.message);
      }
    }
  };

  const isClose = () => {
    formLogin.current.reset();
    setIsOpen(false);
  };

  return (
    <article className={`${!isOpen ? "hidden" : ""} absolute grid place-items-center top-0 left-0 w-screen h-screen`}>
      <div className="absolute bg-white/80 z-0 w-screen h-screen" onClick={() => isClose()} />
      <section className="relative z-10 border shadow-2xl rounded md:w-[500px] w-[300px]">
        {/* Close button */}
        <div className="absolute top-3 right-4 ">
          <a onClick={() => isClose()}>
            <CloseOutlined />
          </a>
        </div>

        <form
          ref={formLogin}
          onSubmit={(e) => {
            e.preventDefault();
            loginHandler();
          }}
        >
          <div className="flex flex-col gap-4 bg-white p-6">
            {/* Title */}
            <div className="text-center mt-2 space-y-2">
              <h1 className=" font-bold text-4xl">Login</h1>
              {/* No account */}
              <div className="space-y-1">
                <p className="font-light">
                  No account?{" "}
                  <Link to="/signup" onClick={() => isClose()} className="font-medium underline">
                    Sign up
                  </Link>
                </p>
                <small className="text-red-500 lowercase">{errors.email || errors.password ? message : null}</small>
              </div>
            </div>

            {/* Input Email */}
            <label className="flex flex-col gap-1">
              <span className="font-medium">Email</span>
              <input
                type="email"
                name="email"
                required
                className={`border p-2 ${errors.email ? "border-red-500" : null}`}
                placeholder="Email address"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: false });
                  if (!(errors.email || errors.password) && message != undefined) setMessage(undefined);
                }}
                onBlur={() => {
                  if (email == "" && message != undefined) setErrors({ ...errors, email: true });
                }}
              />
            </label>

            {/* Input Password */}
            <label className="flex flex-col gap-1">
              <span className="font-medium">Password</span>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                className={`border p-2 ${errors.password ? "border-red-500" : null}`}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: false });

                  if (!(errors.email || errors.password) && message != undefined) setMessage(undefined);
                }}
                onBlur={() => {
                  if (password === "" && message != undefined) setErrors({ ...errors, password: true });
                }}
              />
            </label>

            <section className="flex justify-between">
              {/* Remember me */}
              <label className="flex gap-2">
                <input type="checkbox" id="remember" name="remember" onChange={(e) => setRemember(e.target.checked)} />
                <span className="">Remember me</span>
              </label>

              {/* Forgotten password */}
              <div>
                <Link to="/forgot-password" onClick={() => isClose()} className="font-medium underline">
                  Forgot password?
                </Link>
              </div>
            </section>

            {/* Login button */}
            <div>
              <button
                type="submit"
                disabled={(email && password != "") || (!errors.email && !errors.password) ? false : true}
                className="block text-center bg-yellow-500 font-semibold w-full rounded py-2"
              >
                Login
              </button>
            </div>
          </div>
        </form>

        {/* <div className="flex justify-between items-center bg-zinc-700 text-white px-6 py-4">
          <span className="">Login with</span>

          <div className="flex items-center gap-6">
            <div>
              <a className="flex items-center gap-2 p-1">
                <img src={logo_google} alt="Google" width={18} />
                <span className="max-md:hidden"> Google</span>
              </a>
            </div>

            <div>
              <a className="flex items-center gap-2 p-1">
                <img src={logo_fb} alt="Facebook" width={18} />
                <span className="max-md:hidden">Facebook</span>
              </a>
            </div>

            <div>
              <a className="flex items-center gap-2 p-1">
                <img src={logo_x} alt="X.com" width={18} className="invert" />
                <span className="max-md:hidden">X.com</span>
              </a>
            </div>
          </div>
        </div> */}
      </section>
    </article>
  );
};

export default Login;
