import { createContext, useContext, useState } from "react";
import { AuthContextType, IAuth } from "../types/AuthContexttype";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({} as AuthContextType);

type AuthContextProvider = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProvider) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(false);
  const encodedToken =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [auth, setAuth] = useState<IAuth>(
    encodedToken
      ? { token: encodedToken, isAuth: true }
      : { token: "", isAuth: false }
  );

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isAuth");
    setAuth({ token: "", isAuth: false });
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isOpen,
        setIsOpen,
        auth,
        setAuth,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
