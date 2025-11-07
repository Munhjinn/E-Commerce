import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import OrangeWrapper from '../components/OrangeWrapper';
import { products } from '../data/products';

const CategoryPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const decoded = name ? decodeURIComponent(name) : '';
  const filtered = products.filter((p) => p.category === decoded);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <OrangeWrapper>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{decoded}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </OrangeWrapper>
    </div>
  );
};

export default CategoryPage;
