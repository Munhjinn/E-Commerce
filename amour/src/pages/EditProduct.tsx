import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../features/store';
import { updateProduct } from '../features/productsSlice';
import type { Product } from '../features/productsSlice';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const product = useSelector((state: RootState) =>
    state.products.items.find((item: Product) => item.id === id)
  );

  const [formData, setFormData] = useState<Omit<Product, 'id' | 'companyId' | 'sold'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    images: [],
    status: 'active'
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        images: product.images,
        status: product.status
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    dispatch(updateProduct({
      ...product,
      ...formData
    }));

    navigate('/company/products');
  };

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p>Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Бараа засах</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Барааны нэр
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Тайлбар
            </label>
            <textarea
              required
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Үнэ
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={e => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ангилал
              </label>
              <select
                required
                value={formData.category}
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Сонгох...</option>
                <option value="electronics">Электрон бараа</option>
                <option value="clothing">Хувцас</option>
                <option value="home">Гэр ахуй</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Үлдэгдэл
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={e => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Төлөв
              </label>
              <select
                value={formData.status}
                onChange={e => setFormData(prev => ({ 
                  ...prev, 
                  status: e.target.value as 'active' | 'sold_out'
                }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="active">Идэвхтэй</option>
                <option value="sold_out">Дууссан</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/company/products')}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300"
            >
              Буцах
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Хадгалах
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
