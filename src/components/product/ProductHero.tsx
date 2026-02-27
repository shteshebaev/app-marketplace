import {
    Star,
    Users,
    Play,
    ArrowRight,
    Building,
    ShoppingCart,
    Truck,
    GraduationCap,
    Target,
    Headphones,
    Briefcase,
    Rocket,
    Home,
    Phone,
    Zap,
    Package,
    MapPin,
    Warehouse,
    Box,
    BookOpen,
    Smile,
    ShoppingBag
} from 'lucide-react';
import type { SolutionProfile } from './types';

interface ProductHeroProps {
    profile: SolutionProfile;
    onConnect?: () => void;
    onDemo?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
    building: <Building className="w-10 h-10" />,
    users: <Users className="w-10 h-10" />,
    'shopping-cart': <ShoppingCart className="w-10 h-10" />,
    truck: <Truck className="w-10 h-10" />,
    'graduation-cap': <GraduationCap className="w-10 h-10" />,
    target: <Target className="w-10 h-10" />,
    headphones: <Headphones className="w-10 h-10" />,
    briefcase: <Briefcase className="w-10 h-10" />,
    rocket: <Rocket className="w-10 h-10" />,
    home: <Home className="w-10 h-10" />,
    phone: <Phone className="w-10 h-10" />,
    zap: <Zap className="w-10 h-10" />,
    package: <Package className="w-10 h-10" />,
    'map-pin': <MapPin className="w-10 h-10" />,
    warehouse: <Warehouse className="w-10 h-10" />,
    box: <Box className="w-10 h-10" />,
    'book-open': <BookOpen className="w-10 h-10" />,
    smile: <Smile className="w-10 h-10" />,
    'shopping-bag': <ShoppingBag className="w-10 h-10" />,
};

const badgeLabels: Record<string, { text: string; className: string }> = {
    top: { text: 'TOP', className: 'bg-gradient-to-r from-amber-400 to-orange-500' },
    'best-value': { text: 'Лучшая цена', className: 'bg-gradient-to-r from-emerald-400 to-teal-500' },
    new: { text: 'Новинка', className: 'bg-gradient-to-r from-blue-400 to-cyan-500' },
    enterprise: { text: 'Enterprise', className: 'bg-gradient-to-r from-violet-500 to-purple-600' },
    'small-business': { text: 'Для малого бизнеса', className: 'bg-gradient-to-r from-pink-400 to-rose-500' }
};

export function ProductHero({ profile, onConnect, onDemo }: ProductHeroProps) {
    const badge = profile.badge ? badgeLabels[profile.badge] : null;

    return (
        <section
            data-section="overview"
            className="relative overflow-hidden"
        >
            {/* Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${profile.gradient} opacity-90`} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.3)_0%,_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,0,0,0.2)_0%,_transparent_50%)]" />

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
                <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
                    {/* Left - Content */}
                    <div className="flex-1 lg:max-w-xl">
                        {/* Badge */}
                        {badge && (
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg mb-6 ${badge.className}`}>
                                {badge.text}
                            </span>
                        )}

                        {/* Logo & Name */}
                        <div className="flex items-center gap-5 mb-6">
                            <div className={`w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-white shadow-2xl`}>
                                {iconMap[profile.logo] || <Building className="w-10 h-10" />}
                            </div>
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-white drop-shadow-sm">
                                    {profile.name}
                                </h1>
                                <p className="text-white/80 text-lg">
                                    {profile.targetAudience}
                                </p>
                            </div>
                        </div>

                        {/* Tagline */}
                        <p className="text-xl lg:text-2xl text-white/90 font-medium mb-6 leading-relaxed">
                            {profile.tagline}
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap items-center gap-4 mb-8">
                            {/* Rating */}
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                <span className="text-white font-bold">{profile.rating}</span>
                                <span className="text-white/70">({profile.reviewsCount} отзывов)</span>
                            </div>

                            {/* Clients */}
                            {profile.clientsCount && (
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                                    <Users className="w-5 h-5 text-white/80" />
                                    <span className="text-white font-bold">{profile.clientsCount.toLocaleString()}+</span>
                                    <span className="text-white/70">клиентов</span>
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {profile.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-sm text-white/90 font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-3xl lg:text-4xl font-bold text-white">
                                {profile.priceType === 'from' ? 'от ' : ''}{profile.price === '0' ? 'Бесплатно' : `${profile.price} ₽`}
                            </span>
                            {profile.price !== '0' && profile.priceType !== 'custom' && (
                                <span className="text-white/70 text-lg">
                                    / {profile.priceType === 'monthly' ? 'мес' : profile.priceType === 'yearly' ? 'год' : ''}
                                </span>
                            )}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onConnect}
                                className="flex items-center justify-center gap-3 bg-white text-slate-900 font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            >
                                {profile.ctaPrimary.text}
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            {profile.demo && (
                                <button
                                    onClick={onDemo}
                                    className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                >
                                    <Play className="w-5 h-5" />
                                    Смотреть демо
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right - Preview Image Placeholder */}
                    <div className="flex-1 lg:flex-none lg:w-[500px]">
                        <div className={`relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${profile.heroImage?.gradient || 'from-white/20 to-white/5'} backdrop-blur-xl border border-white/20`}>
                            {/* Placeholder content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60 p-8">
                                <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                                    {iconMap[profile.logo] || <Building className="w-12 h-12" />}
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-medium text-white/80 mb-2">Превью интерфейса</p>
                                    <p className="text-sm text-white/50">{profile.name}</p>
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-red-400" />
                            <div className="absolute top-4 left-9 w-3 h-3 rounded-full bg-amber-400" />
                            <div className="absolute top-4 left-14 w-3 h-3 rounded-full bg-emerald-400" />

                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
