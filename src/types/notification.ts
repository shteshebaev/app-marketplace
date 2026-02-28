// Notification types
export type NotificationType =
    | 'ORDER_CREATED'
    | 'ORDER_APPROVED'
    | 'ORDER_REJECTED'
    | 'PAYMENT_REQUIRED'
    | 'PAYMENT_SUCCESS'
    | 'PAYMENT_FAILED'
    | 'SUBSCRIPTION_ACTIVATED'
    | 'SUBSCRIPTION_EXPIRING'
    | 'SUBSCRIPTION_EXPIRED'
    | 'SYSTEM';

// Notification interface
export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    isRead: boolean;
    actionUrl?: string;
    actionLabel?: string;
    relatedOrderId?: string;
    relatedProductId?: string;
    createdAt: string;
}

// Notification type info for display
export interface NotificationTypeInfo {
    icon: string;
    color: string;
    bgColor: string;
}

// Map notification type to icon and color
export const notificationTypeMap: Record<NotificationType, NotificationTypeInfo> = {
    ORDER_CREATED: {
        icon: 'ShoppingCart',
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-500/20'
    },
    ORDER_APPROVED: {
        icon: 'CheckCircle',
        color: 'text-emerald-600 dark:text-emerald-400',
        bgColor: 'bg-emerald-100 dark:bg-emerald-500/20'
    },
    ORDER_REJECTED: {
        icon: 'XCircle',
        color: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-100 dark:bg-red-500/20'
    },
    PAYMENT_REQUIRED: {
        icon: 'CreditCard',
        color: 'text-amber-600 dark:text-amber-400',
        bgColor: 'bg-amber-100 dark:bg-amber-500/20'
    },
    PAYMENT_SUCCESS: {
        icon: 'CheckCircle',
        color: 'text-emerald-600 dark:text-emerald-400',
        bgColor: 'bg-emerald-100 dark:bg-emerald-500/20'
    },
    PAYMENT_FAILED: {
        icon: 'AlertCircle',
        color: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-100 dark:bg-red-500/20'
    },
    SUBSCRIPTION_ACTIVATED: {
        icon: 'Zap',
        color: 'text-emerald-600 dark:text-emerald-400',
        bgColor: 'bg-emerald-100 dark:bg-emerald-500/20'
    },
    SUBSCRIPTION_EXPIRING: {
        icon: 'Clock',
        color: 'text-amber-600 dark:text-amber-400',
        bgColor: 'bg-amber-100 dark:bg-amber-500/20'
    },
    SUBSCRIPTION_EXPIRED: {
        icon: 'AlertTriangle',
        color: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-100 dark:bg-red-500/20'
    },
    SYSTEM: {
        icon: 'Bell',
        color: 'text-slate-600 dark:text-slate-400',
        bgColor: 'bg-slate-100 dark:bg-slate-500/20'
    }
};
