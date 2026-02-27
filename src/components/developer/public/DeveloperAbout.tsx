import { Mail, Phone, MapPin, Globe, MessageCircle, Linkedin, Github, Building2 } from 'lucide-react';
import type { Developer } from '../../../types/developer';

interface DeveloperAboutProps {
    developer: Developer;
}

export function DeveloperAbout({ developer }: DeveloperAboutProps) {
    const socialLinks = [
        {
            key: 'website',
            label: 'Сайт',
            url: developer.socialLinks.website,
            icon: <Globe className="w-5 h-5" />,
            color: 'text-blue-500'
        },
        {
            key: 'telegram',
            label: 'Telegram',
            url: developer.socialLinks.telegram,
            icon: <MessageCircle className="w-5 h-5" />,
            color: 'text-sky-500'
        },
        {
            key: 'linkedin',
            label: 'LinkedIn',
            url: developer.socialLinks.linkedin,
            icon: <Linkedin className="w-5 h-5" />,
            color: 'text-blue-600'
        },
        {
            key: 'github',
            label: 'GitHub',
            url: developer.socialLinks.github,
            icon: <Github className="w-5 h-5" />,
            color: 'text-slate-700 dark:text-slate-300'
        }
    ].filter(link => link.url);

    return (
        <section className="py-10 sm:py-16 lg:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Contact Card - First on mobile, last on desktop */}
                    <div className="order-first lg:order-last lg:col-span-1">
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:sticky lg:top-24">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 sm:mb-6">
                                Контакты
                            </h3>

                            <div className="space-y-4 sm:space-y-5">
                                {/* Email */}
                                <a
                                    href={`mailto:${developer.contact.email}`}
                                    className="flex items-start gap-3 sm:gap-4 group"
                                >
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Email</div>
                                        <div className="text-sm sm:text-base text-slate-900 dark:text-white font-medium group-hover:text-blue-500 transition-colors truncate">
                                            {developer.contact.email}
                                        </div>
                                    </div>
                                </a>

                                {/* Phone */}
                                {developer.contact.phone && (
                                    <a
                                        href={`tel:${developer.contact.phone.replace(/[^\d+]/g, '')}`}
                                        className="flex items-start gap-3 sm:gap-4 group"
                                    >
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </div>
                                        <div>
                                            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Телефон</div>
                                            <div className="text-sm sm:text-base text-slate-900 dark:text-white font-medium group-hover:text-emerald-500 transition-colors">
                                                {developer.contact.phone}
                                            </div>
                                        </div>
                                    </a>
                                )}

                                {/* Address */}
                                {developer.contact.address && (
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400 flex-shrink-0">
                                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </div>
                                        <div>
                                            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Адрес</div>
                                            <div className="text-sm sm:text-base text-slate-900 dark:text-white font-medium">
                                                {developer.contact.address}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Social Links */}
                            {socialLinks.length > 0 && (
                                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-200 dark:border-slate-700">
                                    <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3 sm:mb-4">Мы в сети</div>
                                    <div className="flex flex-wrap gap-2 sm:gap-3">
                                        {socialLinks.map((link) => (
                                            <a
                                                key={link.key}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-slate-700 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium ${link.color} hover:scale-105 transition-all shadow-sm`}
                                            >
                                                {link.icon}
                                                <span className="hidden sm:inline">{link.label}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* About Text */}
                    <div className="order-last lg:order-first lg:col-span-2">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                            О компании
                        </h2>

                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            {developer.aboutCompany.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Company Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-10 pt-6 sm:pt-10 border-t border-slate-200 dark:border-slate-800">
                            {developer.foundedYear && (
                                <div className="text-center sm:text-left">
                                    <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                                        {new Date().getFullYear() - developer.foundedYear}+
                                    </div>
                                    <div className="text-xs sm:text-sm text-slate-500">лет на рынке</div>
                                </div>
                            )}
                            <div className="text-center sm:text-left">
                                <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                                    {developer.productsCount}
                                </div>
                                <div className="text-xs sm:text-sm text-slate-500">решений</div>
                            </div>
                            <div className="text-center sm:text-left">
                                <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                                    {developer.clientsCount}+
                                </div>
                                <div className="text-xs sm:text-sm text-slate-500">клиентов</div>
                            </div>
                            {developer.employeesCount && (
                                <div className="text-center sm:text-left">
                                    <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                                        {developer.employeesCount}
                                    </div>
                                    <div className="text-xs sm:text-sm text-slate-500">сотрудников</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
