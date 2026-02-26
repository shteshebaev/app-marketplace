export interface Category {
    id: string;
    name: string;
    description: string;
    icon: string;
    count: number;
    gradient: string;
    color: string;
    isPopular?: boolean;
    updatedAt?: Date;
}

export type ViewMode = 'grid' | 'list';

export type SortOption = 'popular' | 'count' | 'alphabetical';

export interface FilterState {
    search: string;
    sort: SortOption;
    onlyPopular: boolean;
    viewMode: ViewMode;
}
