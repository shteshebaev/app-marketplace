import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    CreditCard,
    Calendar,
    RefreshCw,
    ExternalLink,
    Settings,
    AlertTriangle,
    X,
    Download,
    CheckCircle,
    Clock,
    XCircle,
    ChevronRight,
    Package
} from 'lucide-react';
import { mockSubscriptions } from '../components/customer/mockData';
import { subscriptionStatusMap } from '../types';
import type { Subscription, SubscriptionStatus, PaymentHistoryItem } from '../types';

type FilterStatus = SubscriptionStatus | 'ALL';

// Mock payment history
const mockPaymentHistory: PaymentHistoryItem[] = [
    {
        id: 'pay-1',
        subscriptionId: 'sub-1',
        productName: '1C:Бухгалтерия',
        amount: '450 000 сум',
        status: 'PAID',
        paymentMethod: 'Payme',
        invoiceUrl: '/invoices/pay-1.pdf',
        createdAt: '2024-01-25T14:00:00Z'
    },
    {
        id: 'pay-2',
        subscriptionId: 'sub-2',
        productName: 'Email Marketing Pro',
        amount: '280 000 сум',
        status: 'PAID',
        paymentMethod: 'Click',
        invoiceUrl: '/invoices/pay-2.pdf',
        createdAt: '2024-01-10T10:00:00Z'
    },
    {
        id: 'pay-3',
        subscriptionId: 'sub-1',
        productName: '1C:Бухгалтерия',
        amount: '450 000 сум',
        status: 'PAID',
        paymentMethod: 'Payme',
        invoiceUrl: '/invoices/pay-3.pdf',
        createdAt: '2023-12-25T14:00:00Z'
    },
    {
        id: 'pay-4',
        subscriptionId: 'sub-3',
        productName: 'Project Manager',
        amount: '350 000 сум',
        status: 'FAILED',
        paymentMethod: 'Click',
        createdAt: '2024-01-01T10:00:00Z'
    }
];

interface SubscriptionDetailModalProps {
    subscription: Subscription | null;
    onClose: () => void;
}

function SubscriptionDetailModal({ subscription, onClose }: SubscriptionDetailModalProps) {
    if (!subscription) return null;

    const statusInfo = subscriptionStatusMap[subscription.status];

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

    const subscriptionPayments = mockPaymentHistory.filter(
        p => p.subscriptionId === subscription.id
    );

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-x-4 top-[5%] bottom-[5%] md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 overflow-hidden">
                            {subscription.productLogo ? (
                                <img
                                    src={subscription.productLogo}
                                    alt={subscription.productName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-lg font-bold">
                                    {subscription.productName.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                {subscription.productName}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {subscription.developerName}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Status & Plan */}
                    <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                            {statusInfo.label}
                        </span>
                        <span className="text-lg font-semibold text-slate-900 dark:text-white">
                            {subscription.price}/{subscription.billingPeriod === 'monthly' ? 'мес' : 'год'}
                        </span>
                    </div>

                    {/* Warning for expiring */}
                    {subscription.status === 'ACTIVE' && subscription.nextPaymentDate && getDaysUntil(subscription.nextPaymentDate) <= 7 && (
                        <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-amber-800 dark:text-amber-300">
                                        Подписка скоро истекает
                                    </h4>
                                    <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                                        Следующий платёж {formatDate(subscription.nextPaymentDate)}.
                                        {subscription.autoRenew
                                            ? ' Автопродление включено.'
                                            : ' Включите автопродление для бесперебойной работы.'
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                                <Package className="w-4 h-4" />
                                <span className="text-xs uppercase tracking-wide">Тариф</span>
                            </div>
                            <p className="font-medium text-slate-900 dark:text-white">
                                {subscription.planName}
                            </p>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                                <Calendar className="w-4 h-4" />
                                <span className="text-xs uppercase tracking-wide">Начало</span>
                            </div>
                            <p className="font-medium text-slate-900 dark:text-white">
                                {formatDate(subscription.startDate)}
                            </p>
                        </div>
                        {subscription.nextPaymentDate && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                                    <CreditCard className="w-4 h-4" />
                                    <span className="text-xs uppercase tracking-wide">Следующий платёж</span>
                                </div>
                                <p className="font-medium text-slate-900 dark:text-white">
                                    {formatDate(subscription.nextPaymentDate)}
                                </p>
                            </div>
                        )}
                        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                                <RefreshCw className="w-4 h-4" />
                                <span className="text-xs uppercase tracking-wide">Автопродление</span>
                            </div>
                            <p className={`font-medium ${subscription.autoRenew ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
                                {subscription.autoRenew ? 'Включено' : 'Выключено'}
                            </p>
                        </div>
                    </div>

                    {/* Payment History */}
                    {subscriptionPayments.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                                История платежей
                            </h4>
                            <div className="space-y-3">
                                {subscriptionPayments.map((payment) => (
                                    <div
                                        key={payment.id}
                                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                payment.status === 'PAID'
                                                    ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                                    : payment.status === 'FAILED'
                                                    ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'
                                                    : 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'
                                            }`}>
                                                {payment.status === 'PAID' ? <CheckCircle className="w-4 h-4" /> :
                                                 payment.status === 'FAILED' ? <XCircle className="w-4 h-4" /> :
                                                 <Clock className="w-4 h-4" />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900 dark:text-white">
                                                    {payment.amount}
                                                </p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                                    {formatDate(payment.createdAt)} • {payment.paymentMethod}
                                                </p>
                                            </div>
                                        </div>
                                        {payment.invoiceUrl && payment.status === 'PAID' && (
                                            <button className="p-2 text-slate-500 hover:text-blue-500 transition-colors">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-3">
                    {subscription.status === 'ACTIVE' && (
                        <>
                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
                                <ExternalLink className="w-5 h-5" />
                                Открыть решение
                            </button>
                            <button className="px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                        </>
                    )}
                    {subscription.status === 'SUSPENDED' && (
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
                            <CreditCard className="w-5 h-5" />
                            Возобновить подписку
                        </button>
                    )}
                    {subscription.status === 'EXPIRED' && (
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
                            <RefreshCw className="w-5 h-5" />
                            Продлить подписку
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                        Закрыть
                    </button>
                </div>
            </div>
        </>
    );
}

const filterTabs: { value: FilterStatus; label: string }[] = [
    { value: 'ALL', label: 'Все подписки' },
    { value: 'ACTIVE', label: 'Активные' },
    { value: 'SUSPENDED', label: 'Приостановлены' },
    { value: 'EXPIRED', label: 'Истекшие' },
    { value: 'CANCELLED', label: 'Отменённые' }
];

const paymentStatusLabels: Record<PaymentHistoryItem['status'], string> = {
    PAID: 'Оплачено',
    PENDING: 'Ожидание',
    FAILED: 'Ошибка',
    REFUNDED: 'Возврат'
};

export function SubscriptionsPage() {
    const [activeFilter, setActiveFilter] = useState<FilterStatus>('ALL');
    const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
    const [showPaymentHistory, setShowPaymentHistory] = useState(false);

    const filteredSubscriptions = mockSubscriptions.filter(sub => {
        return activeFilter === 'ALL' || sub.status === activeFilter;
    });

    const getFilterCount = (status: FilterStatus) => {
        if (status === 'ALL') return mockSubscriptions.length;
        return mockSubscriptions.filter(s => s.status === status).length;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getDaysUntil = (dateString: string) => {
        const now = new Date();
        const date = new Date(dateString);
        return Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Подписки и платежи
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Управление вашими подписками
                    </p>
                </div>
                <button
                    onClick={() => setShowPaymentHistory(!showPaymentHistory)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                    <CreditCard className="w-4 h-4" />
                    История платежей
                </button>
            </div>

            {/* Payment History Panel */}
            {showPaymentHistory && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            История платежей
                        </h2>
                        <button
                            onClick={() => setShowPaymentHistory(false)}
                            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="divide-y divide-slate-200 dark:divide-slate-700">
                        {mockPaymentHistory.map((payment) => (
                            <div
                                key={payment.id}
                                className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                        payment.status === 'PAID'
                                            ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                            : payment.status === 'FAILED'
                                            ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'
                                            : payment.status === 'REFUNDED'
                                            ? 'bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400'
                                            : 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'
                                    }`}>
                                        {payment.status === 'PAID' ? <CheckCircle className="w-5 h-5" /> :
                                         payment.status === 'FAILED' ? <XCircle className="w-5 h-5" /> :
                                         payment.status === 'REFUNDED' ? <RefreshCw className="w-5 h-5" /> :
                                         <Clock className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-white">
                                            {payment.productName}
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {formatDate(payment.createdAt)} • {payment.paymentMethod}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                            {payment.amount}
                                        </p>
                                        <p className={`text-xs font-medium ${
                                            payment.status === 'PAID' ? 'text-emerald-600 dark:text-emerald-400' :
                                            payment.status === 'FAILED' ? 'text-red-600 dark:text-red-400' :
                                            'text-slate-500'
                                        }`}>
                                            {paymentStatusLabels[payment.status]}
                                        </p>
                                    </div>
                                    {payment.invoiceUrl && payment.status === 'PAID' && (
                                        <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
                                            <Download className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 -mb-1">
                {filterTabs.map((tab) => {
                    const count = getFilterCount(tab.value);
                    if (count === 0 && tab.value !== 'ALL') return null;

                    return (
                        <button
                            key={tab.value}
                            onClick={() => setActiveFilter(tab.value)}
                            className={`
                                inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors
                                ${activeFilter === tab.value
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                                }
                            `}
                        >
                            {tab.label}
                            <span className={`
                                min-w-[20px] h-5 px-1.5 rounded-full text-xs flex items-center justify-center
                                ${activeFilter === tab.value
                                    ? 'bg-white/20'
                                    : 'bg-slate-200 dark:bg-slate-600'
                                }
                            `}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Subscriptions List */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                {filteredSubscriptions.length > 0 ? (
                    <div className="divide-y divide-slate-200 dark:divide-slate-700">
                        {filteredSubscriptions.map((subscription) => {
                            const statusInfo = subscriptionStatusMap[subscription.status];
                            const isExpiring = subscription.status === 'ACTIVE' &&
                                subscription.nextPaymentDate &&
                                getDaysUntil(subscription.nextPaymentDate) <= 7;

                            return (
                                <div
                                    key={subscription.id}
                                    className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                                    onClick={() => setSelectedSubscription(subscription)}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        {/* Product Info */}
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 overflow-hidden shrink-0">
                                                {subscription.productLogo ? (
                                                    <img
                                                        src={subscription.productLogo}
                                                        alt={subscription.productName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-lg font-bold">
                                                        {subscription.productName.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-semibold text-slate-900 dark:text-white truncate">
                                                        {subscription.productName}
                                                    </h4>
                                                    {isExpiring && (
                                                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                                    {subscription.developerName} • {subscription.planName}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Meta Info */}
                                        <div className="flex items-center gap-4 sm:gap-8">
                                            <div className="hidden md:block min-w-[120px]">
                                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                                    {subscription.price}
                                                </p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    {subscription.billingPeriod === 'monthly' ? 'в месяц' : 'в год'}
                                                </p>
                                            </div>

                                            {subscription.nextPaymentDate && subscription.status === 'ACTIVE' && (
                                                <div className="hidden lg:block min-w-[130px]">
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {formatDate(subscription.nextPaymentDate)}
                                                    </p>
                                                    {subscription.autoRenew && (
                                                        <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                                                            <RefreshCw className="w-3 h-3" />
                                                            Авто
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            <div className="min-w-[100px]">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </div>

                                            <ChevronRight className="w-5 h-5 text-slate-400" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                            <CreditCard className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                            Нет подписок
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                            У вас пока нет активных подписок
                        </p>
                        <Link
                            to="/catalog"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                        >
                            Перейти в каталог
                        </Link>
                    </div>
                )}
            </div>

            {/* Subscription Detail Modal */}
            <SubscriptionDetailModal
                subscription={selectedSubscription}
                onClose={() => setSelectedSubscription(null)}
            />
        </div>
    );
}
