export interface Solution {
    id: string;
    name: string;
    description: string;
    logo: string;
    categoryId: string;
    rating: number;
    reviewsCount: number;
    price: string;
    priceType: 'monthly' | 'yearly' | 'one-time' | 'from' | 'custom';
    tags: string[];
    badge?: 'top' | 'best-value' | 'new' | 'enterprise' | 'small-business';
    targetAudience?: string;
    isPopular?: boolean;
    clientsCount?: number;
    gradient: string;
}

export interface CategoryDetails {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    icon: string;
    count: number;
    gradient: string;
    color: string;
}

export type SolutionViewMode = 'grid' | 'list';

export type SolutionSortOption = 'popular' | 'rating' | 'price-asc' | 'price-desc' | 'newest';

export interface SolutionFilterState {
    search: string;
    sort: SolutionSortOption;
    minRating: number;
    tags: string[];
    viewMode: SolutionViewMode;
    showAdvanced: boolean;
}

export interface CompareItem {
    id: string;
    name: string;
    logo: string;
}
