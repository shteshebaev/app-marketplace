import { Link } from 'react-router-dom';
import {
    ChevronRight,
    Bell,
    ShoppingCart,
    CheckCircle,
    XCircle,
    CreditCard,
    AlertCircle,
    Zap,
    Clock,
    AlertTriangle
} from 'lucide-react';
import { mockNotifications } from './mockData';
import type { Notification, NotificationType } from '../../types';

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

interface NotificationItemProps {
    notification: Notification;
}

function NotificationItem({ notification }: NotificationItemProps) {
    const colors = colorMap[notification.type];

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
        <div className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${!notification.isRead ? 'bg-blue-50/50 dark:bg-blue-500/5' : ''}`}>
            <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 ${colors.text}`}>
                    {iconMap[notification.type]}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <h4 className={`font-medium text-slate-900 dark:text-white ${!notification.isRead ? 'font-semibold' : ''}`}>
                            {notification.title}
                        </h4>
                        {!notification.isRead && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2" />
                        )}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                        {notification.message}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                            {formatTime(notification.createdAt)}
                        </span>
                        {notification.actionUrl && notification.actionLabel && (
                            <Link
                                to={notification.actionUrl}
                                className="text-xs font-medium text-blue-500 hover:text-blue-600"
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

export function NotificationsBlock() {
    const unreadNotifications = mockNotifications.filter(n => !n.isRead);
    const recentNotifications = mockNotifications.slice(0, 4);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Уведомления
                    </h2>
                    {unreadNotifications.length > 0 && (
                        <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                            {unreadNotifications.length}
                        </span>
                    )}
                </div>
                <Link
                    to="/dashboard/notifications"
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600"
                >
                    Все
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Notifications List */}
            {recentNotifications.length > 0 ? (
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {recentNotifications.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </div>
            ) : (
                <div className="p-10 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        <Bell className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Нет уведомлений
                    </p>
                </div>
            )}

            {/* Mark All Read */}
            {unreadNotifications.length > 0 && (
                <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                    <button className="w-full text-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                        Отметить все как прочитанные
                    </button>
                </div>
            )}
        </div>
    );
}
