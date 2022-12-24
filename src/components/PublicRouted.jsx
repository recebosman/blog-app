import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";

const PublicRouted = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PublicRouted;
