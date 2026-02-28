import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Bell,
    ShoppingCart,
    CheckCircle,
    XCircle,
    CreditCard,
    AlertCircle,
    Zap,
    Clock,
    AlertTriangle,
    Check,
    Trash2,
    Settings
} from 'lucide-react';
import { mockNotifications } from '../components/customer/mockData';
import type { Notification, NotificationType } from '../types';

type FilterType = NotificationType | 'ALL' | 'UNREAD';

const iconMap: Record<NotificationType, React.ReactNode> = {
    ORDER_CREATED: <ShoppingCart className="w-5 h-5" />,
    ORDER_APPROVED: <CheckCircle className="w-5 h-5" />,
    ORDER_REJECTED: <XCircle className="w-5 h-5" />,
    PAYMENT_REQUIRED: <CreditCard className="w-5 h-5" />,
    PAYMENT_SUCCESS: <CheckCircle className="w-5 h-5" />,
    PAYMENT_FAILED: <AlertCircle className="w-5 h-5" />,
    SUBSCRIPTION_ACTIVATED: <Zap className="w-5 h-5" />,
    SUBSCRIPTION_EXPIRING: <Clock className="w-5 h-5" />,
    SUBSCRIPTION_EXPIRED: <AlertTriangle className="w-5 h-5" />,
    SYSTEM: <Bell className="w-5 h-5" />
};

const colorMap: Record<NotificationType, { bg: string; text: string }> = {
    ORDER_CREATED: { bg: 'bg-blue-100 dark:bg-blue-500/20', text: 'text-blue-600 dark:text-blue-400' },
    ORDER_APPROVED: { bg: 'bg-emerald-100 dark:bg-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400' },
    ORDER_REJECTED: { bg: 'bg-red-100 dark:bg-red-500/20', text: 'text-red-600 dark:text-red-400' },
    PAYMENT_REQUIRED: { bg: 'bg-amber-100 dark:bg-amber-500/20', text: 'text-amber-600 dark:text-amber-400' },
    PAYMENT_SUCCESS: { bg: 'bg-emerald-100 dark:bg-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400' },
    PAYMENT_FAILED: { bg: 'bg-red-100 dark:bg-red-500/20', text: 'text-red-600 dark:text-red-400' },
    SUBSCRIPTION_ACTIVATED: { bg: 'bg-emerald-100 dark:bg-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400' },
    SUBSCRIPTION_EXPIRING: { bg: 'bg-amber-100 dark:bg-amber-500/20', text: 'text-amber-600 dark:text-amber-400' },
    SUBSCRIPTION_EXPIRED: { bg: 'bg-red-100 dark:bg-red-500/20', text: 'text-red-600 dark:text-red-400' },
    SYSTEM: { bg: 'bg-slate-100 dark:bg-slate-500/20', text: 'text-slate-600 dark:text-slate-400' }
};

const filterTabs: { value: FilterType; label: string }[] = [
    { value: 'ALL', label: 'Все' },
    { value: 'UNREAD', label: 'Непрочитанные' },
    { value: 'ORDER_APPROVED', label: 'Заявки' },
    { value: 'PAYMENT_SUCCESS', label: 'Платежи' },
    { value: 'SUBSCRIPTION_EXPIRING', label: 'Подписки' },
    { value: 'SYSTEM', label: 'Системные' }
];

interface NotificationItemProps {
    notification: Notification;
    onMarkAsRead: (id: string) => void;
    onDelete: (id: string) => void;
}

function NotificationItem({ notification, onMarkAsRead, onDelete }: NotificationItemProps) {
    const colors = colorMap[notification.type];
    const [showActions, setShowActions] = useState(false);

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();

        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) {
            return `${minutes} мин назад`;
        } else if (hours < 24) {
            return `${hours} ч назад`;
        } else if (days < 7) {
            return `${days} дн назад`;
        } else {
            return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
        }
    };

    return (
        <div
            className={`group p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                !notification.isRead ? 'bg-blue-50/50 dark:bg-blue-500/5' : ''
            }`}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 ${colors.text}`}>
                    {iconMap[notification.type]}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <h4 className={`font-medium text-slate-900 dark:text-white ${!notification.isRead ? 'font-semibold' : ''}`}>
                                {notification.title}
                            </h4>
                            {!notification.isRead && (
                                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                            )}
                        </div>
                        <div className={`flex items-center gap-2 transition-opacity ${showActions ? 'opacity-100' : 'opacity-0'}`}>
                            {!notification.isRead && (
                                <button
                                    onClick={() => onMarkAsRead(notification.id)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
                                    title="Отметить как прочитанное"
                                >
                                    <Check className="w-4 h-4" />
                                </button>
                            )}
                            <button
                                onClick={() => onDelete(notification.id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                title="Удалить"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {notification.message}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                            {formatTime(notification.createdAt)}
                        </span>
                        {notification.actionUrl && notification.actionLabel && (
                            <Link
                                to={notification.actionUrl}
                                className="inline-flex items-center gap-1 text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors"
                            >
                                {notification.actionLabel}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function NotificationsPage() {
    const [notifications, setNotifications] = useState(mockNotifications);
    const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const filteredNotifications = notifications.filter(notification => {
        if (activeFilter === 'ALL') return true;
        if (activeFilter === 'UNREAD') return !notification.isRead;
        // Group related types
        if (activeFilter === 'ORDER_APPROVED') {
            return ['ORDER_CREATED', 'ORDER_APPROVED', 'ORDER_REJECTED'].includes(notification.type);
        }
        if (activeFilter === 'PAYMENT_SUCCESS') {
            return ['PAYMENT_REQUIRED', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED'].includes(notification.type);
        }
        if (activeFilter === 'SUBSCRIPTION_EXPIRING') {
            return ['SUBSCRIPTION_ACTIVATED', 'SUBSCRIPTION_EXPIRING', 'SUBSCRIPTION_EXPIRED'].includes(notification.type);
        }
        return notification.type === activeFilter;
    });

    const handleMarkAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, isRead: true } : n)
        );
    };

    const handleDelete = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const handleClearAll = () => {
        setNotifications([]);
    };

    const getFilterCount = (filter: FilterType) => {
        if (filter === 'ALL') return notifications.length;
        if (filter === 'UNREAD') return unreadCount;
        if (filter === 'ORDER_APPROVED') {
            return notifications.filter(n => ['ORDER_CREATED', 'ORDER_APPROVED', 'ORDER_REJECTED'].includes(n.type)).length;
        }
        if (filter === 'PAYMENT_SUCCESS') {
            return notifications.filter(n => ['PAYMENT_REQUIRED', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED'].includes(n.type)).length;
        }
        if (filter === 'SUBSCRIPTION_EXPIRING') {
            return notifications.filter(n => ['SUBSCRIPTION_ACTIVATED', 'SUBSCRIPTION_EXPIRING', 'SUBSCRIPTION_EXPIRED'].includes(n.type)).length;
        }
        return notifications.filter(n => n.type === filter).length;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Уведомления
                    </h1>
                    {unreadCount > 0 && (
                        <span className="px-2.5 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        >
                            <Check className="w-4 h-4" />
                            Прочитать все
                        </button>
                    )}
                    <button
                        className="p-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        title="Настройки уведомлений"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 -mb-1">
                {filterTabs.map((tab) => {
                    const count = getFilterCount(tab.value);

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
                            {count > 0 && (
                                <span className={`
                                    min-w-[20px] h-5 px-1.5 rounded-full text-xs flex items-center justify-center
                                    ${activeFilter === tab.value
                                        ? 'bg-white/20'
                                        : 'bg-slate-200 dark:bg-slate-600'
                                    }
                                `}>
                                    {count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Notifications List */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                {filteredNotifications.length > 0 ? (
                    <>
                        <div className="divide-y divide-slate-200 dark:divide-slate-700">
                            {filteredNotifications.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onMarkAsRead={handleMarkAsRead}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>

                        {/* Clear All */}
                        {notifications.length > 0 && (
                            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                                <button
                                    onClick={handleClearAll}
                                    className="w-full text-center text-sm font-medium text-red-500 hover:text-red-600 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                >
                                    Очистить все уведомления
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                            <Bell className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                            {activeFilter === 'UNREAD' ? 'Нет непрочитанных' : 'Нет уведомлений'}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {activeFilter === 'UNREAD'
                                ? 'Все уведомления прочитаны'
                                : 'Здесь будут появляться важные уведомления о ваших заказах и подписках'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
