import { BadgeCheck, Star, Users, Package, Calendar, MapPin, Globe, Send, MessageCircle } from 'lucide-react';
import type { Developer } from '../../../types/developer';

interface DeveloperHeroProps {
    developer: Developer;
    onContact?: () => void;
}

export function DeveloperHero({ developer, onContact }: DeveloperHeroProps) {
    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toString();
    };

    return (
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)'
                }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-24">
                {/* Mobile: Logo centered */}
                <div className="flex flex-col items-center text-center lg:text-left lg:flex-row lg:items-start gap-6 lg:gap-12">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        {developer.logo ? (
                            <img
                                src={developer.logo}
                                alt={developer.companyName}
                                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-2xl sm:rounded-3xl object-cover shadow-2xl ring-4 ring-white/10"
                            />
                        ) : (
                            <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl ring-4 ring-white/10">
                                <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                                    {developer.companyName.charAt(0)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        {/* Name & Badge */}
                        <div className="flex flex-col sm:flex-row items-center lg:items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                                {developer.companyName}
                            </h1>
                            {developer.isVerified && (
                                <span className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-blue-500/20 rounded-full flex-shrink-0">
                                    <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                                    <span className="text-xs sm:text-sm font-medium text-blue-300">Verified</span>
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-base sm:text-lg text-slate-300 mb-5 sm:mb-6 max-w-2xl mx-auto lg:mx-0">
                            {developer.description}
                        </p>

                        {/* Stats - Grid on mobile */}
                        <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-6 mb-6 sm:mb-8 justify-center lg:justify-start">
                            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400" />
                                    <span className="text-lg sm:text-xl font-bold text-white">{developer.rating}</span>
                                </div>
                                <span className="text-xs sm:text-sm text-slate-400">({developer.reviewsCount})</span>
                            </div>

                            <div className="hidden sm:block w-px h-6 bg-slate-700" />

                            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-slate-300">
                                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                                <span className="text-lg sm:text-xl font-semibold text-white">{developer.productsCount}</span>
                                <span className="text-xs sm:text-sm">решений</span>
                            </div>

                            <div className="hidden sm:block w-px h-6 bg-slate-700" />

                            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-slate-300">
                                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                                <span className="text-lg sm:text-xl font-semibold text-white">{formatNumber(developer.clientsCount)}</span>
                                <span className="text-xs sm:text-sm">клиентов</span>
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400">
                            {developer.foundedYear && (
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    С {developer.foundedYear} года
                                </span>
                            )}

                            {developer.contact.address && (
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <span className="max-w-[150px] sm:max-w-none truncate">{developer.contact.address}</span>
                                </span>
                            )}

                            {developer.socialLinks.website && (
                                <a
                                    href={developer.socialLinks.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
                                >
                                    <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    Сайт
                                </a>
                            )}
                        </div>
                    </div>

                    {/* CTA - Full width on mobile */}
                    <div className="flex flex-col gap-3 w-full sm:w-auto mt-4 lg:mt-0">
                        <button
                            onClick={onContact}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-sm sm:text-base"
                        >
                            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                            Связаться
                        </button>

                        {developer.socialLinks.telegram && (
                            <a
                                href={developer.socialLinks.telegram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-white/10 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-semibold hover:bg-white/20 transition-all text-sm sm:text-base"
                            >
                                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                Telegram
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
