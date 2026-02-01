import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        // Check if user has already accepted cookies
        const cookieAccepted = localStorage.getItem('cookieConsent');
        if (!cookieAccepted) {
            // Show banner after a short delay
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
            <div className="container mx-auto max-w-4xl bg-white rounded-xl shadow-2xl border border-brown-100 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 pr-8">
                    <p className="text-zinc-600 text-sm md:text-base">
                        {t('common.cookieConsent')}
                        <Link to="/privacy" className="text-brown-500 hover:underline ml-1 font-medium">
                            {t('common.learnMore')}
                        </Link>
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={handleAccept}
                        className="flex-1 md:flex-none btn btn-primary py-2 px-6 text-sm"
                    >
                        {t('common.accept')}
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="md:hidden p-2 text-zinc-400 hover:text-zinc-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
