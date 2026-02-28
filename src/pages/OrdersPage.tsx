import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Search,
    ChevronRight,
    CreditCard,
    Clock,
    Eye,
    X,
    CheckCircle,
    XCircle,
    AlertCircle,
    Calendar,
    Building2,
    Package,
    MessageSquare
} from 'lucide-react';
import { mockOrders } from '../components/customer/mockData';
import { orderStatusMap } from '../types';
import type { Order, OrderStatus } from '../types';

type FilterStatus = OrderStatus | 'ALL';

interface OrderDetailModalProps {
    order: Order | null;
    onClose: () => void;
}

function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
    if (!order) return null;

    const statusInfo = orderStatusMap[order.status];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    type TimelineStatus = 'completed' | 'rejected' | 'current';

    interface TimelineItem {
        label: string;
        date: string;
        status: TimelineStatus;
        icon: React.ReactNode;
    }

    const getTimelineItems = (): TimelineItem[] => {
        const items: TimelineItem[] = [
            {
                label: 'Заявка создана',
                date: order.createdAt,
                status: 'completed',
                icon: <Package className="w-4 h-4" />
            }
        ];

        if (order.approvedAt) {
            items.push({
                label: 'Заявка подтверждена',
                date: order.approvedAt,
                status: 'completed',
                icon: <CheckCircle className="w-4 h-4" />
            });
        }

        if (order.rejectedAt) {
            items.push({
                label: 'Заявка отклонена',
                date: order.rejectedAt,
                status: 'rejected',
                icon: <XCircle className="w-4 h-4" />
            });
        }

        if (order.status === 'WAITING_PAYMENT') {
            items.push({
                label: 'Ожидает оплаты',
                date: order.updatedAt,
                status: 'current',
                icon: <CreditCard className="w-4 h-4" />
            });
        }

        if (order.activatedAt) {
            items.push({
                label: 'Решение активировано',
                date: order.activatedAt,
                status: 'completed',
                icon: <CheckCircle className="w-4 h-4" />
            });
        }

        return items;
    };

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
                            {order.productLogo ? (
                                <img
                                    src={order.productLogo}
                                    alt={order.productName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-lg font-bold">
                                    {order.productName.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                {order.productName}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {order.developerName}
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
                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                            {statusInfo.label}
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                            Заказ #{order.id.slice(-6)}
                        </span>
                    </div>

                    {/* Rejection Reason */}
                    {order.rejectionReason && (
                        <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-red-800 dark:text-red-300">
                                        Причина отклонения
                                    </h4>
                                    <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                                        {order.rejectionReason}
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
                                {order.planName}
                            </p>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                                <CreditCard className="w-4 h-4" />
                                <span className="text-xs uppercase tracking-wide">Стоимость</span>
                            </div>
                            <p className="font-medium text-slate-900 dark:text-white">
                                {order.price}
                            </p>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                                <Calendar className="w-4 h-4" />
                                <span className="text-xs uppercase tracking-wide">Период</span>
                            </div>
                            <p className="font-medium text-slate-900 dark:text-white">
                                {order.billingPeriod === 'monthly' ? 'Ежемесячно' : order.billingPeriod === 'yearly' ? 'Ежегодно' : 'Разовая'}
                            </p>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                                <Building2 className="w-4 h-4" />
                                <span className="text-xs uppercase tracking-wide">Разработчик</span>
                            </div>
                            <p className="font-medium text-slate-900 dark:text-white">
                                {order.developerName}
                            </p>
                        </div>
                    </div>

                    {/* Comment */}
                    {order.comment && (
                        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                                <MessageSquare className="w-4 h-4" />
                                <span className="text-xs uppercase tracking-wide">Ваш комментарий</span>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                                {order.comment}
                            </p>
                        </div>
                    )}

                    {/* Timeline */}
                    <div>
                        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                            История заявки
                        </h4>
                        <div className="space-y-4">
                            {getTimelineItems().map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                        item.status === 'completed'
                                            ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                            : item.status === 'rejected'
                                            ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'
                                            : 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'
                                    }`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-slate-900 dark:text-white">
                                            {item.label}
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {formatDate(item.date)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex items-center gap-3">
                    {(order.status === 'WAITING_PAYMENT' || order.status === 'APPROVED') && (
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
                            <CreditCard className="w-5 h-5" />
                            Оплатить
                        </button>
                    )}
                    {order.status === 'PENDING' && (
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl font-medium hover:bg-red-200 dark:hover:bg-red-500/30 transition-colors">
                            <XCircle className="w-5 h-5" />
                            Отменить заявку
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

const filterTabs: { value: FilterStatus; label: string; count?: number }[] = [
    { value: 'ALL', label: 'Все заявки' },
    { value: 'PENDING', label: 'Ожидают' },
    { value: 'APPROVED', label: 'Подтверждены' },
    { value: 'WAITING_PAYMENT', label: 'Ожидают оплаты' },
    { value: 'ACTIVE', label: 'Активные' },
    { value: 'REJECTED', label: 'Отклонены' }
];

export function OrdersPage() {
    const [activeFilter, setActiveFilter] = useState<FilterStatus>('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const filteredOrders = mockOrders.filter(order => {
        const matchesFilter = activeFilter === 'ALL' || order.status === activeFilter;
        const matchesSearch = order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.developerName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getFilterCount = (status: FilterStatus) => {
        if (status === 'ALL') return mockOrders.length;
        return mockOrders.filter(o => o.status === status).length;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getActionButton = (order: Order) => {
        switch (order.status) {
            case 'WAITING_PAYMENT':
            case 'APPROVED':
                return (
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors">
                        <CreditCard className="w-3.5 h-3.5" />
                        Оплатить
                    </button>
                );
            case 'PENDING':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        Ожидание
                    </span>
                );
            default:
                return (
                    <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                    >
                        <Eye className="w-3.5 h-3.5" />
                        Детали
                    </button>
                );
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        История заявок
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Все ваши заказы на подключение решений
                    </p>
                </div>
                <Link
                    to="/catalog"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                >
                    Найти решение
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Search & Filters */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Поиск по названию или разработчику..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

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
            </div>

            {/* Orders List */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                {filteredOrders.length > 0 ? (
                    <div className="divide-y divide-slate-200 dark:divide-slate-700">
                        {filteredOrders.map((order) => {
                            const statusInfo = orderStatusMap[order.status];

                            return (
                                <div
                                    key={order.id}
                                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    {/* Product Info */}
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 overflow-hidden shrink-0">
                                            {order.productLogo ? (
                                                <img
                                                    src={order.productLogo}
                                                    alt={order.productName}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">
                                                    {order.productName.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-medium text-slate-900 dark:text-white truncate">
                                                {order.productName}
                                            </h4>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                                {order.developerName}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Meta Info */}
                                    <div className="flex items-center gap-4 sm:gap-8">
                                        <div className="hidden md:block min-w-[120px]">
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                                {order.planName}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                {order.price}
                                            </p>
                                        </div>

                                        <div className="hidden lg:block min-w-[100px]">
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                {formatDate(order.createdAt)}
                                            </p>
                                        </div>

                                        <div className="min-w-[130px]">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                                                {statusInfo.label}
                                            </span>
                                        </div>

                                        <div
                                            className="min-w-[100px] text-right"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {getActionButton(order)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                            <Package className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                            {searchQuery ? 'Ничего не найдено' : 'Нет заявок'}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                            {searchQuery
                                ? 'Попробуйте изменить поисковый запрос'
                                : 'Вы ещё не оформляли заявки на решения'
                            }
                        </p>
                        {!searchQuery && (
                            <Link
                                to="/catalog"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                            >
                                Перейти в каталог
                            </Link>
                        )}
                    </div>
                )}
            </div>

            {/* Order Detail Modal */}
            <OrderDetailModal
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
            />
        </div>
    );
}
