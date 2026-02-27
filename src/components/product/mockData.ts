import type { SolutionProfile, ProductNavAnchor } from './types';

// Mock product profile for CRM Pro Enterprise
export const mockProductProfiles: Record<string, SolutionProfile> = {
    'crm-1': {
        // Base Solution fields
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
        gradient: 'from-blue-500 to-indigo-600',

        // Extended fields
        tagline: 'Увеличьте продажи на 40% с помощью AI-аналитики',

        heroImage: {
            id: 'hero-1',
            url: '',
            alt: 'CRM Pro Enterprise Dashboard',
            type: 'hero',
            gradient: 'from-blue-600 to-indigo-700'
        },

        video: {
            id: 'video-1',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            thumbnailUrl: '',
            title: 'Как CRM Pro Enterprise помогает увеличить продажи',
            duration: '3:45'
        },

        keyBenefits: [
            {
                icon: 'trending-up',
                title: '+40% к продажам',
                description: 'Средний рост выручки наших клиентов за первый год'
            },
            {
                icon: 'clock',
                title: '-60% времени',
                description: 'Экономия на рутинных операциях благодаря автоматизации'
            },
            {
                icon: 'users',
                title: '1250+ компаний',
                description: 'Уже доверяют нам управление своими продажами'
            }
        ],

        gallery: [
            { id: 'g1', url: '', alt: 'Главная панель управления', type: 'screenshot', gradient: 'from-blue-500 to-cyan-500' },
            { id: 'g2', url: '', alt: 'Аналитика и отчёты', type: 'screenshot', gradient: 'from-violet-500 to-purple-500' },
            { id: 'g3', url: '', alt: 'Управление контактами', type: 'screenshot', gradient: 'from-emerald-500 to-teal-500' },
            { id: 'g4', url: '', alt: 'Воронка продаж', type: 'screenshot', gradient: 'from-orange-500 to-red-500' },
            { id: 'g5', url: '', alt: 'Мобильное приложение', type: 'screenshot', gradient: 'from-pink-500 to-rose-500' }
        ],

        features: [
            {
                id: 'f1',
                icon: 'bar-chart-2',
                title: 'AI-аналитика',
                description: 'Прогнозирование продаж и автоматические рекомендации на основе машинного обучения',
                category: 'Аналитика'
            },
            {
                id: 'f2',
                icon: 'git-branch',
                title: 'Воронка продаж',
                description: 'Визуальное управление сделками на всех этапах с автоматическими напоминаниями',
                category: 'Продажи'
            },
            {
                id: 'f3',
                icon: 'mail',
                title: 'Email-трекинг',
                description: 'Отслеживание открытий писем, кликов и автоматические follow-up цепочки',
                category: 'Коммуникации'
            },
            {
                id: 'f4',
                icon: 'plug',
                title: 'Интеграции',
                description: 'Более 100 готовых интеграций с популярными сервисами и открытый API',
                category: 'Техническое'
            },
            {
                id: 'f5',
                icon: 'smartphone',
                title: 'Мобильное приложение',
                description: 'Полнофункциональное приложение для iOS и Android с офлайн-режимом',
                category: 'Техническое'
            },
            {
                id: 'f6',
                icon: 'shield-check',
                title: 'Безопасность',
                description: 'Шифрование данных, двухфакторная аутентификация, соответствие GDPR',
                category: 'Безопасность'
            }
        ],

        demo: {
            type: 'sandbox',
            url: 'https://demo.crmpro.example.com',
            buttonText: 'Попробовать демо',
            description: 'Получите доступ к полнофункциональной демо-версии с тестовыми данными',
            duration: '14 дней',
            credentials: {
                login: 'demo@company.com',
                password: 'demo123'
            }
        },

        pricing: {
            tiers: [
                {
                    id: 'starter',
                    name: 'Starter',
                    description: 'Для небольших команд',
                    price: '15 000',
                    priceType: 'monthly',
                    priceNote: 'до 5 пользователей',
                    features: [
                        'Управление контактами',
                        'Базовая воронка продаж',
                        'Email-интеграция',
                        'Мобильное приложение',
                        'Поддержка по email'
                    ],
                    ctaText: 'Начать бесплатно'
                },
                {
                    id: 'professional',
                    name: 'Professional',
                    description: 'Для растущих компаний',
                    price: '45 000',
                    priceType: 'monthly',
                    priceNote: 'до 25 пользователей',
                    features: [
                        'Всё из Starter',
                        'AI-аналитика',
                        'Расширенные отчёты',
                        'API доступ',
                        '50+ интеграций',
                        'Приоритетная поддержка'
                    ],
                    isPopular: true,
                    ctaText: 'Выбрать план'
                },
                {
                    id: 'enterprise',
                    name: 'Enterprise',
                    description: 'Для крупных организаций',
                    price: 'По запросу',
                    priceType: 'custom',
                    features: [
                        'Всё из Professional',
                        'Безлимитные пользователи',
                        'Выделенный сервер',
                        'SLA 99.9%',
                        'Персональный менеджер',
                        'Кастомная разработка'
                    ],
                    ctaText: 'Связаться с нами'
                }
            ],
            comparison: [
                { feature: 'Количество пользователей', values: { starter: 'до 5', professional: 'до 25', enterprise: 'Безлимит' } },
                { feature: 'Хранилище данных', values: { starter: '5 GB', professional: '50 GB', enterprise: 'Безлимит' } },
                { feature: 'AI-аналитика', values: { starter: false, professional: true, enterprise: true } },
                { feature: 'API доступ', values: { starter: false, professional: true, enterprise: true } },
                { feature: 'Кастомные отчёты', values: { starter: false, professional: true, enterprise: true } },
                { feature: 'SLA', values: { starter: '99%', professional: '99.5%', enterprise: '99.9%' } }
            ],
            billingNote: 'Все цены указаны без НДС. При оплате за год — скидка 20%.'
        },

        reviews: [
            {
                id: 'r1',
                authorName: 'Алексей Петров',
                authorRole: 'Коммерческий директор',
                authorCompany: 'TechStart',
                rating: 5,
                title: 'Лучшее решение для отдела продаж',
                content: 'Внедрили CRM Pro год назад и увидели реальный рост продаж на 35%. Особенно нравится AI-аналитика — она реально помогает приоритизировать сделки.',
                date: '2024-01-15',
                isVerified: true
            },
            {
                id: 'r2',
                authorName: 'Мария Сидорова',
                authorRole: 'Руководитель отдела продаж',
                authorCompany: 'Digital Agency',
                rating: 5,
                title: 'Интуитивный интерфейс',
                content: 'Команда освоила систему за неделю без специального обучения. Интеграция с почтой работает безупречно.',
                date: '2024-02-20',
                isVerified: true
            },
            {
                id: 'r3',
                authorName: 'Дмитрий Козлов',
                authorRole: 'CEO',
                authorCompany: 'SalesMaster',
                rating: 4,
                title: 'Отличная система с потенциалом',
                content: 'В целом очень доволен. Хотелось бы больше кастомизации в отчётах, но техподдержка обещала добавить в следующем обновлении.',
                date: '2024-03-10',
                isVerified: true
            }
        ],

        techInfo: [
            {
                section: 'Технические требования',
                items: [
                    { label: 'Браузеры', value: 'Chrome 90+, Firefox 88+, Safari 14+, Edge 90+' },
                    { label: 'Мобильные ОС', value: 'iOS 14+, Android 10+' },
                    { label: 'Интернет', value: 'Стабильное соединение от 1 Мбит/с' }
                ]
            },
            {
                section: 'Безопасность',
                items: [
                    { label: 'Шифрование', value: 'AES-256, TLS 1.3' },
                    { label: 'Сертификация', value: 'ISO 27001, SOC 2 Type II' },
                    { label: 'Соответствие', value: 'GDPR, 152-ФЗ' }
                ]
            },
            {
                section: 'Интеграции',
                items: [
                    { label: 'Email', value: 'Gmail, Outlook, Mail.ru, Яндекс.Почта' },
                    { label: 'Мессенджеры', value: 'Telegram, WhatsApp, VK' },
                    { label: 'Телефония', value: 'Mango Office, Билайн, МегаФон' }
                ]
            }
        ],

        faq: [
            {
                id: 'faq1',
                question: 'Как быстро можно внедрить CRM Pro?',
                answer: 'Базовое внедрение занимает 1-3 дня. Полноценная настройка с интеграциями и обучением — 2-4 недели в зависимости от сложности процессов.',
                category: 'Внедрение'
            },
            {
                id: 'faq2',
                question: 'Можно ли перенести данные из другой CRM?',
                answer: 'Да, мы поддерживаем импорт из Битрикс24, amoCRM, 1С и других популярных систем. Наши специалисты помогут с миграцией бесплатно.',
                category: 'Внедрение'
            },
            {
                id: 'faq3',
                question: 'Какие способы оплаты доступны?',
                answer: 'Принимаем оплату картами, безналичный расчёт для юрлиц, оплату через СБП. Возможна рассрочка на 6-12 месяцев.',
                category: 'Оплата'
            },
            {
                id: 'faq4',
                question: 'Есть ли пробный период?',
                answer: 'Да, предоставляем 14 дней бесплатного доступа к полной версии Professional. Не требуется привязка карты.',
                category: 'Оплата'
            },
            {
                id: 'faq5',
                question: 'Как работает техническая поддержка?',
                answer: 'Поддержка доступна по email, телефону и в чате. Starter — в рабочие часы, Professional — 12/7, Enterprise — 24/7 с персональным менеджером.',
                category: 'Поддержка'
            }
        ],

        vendor: {
            name: 'CRM Pro Inc.',
            website: 'https://crmpro.example.com',
            supportEmail: 'support@crmpro.example.com',
            supportPhone: '+7 (800) 123-45-67'
        },

        ctaPrimary: {
            text: 'Попробовать бесплатно'
        },
        ctaSecondary: {
            text: 'Связаться с нами'
        },

        lastUpdated: '2024-03-15',
        version: '3.2.1'
    }
};

// Navigation anchors
export const productNavAnchors: ProductNavAnchor[] = [
    { id: 'overview', label: 'Обзор', icon: 'eye' },
    { id: 'video', label: 'Видео', icon: 'play-circle' },
    { id: 'features', label: 'Возможности', icon: 'grid' },
    { id: 'pricing', label: 'Тарифы', icon: 'credit-card' },
    { id: 'reviews', label: 'Отзывы', icon: 'message-circle' }
];

// Get product profile by ID
export function getProductProfile(id: string): SolutionProfile | null {
    return mockProductProfiles[id] || null;
}

// Check if product has extended profile
export function hasProductProfile(id: string): boolean {
    return id in mockProductProfiles;
}
