import {
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header: React.FC = () => {
  const { setIsOpen, auth } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const inCart = 0;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="bg-yellow-500 py-1" />
      <section className="max-w-screen-xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <ul className="flex items-center gap-6 lg:gap-8 font-medium">
            <li className="w-[175px]">
              <Link to="/">
                <span className="logo text-2xl font-bold">Sneakers</span>
              </Link>
            </li>

            <li>
              <Link to="/store">
                ALL PRODUCTS
                {pathname === "/store" ? (
                  <hr className="border-yellow-500 border-b-2" />
                ) : (
                  ""
                )}
              </Link>
            </li>

            <li>
              <Link to="/store/men">
                MEN
                {pathname === "/store/men" ? (
                  <hr className="border-yellow-500 border-b-2" />
                ) : (
                  ""
                )}
              </Link>
            </li>

            <li>
              <Link to="/store/women">
                WOMEN
                {pathname === "/store/women" ? (
                  <hr className="border-yellow-500 border-b-2" />
                ) : (
                  ""
                )}
              </Link>
            </li>

            <li>
              <Link to="/store/kids">
                KIDS
                {pathname === "/store/kids" ? (
                  <hr className="border-yellow-500 border-b-2" />
                ) : (
                  ""
                )}
              </Link>
            </li>

            {/* <li>
              <Link to="/about">
                ABOUT
                {pathname === "/about" ? (
                  <hr className="border-yellow-500 border-b-2" />
                ) : (
                  ""
                )}
              </Link>
            </li> */}
            {/* 
            <li>
              <Link to="/blog">
                BLOG
                {pathname === "/blog" ? (
                  <hr className="border-yellow-500 border-b-2" />
                ) : (
                  ""
                )}
              </Link>
            </li> */}
          </ul>

          <section className="flex gap-6">
            <Link
              to="/favorites"
              className="cursor-pointer hover:outline hover:outline-[6px] hover:outline-zinc-300/50 hover:rounded-full hover:bg-zinc-300/50"
            >
              <HeartOutlined style={{ fontSize: "22px" }} />
            </Link>

            <div className="relative">
              <Link
                to="/cart"
                className="cursor-pointer hover:outline hover:outline-[6px] hover:outline-zinc-300/50 hover:rounded-full hover:bg-zinc-300/50"
              >
                <ShoppingCartOutlined style={{ fontSize: "22px" }} />
              </Link>

              {inCart > 0 ? (
                <span className="absolute -top-1 -right-2 w-5 bg-red-400 font-bold text-white text-[10px] text-center rounded px-1">
                  {inCart <= 9 ? inCart : "9+"}
                </span>
              ) : null}
            </div>

            <a
              className="cursor-pointer hover:outline hover:outline-[6px] hover:outline-zinc-300/50 hover:rounded-full hover:bg-zinc-300/50"
              onClick={() =>
                auth?.isAuth ? navigate("/my-account") : setIsOpen(true)
              }
            >
              <UserOutlined style={{ fontSize: "22px" }} />
            </a>
          </section>
        </div>
      </section>
    </header>
  );
};

export default Header;
