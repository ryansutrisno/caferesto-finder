import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative bg-brown-600 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2000&auto=format&fit=crop" 
          alt="Cafe Atmosphere" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-600/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 animate-fade-in text-white">
          {t('home.heroTitle')}
        </h1>
        <p className="text-lg md:text-xl text-cream-100 mb-10 max-w-2xl mx-auto">
          {t('home.heroSubtitle')}
        </p>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
          <div className="relative flex flex-col md:flex-row items-center gap-3 md:gap-0">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-400" />
              <input
                type="text"
                placeholder={t('common.searchPlaceholder')}
                className="w-full pl-14 pr-4 md:pr-32 py-4 rounded-full bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-orange-500/30 shadow-xl text-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              className="w-full md:w-auto md:absolute md:right-2 md:top-2 md:bottom-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-4 md:py-0 font-medium transition-colors shadow-lg md:shadow-none"
            >
              {t('common.search')}
            </button>
          </div>
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="text-cream-200 text-sm">Populer:</span>
          <button onClick={() => navigate('/category/coffee_shop')} className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm transition-colors">
            {t('home.categories.coffee_shop')}
          </button>
          <button onClick={() => navigate('/category/family_restaurant')} className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm transition-colors">
            {t('home.categories.family_restaurant')}
          </button>
          <button onClick={() => navigate('/category/open_24h')} className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm transition-colors">
            {t('home.categories.open_24h')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
