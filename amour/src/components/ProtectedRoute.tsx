import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRole?: 'admin' | 'company' | 'delivery' | 'customer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;