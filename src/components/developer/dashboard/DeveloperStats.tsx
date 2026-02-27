import { Eye, MousePointer, MessageSquare, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { mockDeveloperStats } from '../mockData';

interface DeveloperStatsProps {
    onNavigate?: (page: string) => void;
}

export function DeveloperStats({ onNavigate: _onNavigate }: DeveloperStatsProps) {
    const stats = mockDeveloperStats;

    const mainStats = [
        {
            label: 'Всего просмотров',
            value: stats.totalViews.toLocaleString(),
            icon: <Eye className="w-5 h-5" />,
            trend: '+18%',
            trendUp: true,
            color: 'blue'
        },
        {
            label: 'Переходы',
            value: stats.totalClicks.toLocaleString(),
            icon: <MousePointer className="w-5 h-5" />,
            trend: '+12%',
            trendUp: true,
            color: 'violet'
        },
        {
            label: 'Заявки',
            value: stats.totalInquiries.toLocaleString(),
            icon: <MessageSquare className="w-5 h-5" />,
            trend: '+25%',
            trendUp: true,
            color: 'emerald'
        },
        {
            label: 'CTR',
            value: `${stats.ctr}%`,
            icon: <TrendingUp className="w-5 h-5" />,
            trend: '-2%',
            trendUp: false,
            color: 'amber'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Статистика
                </h1>
                <p className="text-slate-500 mt-1">
                    Отслеживайте эффективность ваших решений
                </p>
            </div>

            {/* Period Selector */}
            <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-slate-400" />
                <select className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500">
                    <option>Последние 7 дней</option>
                    <option>Последние 30 дней</option>
                    <option>Последние 90 дней</option>
                    <option>За все время</option>
                </select>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mainStats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-500/20 flex items-center justify-center text-${stat.color}-600 dark:text-${stat.color}-400`}>
                                {stat.icon}
                            </div>
                            <span className={`flex items-center gap-1 text-sm font-medium ${stat.trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
                                {stat.trendUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
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

            {/* Chart Placeholder */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                    Просмотры по дням
                </h2>
                <div className="h-64 flex items-end justify-between gap-2">
                    {stats.viewsByDay.map((day) => {
                        const maxViews = Math.max(...stats.viewsByDay.map(d => d.views));
                        const height = (day.views / maxViews) * 100;

                        return (
                            <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500"
                                    style={{ height: `${height}%` }}
                                />
                                <span className="text-xs text-slate-400">
                                    {new Date(day.date).toLocaleDateString('ru-RU', { weekday: 'short' })}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Top Products */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                    Популярные решения
                </h2>
                <div className="space-y-4">
                    {stats.topProducts.map((product, index) => {
                        const maxViews = stats.topProducts[0].views;
                        const width = (product.views / maxViews) * 100;

                        return (
                            <div key={product.id} className="flex items-center gap-4">
                                <span className="w-6 text-center text-sm font-medium text-slate-400">
                                    {index + 1}
                                </span>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-slate-900 dark:text-white">
                                            {product.name}
                                        </span>
                                        <span className="text-sm text-slate-500">
                                            {product.views.toLocaleString()} просмотров
                                        </span>
                                    </div>
                                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                                            style={{ width: `${width}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
