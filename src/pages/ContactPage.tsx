import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const subject = `Message from ${formData.name} via CafeFinder`;
        const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;

        window.location.href = `mailto:support@cafefinder.com?subject=${subject}&body=${body}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-cream-50 min-h-screen py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-zinc-900 mb-4">{t('contact.title')}</h1>
                    <p className="text-xl text-zinc-600 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-brown-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-brown-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-zinc-900 mb-2">{t('contact.addressTitle')}</h3>
                                    <p className="text-zinc-600">
                                        Jl. Jendral Sudirman No. 1<br />
                                        Jakarta Pusat, 10220<br />
                                        Indonesia
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-brown-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-brown-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-zinc-900 mb-2">{t('contact.emailTitle')}</h3>
                                    <p className="text-zinc-600">support@cafefinder.com</p>
                                    <p className="text-zinc-600">business@cafefinder.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-xl shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-2">{t('contact.formName')}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brown-500/20 focus:border-brown-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-2">{t('contact.formEmail')}</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brown-500/20 focus:border-brown-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-2">{t('contact.formMessage')}</label>
                                <textarea
                                    rows={4}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brown-500/20 focus:border-brown-500 resize-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full btn btn-primary py-3 flex items-center justify-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                {t('contact.send')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
