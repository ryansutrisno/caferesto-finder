import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Instagram, Facebook, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-brown-500/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brown-500 rounded-lg flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-heading font-bold text-brown-500">CafeFinder</span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-brown-50 text-brown-500 hover:bg-brown-500 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-brown-50 text-brown-500 hover:bg-brown-500 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-brown-50 text-brown-500 hover:bg-brown-500 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-zinc-900 mb-4">{t('footer.explore')}</h3>
            <ul className="space-y-3">
              <li><Link to="/category/coffee_shop" className="text-zinc-500 hover:text-brown-500 text-sm">{t('home.categories.coffee_shop')}</Link></li>
              <li><Link to="/category/family_restaurant" className="text-zinc-500 hover:text-brown-500 text-sm">{t('home.categories.family_restaurant')}</Link></li>
              <li><Link to="/category/open_24h" className="text-zinc-500 hover:text-brown-500 text-sm">{t('home.categories.open_24h')}</Link></li>
              <li><Link to="/search" className="text-zinc-500 hover:text-brown-500 text-sm">{t('home.popularTitle')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-zinc-900 mb-4">{t('footer.company')}</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-zinc-500 hover:text-brown-500 text-sm">{t('footer.aboutUs')}</Link></li>
              <li><Link to="/contact" className="text-zinc-500 hover:text-brown-500 text-sm">{t('footer.contact')}</Link></li>
              <li><Link to="/privacy" className="text-zinc-500 hover:text-brown-500 text-sm">{t('footer.privacy')}</Link></li>
              <li><Link to="/terms" className="text-zinc-500 hover:text-brown-500 text-sm">{t('footer.terms')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-zinc-900 mb-4">{t('footer.newsletter')}</h3>
            <p className="text-zinc-500 text-sm mb-4">{t('footer.newsletterDesc')}</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1 px-4 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:border-brown-500 text-sm"
              />
              <button type="submit" className="px-4 py-2 bg-brown-500 text-white rounded-lg hover:bg-brown-600 transition-colors text-sm font-medium">
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 text-sm">© 2024 CafeFinder. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <span className="text-zinc-400 text-sm">{t('footer.madeWith')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
