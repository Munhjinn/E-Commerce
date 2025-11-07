import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './features/store';
import Header from './components/Header';
import AdminHeader from './components/AdminHeader';
import { useSelector } from 'react-redux';
import { RootState } from './features/store';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import LanguageProvider from './context/LanguageProvider';
import CompanyLayout from './components/CompanyLayout';
import CompanyDashboard from './pages/CompanyDashboard';
import CompanyProducts from './pages/CompanyProducts';
import AddProduct from './pages/AddProduct';
import DeliveryPage from './pages/DeliveryPage';


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

function AppContent() {
  const role = useSelector((state: RootState) => state.auth.user?.role);

  return (
    <Router>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-100">
          {role === 'admin' ? <AdminHeader /> : <Header />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/category/:name" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/deliveries" element={<DeliveryPage />} />
             {/* Company Routes */}
              <Route path="/company" element={<CompanyLayout />}>
                <Route path="dashboard" element={<CompanyDashboard />} />
                <Route path="products" element={<CompanyProducts />} />
                <Route path="add-product" element={<AddProduct />} />
              </Route>

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>


        </div>
      </LanguageProvider>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
      <Footer />
    </Provider>
  );
}

export default App;
