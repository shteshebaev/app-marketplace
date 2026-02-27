import type { PricingTier, PricingComparisonRow, ProductImage, TechInfo } from '../components/product/types';

export type ProductStatus = 'draft' | 'pending' | 'approved' | 'rejected';

export interface ProductRejection {
    reason: string;
    rejectedAt: string;
    rejectedBy: string;
}

export interface DeveloperProduct {
    id: string;
    developerId: string;
    status: ProductStatus;

    // Step 1: Basic Info
    name: string;
    categoryId: string;
    shortDescription: string;
    logo?: string;
    tags: string[];

    // Step 2: Description
    fullDescription: string;
    features: string[];
    targetAudience: string;
    useCases: string[];

    // Step 3: Media
    screenshots: ProductImage[];
    videoUrl?: string;
    demoUrl?: string;
    demoCredentials?: {
        login: string;
        password: string;
    };

    // Step 4: Pricing
    pricing: PricingTier[];
    pricingComparison?: PricingComparisonRow[];
    billingNote?: string;

    // Step 5: Tech Info
    techRequirements: TechInfo[];
    integrations: string[];
    apiAvailable: boolean;
    slaLevel?: string;
    supportOptions: string[];
    documentationUrl?: string;

    // Meta
    rejection?: ProductRejection;
    submittedAt?: string;
    approvedAt?: string;
    createdAt: string;
    updatedAt: string;

    // Stats (only for approved)
    stats?: {
        views: number;
        clicks: number;
        inquiries: number;
    };
}

export interface ProductWizardState {
    currentStep: number;
    totalSteps: number;
    isValid: Record<number, boolean>;
    data: Partial<DeveloperProduct>;
    isDirty: boolean;
}

export const WIZARD_STEPS = [
    { id: 1, title: 'Основная информация', description: 'Название, категория, описание' },
    { id: 2, title: 'Описание', description: 'Полное описание, возможности' },
    { id: 3, title: 'Медиа', description: 'Скриншоты, видео, демо' },
    { id: 4, title: 'Тарифы', description: 'Цены и планы' },
    { id: 5, title: 'Техническая информация', description: 'API, интеграции, SLA' },
    { id: 6, title: 'Проверка', description: 'Превью и отправка' },
] as const;
