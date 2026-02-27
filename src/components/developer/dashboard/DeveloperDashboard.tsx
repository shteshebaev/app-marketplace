import { Package, Eye, MousePointer, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import { useAuth } from '../../../context';

interface DeveloperDashboardProps {
    onNavigate: (page: string) => void;
}

export function DeveloperDashboard({ onNavigate }: DeveloperDashboardProps) {
    const { developer } = useAuth();

    const stats = [
        {
            label: 'Всего решений',
            value: developer?.productsCount || 0,
            icon: <Package className="w-5 h-5" />,
            color: 'blue',
            trend: '+2 за месяц'
        },
        {
            label: 'Просмотры',
            value: '12.5K',
            icon: <Eye className="w-5 h-5" />,
            color: 'emerald',
            trend: '+18%'
        },
        {
            label: 'Переходы',
            value: '1.2K',
            icon: <MousePointer className="w-5 h-5" />,
            color: 'violet',
            trend: '+12%'
        },
        {
            label: 'Рейтинг',
            value: developer?.rating || 0,
            icon: <TrendingUp className="w-5 h-5" />,
            color: 'amber',
            trend: '+0.2'
        },
    ];

    const recentProducts = [
        { id: '1', name: 'CRM Pro Enterprise', status: 'approved', views: 5420 },
        { id: '2', name: 'CRM Lite', status: 'draft', views: 0 },
        { id: '3', name: 'CRM Mobile', status: 'pending', views: 0 },
    ];

    const statusColors: Record<string, string> = {
        draft: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
        pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
        approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
        rejected: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
    };

    const statusLabels: Record<string, string> = {
        draft: 'Черновик',
        pending: 'На проверке',
        approved: 'Опубликовано',
        rejected: 'Отклонено',
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Добро пожаловать, {developer?.companyName}!
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Управляйте своими решениями и отслеживайте статистику
                    </p>
                </div>
                <button
                    onClick={() => onNavigate('create')}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Создать решение
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-500/20 flex items-center justify-center text-${stat.color}-600 dark:text-${stat.color}-400`}>
                                {stat.icon}
                            </div>
                            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                                {stat.trend}
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                            {stat.value}
                        </div>
                        <div className="text-sm text-slate-500">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Products */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Мои решения
                    </h2>
                    <button
                        onClick={() => onNavigate('products')}
                        className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1"
                    >
                        Все решения
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {recentProducts.map((product) => (
                        <div
                            key={product.id}
                            className="flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                                    {product.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-medium text-slate-900 dark:text-white">
                                        {product.name}
                                    </h3>
                                    <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium mt-1 ${statusColors[product.status]}`}>
                                        {statusLabels[product.status]}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-slate-900 dark:text-white font-medium">
                                    {product.views.toLocaleString()}
                                </div>
                                <div className="text-sm text-slate-500">просмотров</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                    onClick={() => onNavigate('create')}
                    className="group bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-left hover:shadow-xl transition-all"
                >
                    <Plus className="w-10 h-10 text-white/80 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                        Создать решение
                    </h3>
                    <p className="text-white/70">
                        Добавьте новый продукт в каталог
                    </p>
                </button>

                <button
                    onClick={() => onNavigate('company')}
                    className="group bg-white dark:bg-slate-800 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700"
                >
                    <Package className="w-10 h-10 text-slate-400 mb-4 group-hover:scale-110 group-hover:text-blue-500 transition-all" />
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        Профиль компании
                    </h3>
                    <p className="text-slate-500">
                        Обновите информацию о компании
                    </p>
                </button>

                <button
                    onClick={() => onNavigate('stats')}
                    className="group bg-white dark:bg-slate-800 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700"
                >
                    <TrendingUp className="w-10 h-10 text-slate-400 mb-4 group-hover:scale-110 group-hover:text-emerald-500 transition-all" />
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        Статистика
                    </h3>
                    <p className="text-slate-500">
                        Анализируйте показатели
                    </p>
                </button>
            </div>
        </div>
    );
}
