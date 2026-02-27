import type { Developer, DeveloperStats } from '../../types/developer';
import type { DeveloperProduct } from '../../types/developer-product';

export const mockDeveloper: Developer = {
    id: 'dev-1',
    slug: 'techsolutions',
    companyName: 'TechSolutions',
    logo: undefined,
    description: 'Разрабатываем корпоративные решения для автоматизации бизнес-процессов',
    aboutCompany: `TechSolutions — ведущий разработчик CRM и ERP-систем в СНГ. Мы помогаем компаниям автоматизировать рутинные процессы, повысить продуктивность команд и увеличить продажи.

Наша миссия — делать технологии доступными для бизнеса любого масштаба. Мы работаем с малым, средним и крупным бизнесом, предлагая гибкие решения под конкретные задачи.

За 10 лет работы мы реализовали более 500 проектов и помогли клиентам увеличить эффективность в среднем на 40%.`,
    foundedYear: 2014,
    employeesCount: '50-100',
    rating: 4.8,
    reviewsCount: 156,
    productsCount: 5,
    clientsCount: 500,
    contact: {
        email: 'info@techsolutions.ru',
        phone: '+7 (495) 123-45-67',
        address: 'Москва, ул. Тверская, д. 1'
    },
    socialLinks: {
        website: 'https://techsolutions.ru',
        telegram: 'https://t.me/techsolutions',
        linkedin: 'https://linkedin.com/company/techsolutions'
    },
    isVerified: true,
    isActive: true,
    createdAt: '2014-03-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
};

export const mockDeveloperStats: DeveloperStats = {
    totalViews: 125000,
    totalClicks: 12500,
    totalInquiries: 890,
    ctr: 10,
    viewsByProduct: {
        'crm-pro': 45000,
        'crm-lite': 35000,
        'crm-mobile': 25000,
        'erp-enterprise': 15000,
        'analytics-pro': 5000
    },
    viewsByDay: [
        { date: '2024-01-09', views: 450 },
        { date: '2024-01-10', views: 520 },
        { date: '2024-01-11', views: 480 },
        { date: '2024-01-12', views: 380 },
        { date: '2024-01-13', views: 290 },
        { date: '2024-01-14', views: 310 },
        { date: '2024-01-15', views: 540 }
    ],
    topProducts: [
        { id: 'crm-pro', name: 'CRM Pro Enterprise', views: 45000 },
        { id: 'crm-lite', name: 'CRM Lite', views: 35000 },
        { id: 'crm-mobile', name: 'CRM Mobile', views: 25000 }
    ]
};

export const mockDeveloperProducts: DeveloperProduct[] = [
    {
        id: 'crm-pro',
        developerId: 'dev-1',
        status: 'approved',
        name: 'CRM Pro Enterprise',
        categoryId: 'crm',
        shortDescription: 'Полнофункциональная CRM-система для крупного бизнеса',
        logo: undefined,
        tags: ['CRM', 'Продажи', 'Автоматизация', 'Enterprise'],
        fullDescription: 'Комплексное решение для управления взаимоотношениями с клиентами',
        features: [
            'Воронка продаж: управление сделками на всех этапах',
            'Аналитика: детальные отчеты и дашборды',
            'Интеграции: 1С, телефония, email, мессенджеры'
        ],
        targetAudience: 'Компании от 50 сотрудников',
        useCases: ['B2B продажи', 'Управление проектами', 'Сервисный бизнес'],
        screenshots: [],
        demoUrl: 'https://demo.crmpro.ru',
        demoCredentials: { login: 'demo', password: 'demo123' },
        pricing: [
            {
                id: 'start',
                name: 'Start',
                price: '15 000 ₽',
                priceType: 'monthly',
                description: 'Для небольших команд',
                features: ['До 5 пользователей', 'Базовая CRM', 'Email поддержка'],
                isPopular: false,
                ctaText: 'Начать'
            },
            {
                id: 'business',
                name: 'Business',
                price: '45 000 ₽',
                priceType: 'monthly',
                description: 'Для растущих компаний',
                features: ['До 25 пользователей', 'Расширенная CRM', 'Интеграции', 'Приоритетная поддержка'],
                isPopular: true,
                ctaText: 'Выбрать'
            },
            {
                id: 'enterprise',
                name: 'Enterprise',
                price: 'По запросу',
                priceType: 'custom',
                description: 'Индивидуально',
                features: ['Безлимитные пользователи', 'Кастомизация', 'SLA', 'Персональный менеджер'],
                isPopular: false,
                ctaText: 'Связаться'
            }
        ],
        techRequirements: [
            {
                section: 'Браузеры',
                items: [
                    { label: 'Chrome', value: '90+' },
                    { label: 'Firefox', value: '88+' },
                    { label: 'Safari', value: '14+' }
                ]
            }
        ],
        integrations: ['1С:Предприятие', 'Битрикс24', 'amoCRM', 'Telegram', 'WhatsApp'],
        apiAvailable: true,
        slaLevel: '99.9% uptime',
        supportOptions: ['Email 24/7', 'Телефон', 'Чат'],
        createdAt: '2023-06-15T10:00:00Z',
        updatedAt: '2024-01-10T14:30:00Z',
        approvedAt: '2023-07-01T00:00:00Z'
    },
    {
        id: 'crm-lite',
        developerId: 'dev-1',
        status: 'approved',
        name: 'CRM Lite',
        categoryId: 'crm',
        shortDescription: 'Легкая CRM для малого бизнеса',
        logo: undefined,
        tags: ['CRM', 'Малый бизнес', 'Простая'],
        fullDescription: 'Простая и понятная CRM-система для небольших команд',
        features: [
            'Контакты: управление базой клиентов',
            'Сделки: простая воронка продаж'
        ],
        targetAudience: 'Компании до 20 сотрудников',
        useCases: ['Малый бизнес', 'Фрилансеры', 'Стартапы'],
        screenshots: [],
        pricing: [
            {
                id: 'free',
                name: 'Free',
                price: '0 ₽',
                priceType: 'monthly',
                description: 'Бесплатно навсегда',
                features: ['До 2 пользователей', 'Базовый функционал'],
                isPopular: false,
                isFree: true,
                ctaText: 'Начать бесплатно'
            },
            {
                id: 'pro',
                name: 'Pro',
                price: '5 000 ₽',
                priceType: 'monthly',
                description: 'Для команд',
                features: ['До 10 пользователей', 'Все функции', 'Поддержка'],
                isPopular: true,
                ctaText: 'Выбрать'
            }
        ],
        techRequirements: [
            {
                section: 'Требования',
                items: [
                    { label: 'Браузер', value: 'Любой современный браузер' }
                ]
            }
        ],
        integrations: ['Telegram'],
        apiAvailable: false,
        supportOptions: ['Email'],
        createdAt: '2024-01-01T10:00:00Z',
        updatedAt: '2024-01-15T14:30:00Z',
        approvedAt: '2024-01-05T00:00:00Z'
    },
    {
        id: 'erp-draft',
        developerId: 'dev-1',
        status: 'draft',
        name: 'ERP System',
        categoryId: 'erp',
        shortDescription: 'ERP-система в разработке',
        logo: undefined,
        tags: ['ERP'],
        fullDescription: '',
        features: [],
        targetAudience: '',
        useCases: [],
        screenshots: [],
        pricing: [],
        techRequirements: [],
        integrations: [],
        apiAvailable: false,
        supportOptions: [],
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-10T10:00:00Z'
    },
    {
        id: 'analytics-pending',
        developerId: 'dev-1',
        status: 'pending',
        name: 'Analytics Pro',
        categoryId: 'bi',
        shortDescription: 'Система бизнес-аналитики',
        logo: undefined,
        tags: ['BI', 'Аналитика', 'Отчеты'],
        fullDescription: 'Мощная система бизнес-аналитики с визуализацией данных',
        features: [
            'Дашборды: интерактивные панели',
            'Отчеты: автоматические отчеты'
        ],
        targetAudience: 'Аналитики и руководители',
        useCases: ['Отчетность', 'Прогнозирование'],
        screenshots: [],
        pricing: [
            {
                id: 'team',
                name: 'Team',
                price: '25 000 ₽',
                priceType: 'monthly',
                description: 'Для команд',
                features: ['До 10 пользователей', 'Все визуализации'],
                isPopular: true,
                ctaText: 'Выбрать'
            }
        ],
        techRequirements: [
            {
                section: 'Браузеры',
                items: [
                    { label: 'Chrome', value: '90+' }
                ]
            }
        ],
        integrations: ['PostgreSQL', 'MySQL', 'ClickHouse'],
        apiAvailable: true,
        supportOptions: ['Email'],
        submittedAt: '2024-01-14T10:00:00Z',
        createdAt: '2024-01-12T10:00:00Z',
        updatedAt: '2024-01-14T10:00:00Z'
    }
];
