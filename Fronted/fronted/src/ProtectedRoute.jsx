// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useSelector((state) => state.user);

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
