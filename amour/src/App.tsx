import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './features/store';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LanguageProvider from './context/LanguageProvider';


const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#F97316] via-[#F97316]/90 to-[#D97706] text-white">
      <div className="relative max-w-7xl mx-auto px-4 py-6">
        {/* left logo/title */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-extrabold tracking-tight">
          AMOUR
        </div>

        {/* centered small copyright text */}
        <div className="flex justify-center">
          <div className="text-sm text-white/90">2025 Бүх эрх хуулиар хамгаалагдсан</div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <LanguageProvider>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/category/:name" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
            </Routes>
          </div>
        </LanguageProvider>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;
