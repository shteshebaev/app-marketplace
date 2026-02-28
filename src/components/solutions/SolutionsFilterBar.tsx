import { Search, SlidersHorizontal, Star, LayoutGrid, List, ChevronDown, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { SolutionFilterState, SolutionSortOption, SolutionViewMode } from './types';
import { useState } from 'react';

interface SolutionsFilterBarProps {
    filters: SolutionFilterState;
    onFiltersChange: (filters: SolutionFilterState) => void;
    availableTags: string[];
    resultsCount: number;
}

const ratingOptions = [4.5, 4.0, 3.5, 0];

export function SolutionsFilterBar({
    filters,
    onFiltersChange,
    availableTags,
    resultsCount
}: SolutionsFilterBarProps) {
    const { t } = useTranslation();
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    const sortOptions: { value: SolutionSortOption; label: string }[] = [
        { value: 'popular', label: t('solutions.sortPopular') },
        { value: 'rating', label: t('solutions.sortRating') },
        { value: 'price-asc', label: t('solutions.sortPriceAsc') },
        { value: 'price-desc', label: t('solutions.sortPriceDesc') },
        { value: 'newest', label: t('solutions.sortNewest') }
    ];

    const getSolutionsWord = (count: number) => {
        if (count === 1) return t('solutions.solution');
        if (count >= 2 && count <= 4) return t('solutions.solutions2_4');
        return t('solutions.solutions5');
    };

    const updateFilter = <K extends keyof SolutionFilterState>(
        key: K,
        value: SolutionFilterState[K]
    ) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    const toggleTag = (tag: string) => {
        const newTags = filters.tags.includes(tag)
            ? filters.tags.filter(t => t !== tag)
            : [...filters.tags, tag];
        updateFilter('tags', newTags);
    };

    const resetFilters = () => {
        onFiltersChange({
            search: '',
            sort: 'popular',
            minRating: 0,
            tags: [],
            viewMode: filters.viewMode,
            showAdvanced: false
        });
    };

    const hasActiveFilters = filters.search || filters.minRating > 0 || filters.tags.length > 0;

    return (
        <div className="sticky top-0 z-20 bg-[var(--bg-default)]/95 backdrop-blur-xl border-b border-[var(--border-color)]">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4">
                {/* Main Filter Row */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
                        <input
                            type="text"
                            placeholder={t('solutions.searchPlaceholder')}
                            value={filters.search}
                            onChange={(e) => updateFilter('search', e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)]
                                rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]
                                focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
                                transition-all"
                        />
                        {filters.search && (
                            <button
                                onClick={() => updateFilter('search', '')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-[var(--hover-overlay)] rounded-full"
                            >
                                <X className="w-4 h-4 text-[var(--text-tertiary)]" />
                            </button>
                        )}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowSortDropdown(!showSortDropdown)}
                            className="flex items-center gap-2 px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)]
                                rounded-xl hover:border-[var(--text-tertiary)] transition-all min-w-[180px]"
                        >
                            <span className="text-[var(--text-secondary)] text-sm">{t('solutions.sortLabel')}</span>
                            <span className="text-[var(--text-primary)] font-medium text-sm flex-1 text-left">
                                {sortOptions.find(o => o.value === filters.sort)?.label}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-[var(--text-tertiary)] transition-transform
                                ${showSortDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showSortDropdown && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowSortDropdown(false)}
                                />
                                <div className="absolute top-full left-0 mt-2 w-full bg-[var(--bg-card)] border
                                    border-[var(--border-color)] rounded-xl shadow-xl z-20 overflow-hidden">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                updateFilter('sort', option.value);
                                                setShowSortDropdown(false);
                                            }}
                                            className={`w-full px-4 py-3 text-left text-sm hover:bg-[var(--hover-overlay)]
                                                transition-colors ${filters.sort === option.value
                                                    ? 'text-blue-500 font-medium bg-blue-50 dark:bg-blue-500/10'
                                                    : 'text-[var(--text-primary)]'}`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Rating Filter */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm text-[var(--text-secondary)] hidden sm:inline">{t('solutions.ratingLabel')}</span>
                        <div className="flex items-center gap-1">
                            {ratingOptions.map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => updateFilter('minRating', rating)}
                                    className={`px-2 py-1 rounded-lg text-sm transition-all
                                        ${filters.minRating === rating
                                            ? 'bg-amber-500 text-white font-medium'
                                            : 'text-[var(--text-secondary)] hover:bg-[var(--hover-overlay)]'}`}
                                >
                                    {rating === 0 ? t('solutions.ratingAll') : `${rating}+`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Advanced Filters Toggle */}
                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all
                            ${showAdvanced
                                ? 'bg-blue-500 border-blue-500 text-white'
                                : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--text-tertiary)]'}`}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span className="text-sm font-medium">{t('solutions.filtersBtn')}</span>
                        {filters.tags.length > 0 && (
                            <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center
                                ${showAdvanced ? 'bg-white/20' : 'bg-blue-500 text-white'}`}>
                                {filters.tags.length}
                            </span>
                        )}
                    </button>

                    {/* View Toggle */}
                    <div className="flex items-center gap-1 p-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl">
                        <button
                            onClick={() => updateFilter('viewMode', 'grid' as SolutionViewMode)}
                            className={`p-2 rounded-lg transition-all
                                ${filters.viewMode === 'grid'
                                    ? 'bg-blue-500 text-white'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => updateFilter('viewMode', 'list' as SolutionViewMode)}
                            className={`p-2 rounded-lg transition-all
                                ${filters.viewMode === 'list'
                                    ? 'bg-blue-500 text-white'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Advanced Filters (Tags) */}
                {showAdvanced && (
                    <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm text-[var(--text-secondary)]">{t('solutions.tagsLabel')}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {availableTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={`px-3 py-1.5 rounded-full text-sm transition-all
                                        ${filters.tags.includes(tag)
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-blue-500'}`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Results Count & Reset */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border-color)]">
                    <span className="text-sm text-[var(--text-secondary)]">
                        {t('solutions.foundLabel')} <span className="font-semibold text-[var(--text-primary)]">{resultsCount}</span>
                        {' '}{getSolutionsWord(resultsCount)}
                    </span>

                    {hasActiveFilters && (
                        <button
                            onClick={resetFilters}
                            className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                            {t('solutions.resetFilters')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
