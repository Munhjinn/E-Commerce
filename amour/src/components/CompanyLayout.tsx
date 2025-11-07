import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';
import CompanyHeader from './CompanyHeader';

const CompanyLayout: React.FC = () => {
  const isCompanyLoggedIn = useSelector((state: RootState) => state.company.isCompanyLoggedIn);

  if (!isCompanyLoggedIn) {
    return <Navigate to="/company/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <CompanyHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default CompanyLayout;