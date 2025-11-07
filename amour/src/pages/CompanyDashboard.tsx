import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';

const CompanyDashboard: React.FC = () => {
  const companyInfo = useSelector((state: RootState) => state.company.companyInfo);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Сайн байна уу, {companyInfo?.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats cards */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800">Нийт бараа</h3>
            <p className="text-3xl font-bold text-blue-900 mt-2">0</p>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-800">Зарагдсан</h3>
            <p className="text-3xl font-bold text-green-900 mt-2">0</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-800">Үлдэгдэл</h3>
            <p className="text-3xl font-bold text-purple-900 mt-2">0</p>
          </div>
        </div>

        {/* Recent activity or other dashboard content can go here */}
      </div>
    </div>
  );
};

export default CompanyDashboard;