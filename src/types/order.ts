// Order statuses
export type OrderStatus =
    | 'PENDING'           // Ожидает подтверждения
    | 'APPROVED'          // Подтверждён разработчиком
    | 'REJECTED'          // Отклонён
    | 'WAITING_PAYMENT'   // Ожидает оплаты
    | 'ACTIVE'            // Активен
    | 'CANCELLED'         // Отменён
    | 'EXPIRED';          // Истёк

// Payment statuses
export type PaymentStatus = 'UNPAID' | 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

// Order interface
export interface Order {
    id: string;
    userId: string;
    productId: string;
    productName: string;
    productLogo?: string;
    developerId: string;
    developerName: string;
    planId: string;
    planName: string;
    price: string;
    billingPeriod: 'monthly' | 'yearly' | 'one-time';
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    comment?: string;
    createdAt: string;
    updatedAt: string;
    approvedAt?: string;
    activatedAt?: string;
    rejectedAt?: string;
    rejectionReason?: string;
}

// Create order data
export interface CreateOrderData {
    productId: string;
    planId: string;
    billingPeriod: 'monthly' | 'yearly' | 'one-time';
    comment?: string;
}

// Order status info for display
export interface OrderStatusInfo {
    label: string;
    color: string;
    bgColor: string;
    description: string;
}

// Map order status to display info
export const orderStatusMap: Record<OrderStatus, OrderStatusInfo> = {
    PENDING: {
        label: 'Ожидает подтверждения',
        color: 'text-amber-600 dark:text-amber-400',
        bgColor: 'bg-amber-100 dark:bg-amber-500/20',
        description: 'Заявка отправлена разработчику'
    },
    APPROVED: {
        label: 'Подтверждён',
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-500/20',
        description: 'Разработчик подтвердил заявку'
    },
    REJECTED: {
        label: 'Отклонён',
        color: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-100 dark:bg-red-500/20',
        description: 'Заявка отклонена разработчиком'
    },
    WAITING_PAYMENT: {
        label: 'Ожидает оплаты',
        color: 'text-violet-600 dark:text-violet-400',
        bgColor: 'bg-violet-100 dark:bg-violet-500/20',
        description: 'Требуется оплата для активации'
    },
    ACTIVE: {
        label: 'Активен',
        color: 'text-emerald-600 dark:text-emerald-400',
        bgColor: 'bg-emerald-100 dark:bg-emerald-500/20',
        description: 'Решение активно и доступно'
    },
    CANCELLED: {
        label: 'Отменён',
        color: 'text-slate-600 dark:text-slate-400',
        bgColor: 'bg-slate-100 dark:bg-slate-500/20',
        description: 'Заказ отменён'
    },
    EXPIRED: {
        label: 'Истёк',
        color: 'text-slate-600 dark:text-slate-400',
        bgColor: 'bg-slate-100 dark:bg-slate-500/20',
        description: 'Срок подписки истёк'
    }
};
