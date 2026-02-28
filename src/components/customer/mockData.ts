import type { Order, Subscription, Notification } from '../../types';

// Mock user data
export const mockUser = {
    id: 'user-1',
    name: 'Александр Петров',
    email: 'alexander@company.uz',
    company: 'ООО "ТехноПром"',
    role: 'USER' as const,
    avatar: undefined,
    createdAt: '2024-01-15T10:00:00Z'
};

// Mock orders
export const mockOrders: Order[] = [
    {
        id: 'order-1',
        userId: 'user-1',
        productId: 'prod-1',
        productName: '1C:Бухгалтерия',
        productLogo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop',
        developerId: 'dev-1',
        developerName: '1С Узбекистан',
        planId: 'plan-1',
        planName: 'Профессиональный',
        price: '450 000 сум/мес',
        billingPeriod: 'monthly',
        status: 'ACTIVE',
        paymentStatus: 'PAID',
        createdAt: '2024-01-20T10:00:00Z',
        updatedAt: '2024-01-25T14:00:00Z',
        approvedAt: '2024-01-21T09:00:00Z',
        activatedAt: '2024-01-25T14:00:00Z'
    },
    {
        id: 'order-2',
        userId: 'user-1',
        productId: 'prod-2',
        productName: 'CRM Pro',
        productLogo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop',
        developerId: 'dev-2',
        developerName: 'SoftDev Solutions',
        planId: 'plan-2',
        planName: 'Бизнес',
        price: '320 000 сум/мес',
        billingPeriod: 'monthly',
        status: 'PENDING',
        paymentStatus: 'UNPAID',
        comment: 'Нужна интеграция с нашей ERP системой',
        createdAt: '2024-02-10T08:30:00Z',
        updatedAt: '2024-02-10T08:30:00Z'
    },
    {
        id: 'order-3',
        userId: 'user-1',
        productId: 'prod-3',
        productName: 'HR Management',
        productLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        developerId: 'dev-3',
        developerName: 'HR Tech',
        planId: 'plan-3',
        planName: 'Стартап',
        price: '180 000 сум/мес',
        billingPeriod: 'monthly',
        status: 'APPROVED',
        paymentStatus: 'UNPAID',
        createdAt: '2024-02-08T15:00:00Z',
        updatedAt: '2024-02-09T11:00:00Z',
        approvedAt: '2024-02-09T11:00:00Z'
    },
    {
        id: 'order-4',
        userId: 'user-1',
        productId: 'prod-4',
        productName: 'Warehouse Pro',
        productLogo: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=100&h=100&fit=crop',
        developerId: 'dev-4',
        developerName: 'LogiSoft',
        planId: 'plan-4',
        planName: 'Базовый',
        price: '150 000 сум/мес',
        billingPeriod: 'monthly',
        status: 'REJECTED',
        paymentStatus: 'UNPAID',
        createdAt: '2024-02-05T09:00:00Z',
        updatedAt: '2024-02-06T10:00:00Z',
        rejectedAt: '2024-02-06T10:00:00Z',
        rejectionReason: 'К сожалению, данный тариф не поддерживает интеграцию с вашей системой. Рекомендуем тариф "Бизнес".'
    },
    {
        id: 'order-5',
        userId: 'user-1',
        productId: 'prod-5',
        productName: 'Analytics Dashboard',
        productLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
        developerId: 'dev-5',
        developerName: 'DataViz',
        planId: 'plan-5',
        planName: 'Корпоративный',
        price: '890 000 сум/мес',
        billingPeriod: 'monthly',
        status: 'WAITING_PAYMENT',
        paymentStatus: 'PENDING',
        createdAt: '2024-02-12T14:00:00Z',
        updatedAt: '2024-02-13T09:00:00Z',
        approvedAt: '2024-02-13T09:00:00Z'
    }
];

// Mock subscriptions
export const mockSubscriptions: Subscription[] = [
    {
        id: 'sub-1',
        userId: 'user-1',
        orderId: 'order-1',
        productId: 'prod-1',
        productName: '1C:Бухгалтерия',
        productLogo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop',
        developerId: 'dev-1',
        developerName: '1С Узбекистан',
        planId: 'plan-1',
        planName: 'Профессиональный',
        price: '450 000 сум',
        billingPeriod: 'monthly',
        status: 'ACTIVE',
        startDate: '2024-01-25T14:00:00Z',
        endDate: '2024-02-25T14:00:00Z',
        nextPaymentDate: '2024-02-25T00:00:00Z',
        autoRenew: true,
        createdAt: '2024-01-25T14:00:00Z',
        updatedAt: '2024-01-25T14:00:00Z'
    },
    {
        id: 'sub-2',
        userId: 'user-1',
        orderId: 'order-old-1',
        productId: 'prod-6',
        productName: 'Email Marketing Pro',
        productLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop',
        developerId: 'dev-6',
        developerName: 'MailTech',
        planId: 'plan-6',
        planName: 'Бизнес',
        price: '280 000 сум',
        billingPeriod: 'monthly',
        status: 'ACTIVE',
        startDate: '2024-01-10T10:00:00Z',
        endDate: '2024-02-10T10:00:00Z',
        nextPaymentDate: '2024-02-10T00:00:00Z',
        autoRenew: true,
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-10T10:00:00Z'
    },
    {
        id: 'sub-3',
        userId: 'user-1',
        orderId: 'order-old-2',
        productId: 'prod-7',
        productName: 'Project Manager',
        productLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
        developerId: 'dev-7',
        developerName: 'TaskFlow',
        planId: 'plan-7',
        planName: 'Команда',
        price: '350 000 сум',
        billingPeriod: 'monthly',
        status: 'SUSPENDED',
        startDate: '2023-12-01T10:00:00Z',
        endDate: '2024-01-01T10:00:00Z',
        autoRenew: false,
        createdAt: '2023-12-01T10:00:00Z',
        updatedAt: '2024-01-02T10:00:00Z'
    }
];

// Mock notifications
export const mockNotifications: Notification[] = [
    {
        id: 'notif-1',
        userId: 'user-1',
        type: 'ORDER_APPROVED',
        title: 'Заявка одобрена',
        message: 'Ваша заявка на "HR Management" была одобрена. Теперь вы можете произвести оплату.',
        isRead: false,
        actionUrl: '/dashboard/orders/order-3',
        actionLabel: 'Перейти к оплате',
        relatedOrderId: 'order-3',
        relatedProductId: 'prod-3',
        createdAt: '2024-02-09T11:00:00Z'
    },
    {
        id: 'notif-2',
        userId: 'user-1',
        type: 'PAYMENT_REQUIRED',
        title: 'Требуется оплата',
        message: 'Для активации "Analytics Dashboard" необходимо произвести оплату в течение 3 дней.',
        isRead: false,
        actionUrl: '/dashboard/orders/order-5',
        actionLabel: 'Оплатить',
        relatedOrderId: 'order-5',
        relatedProductId: 'prod-5',
        createdAt: '2024-02-13T09:05:00Z'
    },
    {
        id: 'notif-3',
        userId: 'user-1',
        type: 'SUBSCRIPTION_EXPIRING',
        title: 'Подписка заканчивается',
        message: 'Ваша подписка на "Email Marketing Pro" истекает через 5 дней. Продлите подписку, чтобы не потерять доступ.',
        isRead: false,
        actionUrl: '/dashboard/subscriptions/sub-2',
        actionLabel: 'Продлить',
        relatedProductId: 'prod-6',
        createdAt: '2024-02-05T08:00:00Z'
    },
    {
        id: 'notif-4',
        userId: 'user-1',
        type: 'ORDER_REJECTED',
        title: 'Заявка отклонена',
        message: 'К сожалению, ваша заявка на "Warehouse Pro" была отклонена. Смотрите причину отказа.',
        isRead: true,
        actionUrl: '/dashboard/orders/order-4',
        actionLabel: 'Подробнее',
        relatedOrderId: 'order-4',
        relatedProductId: 'prod-4',
        createdAt: '2024-02-06T10:05:00Z'
    },
    {
        id: 'notif-5',
        userId: 'user-1',
        type: 'PAYMENT_SUCCESS',
        title: 'Оплата успешна',
        message: 'Оплата за "1C:Бухгалтерия" прошла успешно. Решение активировано.',
        isRead: true,
        actionUrl: '/dashboard/solutions/prod-1',
        actionLabel: 'Открыть',
        relatedOrderId: 'order-1',
        relatedProductId: 'prod-1',
        createdAt: '2024-01-25T14:05:00Z'
    },
    {
        id: 'notif-6',
        userId: 'user-1',
        type: 'SYSTEM',
        title: 'Добро пожаловать!',
        message: 'Добро пожаловать в IT Market! Исследуйте каталог решений для вашего бизнеса.',
        isRead: true,
        actionUrl: '/catalog',
        actionLabel: 'Перейти в каталог',
        createdAt: '2024-01-15T10:00:00Z'
    }
];

// Dashboard stats
export const mockDashboardStats = {
    activeSolutions: 2,
    pendingOrders: 3,
    totalSpent: '1 450 000',
    nextPayment: '25 февраля'
};

// Recommended products for cross-sell
export const mockRecommendedProducts = [
    {
        id: 'rec-1',
        name: 'Документооборот Pro',
        shortDescription: 'Электронный документооборот для бизнеса',
        logo: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=100&h=100&fit=crop',
        developerName: 'DocFlow',
        rating: 4.8,
        price: '220 000 сум/мес',
        category: 'Документооборот'
    },
    {
        id: 'rec-2',
        name: 'Интеграция 1С-CRM',
        shortDescription: 'Бесшовная интеграция систем',
        logo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop',
        developerName: 'IntegratePro',
        rating: 4.6,
        price: '180 000 сум/мес',
        category: 'Интеграции'
    },
    {
        id: 'rec-3',
        name: 'Телефония для бизнеса',
        shortDescription: 'IP-телефония с записью звонков',
        logo: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=100&h=100&fit=crop',
        developerName: 'CallCenter Pro',
        rating: 4.7,
        price: '150 000 сум/мес',
        category: 'Коммуникации'
    }
];
