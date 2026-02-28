import { Link } from 'react-router-dom';
import { ChevronRight, CreditCard, Clock, Eye, AlertCircle } from 'lucide-react';
import { mockOrders } from './mockData';
import { orderStatusMap } from '../../types';
import type { Order } from '../../types';

interface OrderRowProps {
    order: Order;
}

function OrderRow({ order }: OrderRowProps) {
    const statusInfo = orderStatusMap[order.status];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getActionButton = () => {
        switch (order.status) {
            case 'WAITING_PAYMENT':
                return (
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors">
                        <CreditCard className="w-3.5 h-3.5" />
                        Оплатить
                    </button>
                );
            case 'APPROVED':
                return (
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-medium hover:bg-emerald-600 transition-colors">
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
            case 'REJECTED':
                return (
                    <Link
                        to={`/dashboard/orders/${order.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                    >
                        <Eye className="w-3.5 h-3.5" />
                        Подробнее
                    </Link>
                );
            default:
                return (
                    <Link
                        to={`/dashboard/orders/${order.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                    >
                        <Eye className="w-3.5 h-3.5" />
                        Смотреть
                    </Link>
                );
        }
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            {/* Product Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 overflow-hidden shrink-0">
                    {order.productLogo ? (
                        <img
                            src={order.productLogo}
                            alt={order.productName}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm font-bold">
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

            {/* Plan & Price */}
            <div className="flex items-center gap-4 sm:gap-8">
                <div className="hidden md:block min-w-[100px]">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {order.planName}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        {order.price}
                    </p>
                </div>

                {/* Date */}
                <div className="hidden lg:block min-w-[100px]">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {formatDate(order.createdAt)}
                    </p>
                </div>

                {/* Status */}
                <div className="min-w-[120px]">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                        {statusInfo.label}
                    </span>
                </div>

                {/* Action */}
                <div className="min-w-[100px] text-right">
                    {getActionButton()}
                </div>
            </div>
        </div>
    );
}

export function OrdersTable() {
    // Show only recent orders (last 5)
    const recentOrders = mockOrders.slice(0, 5);
    const hasOrders = recentOrders.length > 0;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        История заявок
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Ваши заказы и их статусы
                    </p>
                </div>
                <Link
                    to="/dashboard/orders"
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600"
                >
                    Все заявки
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Table Content */}
            {hasOrders ? (
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {recentOrders.map((order) => (
                        <OrderRow key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <div className="p-10 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                        Нет заявок
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        Вы ещё не оформляли заявки на решения
                    </p>
                    <Link
                        to="/catalog"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                        Перейти в каталог
                    </Link>
                </div>
            )}
        </div>
    );
}
