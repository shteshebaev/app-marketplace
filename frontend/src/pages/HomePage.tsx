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

export function HomePage() {
    return (
        <div className="min-h-[calc(100vh-72px)] bg-[#f8fafc] dark:bg-[#0a0a0f]">
            <div className="max-w-[1400px] mx-auto px-6 py-8">

                {/* Hero Section */}
                <div className="grid grid-cols-12 gap-4 mb-8">
                    {/* Main Hero */}
                    <div className="col-span-12 lg:col-span-7 relative overflow-hidden rounded-[32px] bg-[#0f0f1a] p-8 lg:p-10 min-h-[280px]">
                        {/* Mesh gradient background */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#3b82f6_0%,_transparent_50%)] opacity-40" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#8b5cf6_0%,_transparent_50%)] opacity-30" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#06b6d4_0%,_transparent_40%)] opacity-20" />

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-4 tracking-tight">
                                    Готовые решения<br />
                                    <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">для бизнеса</span>
                                </h1>
                                <p className="text-slate-400 text-lg max-w-md">
                                    150+ проверенных продуктов для автоматизации и роста
                                </p>
                            </div>

                            <button className="self-start flex items-center gap-3 bg-white text-slate-900 font-semibold px-7 py-3.5 rounded-full hover:bg-slate-100 transition-all mt-6 shadow-lg shadow-white/10">
                                Смотреть каталог
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4">
                        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-blue-500 to-blue-600 p-6 flex flex-col justify-between">
                            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                            <TrendingUp className="w-7 h-7 text-white/80" />
                            <div>
                                <div className="text-4xl font-bold text-white">2.5K</div>
                                <div className="text-blue-100">Клиентов</div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-emerald-500 to-teal-600 p-6 flex flex-col justify-between">
                            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                            <Shield className="w-7 h-7 text-white/80" />
                            <div>
                                <div className="text-4xl font-bold text-white">99.9%</div>
                                <div className="text-emerald-100">Uptime</div>
                            </div>
                        </div>

                        <div className="col-span-2 relative overflow-hidden rounded-[24px] bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 p-6 flex items-center justify-between">
                            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                            <div className="flex items-center gap-4">
                                <Zap className="w-8 h-8 text-white/90" />
                                <div>
                                    <div className="text-3xl font-bold text-white">24/7</div>
                                    <div className="text-violet-100">Техническая поддержка</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Development Card */}
                <a
                    href="#order-development"
                    className="block mb-8 relative overflow-hidden rounded-[28px] bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 lg:p-8 cursor-pointer group hover:shadow-2xl hover:shadow-orange-500/20 transition-all"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_#fff_0%,_transparent_70%)] opacity-10" />
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-lg">
                                <Code2 className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">Заказать разработку</h3>
                                <p className="text-white/80">Индивидуальное решение под ваш бизнес</p>
                            </div>
                        </div>
                        <ArrowRight className="w-8 h-8 text-white/80 group-hover:translate-x-2 transition-transform" />
                    </div>
                </a>

                {/* Categories Section */}
                <section className="mb-8">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Категории решений
                        </h2>
                        <a href="#all" className="text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1">
                            Все категории
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </section>

                {/* Popular Solutions Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Популярные решения
                        </h2>
                        <a href="#all" className="text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center gap-1">
                            Все решения
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {popularSolutions.map((solution) => (
                            <div
                                key={solution.id}
                                className="group relative overflow-hidden rounded-[20px] bg-white dark:bg-slate-900/80 p-5 cursor-pointer transition-all hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 border border-slate-200/80 dark:border-slate-800 hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center text-white font-bold shadow-md flex-shrink-0`}>
                                        {solution.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-slate-900 dark:text-white truncate">{solution.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{solution.rating}</span>
                                            </div>
                                            <span className="text-slate-300 dark:text-slate-600">•</span>
                                            <span className="text-sm font-semibold text-slate-900 dark:text-white">{solution.price} ₽</span>
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
}

function CategoryCard({ category }: CategoryCardProps) {
    return (
        <a
            href={`#category-${category.id}`}
            className="group relative overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950 p-5 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/30"
        >
            {/* Colored gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80`} />

            {/* Mesh pattern overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.15)_0%,_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(0,0,0,0.3)_0%,_transparent_60%)]" />

            {/* Large background icon */}
            <div className="absolute -right-3 -bottom-3 opacity-[0.15] text-white scale-[3] group-hover:scale-[3.3] group-hover:opacity-20 transition-all duration-500">
                {category.icon}
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between min-h-[120px]">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg shadow-black/10">
                    {category.icon}
                </div>

                <div>
                    <h3 className="font-bold text-white text-[17px] mb-0.5 drop-shadow-sm">
                        {category.name}
                    </h3>
                    <span className="text-sm text-white/80 font-medium">
                        {category.count} решений
                    </span>
                </div>
            </div>
        </a>
    );
}
