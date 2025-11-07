import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryItemProps {
  name: string;
  image: string;
}

const CategoryCard: React.FC<CategoryItemProps> = ({ name, image }) => {
  return (
    <Link to={`/category/${name}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-w-1 aspect-h-1">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover bg-gray-50"
          />
        </div>
        <div className="p-3 text-center bg-white">
          <h3 className="text-sm font-medium text-gray-800">{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;