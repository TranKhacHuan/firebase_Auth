import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Redirect to="/auth" />;
  }
 
  return <Route {...props} />;
};

export default ProtectedRoute;
