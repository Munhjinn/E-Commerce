import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';

const AdminHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-[#FF6E00] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">ADM</div>
            <span className="text-lg font-bold tracking-wide">Admin</span>
          </Link>

          <div className="flex items-center gap-6">
          
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
