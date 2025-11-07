import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';
import { Tab } from '@headlessui/react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  sold: number;
  image: string;
  status: 'active' | 'sold_out';
}

const CompanyProducts: React.FC = () => {
  // This would normally come from your backend
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Product 1',
      price: 99.99,
      stock: 5,
      sold: 10,
      image: 'placeholder.jpg',
      status: 'active'
    },
    // Add more products as needed
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Миний бараанууд</h1>
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-1 border-b border-gray-200 mb-6">
            <Tab
              className={({ selected }) =>
                `px-4 py-2 text-sm font-medium leading-5 ${
                  selected
                    ? 'text-blue-700 border-b-2 border-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              Бүгд
            </Tab>
            <Tab
              className={({ selected }) =>
                `px-4 py-2 text-sm font-medium leading-5 ${
                  selected
                    ? 'text-blue-700 border-b-2 border-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              Идэвхтэй
            </Tab>
            <Tab
              className={({ selected }) =>
                `px-4 py-2 text-sm font-medium leading-5 ${
                  selected
                    ? 'text-blue-700 border-b-2 border-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              Дууссан
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Бараа
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Үнэ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Үлдэгдэл
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Зарагдсан
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Төлөв
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Үйлдэл
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={product.image}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${product.price.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.stock}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{product.sold}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {product.status === 'active' ? 'Идэвхтэй' : 'Дууссан'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            Засах
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab.Panel>
            
            <Tab.Panel>
              {/* Active products */}
              {/* Similar table structure as above, but filtered for active products */}
            </Tab.Panel>
            
            <Tab.Panel>
              {/* Sold out products */}
              {/* Similar table structure as above, but filtered for sold out products */}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default CompanyProducts;