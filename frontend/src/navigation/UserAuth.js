import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserAuth = ({ redirectPath }) => {
  const isLogin = useSelector((state) => state.authentication.isLogin);
  if (isLogin) {
    return <Outlet />;
  }
  return <Navigate to={redirectPath} />;
};

export default UserAuth;
