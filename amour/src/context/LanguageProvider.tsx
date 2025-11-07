import React, { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'en' | 'mn';

const translations: Record<Lang, Record<string, string>> = {
  en: {
    account: 'Account',
    cart: 'Cart',
    search_placeholder: 'Search products...',
    add_to_cart: 'Add to Cart',
    featured_products: 'Featured Products',
    categories: 'Categories',
    top_sales: 'Top Sales',
    shop_now: 'Shop Now',
    Electronics: 'Electronics',
    Computers: 'Computers',
    Home: 'Home',
    Fashion: 'Fashion',
    Books: 'Books',
    notifications: 'Notifications',
    mark_all_read: 'Mark all as read',
    mark_as_read: 'Mark as read',
    remove: 'Remove',
    no_notifications: 'No notifications',
  },
  mn: {
    account: 'Профайл',
    cart: 'Сагс',
    search_placeholder: 'Бүтээгдэхүүн хайх...',
    add_to_cart: 'Сагс руу нэмэх',
    featured_products: 'Онцлох бүтээгдэхүүн',
    categories: 'Ангилал',
    top_sales: 'Топ бүтээгдэхүүн',
    shop_now: 'Одоо худалдаж авах',
    Electronics: 'Цахилгаан бараа',
    Computers: 'Компьютер',
    Home: 'Гэр ахуйн бараа',
    Fashion: 'Загвар',
    Books: 'Ном',
    notifications: 'Мэдэгдлүүд',
    mark_all_read: 'Бүгдийг уншсан болгох',
    mark_as_read: 'Уншсан болгох',
    remove: 'Устгах',
    no_notifications: 'Мэдэгдэл байхгүй',
  },
};

interface LanguageContextValue {
  lang: Lang;
  t: (key: string) => string;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('en');

  const toggleLang = () => setLang((l) => (l === 'en' ? 'mn' : 'en'));

  const t = (key: string) => translations[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};

export default LanguageProvider;
