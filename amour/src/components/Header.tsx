import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon as SearchIcon,
  UserIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import CategoriesDropdown from './CategoriesDropdown';
import NotificationsDropdown from './NotificationsDropdown';
import { useLanguage } from '../context/LanguageProvider';

const Header: React.FC = () => {
  const { t, lang, toggleLang } = useLanguage();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="bg-[#FF6E00] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-6 h-16">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-3 min-w-[160px]">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="text-lg font-bold tracking-wide">Amour</span>
          </Link>

          {/* Center: big search area */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-3xl">
              <div className="flex items-center bg-white/10 rounded-lg px-2 py-1 shadow-sm">
                <div className="px-2">
                  <div className="inline-flex items-center text-sm text-white/90">
                    <CategoriesDropdown />
                  </div>
                </div>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder={t('search_placeholder')}
                    className="w-full bg-transparent text-white placeholder-white/80 px-4 py-2 focus:outline-none"
                  />
                  <SearchIcon className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-white/80" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: compact controls */}
          <div className="flex items-center gap-3 min-w-[220px] justify-end">
            <button
              onClick={toggleLang}
              className="w-8 h-8 bg-white/10 rounded-sm flex items-center justify-center text-sm font-medium hover:bg-white/20"
              aria-label="toggle language"
              title="Toggle language"
            >
              {lang === 'en' ? 'EN' : 'MN'}
            </button>

            <Link to="/account" className="flex items-center gap-2 hover:text-yellow-300">
              <UserIcon className="h-5 w-5" />
              <span className="hidden md:inline text-sm">{t('account')}</span>
            </Link>

            <div className="relative flex items-center">
              <button 
                className="hover:text-yellow-300 focus:outline-none flex items-center gap-2" 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <BellIcon className="h-5 w-5" />
              </button>
              {isNotificationsOpen && <NotificationsDropdown onClose={() => setIsNotificationsOpen(false)} />}
            </div>

            <Link to="/cart" className="relative flex items-center gap-2 hover:text-yellow-300">
              <ShoppingCartIcon className="h-5 w-5" />
              <span className="hidden md:inline text-sm">{t('cart')}</span>
           
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary nav strip */}
      <div className="bg-[#1f2022] text-white text-sm">  
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-4 overflow-x-auto h-10">
            <a className="px-3 py-1 hover:underline cursor-pointer">All </a>
            <a className="px-3 py-1 hover:underline cursor-pointer">Amazon Deals</a>
            <a className="px-3 py-1 hover:underline cursor-pointer">Medical Care</a>
            <a className="px-3 py-1 hover:underline cursor-pointer">Luxury</a>
            <a className="px-3 py-1 hover:underline cursor-pointer">Best Sellers</a>
            <a className="px-3 py-1 hover:underline cursor-pointer">New Releases</a>
            <a className="px-3 py-1 hover:underline cursor-pointer">Groceries</a>
            <a className="px-3 py-1 hover:underline cursor-pointer">Prime</a>
            <a className="px-3 py-1 hover:underline cursor-pointer">Today's Deals</a>
            <a className="px-3 py-1 hover:underline cursor-pointer">Customer Service</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
