import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutCompany } from '../features/companySlice';

const CompanyHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutCompany());
    navigate('/');
  };

  return (
    <header className="bg-[#FF6E00] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link to="/company/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="text-lg font-bold tracking-wide">Amour </span>
          </Link>

          {/* Right */}
          <div className="flex items-center gap-6">
            <Link to="/company/products" className="hover:text-gray-300">
              Миний бараанууд
            </Link>
            <Link to="/company/add-product" className="hover:text-gray-300">
              Бараа нэмэх
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
            >
              Гарах
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CompanyHeader;