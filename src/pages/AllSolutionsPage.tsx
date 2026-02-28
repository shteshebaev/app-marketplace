import { useState, useMemo, useCallback } from 'react';
import {
    AllSolutionsHero,
    AllSolutionsFilterBar,
    RecommendedSolutions,
    SolutionsGrid,
    CompareBar,
    SolutionsCTA,
    QuickCategorySelect,
    getAllSolutions,
    getAllCategories,
    getGlobalRecommendedSolutions,
    getAverageRating,
    getTotalSolutionsCount,
    getTotalCategoriesCount,
    availableTags
} from '../components/solutions';
import type { AllSolutionsFilterState } from '../components/solutions/AllSolutionsFilterBar';
import type { Solution, CompareItem } from '../components/solutions';
import { useConnectSolution } from '../hooks/useConnectSolution';

interface AllSolutionsPageProps {
    onOrderDevelopment: () => void;
    onSolutionSelect?: (solutionId: string) => void;
}



export function AllSolutionsPage({
    onOrderDevelopment,
    onSolutionSelect
}: AllSolutionsPageProps) {
    const { connectSolution } = useConnectSolution();
    const allSolutions = getAllSolutions();
    const allCategories = getAllCategories();
    const recommendedSolutions = getGlobalRecommendedSolutions();
    const avgRating = getAverageRating();
    const totalSolutions = getTotalSolutionsCount();
    const totalCategories = getTotalCategoriesCount();

    const [filters, setFilters] = useState<AllSolutionsFilterState>({
        search: '',
        sort: 'popular',
        minRating: 0,
        tags: [],
        categories: [],
        viewMode: 'grid'
    });

    const [compareItems, setCompareItems] = useState<CompareItem[]>([]);
    const [isLoading] = useState(false);

    const filteredSolutions = useMemo(() => {
        let result = [...allSolutions];

        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(s =>
                s.name.toLowerCase().includes(searchLower) ||
                s.description.toLowerCase().includes(searchLower)
            );
        }

        // Category filter
        if (filters.categories.length > 0) {
            result = result.filter(s => filters.categories.includes(s.categoryId));
        }

        // Rating filter
        if (filters.minRating > 0) {
            result = result.filter(s => s.rating >= filters.minRating);
        }

        // Tags filter
        if (filters.tags.length > 0) {
            result = result.filter(s =>
                filters.tags.some(tag => s.tags.includes(tag))
            );
        }

        // Sort
        switch (filters.sort) {
            case 'popular':
                result.sort((a, b) => (b.clientsCount || 0) - (a.clientsCount || 0));
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'price-asc':
                result.sort((a, b) => {
                    const priceA = parseInt(a.price.replace(/\s/g, '')) || 0;
                    const priceB = parseInt(b.price.replace(/\s/g, '')) || 0;
                    return priceA - priceB;
                });
                break;
            case 'price-desc':
                result.sort((a, b) => {
                    const priceA = parseInt(a.price.replace(/\s/g, '')) || 0;
                    const priceB = parseInt(b.price.replace(/\s/g, '')) || 0;
                    return priceB - priceA;
                });
                break;
            case 'newest':
                result.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
                break;
        }

        return result;
    }, [allSolutions, filters]);

    const handleCompareToggle = useCallback((solution: Solution) => {
        setCompareItems(prev => {
            const exists = prev.find(item => item.id === solution.id);
            if (exists) {
                return prev.filter(item => item.id !== solution.id);
            }
            if (prev.length >= 3) {
                return prev;
            }
            return [...prev, {
                id: solution.id,
                name: solution.name,
                logo: solution.logo
            }];
        });
    }, []);

    const handleCompareRemove = useCallback((id: string) => {
        setCompareItems(prev => prev.filter(item => item.id !== id));
    }, []);

    const handleCompareClear = useCallback(() => {
        setCompareItems([]);
    }, []);

    const handleCompare = useCallback(() => {
        console.log('Compare:', compareItems);
    }, [compareItems]);

    const handleResetFilters = useCallback(() => {
        setFilters({
            search: '',
            sort: 'popular',
            minRating: 0,
            tags: [],
            categories: [],
            viewMode: filters.viewMode
        });
    }, [filters.viewMode]);

    const handleCategoryToggle = useCallback((categoryId: string) => {
        setFilters(prev => {
            const isSelected = prev.categories.includes(categoryId);
            return {
                ...prev,
                categories: isSelected
                    ? prev.categories.filter(id => id !== categoryId)
                    : [...prev.categories, categoryId]
            };
        });
    }, []);

    const handleSolutionSelect = useCallback((solutionId: string) => {
        if (onSolutionSelect) {
            onSolutionSelect(solutionId);
        } else {
            console.log('Select solution:', solutionId);
        }
    }, [onSolutionSelect]);

    const handleSolutionConnect = useCallback((solutionId: string) => {
        const solution = allSolutions.find(s => s.id === solutionId);
        if (solution) {
            connectSolution(solution);
        }
    }, [allSolutions, connectSolution]);

    // Check if any filters are active
    const hasActiveFilters = filters.search || filters.minRating > 0 || filters.tags.length > 0 || filters.categories.length > 0;

    return (
        <div className="min-h-screen bg-[var(--bg-default)]">
            {/* Hero Section */}
            <AllSolutionsHero
                totalSolutions={totalSolutions}
                totalCategories={totalCategories}
                avgRating={avgRating}
            />

            {/* Quick Category Select */}
            <QuickCategorySelect
                categories={allCategories}
                selectedCategories={filters.categories}
                onCategoryToggle={handleCategoryToggle}
            />

            {/* Recommended Solutions (show only when no filters active) */}
            {!hasActiveFilters && recommendedSolutions.length > 0 && (
                <RecommendedSolutions
                    solutions={recommendedSolutions}
                    onSelect={handleSolutionSelect}
                    title="Рекомендуемые решения"
                    subtitle="Лучшие продукты по версии наших клиентов"
                />
            )}

            {/* Filter Bar */}
            <AllSolutionsFilterBar
                filters={filters}
                onFiltersChange={setFilters}
                availableTags={availableTags}
                availableCategories={allCategories}
                resultsCount={filteredSolutions.length}
            />

            {/* Solutions Grid */}
            <section className="py-8">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                    <SolutionsGrid
                        solutions={filteredSolutions}
                        viewMode={filters.viewMode}
                        isLoading={isLoading}
                        compareItems={compareItems}
                        onCompareToggle={handleCompareToggle}
                        onSolutionSelect={handleSolutionSelect}
                        onSolutionConnect={handleSolutionConnect}
                        onResetFilters={handleResetFilters}
                        onOrderDevelopment={onOrderDevelopment}
                    />
                </div>
            </section>

            {/* CTA Section */}
            <SolutionsCTA
                categoryName=""
                onOrderDevelopment={onOrderDevelopment}
            />

            {/* Compare Bar */}
            <CompareBar
                items={compareItems}
                onRemove={handleCompareRemove}
                onClear={handleCompareClear}
                onCompare={handleCompare}
            />
        </div>
    );
}
