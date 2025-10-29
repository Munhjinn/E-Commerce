export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  images: string[];
  rating: number;
  category: string;
  description: string;
  specifications: Record<string, string>;
  isTopSale?: boolean;
}

export const products: Product[] = [
  { 
    id: 1, 
    title: 'Modern Laptop', 
    price: 999.99, 
    image: 'https://via.placeholder.com/300x200',
    images: [
      'https://via.placeholder.com/800x600',
      'https://via.placeholder.com/800x600',
      'https://via.placeholder.com/800x600'
    ],
    rating: 4, 
    category: 'Computers',
    description: 'High-performance laptop with the latest processor and graphics card. Perfect for both work and gaming.',
    specifications: {
      'Processor': 'Intel i7 12th Gen',
      'RAM': '16GB DDR4',
      'Storage': '512GB SSD',
      'Display': '15.6" 4K',
    },
    isTopSale: true
  },
  { 
    id: 2, 
    title: 'Wireless Headphones', 
    price: 199.99, 
    image: 'https://via.placeholder.com/300x200',
    images: [
      'https://via.placeholder.com/800x600',
      'https://via.placeholder.com/800x600',
      'https://via.placeholder.com/800x600'
    ],
    rating: 5, 
    category: 'Electronics',
    description: 'Premium wireless headphones with active noise cancellation and crystal clear sound quality.',
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Features': 'Active Noise Cancellation',
      'Weight': '250g',
    },
    isTopSale: true
  },
  { 
    id: 3, 
    title: 'Smartphone', 
    price: 699.99, 
    image: 'https://via.placeholder.com/300x200',
    images: [
      'https://via.placeholder.com/800x600',
      'https://via.placeholder.com/800x600',
      'https://via.placeholder.com/800x600'
    ],
    rating: 4, 
    category: 'Electronics',
    description: 'Latest smartphone with advanced camera system and all-day battery life.',
    specifications: {
      'Screen': '6.7" OLED',
      'Camera': '48MP Main + 12MP Ultra Wide',
      'Battery': '4500mAh',
      'Storage': '256GB',
    },
    isTopSale: true
  },
  { 
    id: 4, 
    title: 'Kitchen Mixer', 
    price: 149.99, 
    image: 'https://via.placeholder.com/300x200',
    images: [
      'https://via.placeholder.com/800x600',
      'https://via.placeholder.com/800x600',
      'https://via.placeholder.com/800x600'
    ],
    rating: 4, 
    category: 'Home',
    description: 'Professional grade kitchen mixer with multiple attachments for all your baking needs.',
    specifications: {
      'Power': '300W',
      'Capacity': '5L',
      'Speeds': '6 speeds',
      'Color': 'Stainless Steel',
    }
  },
  { 
    id: 5, 
    title: 'Novel Book', 
    price: 19.99, 
    image: 'https://via.placeholder.com/300x200',
    images: [
      'https://via.placeholder.com/800x600',
      'https://via.placeholder.com/800x600',
      'https://via.placeholder.com/800x600'
    ],
    rating: 5, 
    category: 'Books',
    description: 'Bestselling novel that will keep you engaged from start to finish.',
    specifications: {
      'Pages': '400',
      'Language': 'English',
      'Format': 'Hardcover',
      'Publisher': 'Amour Publishing',
    }
  },
];
