export type IAuth = {
  token: string;
  isAuth: boolean;
};

export type AuthContextType = {
  isOpen: boolean | null;
  setIsOpen: (isOpen: boolean | null) => void;
  auth?: IAuth;
  setAuth: (auth: IAuth) => void;
  logoutHandler: () => void;
};
