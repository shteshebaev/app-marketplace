// Subscription statuses
export type SubscriptionStatus = 'ACTIVE' | 'SUSPENDED' | 'EXPIRED' | 'CANCELLED';

// Subscription interface
export interface Subscription {
    id: string;
    userId: string;
    orderId: string;
    productId: string;
    productName: string;
    productLogo?: string;
    developerId: string;
    developerName: string;
    planId: string;
    planName: string;
    price: string;
    billingPeriod: 'monthly' | 'yearly' | 'one-time';
    status: SubscriptionStatus;
    startDate: string;
    endDate?: string;
    nextPaymentDate?: string;
    autoRenew: boolean;
    createdAt: string;
    updatedAt: string;
}

// Payment history item
export interface PaymentHistoryItem {
    id: string;
    subscriptionId: string;
    productName: string;
    amount: string;
    status: 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED';
    paymentMethod: string;
    invoiceUrl?: string;
    createdAt: string;
}

// Subscription status info for display
export interface SubscriptionStatusInfo {
    label: string;
    color: string;
    bgColor: string;
}

// Map subscription status to display info
export const subscriptionStatusMap: Record<SubscriptionStatus, SubscriptionStatusInfo> = {
    ACTIVE: {
        label: 'Активна',
        color: 'text-emerald-600 dark:text-emerald-400',
        bgColor: 'bg-emerald-100 dark:bg-emerald-500/20'
    },
    SUSPENDED: {
        label: 'Приостановлена',
        color: 'text-amber-600 dark:text-amber-400',
        bgColor: 'bg-amber-100 dark:bg-amber-500/20'
    },
    EXPIRED: {
        label: 'Истекла',
        color: 'text-slate-600 dark:text-slate-400',
        bgColor: 'bg-slate-100 dark:bg-slate-500/20'
    },
    CANCELLED: {
        label: 'Отменена',
        color: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-100 dark:bg-red-500/20'
    }
};
