import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { products } from '../data/products';
import { addToCart } from '../features/cartSlice';
import { useLanguage } from '../context/LanguageProvider';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Product not found</p>
      </div>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <Slider {...sliderSettings}>
              {product.images.map((img, index) => (
                <div key={index}>
                  <img 
                    src={img} 
                    alt={`${product.title} view ${index + 1}`}
                    className="w-full h-[400px] object-cover rounded"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`h-5 w-5 ${
                      index < product.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-500 ml-2">({product.rating} stars)</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-6">${product.price}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold py-3 rounded mb-4"
            >
              {t('add_to_cart')}
            </button>
          </div>

          {/* Specifications */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {t('specifications')}
            </h2>
            <dl className="space-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="grid grid-cols-3 gap-4">
                  <dt className="text-gray-600 font-medium">{key}</dt>
                  <dd className="text-gray-900 col-span-2">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;