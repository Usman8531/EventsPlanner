import { useAuthContext } from "contexts/AuthContext";
// import Login from "pages/Auth/Login";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {

  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated)
    return <Navigate to="/auth/login" />

  return <Component />
};

export default PrivateRoute;
