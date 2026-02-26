import { useMemo } from 'react';
import { type Category, type ViewMode } from './types';
import { CategoryCard } from './CategoryCard';
import { CategoryListItem } from './CategoryListItem';
import { CategorySkeleton, CategoryListSkeleton } from './CategorySkeleton';

interface CategoriesGridProps {
    categories: Category[];
    viewMode: ViewMode;
    isLoading?: boolean;
}

export function CategoriesGrid({ categories, viewMode, isLoading = false }: CategoriesGridProps) {
    // Memoize the rendered categories to prevent unnecessary re-renders
    const renderedCategories = useMemo(() => {
        if (viewMode === 'grid') {
            return categories.map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} />
            ));
        }

        return categories.map((category, index) => (
            <CategoryListItem key={category.id} category={category} index={index} />
        ));
    }, [categories, viewMode]);

    if (isLoading) {
        return viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                    <CategorySkeleton key={i} />
                ))}
            </div>
        ) : (
            <div className="flex flex-col gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                    <CategoryListSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Ничего не найдено
                </h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                    Попробуйте изменить параметры поиска или сбросить фильтры
                </p>
            </div>
        );
    }

    if (viewMode === 'grid') {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {renderedCategories}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {renderedCategories}
        </div>
    );
}
