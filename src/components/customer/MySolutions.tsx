import { Link } from 'react-router-dom';
import { ExternalLink, Settings, MoreHorizontal, Plus, Package } from 'lucide-react';
import { mockSubscriptions } from './mockData';
import { subscriptionStatusMap } from '../../types';

export function MySolutions() {
    // Only show active subscriptions as "my solutions"
    const activeSolutions = mockSubscriptions.filter(s => s.status === 'ACTIVE');

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Мои продукты
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Активные подписки и доступы
                    </p>
                </div>
                <Link
                    to="/solutions"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Добавить</span>
                </Link>
            </div>

            {/* Solutions Grid */}
            {activeSolutions.length > 0 ? (
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeSolutions.map((solution) => {
                        const statusInfo = subscriptionStatusMap[solution.status];

                        return (
                            <div
                                key={solution.id}
                                className="group relative bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Logo */}
                                    <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 overflow-hidden shrink-0">
                                        {solution.productLogo ? (
                                            <img
                                                src={solution.productLogo}
                                                alt={solution.productName}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                <span className="text-xl font-bold">
                                                    {solution.productName.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                                                    {solution.productName}
                                                </h3>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                                    {solution.developerName}
                                                </p>
                                            </div>
                                            <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Status & Price */}
                                        <div className="flex items-center gap-3 mt-3">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                                                {statusInfo.label}
                                            </span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                                {solution.price}/{solution.billingPeriod === 'monthly' ? 'мес' : solution.billingPeriod === 'yearly' ? 'год' : ''}
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 mt-3">
                                            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors">
                                                <ExternalLink className="w-3.5 h-3.5" />
                                                Открыть
                                            </button>
                                            <Link
                                                to={`/dashboard/subscriptions/${solution.id}`}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                                            >
                                                <Settings className="w-3.5 h-3.5" />
                                                Управление
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="p-10 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        <Package className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                        Нет активных продуктов
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        Подключите первое решение из каталога
                    </p>
                    <Link
                        to="/solutions"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Перейти в каталог
                    </Link>
                </div>
            )}

            {/* View All Link */}
            {activeSolutions.length > 0 && (
                <div className="px-5 pb-5">
                    <Link
                        to="/dashboard/solutions"
                        className="block w-full text-center py-3 text-sm font-medium text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-colors"
                    >
                        Смотреть все продукты
                    </Link>
                </div>
            )}
        </div>
    );
}
