import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageProvider';

const categories = [
  'Electronics',
  'Computers',
  'Home',
  'Fashion',
  'Books',
];

const CategoriesDropdown: React.FC = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    // use mousedown so the click on a menu item registers before we close
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((s) => !s)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((s) => !s);
          }
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        className="text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
      >
        {t('categories')}
      </button>

      {open && (
        <div
          role="menu"
          aria-label={t('categories')}
          className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50"
        >
          {categories.map((c) => (
            <Link
              key={c}
              to={`/category/${encodeURIComponent(c)}`}
              role="menuitem"
              className="block px-4 py-2 hover:bg-gray-100 focus:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              {/* try using t(c) so translations work if you add category keys to LanguageProvider */}
              {t(c) ?? c}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesDropdown;
