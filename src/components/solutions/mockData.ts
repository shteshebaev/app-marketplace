import type { Solution, CategoryDetails } from './types';

export const categoryDetails: Record<string, CategoryDetails> = {
    crm: {
        id: 'crm',
        name: 'CRM-системы',
        description: 'Управление взаимоотношениями с клиентами',
        longDescription: 'Современные CRM-системы для автоматизации продаж, маркетинга и клиентского сервиса. Увеличьте конверсию и повысьте лояльность клиентов.',
        icon: 'users',
        count: 24,
        gradient: 'from-blue-500 to-blue-600',
        color: 'blue'
    },
    ecommerce: {
        id: 'ecommerce',
        name: 'Интернет-магазины',
        description: 'Платформы для онлайн продаж',
        longDescription: 'Готовые решения для запуска интернет-магазина. От простых витрин до крупных маркетплейсов с полной автоматизацией.',
        icon: 'shopping-cart',
        count: 18,
        gradient: 'from-violet-500 to-purple-600',
        color: 'violet'
    },
    delivery: {
        id: 'delivery',
        name: 'Доставка и логистика',
        description: 'Управление доставкой и складом',
        longDescription: 'Системы управления доставкой, отслеживания грузов и оптимизации логистических процессов для вашего бизнеса.',
        icon: 'truck',
        count: 12,
        gradient: 'from-emerald-500 to-teal-600',
        color: 'emerald'
    },
    education: {
        id: 'education',
        name: 'Образование',
        description: 'Платформы для обучения',
        longDescription: 'LMS-системы, платформы для онлайн-курсов и корпоративного обучения. Создавайте и продавайте свои курсы.',
        icon: 'graduation-cap',
        count: 15,
        gradient: 'from-amber-500 to-orange-500',
        color: 'amber'
    }
};

export const allSolutions: Solution[] = [
    // CRM Solutions
    {
        id: 'crm-1',
        name: 'CRM Pro Enterprise',
        description: 'Полнофункциональная CRM для крупных компаний с расширенной аналитикой и автоматизацией продаж',
        logo: 'building',
        categoryId: 'crm',
        rating: 4.9,
        reviewsCount: 342,
        price: '45 000',
        priceType: 'monthly',
        tags: ['API', 'Облако', 'Интеграции', 'AI'],
        badge: 'top',
        targetAudience: 'Для крупных компаний',
        isPopular: true,
        clientsCount: 1250,
        gradient: 'from-blue-500 to-indigo-600'
    },
    {
        id: 'crm-2',
        name: 'SalesForce Lite',
        description: 'Простая и интуитивная CRM для малого бизнеса. Быстрый старт за 15 минут',
        logo: 'users',
        categoryId: 'crm',
        rating: 4.7,
        reviewsCount: 528,
        price: '9 000',
        priceType: 'from',
        tags: ['Облако', 'Мобильное приложение'],
        badge: 'best-value',
        targetAudience: 'Для малого бизнеса',
        isPopular: true,
        clientsCount: 3400,
        gradient: 'from-cyan-500 to-blue-500'
    },
    {
        id: 'crm-3',
        name: 'LeadMaster',
        description: 'Специализированная CRM для управления лидами и воронкой продаж',
        logo: 'target',
        categoryId: 'crm',
        rating: 4.8,
        reviewsCount: 215,
        price: '15 000',
        priceType: 'monthly',
        tags: ['API', 'Автоматизация', 'Аналитика'],
        badge: 'new',
        targetAudience: 'Для отделов продаж',
        clientsCount: 890,
        gradient: 'from-violet-500 to-purple-500'
    },
    {
        id: 'crm-4',
        name: 'ClientHub',
        description: 'CRM с акцентом на клиентский сервис и поддержку. Тикеты, чаты, база знаний',
        logo: 'headphones',
        categoryId: 'crm',
        rating: 4.6,
        reviewsCount: 178,
        price: '12 000',
        priceType: 'monthly',
        tags: ['Чат-боты', 'Интеграции', 'Поддержка'],
        targetAudience: 'Для сервисных компаний',
        clientsCount: 650,
        gradient: 'from-emerald-500 to-teal-500'
    },
    {
        id: 'crm-5',
        name: 'B2B Sales Platform',
        description: 'Платформа для B2B продаж с длинным циклом сделки и сложной структурой клиентов',
        logo: 'briefcase',
        categoryId: 'crm',
        rating: 4.5,
        reviewsCount: 89,
        price: '35 000',
        priceType: 'monthly',
        tags: ['B2B', 'Документооборот', 'API'],
        badge: 'enterprise',
        targetAudience: 'Для B2B компаний',
        clientsCount: 320,
        gradient: 'from-slate-600 to-slate-700'
    },
    {
        id: 'crm-6',
        name: 'StartupCRM',
        description: 'Бесплатная CRM для стартапов до 10 пользователей. Все базовые функции включены',
        logo: 'rocket',
        categoryId: 'crm',
        rating: 4.4,
        reviewsCount: 892,
        price: '0',
        priceType: 'monthly',
        tags: ['Бесплатно', 'Облако'],
        badge: 'small-business',
        targetAudience: 'Для стартапов',
        isPopular: true,
        clientsCount: 8500,
        gradient: 'from-orange-500 to-red-500'
    },
    {
        id: 'crm-7',
        name: 'RealEstate CRM',
        description: 'Специализированная CRM для агентств недвижимости с картой объектов',
        logo: 'home',
        categoryId: 'crm',
        rating: 4.7,
        reviewsCount: 156,
        price: '18 000',
        priceType: 'monthly',
        tags: ['Недвижимость', 'Карты', 'Интеграции'],
        targetAudience: 'Для агентств недвижимости',
        clientsCount: 420,
        gradient: 'from-amber-500 to-orange-500'
    },
    {
        id: 'crm-8',
        name: 'TeleSales Pro',
        description: 'CRM для колл-центров с интеграцией телефонии и записью разговоров',
        logo: 'phone',
        categoryId: 'crm',
        rating: 4.3,
        reviewsCount: 234,
        price: '22 000',
        priceType: 'monthly',
        tags: ['Телефония', 'Запись', 'Скрипты'],
        targetAudience: 'Для колл-центров',
        clientsCount: 580,
        gradient: 'from-green-500 to-emerald-600'
    },

    // E-commerce Solutions
    {
        id: 'ecom-1',
        name: 'ShopMaster Pro',
        description: 'Профессиональная платформа для интернет-магазинов с неограниченным каталогом',
        logo: 'shopping-bag',
        categoryId: 'ecommerce',
        rating: 4.8,
        reviewsCount: 456,
        price: '25 000',
        priceType: 'monthly',
        tags: ['API', 'Маркетплейс', 'Интеграции'],
        badge: 'top',
        targetAudience: 'Для среднего бизнеса',
        isPopular: true,
        clientsCount: 2100,
        gradient: 'from-violet-500 to-purple-600'
    },
    {
        id: 'ecom-2',
        name: 'QuickStore',
        description: 'Запустите интернет-магазин за 1 день. Простой конструктор без программирования',
        logo: 'zap',
        categoryId: 'ecommerce',
        rating: 4.6,
        reviewsCount: 1234,
        price: '3 500',
        priceType: 'from',
        tags: ['Конструктор', 'Шаблоны', 'Быстрый старт'],
        badge: 'best-value',
        targetAudience: 'Для малого бизнеса',
        isPopular: true,
        clientsCount: 15000,
        gradient: 'from-pink-500 to-rose-500'
    },
    {
        id: 'ecom-3',
        name: 'MarketPlace Builder',
        description: 'Создайте собственный маркетплейс с системой продавцов и комиссий',
        logo: 'store',
        categoryId: 'ecommerce',
        rating: 4.5,
        reviewsCount: 89,
        price: '75 000',
        priceType: 'monthly',
        tags: ['Маркетплейс', 'B2B2C', 'Enterprise'],
        badge: 'enterprise',
        targetAudience: 'Для крупного бизнеса',
        clientsCount: 45,
        gradient: 'from-indigo-600 to-violet-700'
    },
    {
        id: 'ecom-4',
        name: 'FoodShop',
        description: 'Специализированная платформа для продажи продуктов питания с учётом сроков годности',
        logo: 'utensils',
        categoryId: 'ecommerce',
        rating: 4.4,
        reviewsCount: 167,
        price: '15 000',
        priceType: 'monthly',
        tags: ['Продукты', 'Доставка', 'Склад'],
        targetAudience: 'Для продуктовых магазинов',
        clientsCount: 380,
        gradient: 'from-orange-500 to-amber-500'
    },
    {
        id: 'ecom-5',
        name: 'DropShip Pro',
        description: 'Платформа для дропшиппинга с автоматической синхронизацией с поставщиками',
        logo: 'package',
        categoryId: 'ecommerce',
        rating: 4.3,
        reviewsCount: 298,
        price: '8 000',
        priceType: 'monthly',
        tags: ['Дропшиппинг', 'Автоматизация', 'Поставщики'],
        badge: 'new',
        targetAudience: 'Для начинающих',
        clientsCount: 920,
        gradient: 'from-teal-500 to-cyan-500'
    },

    // Delivery Solutions
    {
        id: 'del-1',
        name: 'DeliveryHub',
        description: 'Комплексная система управления доставкой с трекингом в реальном времени',
        logo: 'truck',
        categoryId: 'delivery',
        rating: 4.8,
        reviewsCount: 234,
        price: '30 000',
        priceType: 'monthly',
        tags: ['GPS', 'Трекинг', 'API'],
        badge: 'top',
        targetAudience: 'Для логистических компаний',
        isPopular: true,
        clientsCount: 560,
        gradient: 'from-emerald-500 to-teal-600'
    },
    {
        id: 'del-2',
        name: 'CourierApp',
        description: 'Мобильное приложение для курьеров с оптимизацией маршрутов',
        logo: 'map-pin',
        categoryId: 'delivery',
        rating: 4.6,
        reviewsCount: 567,
        price: '12 000',
        priceType: 'monthly',
        tags: ['Мобильное', 'Маршруты', 'Курьеры'],
        badge: 'best-value',
        targetAudience: 'Для служб доставки',
        clientsCount: 1200,
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        id: 'del-3',
        name: 'WarehouseOS',
        description: 'Система управления складом с автоматизацией процессов комплектации',
        logo: 'warehouse',
        categoryId: 'delivery',
        rating: 4.7,
        reviewsCount: 145,
        price: '45 000',
        priceType: 'monthly',
        tags: ['WMS', 'Автоматизация', 'Инвентаризация'],
        badge: 'enterprise',
        targetAudience: 'Для складских комплексов',
        clientsCount: 180,
        gradient: 'from-slate-600 to-gray-700'
    },
    {
        id: 'del-4',
        name: 'LastMile Express',
        description: 'Решение для last-mile доставки с интеграцией постаматов',
        logo: 'box',
        categoryId: 'delivery',
        rating: 4.5,
        reviewsCount: 198,
        price: '18 000',
        priceType: 'monthly',
        tags: ['Last-mile', 'Постаматы', 'Интеграции'],
        badge: 'new',
        targetAudience: 'Для e-commerce',
        clientsCount: 340,
        gradient: 'from-violet-500 to-purple-600'
    },

    // Education Solutions
    {
        id: 'edu-1',
        name: 'EduPlatform Pro',
        description: 'Полнофункциональная LMS для создания и продажи онлайн-курсов',
        logo: 'graduation-cap',
        categoryId: 'education',
        rating: 4.9,
        reviewsCount: 678,
        price: '20 000',
        priceType: 'monthly',
        tags: ['LMS', 'Видеокурсы', 'Сертификаты'],
        badge: 'top',
        targetAudience: 'Для онлайн-школ',
        isPopular: true,
        clientsCount: 1800,
        gradient: 'from-amber-500 to-orange-500'
    },
    {
        id: 'edu-2',
        name: 'CorpTraining',
        description: 'Платформа корпоративного обучения с отслеживанием прогресса сотрудников',
        logo: 'users',
        categoryId: 'education',
        rating: 4.7,
        reviewsCount: 234,
        price: '35 000',
        priceType: 'monthly',
        tags: ['HR', 'Тестирование', 'Аналитика'],
        badge: 'enterprise',
        targetAudience: 'Для корпораций',
        clientsCount: 420,
        gradient: 'from-indigo-500 to-blue-600'
    },
    {
        id: 'edu-3',
        name: 'TeachSimple',
        description: 'Простой инструмент для создания курсов. Идеален для экспертов и коучей',
        logo: 'book-open',
        categoryId: 'education',
        rating: 4.6,
        reviewsCount: 892,
        price: '5 000',
        priceType: 'from',
        tags: ['Простой старт', 'Коучинг', 'Вебинары'],
        badge: 'best-value',
        targetAudience: 'Для экспертов',
        isPopular: true,
        clientsCount: 4500,
        gradient: 'from-green-500 to-emerald-500'
    },
    {
        id: 'edu-4',
        name: 'KidsLearn',
        description: 'Образовательная платформа для детей с геймификацией и родительским контролем',
        logo: 'smile',
        categoryId: 'education',
        rating: 4.8,
        reviewsCount: 567,
        price: '8 000',
        priceType: 'monthly',
        tags: ['Дети', 'Геймификация', 'Безопасность'],
        badge: 'new',
        targetAudience: 'Для детских центров',
        clientsCount: 980,
        gradient: 'from-pink-500 to-rose-500'
    }
];

export const availableTags = [
    'API', 'Облако', 'Интеграции', 'AI', 'Мобильное приложение',
    'Автоматизация', 'Аналитика', 'B2B', 'Документооборот',
    'Бесплатно', 'Маркетплейс', 'Конструктор', 'GPS', 'Трекинг',
    'LMS', 'Видеокурсы', 'Тестирование', 'Геймификация'
];

export const getSolutionsByCategory = (categoryId: string): Solution[] => {
    return allSolutions.filter(s => s.categoryId === categoryId);
};

export const getTopSolutions = (categoryId: string): Solution[] => {
    const solutions = getSolutionsByCategory(categoryId);
    const top = solutions.find(s => s.badge === 'top');
    const bestValue = solutions.find(s => s.badge === 'best-value');
    const popular = solutions.find(s => s.isPopular && s.badge !== 'top' && s.badge !== 'best-value');
    return [top, bestValue, popular].filter(Boolean) as Solution[];
};

// Get all solutions
export const getAllSolutions = (): Solution[] => {
    return allSolutions;
};

// Get all categories as array
export const getAllCategories = (): CategoryDetails[] => {
    return Object.values(categoryDetails);
};

// Get global recommended solutions (across all categories)
export const getGlobalRecommendedSolutions = (): Solution[] => {
    const recommended: Solution[] = [];

    // Get top solutions from each category
    const categories = Object.keys(categoryDetails);
    for (const categoryId of categories) {
        const topInCategory = allSolutions.find(
            s => s.categoryId === categoryId && s.badge === 'top'
        );
        if (topInCategory && recommended.length < 4) {
            recommended.push(topInCategory);
        }
    }

    return recommended;
};

// Calculate average rating across all solutions
export const getAverageRating = (): number => {
    if (allSolutions.length === 0) return 0;
    const sum = allSolutions.reduce((acc, s) => acc + s.rating, 0);
    return Math.round((sum / allSolutions.length) * 10) / 10;
};

// Get total solutions count
export const getTotalSolutionsCount = (): number => {
    return allSolutions.length;
};

// Get total categories count
export const getTotalCategoriesCount = (): number => {
    return Object.keys(categoryDetails).length;
};
