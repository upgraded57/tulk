import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const tokens = JSON.parse(localStorage.getItem("tokens"));

  return tokens ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
