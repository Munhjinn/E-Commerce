import React from 'react';
import TopSalesSlider from '../components/TopSalesSlider';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { products } from '../data/products';
import { useLanguage } from '../context/LanguageProvider';
import { Link } from 'react-router-dom';

// import images placed in src/image
import TabletImg from '../image/Tablet.jpg';
// you can add more images and import them similarly:
// import HomeImg from '../image/Home.jpg';
// import TravelImg from '../image/Travel.jpg';
// import GamingImg from '../image/Gaming.jpg';

const categories = [
  {
    title: 'Электрон бараа',
    items: ['гар утас', 'Компьютер', 'чихэвч', 'tablet'],
    images: [TabletImg, TabletImg, TabletImg, TabletImg],
  },
  {
    title: 'Гэр ахуйн бараа',
    items: ['солонгос гэрэл', 'тавилга', 'халбага'],
    images: [TabletImg, TabletImg, TabletImg, TabletImg], // add image(s) if available
  },
  {
    title: 'Аялал жуулчлал',
    items: ['хэвтээ цүнх', 'чемодан'],
    images: [TabletImg, TabletImg, TabletImg, TabletImg],
  },
  {
    title: 'Gaming setups',
    items: ['PC', 'Controller'],
    images: [TabletImg, TabletImg, TabletImg, TabletImg], // placeholder, replace with gaming image if you have one
  },
];

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      {/* Hero / categories band (full width yellow background) */}
      <section className="w-full bg-gradient-to-b from-[#F59E0B] via-[#F97316] to-[#EA580C] py-12">
        <div className="max-w-7xl mx-auto px-4">

          {/* rounded inner panel for hero */}
          <div className="bg-white rounded-2xl p-6 shadow-inner">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((c) => (
                <div key={c.title} className="bg-gray-50 rounded-lg shadow p-4 flex flex-col min-h-[260px]">
                  <h3 className="font-semibold text-gray-800 mb-3">{c.title}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {c.images && c.images.map((img, idx) => (
                      <div key={`${c.title}-${idx}`} className="relative">
                        {/* Wrap image in Link so clicking it navigates to product details (example: product id 1) */}
                        <Link to={`/product/1`} onClick={() => console.log('Navigate to product 1')}>
                          <img 
                            src={img} 
                            alt={c.items[idx]} 
                            className="w-full h-32 object-cover bg-gray-100 rounded-lg"
                          />
                          {c.items[idx] && (
                            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-2 text-center rounded-b-lg">
                              <p className="text-sm font-medium text-gray-800">{c.items[idx]}</p>
                            </div>
                          )}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content area wrapped inside rounded orange/amber panel */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-[#F97316]/90 rounded-2xl p-6 md:p-8 shadow-inner">
          {/* Top Sales slider */}
          <TopSalesSlider />

          {/* Featured */}
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-6">{t('featured_products')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
            {products.map((p) => (
              <div key={p.id} className="flex flex-col h-full">
                <ProductCard {...p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
