import { useState, useMemo, useCallback } from 'react';
import {
    CategoryHeader,
    RecommendedSolutions,
    SolutionsFilterBar,
    SolutionsGrid,
    CompareBar,
    SolutionsCTA,
    HelpPrompt,
    categoryDetails,
    getSolutionsByCategory,
    getTopSolutions,
    availableTags
} from '../components/solutions';
import type { SolutionFilterState, Solution, CompareItem } from '../components/solutions';
import { useConnectSolution } from '../hooks/useConnectSolution';

interface SolutionsPageProps {
    categoryId: string;
    onNavigateHome: () => void;
    onNavigateCategories: () => void;
    onSolutionSelect?: (solutionId: string) => void;
}

export function SolutionsPage({
    categoryId,
    onNavigateHome,
    onNavigateCategories,
    onSolutionSelect
}: SolutionsPageProps) {
    const { connectSolution } = useConnectSolution();
    const category = categoryDetails[categoryId];
    const allSolutions = getSolutionsByCategory(categoryId);
    const topSolutions = getTopSolutions(categoryId);

    const [filters, setFilters] = useState<SolutionFilterState>({
        search: '',
        sort: 'popular',
        minRating: 0,
        tags: [],
        viewMode: 'grid',
        showAdvanced: false
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
                // For demo, prioritize items with 'new' badge
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
        // TODO: Navigate to compare page
        console.log('Compare:', compareItems);
    }, [compareItems]);

    const handleResetFilters = useCallback(() => {
        setFilters({
            search: '',
            sort: 'popular',
            minRating: 0,
            tags: [],
            viewMode: filters.viewMode,
            showAdvanced: false
        });
    }, [filters.viewMode]);

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

    const handleStartQuiz = useCallback(() => {
        // TODO: Open quiz modal
        console.log('Start quiz');
    }, []);

    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                        Категория не найдена
                    </h1>
                    <button
                        onClick={onNavigateCategories}
                        className="text-blue-500 hover:text-blue-600"
                    >
                        Вернуться к категориям
                    </button>
                </div>
            </div>
        );
    }

    // Check if any filters are active (except viewMode and sort)
    const hasActiveFilters = filters.search || filters.minRating > 0 || filters.tags.length > 0;

    return (
        <div className="min-h-screen bg-[var(--bg-default)]">
            {/* Category Header */}
            <CategoryHeader
                category={category}
                onNavigateHome={onNavigateHome}
                onNavigateCategories={onNavigateCategories}
            />

            {/* Recommended Solutions (show only when no filters active) */}
            {!hasActiveFilters && topSolutions.length > 0 && (
                <RecommendedSolutions
                    solutions={topSolutions}
                    onSelect={handleSolutionSelect}
                />
            )}

            {/* Filter Bar */}
            <SolutionsFilterBar
                filters={filters}
                onFiltersChange={setFilters}
                availableTags={availableTags}
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
                    />
                </div>
            </section>

            {/* CTA Section */}
            <SolutionsCTA categoryName={category.name} />

            {/* Compare Bar */}
            <CompareBar
                items={compareItems}
                onRemove={handleCompareRemove}
                onClear={handleCompareClear}
                onCompare={handleCompare}
            />

            {/* Help Prompt */}
            <HelpPrompt onStartQuiz={handleStartQuiz} />
        </div>
    );
}
