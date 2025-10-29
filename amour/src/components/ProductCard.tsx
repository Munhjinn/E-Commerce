import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';
import { useLanguage } from '../context/LanguageProvider';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, image, rating }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart({ id, title, price, image }));
  };

  const handleClick = () => navigate(`/product/${id}`);

  const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover bg-gray-100" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => {
            const filled = i < Math.round(rating);
            return (
              <svg key={i} className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill={filled ? '#2B8AF7' : 'none'} stroke="#2B8AF7">
                <path d="M10 15l-5.878 3.09L5.5 11.545 1 7.91l6.06-.879L10 1l2.94 6.03L19 7.91l-4.5 3.636 1.378 6.545z" />
              </svg>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">{formatted}</span>
          <button
            onClick={handleAdd}
            className="bg-[#F97316] text-white px-4 py-2 rounded-md hover:bg-[#EA580C]"
          >
            {t('add_to_cart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;