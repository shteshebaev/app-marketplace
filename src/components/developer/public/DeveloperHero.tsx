import { BadgeCheck, Star, Users, Package, Calendar, MapPin, Globe, Send } from 'lucide-react';
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

            <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        {developer.logo ? (
                            <img
                                src={developer.logo}
                                alt={developer.companyName}
                                className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl object-cover shadow-2xl ring-4 ring-white/10"
                            />
                        ) : (
                            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl ring-4 ring-white/10">
                                <span className="text-5xl lg:text-6xl font-bold text-white">
                                    {developer.companyName.charAt(0)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        {/* Name & Badge */}
                        <div className="flex items-center gap-3 mb-4">
                            <h1 className="text-3xl lg:text-4xl font-bold text-white">
                                {developer.companyName}
                            </h1>
                            {developer.isVerified && (
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 rounded-full">
                                    <BadgeCheck className="w-5 h-5 text-blue-400" />
                                    <span className="text-sm font-medium text-blue-300">Verified</span>
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-lg text-slate-300 mb-6 max-w-2xl">
                            {developer.description}
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap items-center gap-6 mb-8">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                    <span className="text-xl font-bold text-white">{developer.rating}</span>
                                </div>
                                <span className="text-slate-400">({developer.reviewsCount} отзывов)</span>
                            </div>

                            <div className="w-px h-6 bg-slate-700" />

                            <div className="flex items-center gap-2 text-slate-300">
                                <Package className="w-5 h-5 text-slate-400" />
                                <span className="font-semibold text-white">{developer.productsCount}</span>
                                <span>решений</span>
                            </div>

                            <div className="w-px h-6 bg-slate-700" />

                            <div className="flex items-center gap-2 text-slate-300">
                                <Users className="w-5 h-5 text-slate-400" />
                                <span className="font-semibold text-white">{formatNumber(developer.clientsCount)}</span>
                                <span>клиентов</span>
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                            {developer.foundedYear && (
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    С {developer.foundedYear} года
                                </span>
                            )}

                            {developer.contact.address && (
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4" />
                                    {developer.contact.address}
                                </span>
                            )}

                            {developer.socialLinks.website && (
                                <a
                                    href={developer.socialLinks.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
                                >
                                    <Globe className="w-4 h-4" />
                                    Сайт
                                </a>
                            )}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col gap-3 w-full lg:w-auto">
                        <button
                            onClick={onContact}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                        >
                            <Send className="w-5 h-5" />
                            Связаться
                        </button>

                        {developer.socialLinks.telegram && (
                            <a
                                href={developer.socialLinks.telegram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all"
                            >
                                Telegram
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
