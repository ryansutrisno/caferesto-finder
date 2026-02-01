import React from 'react';
import { useTranslation } from 'react-i18next';
import { Coffee, Target } from 'lucide-react';

const AboutPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-cream-50 min-h-screen py-16">
            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-zinc-900 mb-4">{t('about.title')}</h1>
                    <p className="text-xl text-zinc-600 max-w-2xl mx-auto">{t('about.subtitle')}</p>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-brown-100">
                        <div className="w-12 h-12 bg-brown-100 rounded-full flex items-center justify-center mb-6">
                            <Target className="w-6 h-6 text-brown-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-900 mb-4">{t('about.missionTitle')}</h2>
                        <p className="text-zinc-600 leading-relaxed">
                            {t('about.missionDesc')}
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-brown-100">
                        <div className="w-12 h-12 bg-brown-100 rounded-full flex items-center justify-center mb-6">
                            <Coffee className="w-6 h-6 text-brown-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-900 mb-4">{t('about.visionTitle')}</h2>
                        <p className="text-zinc-600 leading-relaxed">
                            {t('about.visionDesc')}
                        </p>
                    </div>
                </div>

                {/* Team Section */}
                <div className="text-center">
                    <h2 className="text-3xl font-heading font-bold text-zinc-900 mb-12">{t('about.teamTitle')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-24 h-24 bg-zinc-200 rounded-full mx-auto mb-4 overflow-hidden">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item}`}
                                        alt="Team Member"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="font-bold text-lg text-zinc-900">Team Member {item}</h3>
                                <p className="text-brown-500 text-sm">Co-Founder</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
