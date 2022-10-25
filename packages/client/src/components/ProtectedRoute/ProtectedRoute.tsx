import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isAuthorized } = useAppSelector((state) => state.auth);
  return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
