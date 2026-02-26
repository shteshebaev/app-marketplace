import {
    ArrowRight,
    Users,
    ShoppingCart,
    Truck,
    GraduationCap,
    Dumbbell,
    Warehouse,
    Building2,
    Utensils,
    Star,
    TrendingUp,
    Shield,
    Zap,
    Code2,
} from 'lucide-react';

interface Category {
    id: string;
    name: string;
    icon: React.ReactNode;
    count: number;
    gradient: string;
    size?: 'large' | 'medium' | 'small';
}

const categories: Category[] = [
    { id: 'crm', name: 'CRM-системы', icon: <Users className="w-8 h-8" />, count: 24, gradient: 'from-blue-500 to-blue-600', size: 'large' },
    { id: 'ecommerce', name: 'Интернет-магазины', icon: <ShoppingCart className="w-7 h-7" />, count: 18, gradient: 'from-violet-500 to-purple-600', size: 'medium' },
    { id: 'delivery', name: 'Доставка', icon: <Truck className="w-7 h-7" />, count: 12, gradient: 'from-emerald-500 to-teal-600', size: 'medium' },
    { id: 'education', name: 'Образование', icon: <GraduationCap className="w-6 h-6" />, count: 15, gradient: 'from-amber-500 to-orange-500' },
    { id: 'fitness', name: 'Фитнес', icon: <Dumbbell className="w-6 h-6" />, count: 9, gradient: 'from-rose-500 to-pink-600' },
    { id: 'warehouse', name: 'Склад', icon: <Warehouse className="w-6 h-6" />, count: 11, gradient: 'from-slate-500 to-slate-600' },
    { id: 'realestate', name: 'Недвижимость', icon: <Building2 className="w-6 h-6" />, count: 8, gradient: 'from-cyan-500 to-blue-500' },
    { id: 'food', name: 'HoReCa', icon: <Utensils className="w-6 h-6" />, count: 14, gradient: 'from-orange-500 to-red-500' },
];

interface Solution {
    id: string;
    name: string;
    category: string;
    rating: number;
    reviews: number;
    price: string;
    gradient: string;
}

const popularSolutions: Solution[] = [
    { id: '1', name: 'CRM Pro', category: 'CRM', rating: 4.9, reviews: 128, price: '15 000', gradient: 'from-blue-500 to-indigo-600' },
    { id: '2', name: 'E-Store', category: 'E-commerce', rating: 4.8, reviews: 89, price: '12 000', gradient: 'from-violet-500 to-purple-600' },
    { id: '3', name: 'DeliveryHub', category: 'Логистика', rating: 4.7, reviews: 64, price: '8 000', gradient: 'from-emerald-500 to-teal-600' },
    { id: '4', name: 'EduPlatform', category: 'Образование', rating: 4.8, reviews: 72, price: '10 000', gradient: 'from-amber-500 to-orange-600' },
];

interface HomePageProps {
    onNavigate?: (page: 'home' | 'categories') => void;
    onCategoryClick?: (categoryId: string) => void;
}

export function HomePage({ onNavigate, onCategoryClick }: HomePageProps) {
    return (
        <div className="min-h-[calc(100vh-72px)] bg-[#f8fafc] dark:bg-[#0a0a0f]">
            <div className="max-w-[1400px] mx-auto px-6 py-8">

                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-[32px] bg-[#0f0f1a] p-8 lg:p-10 mb-8">
                    {/* Mesh gradient background */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#3b82f6_0%,_transparent_50%)] opacity-40" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#8b5cf6_0%,_transparent_50%)] opacity-30" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#06b6d4_0%,_transparent_40%)] opacity-20" />

                    <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                            {/* Left side - Text */}
                            <div className="flex-1">
                                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-4 tracking-tight">
                                    Готовые решения<br />
                                    <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">для бизнеса</span>
                                </h1>
                                <p className="text-slate-400 text-lg max-w-md mb-6">
                                    150+ проверенных продуктов для автоматизации и роста
                                </p>
                                <button className="flex items-center gap-3 bg-white text-slate-900 font-semibold px-7 py-3.5 rounded-full hover:bg-slate-100 transition-all shadow-lg shadow-white/10">
                                    Смотреть каталог
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Right side - Stats */}
                            <div className="flex gap-4 lg:gap-6">
                                <div className="text-center">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                                        <TrendingUp className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div className="text-3xl lg:text-4xl font-bold text-white">2.5K</div>
                                    <div className="text-slate-400 text-sm">Клиентов</div>
                                </div>

                                <div className="text-center">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                                        <Shield className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div className="text-3xl lg:text-4xl font-bold text-white">99.9%</div>
                                    <div className="text-slate-400 text-sm">Uptime</div>
                                </div>

                                <div className="text-center">
                                    <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center mx-auto mb-3">
                                        <Zap className="w-6 h-6 text-violet-400" />
                                    </div>
                                    <div className="text-3xl lg:text-4xl font-bold text-white">24/7</div>
                                    <div className="text-slate-400 text-sm">Поддержка</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Development Card */}
                <a
                    href="#order-development"
                    className="block mb-8 relative overflow-hidden rounded-[28px] bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 lg:p-7 cursor-pointer group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/30"
                >
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10" />

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    {/* Background pattern */}
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent" />

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                                <Code2 className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-sm">Заказать разработку</h3>
                                <p className="text-white/80">Индивидуальное решение под ваш бизнес</p>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                            <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </a>

                {/* Categories Section */}
                <section className="mb-8">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Категории решений
                        </h2>
                        <button
                            onClick={() => onNavigate?.('categories')}
                            className="text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1 transition-colors"
                        >
                            Все категории
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                onClick={() => onCategoryClick?.(category.id)}
                            />
                        ))}
                    </div>
                </section>

                {/* Popular Solutions Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Популярные решения
                        </h2>
                        <button className="text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center gap-1 transition-colors">
                            Все решения
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {popularSolutions.map((solution, index) => (
                            <div
                                key={solution.id}
                                className="group relative overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-5 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-900/15 dark:hover:shadow-black/40"
                            >
                                {/* Decorative gradient blob */}
                                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${solution.gradient} opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-opacity`} />

                                <div className="relative flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center text-white text-lg font-bold shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0`}>
                                        {solution.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <h3 className="font-bold text-slate-900 dark:text-white truncate">{solution.name}</h3>
                                            {index === 0 && (
                                                <span className="px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold rounded-full uppercase shadow-sm">Top</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-full">
                                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{solution.rating}</span>
                                            </div>
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">{solution.price} ₽</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}

interface CategoryCardProps {
    category: Category;
    onClick?: () => void;
}

function CategoryCard({ category, onClick }: CategoryCardProps) {
    return (
        <button
            onClick={onClick}
            className={`group relative overflow-hidden rounded-[28px] bg-gradient-to-br ${category.gradient} p-6 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20 text-left w-full`}
        >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/10" />

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Large background icon */}
            <div className="absolute -right-4 -bottom-4 opacity-20 text-white scale-[3.5] group-hover:scale-[4] group-hover:opacity-25 transition-all duration-700">
                {category.icon}
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between min-h-[140px]">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-lg shadow-black/10 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                    {category.icon}
                </div>

                <div>
                    <h3 className="font-bold text-white text-xl mb-1 drop-shadow-sm">
                        {category.name}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-white/80 font-medium">
                            {category.count} решений
                        </span>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                            <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
}
