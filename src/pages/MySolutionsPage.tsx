import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ExternalLink,
    Settings,
    Plus,
    Search,
    Grid,
    List,
    Calendar,
    RefreshCw,
    Package,
    ChevronRight,
    MoreHorizontal,
    X,
    CreditCard,
    AlertTriangle,
    Building2
} from 'lucide-react';
import { mockSubscriptions } from '../components/customer/mockData';
import { subscriptionStatusMap } from '../types';
import type { Subscription } from '../types';

type ViewMode = 'grid' | 'list';

interface SolutionDetailModalProps {
    solution: Subscription | null;
    onClose: () => void;
}

function SolutionDetailModal({ solution, onClose }: SolutionDetailModalProps) {
    if (!solution) return null;

    const statusInfo = subscriptionStatusMap[solution.status];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getDaysUntil = (dateString: string) => {
        const now = new Date();
        const date = new Date(dateString);
        return Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-x-4 top-[5%] bottom-[5%] md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg md:max-h-[85vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                        Детали решения
                    </h3>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Solution Info */}
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 overflow-hidden">
                            {solution.productLogo ? (
                                <img
                                    src={solution.productLogo}
                                    alt={solution.productName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xl font-bold">
                                    {solution.productName.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-lg text-slate-900 dark:text-white">
                                {solution.productName}
                            </h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {solution.developerName}
                            </p>
                            <span className={`inline-flex items-center px-2 py-0.5 mt-2 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                                {statusInfo.label}
                            </span>
                        </div>
                    </div>

                    {/* Warning for expiring */}
                    {solution.status === 'ACTIVE' && solution.nextPaymentDate && getDaysUntil(solution.nextPaymentDate) <= 7 && (
                        <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-amber-800 dark:text-amber-300">
                                        Подписка скоро истекает
                                    </h4>
                                    <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                                        Следующий платёж {formatDate(solution.nextPaymentDate)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Details */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                <Package className="w-4 h-4" />
                                <span>Тариф</span>
                            </div>
                            <span className="font-medium text-slate-900 dark:text-white">
                                {solution.planName}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                <CreditCard className="w-4 h-4" />
                                <span>Стоимость</span>
                            </div>
                            <span className="font-medium text-slate-900 dark:text-white">
                                {solution.price}/{solution.billingPeriod === 'monthly' ? 'мес' : 'год'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                <Calendar className="w-4 h-4" />
                                <span>Подключено</span>
                            </div>
                            <span className="font-medium text-slate-900 dark:text-white">
                                {formatDate(solution.startDate)}
                            </span>
                        </div>
                        {solution.nextPaymentDate && (
                            <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                    <RefreshCw className="w-4 h-4" />
                                    <span>Следующий платёж</span>
                                </div>
                                <span className="font-medium text-slate-900 dark:text-white">
                                    {formatDate(solution.nextPaymentDate)}
                                </span>
                            </div>
                        )}
                        <div className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                <Building2 className="w-4 h-4" />
                                <span>Разработчик</span>
                            </div>
                            <span className="font-medium text-slate-900 dark:text-white">
                                {solution.developerName}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                <RefreshCw className="w-4 h-4" />
                                <span>Автопродление</span>
                            </div>
                            <span className={`font-medium ${solution.autoRenew ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                                {solution.autoRenew ? 'Включено' : 'Выключено'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex gap-3">
                    {solution.status === 'ACTIVE' && (
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
                            <ExternalLink className="w-5 h-5" />
                            Открыть решение
                        </button>
                    )}
                    <Link
                        to={`/dashboard/subscriptions/${solution.id}`}
                        onClick={onClose}
                        className="px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
                    >
                        <Settings className="w-5 h-5" />
                        <span className="hidden sm:inline">Управление</span>
                    </Link>
                </div>
            </div>
        </>
    );
}

export function MySolutionsPage() {
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSolution, setSelectedSolution] = useState<Subscription | null>(null);

    // Only show active subscriptions as "my solutions"
    const activeSolutions = mockSubscriptions.filter(s =>
        s.status === 'ACTIVE' &&
        (searchQuery === '' ||
            s.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.developerName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Мои продукты
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        {activeSolutions.length} активных продуктов
                    </p>
                </div>
                <Link
                    to="/catalog"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Добавить решение
                </Link>
            </div>

            {/* Search & View Toggle */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Поиск по названию..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${
                            viewMode === 'grid'
                                ? 'bg-blue-500 text-white'
                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                        }`}
                    >
                        <Grid className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${
                            viewMode === 'list'
                                ? 'bg-blue-500 text-white'
                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                        }`}
                    >
                        <List className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Solutions */}
            {activeSolutions.length > 0 ? (
                viewMode === 'grid' ? (
                    /* Grid View */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activeSolutions.map((solution) => {
                            const statusInfo = subscriptionStatusMap[solution.status];

                            return (
                                <div
                                    key={solution.id}
                                    className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500/50 transition-all cursor-pointer"
                                    onClick={() => setSelectedSolution(solution)}
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 overflow-hidden">
                                            {solution.productLogo ? (
                                                <img
                                                    src={solution.productLogo}
                                                    alt={solution.productName}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-lg font-bold">
                                                    {solution.productName.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedSolution(solution);
                                            }}
                                            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Info */}
                                    <div className="mt-4">
                                        <h3 className="font-semibold text-slate-900 dark:text-white">
                                            {solution.productName}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                            {solution.developerName}
                                        </p>
                                    </div>

                                    {/* Meta */}
                                    <div className="flex items-center gap-3 mt-4">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                                            {statusInfo.label}
                                        </span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            {solution.planName}
                                        </span>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                        <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{formatDate(solution.startDate)}</span>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                            {solution.price}
                                        </span>
                                    </div>

                                    {/* Actions - visible on hover */}
                                    <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Открыть
                                        </button>
                                        <Link
                                            to={`/dashboard/subscriptions/${solution.id}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex items-center justify-center px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                        >
                                            <Settings className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* List View */
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="divide-y divide-slate-200 dark:divide-slate-700">
                            {activeSolutions.map((solution) => {
                                const statusInfo = subscriptionStatusMap[solution.status];

                                return (
                                    <div
                                        key={solution.id}
                                        className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                                        onClick={() => setSelectedSolution(solution)}
                                    >
                                        {/* Logo */}
                                        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 overflow-hidden shrink-0">
                                            {solution.productLogo ? (
                                                <img
                                                    src={solution.productLogo}
                                                    alt={solution.productName}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">
                                                    {solution.productName.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-slate-900 dark:text-white truncate">
                                                {solution.productName}
                                            </h4>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                                {solution.developerName} • {solution.planName}
                                            </p>
                                        </div>

                                        {/* Meta */}
                                        <div className="hidden md:flex items-center gap-6">
                                            <div className="min-w-[100px]">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </div>
                                            <div className="min-w-[100px] text-sm text-slate-500 dark:text-slate-400">
                                                {formatDate(solution.startDate)}
                                            </div>
                                            <div className="min-w-[100px] text-sm font-semibold text-slate-900 dark:text-white">
                                                {solution.price}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                            <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                                                <ExternalLink className="w-5 h-5" />
                                            </button>
                                            <Link
                                                to={`/dashboard/subscriptions/${solution.id}`}
                                                className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                            >
                                                <Settings className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )
            ) : (
                /* Empty State */
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12">
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-500/20 dark:to-indigo-500/20 flex items-center justify-center">
                            <Package className="w-10 h-10 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                            {searchQuery ? 'Ничего не найдено' : 'Нет активных решений'}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                            {searchQuery
                                ? 'Попробуйте изменить поисковый запрос'
                                : 'Подключите первое бизнес-решение из каталога и начните оптимизировать рабочие процессы'
                            }
                        </p>
                        {!searchQuery && (
                            <Link
                                to="/catalog"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                            >
                                Перейти в каталог
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* Solution Detail Modal */}
            <SolutionDetailModal
                solution={selectedSolution}
                onClose={() => setSelectedSolution(null)}
            />
        </div>
    );
}
