import type { Solution } from '../solutions/types';

// Media types
export interface ProductImage {
    id: string;
    url: string;
    alt: string;
    type: 'screenshot' | 'preview' | 'hero';
    gradient?: string;
}

export interface ProductVideo {
    id: string;
    url: string;
    thumbnailUrl: string;
    title: string;
    duration?: string;
}

// Key benefits for video section
export interface KeyBenefit {
    icon: string;
    title: string;
    description: string;
}

// Product features
export interface ProductFeature {
    id: string;
    icon: string;
    title: string;
    description: string;
    category?: string;
}

// Demo access
export interface ProductDemo {
    type: 'sandbox' | 'trial' | 'live-demo' | 'video';
    url: string;
    buttonText: string;
    description: string;
    duration?: string;
    credentials?: {
        login: string;
        password: string;
    };
}

// Pricing tier
export interface PricingTier {
    id: string;
    name: string;
    description: string;
    price: string;
    priceType: 'monthly' | 'yearly' | 'one-time' | 'custom';
    priceNote?: string;
    features: string[];
    isPopular?: boolean;
    isFree?: boolean;
    ctaText: string;
    ctaUrl?: string;
}

// Pricing comparison row
export interface PricingComparisonRow {
    feature: string;
    description?: string;
    values: Record<string, boolean | string>;
}

// Review
export interface ProductReview {
    id: string;
    authorName: string;
    authorRole: string;
    authorCompany: string;
    authorAvatar?: string;
    rating: number;
    title: string;
    content: string;
    date: string;
    isVerified?: boolean;
}

// Technical info
export interface TechInfo {
    section: string;
    items: {
        label: string;
        value: string;
    }[];
}

// FAQ
export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category?: string;
}

// Navigation anchor
export interface ProductNavAnchor {
    id: string;
    label: string;
    icon?: string;
}

// Vendor info
export interface VendorInfo {
    name: string;
    logo?: string;
    website?: string;
    supportEmail?: string;
    supportPhone?: string;
}

// Extended product profile
export interface SolutionProfile extends Solution {
    // Hero section
    tagline: string;
    heroImage?: ProductImage;

    // Video section
    video?: ProductVideo;
    keyBenefits: KeyBenefit[];

    // Gallery
    gallery: ProductImage[];

    // Features
    features: ProductFeature[];

    // Demo
    demo?: ProductDemo;

    // Pricing
    pricing: {
        tiers: PricingTier[];
        comparison?: PricingComparisonRow[];
        billingNote?: string;
    };

    // Reviews
    reviews: ProductReview[];

    // Technical info
    techInfo: TechInfo[];

    // FAQ
    faq: FAQItem[];

    // Vendor
    vendor?: VendorInfo;

    // CTA
    ctaPrimary: {
        text: string;
        url?: string;
    };
    ctaSecondary?: {
        text: string;
        url?: string;
    };

    // Meta
    lastUpdated?: string;
    version?: string;
}

// Navigation state for sticky nav
export interface ProductNavState {
    activeSection: string;
    isSticky: boolean;
    showCTA: boolean;
}
