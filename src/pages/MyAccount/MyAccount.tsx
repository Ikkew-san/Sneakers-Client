import { LogoutOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const MyAccount: React.FC = () => {
  const { auth, logoutHandler } = useAuth();
  const navigate = useNavigate();

  useEffect(() => (!auth?.isAuth ? navigate("/") : undefined));

  return (
    <article>
      <section className="max-w-screen-xl mx-auto px-6 py-4">
        <div className="text-center">
          <a
            onClick={() => logoutHandler()}
            className="inline-block bg-red-400 items-center rounded space-x-20 py-2 px-4"
          >
            <LogoutOutlined style={{ fontSize: "24px" }} />
            <span className="font-semibold">Logout</span>
          </a>
        </div>
      </section>
    </article>
  );
};

export default MyAccount;
