import { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, Star, LayoutGrid, List, ChevronDown, X, Folder, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { SolutionSortOption, SolutionViewMode, CategoryDetails } from './types';

export interface AllSolutionsFilterState {
    search: string;
    sort: SolutionSortOption;
    minRating: number;
    tags: string[];
    categories: string[];
    viewMode: SolutionViewMode;
}

interface AllSolutionsFilterBarProps {
    filters: AllSolutionsFilterState;
    onFiltersChange: (filters: AllSolutionsFilterState) => void;
    availableTags: string[];
    availableCategories: CategoryDetails[];
    resultsCount: number;
}

const ratingOptions = [4.5, 4.0, 3.5, 0];

export function AllSolutionsFilterBar({
    filters,
    onFiltersChange,
    availableTags,
    availableCategories,
    resultsCount
}: AllSolutionsFilterBarProps) {
    const { t } = useTranslation();

    const sortOptions: { value: SolutionSortOption; label: string }[] = [
        { value: 'popular', label: t('allSolutions.sortPopular') },
        { value: 'rating', label: t('allSolutions.sortRating') },
        { value: 'price-asc', label: t('allSolutions.sortPriceAsc') },
        { value: 'price-desc', label: t('allSolutions.sortPriceDesc') },
        { value: 'newest', label: t('allSolutions.sortNewest') }
    ];

    const [showAdvanced, setShowAdvanced] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const categoryDropdownRef = useRef<HTMLDivElement>(null);

    const updateFilter = <K extends keyof AllSolutionsFilterState>(
        key: K,
        value: AllSolutionsFilterState[K]
    ) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    const toggleTag = (tag: string) => {
        const newTags = filters.tags.includes(tag)
            ? filters.tags.filter(t => t !== tag)
            : [...filters.tags, tag];
        updateFilter('tags', newTags);
    };

    const toggleCategory = (categoryId: string) => {
        const newCategories = filters.categories.includes(categoryId)
            ? filters.categories.filter(c => c !== categoryId)
            : [...filters.categories, categoryId];
        updateFilter('categories', newCategories);
    };

    const resetFilters = () => {
        onFiltersChange({
            search: '',
            sort: 'popular',
            minRating: 0,
            tags: [],
            categories: [],
            viewMode: filters.viewMode
        });
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
                setShowCategoryDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const hasActiveFilters = filters.search || filters.minRating > 0 || filters.tags.length > 0 || filters.categories.length > 0;
    const activeFiltersCount = (filters.minRating > 0 ? 1 : 0) + filters.tags.length + filters.categories.length;

    return (
        <div className="sticky top-[72px] z-20 bg-[var(--bg-default)]/95 backdrop-blur-xl border-b border-[var(--border-color)]">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-10 py-4">
                {/* Mobile: Search + Filter Toggle */}
                <div className="flex items-center gap-2 lg:hidden">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
                        <input
                            type="text"
                            placeholder={t('allSolutions.searchPlaceholder')}
                            value={filters.search}
                            onChange={(e) => updateFilter('search', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)]
                                rounded-xl text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]
                                focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                        />
                        {filters.search && (
                            <button
                                onClick={() => updateFilter('search', '')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-[var(--hover-overlay)] rounded-full"
                            >
                                <X className="w-4 h-4 text-[var(--text-tertiary)]" />
                            </button>
                        )}
                    </div>

                    {/* Filter Toggle Button */}
                    <button
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className={`relative flex items-center justify-center w-11 h-11 rounded-xl border transition-all
                            ${showMobileFilters || activeFiltersCount > 0
                                ? 'bg-blue-500 border-blue-500 text-white'
                                : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-primary)]'}`}
                    >
                        <Filter className="w-5 h-5" />
                        {activeFiltersCount > 0 && !showMobileFilters && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>

                    {/* View Toggle */}
                    <div className="flex items-center gap-0.5 p-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl">
                        <button
                            onClick={() => updateFilter('viewMode', 'grid' as SolutionViewMode)}
                            className={`p-2 rounded-lg transition-all
                                ${filters.viewMode === 'grid'
                                    ? 'bg-blue-500 text-white'
                                    : 'text-[var(--text-secondary)]'}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => updateFilter('viewMode', 'list' as SolutionViewMode)}
                            className={`p-2 rounded-lg transition-all
                                ${filters.viewMode === 'list'
                                    ? 'bg-blue-500 text-white'
                                    : 'text-[var(--text-secondary)]'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Mobile Filters Panel */}
                {showMobileFilters && (
                    <div className="lg:hidden mt-4 pt-4 border-t border-[var(--border-color)] space-y-4">
                        {/* Sort */}
                        <div>
                            <label className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide mb-2 block">
                                {t('allSolutions.sortLabel')}
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => updateFilter('sort', option.value)}
                                        className={`px-3 py-2 rounded-lg text-sm transition-all
                                            ${filters.sort === option.value
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]'}`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide mb-2 block">
                                {t('allSolutions.minRating')}
                            </label>
                            <div className="flex items-center gap-2">
                                {ratingOptions.map((rating) => (
                                    <button
                                        key={rating}
                                        onClick={() => updateFilter('minRating', rating)}
                                        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all
                                            ${filters.minRating === rating
                                                ? 'bg-amber-500 text-white'
                                                : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]'}`}
                                    >
                                        {rating > 0 && <Star className="w-3.5 h-3.5 fill-current" />}
                                        {rating === 0 ? t('allSolutions.ratingAll') : `${rating}+`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <label className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide mb-2 block">
                                {t('allSolutions.categoriesTitle')}
                            </label>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => updateFilter('categories', [])}
                                    className={`px-3 py-2 rounded-lg text-sm transition-all
                                        ${filters.categories.length === 0
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]'}`}
                                >
                                    {t('allSolutions.ratingAll')}
                                </button>
                                {availableCategories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => toggleCategory(category.id)}
                                        className={`px-3 py-2 rounded-lg text-sm transition-all
                                            ${filters.categories.includes(category.id)
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]'}`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide mb-2 block">
                                {t('allSolutions.tagsLabel')}
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {availableTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={`px-3 py-1.5 rounded-full text-sm transition-all
                                            ${filters.tags.includes(tag)
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)]'}`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Reset & Apply */}
                        <div className="flex items-center gap-3 pt-2">
                            {hasActiveFilters && (
                                <button
                                    onClick={resetFilters}
                                    className="flex-1 py-2.5 text-sm text-red-500 border border-red-200 dark:border-red-500/30 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                >
                                    {t('allSolutions.reset')}
                                </button>
                            )}
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="flex-1 py-2.5 text-sm text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors"
                            >
                                {t('allSolutions.show')} {resultsCount} {resultsCount === 1 ? t('allSolutions.solution1') : resultsCount < 5 ? t('allSolutions.solution2_4') : t('allSolutions.solution5')}
                            </button>
                        </div>
                    </div>
                )}

                {/* Desktop: Full Filter Row */}
                <div className="hidden lg:flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
                        <input
                            type="text"
                            placeholder={t('allSolutions.searchPlaceholderFull')}
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

                    {/* Category Multi-Select */}
                    <div className="relative" ref={categoryDropdownRef}>
                        <button
                            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                            className={`flex items-center gap-2 px-4 py-3 border rounded-xl transition-all min-w-[180px]
                                ${filters.categories.length > 0
                                    ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400'
                                    : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--text-tertiary)]'}`}
                        >
                            <Folder className="w-4 h-4" />
                            <span className="text-sm font-medium flex-1 text-left">
                                {filters.categories.length > 0
                                    ? `${filters.categories.length} ${filters.categories.length === 1 ? t('allSolutions.category1') : filters.categories.length < 5 ? t('allSolutions.category2_4') : t('allSolutions.category5')}`
                                    : t('allSolutions.allCategories')}
                            </span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showCategoryDropdown && (
                            <div className="absolute top-full left-0 mt-2 w-72 bg-[var(--bg-card)] border
                                border-[var(--border-color)] rounded-xl shadow-xl z-30 overflow-hidden">
                                <div className="p-2 border-b border-[var(--border-color)]">
                                    <button
                                        onClick={() => updateFilter('categories', [])}
                                        className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-colors
                                            ${filters.categories.length === 0
                                                ? 'bg-blue-500 text-white'
                                                : 'hover:bg-[var(--hover-overlay)] text-[var(--text-primary)]'}`}
                                    >
                                        {t('allSolutions.allCategories')}
                                    </button>
                                </div>
                                <div className="p-2 max-h-64 overflow-y-auto">
                                    {availableCategories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => toggleCategory(category.id)}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm rounded-lg
                                                transition-colors ${filters.categories.includes(category.id)
                                                    ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                                    : 'hover:bg-[var(--hover-overlay)] text-[var(--text-primary)]'}`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.gradient}
                                                flex items-center justify-center flex-shrink-0`}>
                                                <span className="text-white text-xs font-bold">
                                                    {category.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium truncate">{category.name}</div>
                                                <div className="text-xs text-[var(--text-tertiary)]">{category.count} {t('allSolutions.solutionsCount')}</div>
                                            </div>
                                            {filters.categories.includes(category.id) && (
                                                <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center">
                                                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                                                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowSortDropdown(!showSortDropdown)}
                            className="flex items-center gap-2 px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)]
                                rounded-xl hover:border-[var(--text-tertiary)] transition-all min-w-[180px]"
                        >
                            <span className="text-[var(--text-secondary)] text-sm">{t('allSolutions.sortLabel')}:</span>
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
                        <span className="text-sm text-[var(--text-secondary)] hidden sm:inline">{t('allSolutions.ratingLabel')}:</span>
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
                                    {rating === 0 ? t('allSolutions.ratingAll') : `${rating}+`}
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
                        <span className="text-sm font-medium">{t('allSolutions.tagsBtn')}</span>
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

                {/* Desktop: Advanced Filters (Tags) */}
                {showAdvanced && (
                    <div className="hidden lg:block mt-4 pt-4 border-t border-[var(--border-color)]">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm text-[var(--text-secondary)]">{t('allSolutions.tagsLabel')}:</span>
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

                {/* Results Count & Reset - Desktop */}
                <div className="hidden lg:flex items-center justify-between mt-4 pt-4 border-t border-[var(--border-color)]">
                    <span className="text-sm text-[var(--text-secondary)]">
                        {t('allSolutions.found')}: <span className="font-semibold text-[var(--text-primary)]">{resultsCount}</span>
                        {resultsCount === 1 ? ` ${t('allSolutions.solution1')}` : resultsCount < 5 ? ` ${t('allSolutions.solution2_4')}` : ` ${t('allSolutions.solution5')}`}
                    </span>

                    {hasActiveFilters && (
                        <button
                            onClick={resetFilters}
                            className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                            {t('allSolutions.resetFilters')}
                        </button>
                    )}
                </div>

                {/* Results Count - Mobile (when filters closed) */}
                {!showMobileFilters && (
                    <div className="flex lg:hidden items-center justify-between mt-3 pt-3 border-t border-[var(--border-color)]">
                        <span className="text-sm text-[var(--text-secondary)]">
                            {t('allSolutions.found')}: <span className="font-semibold text-[var(--text-primary)]">{resultsCount}</span>
                        </span>

                        {hasActiveFilters && (
                            <button
                                onClick={resetFilters}
                                className="flex items-center gap-1 text-sm text-blue-500"
                            >
                                <X className="w-4 h-4" />
                                {t('allSolutions.reset')}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
