import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Search, Globe, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LocationPicker from '../ui/LocationPicker';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-brown-500/10 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-zinc-600 hover:text-brown-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
            <div className="w-10 h-10 bg-brown-500 rounded-xl flex items-center justify-center group-hover:bg-brown-600 transition-colors">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-heading font-bold text-brown-500 hidden sm:inline">CafeFinder</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-zinc-600 hover:text-brown-500 transition-colors">
            {t('common.home', 'Home')}
          </Link>
          <Link to="/category/coffee_shop" className="text-sm font-medium text-zinc-600 hover:text-brown-500 transition-colors">
            {t('home.categories.coffee_shop')}
          </Link>
          <Link to="/category/family_restaurant" className="text-sm font-medium text-zinc-600 hover:text-brown-500 transition-colors">
            {t('home.categories.family_restaurant')}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <LocationPicker />

          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-zinc-600 hover:bg-brown-50 transition-colors border border-transparent hover:border-brown-200"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{i18n.language === 'en' ? 'EN' : 'ID'}</span>
          </button>

          <div className="h-6 w-px bg-zinc-200 mx-1 hidden sm:block"></div>

          <Link to="/search" className="p-2 text-zinc-500 hover:text-brown-500 hover:bg-brown-50 rounded-full transition-colors sm:hidden">
            <Search className="w-5 h-5" />
          </Link>
          <Link to="/search" className="hidden sm:flex btn btn-primary text-sm px-4 py-2">
            {t('common.search')}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-brown-100 shadow-xl animate-slide-down">
          <nav className="flex flex-col p-4 space-y-4">
            <Link 
              to="/" 
              className="px-4 py-3 rounded-lg hover:bg-brown-50 text-zinc-700 font-medium"
              onClick={closeMenu}
            >
              {t('common.home', 'Home')}
            </Link>
            <Link 
              to="/category/coffee_shop" 
              className="px-4 py-3 rounded-lg hover:bg-brown-50 text-zinc-700 font-medium"
              onClick={closeMenu}
            >
              {t('home.categories.coffee_shop')}
            </Link>
            <Link 
              to="/category/family_restaurant" 
              className="px-4 py-3 rounded-lg hover:bg-brown-50 text-zinc-700 font-medium"
              onClick={closeMenu}
            >
              {t('home.categories.family_restaurant')}
            </Link>
            <div className="border-t border-zinc-100 my-2"></div>
            <Link 
              to="/about" 
              className="px-4 py-3 rounded-lg hover:bg-brown-50 text-zinc-700 font-medium"
              onClick={closeMenu}
            >
              {t('common.about', 'About Us')}
            </Link>
            <Link 
              to="/contact" 
              className="px-4 py-3 rounded-lg hover:bg-brown-50 text-zinc-700 font-medium"
              onClick={closeMenu}
            >
              {t('common.contact', 'Contact')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
