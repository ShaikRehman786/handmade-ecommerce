import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { user } = useAuth();

  // If user is authenticated, render child routes via Outlet
  // Otherwise, redirect to /login page
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
