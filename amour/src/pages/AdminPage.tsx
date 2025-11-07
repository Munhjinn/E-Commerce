import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../features/store';
import ProductManagement from '../components/admin/ProductManagement';
import OrderManagement from '../components/admin/OrderManagement';
import UserManagement from '../components/admin/UserManagement';

type ActiveView = 'dashboard' | 'products' | 'orders' | 'users' | 'settings';

const AdminPage: React.FC = () => {
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');

  // Redirect if not logged in or not an admin
  if (!isLoggedIn || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-gray-600">Settings page is under development.</p>
          </div>
        );
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Total Orders</h3>
                <p className="text-3xl font-bold text-orange-600">3</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Total Products</h3>
                <p className="text-3xl font-bold text-orange-600">3</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-orange-600">3</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveView('products')}
                  className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700"
                >
                  Manage Products
                </button>
                <button
                  onClick={() => setActiveView('orders')}
                  className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700"
                >
                  View Orders
                </button>
                <button
                  onClick={() => setActiveView('users')}
                  className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700"
                >
                  Manage Users
                </button>
                <button
                  onClick={() => setActiveView('settings')}
                  className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700"
                >
                  Settings
                </button>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {activeView !== 'dashboard' && (
          <button
            onClick={() => setActiveView('dashboard')}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
          >
            Back to Dashboard
          </button>
        )}
      </div>
      
      {renderContent()}
    </div>
  );
};

export default AdminPage;