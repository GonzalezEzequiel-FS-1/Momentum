import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = () => {

  const { user, loading } = useAuth();
  if(loading) return null
  if(!user) return  <Navigate to="/" />
  return  <Outlet /> 
};

export default PrivateRoutes;
