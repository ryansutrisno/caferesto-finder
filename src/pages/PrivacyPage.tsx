import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield } from 'lucide-react';

const PrivacyPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white min-h-screen py-16">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-8 h-8 text-brown-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-zinc-900 mb-4">{t('privacy.title')}</h1>
                    <p className="text-zinc-500">{t('privacy.lastUpdated')}: 01 Feb 2026</p>
                </div>

                <div className="prose prose-brown max-w-none">
                    <p className="text-lg text-zinc-600 leading-relaxed mb-8">
                        {t('privacy.intro')}
                    </p>

                    <h3 className="text-xl font-bold text-zinc-900 mb-4">{t('privacy.collectTitle')}</h3>
                    <p className="text-zinc-600 mb-8">
                        {t('privacy.collectDesc')}
                    </p>

                    <h3 className="text-xl font-bold text-zinc-900 mb-4">{t('privacy.useTitle')}</h3>
                    <p className="text-zinc-600 mb-8">
                        {t('privacy.useDesc')}
                    </p>

                    <h3 className="text-xl font-bold text-zinc-900 mb-4">{t('privacy.cookiesTitle')}</h3>
                    <p className="text-zinc-600 mb-8">
                        {t('privacy.cookiesDesc')}
                    </p>

                    <h3 className="text-xl font-bold text-zinc-900 mb-4">{t('privacy.securityTitle')}</h3>
                    <p className="text-zinc-600 mb-8">
                        {t('privacy.securityDesc')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
