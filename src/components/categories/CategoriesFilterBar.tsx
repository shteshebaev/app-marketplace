import { Search, ChevronDown, LayoutGrid, List, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { type FilterState, type SortOption, type ViewMode } from './types';

interface CategoriesFilterBarProps {
    filters: FilterState;
    onSearchChange: (search: string) => void;
    onSortChange: (sort: SortOption) => void;
    onPopularToggle: () => void;
    onViewModeChange: (mode: ViewMode) => void;
    resultsCount: number;
}

export function CategoriesFilterBar({
    filters,
    onSearchChange,
    onSortChange,
    onPopularToggle,
    onViewModeChange,
    resultsCount,
}: CategoriesFilterBarProps) {
    const { t } = useTranslation();

    const sortOptions: { value: SortOption; label: string }[] = [
        { value: 'popular', label: t('categoriesPage.sortPopular') },
        { value: 'count', label: t('categoriesPage.sortCount') },
        { value: 'alphabetical', label: t('categoriesPage.sortAlphabetical') },
    ];

    return (
        <div className="sticky top-[72px] z-40 -mx-6 px-6 py-4 mb-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Left side - Search and filters */}
                <div className="flex flex-wrap items-center gap-3 flex-1">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[200px] max-w-[320px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t('categoriesPage.searchPlaceholder')}
                            value={filters.search}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full h-11 pl-12 pr-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-all duration-200"
                        />
                    </div>

                    {/* Sort dropdown */}
                    <div className="relative">
                        <select
                            value={filters.sort}
                            onChange={(e) => onSortChange(e.target.value as SortOption)}
                            className="h-11 pl-4 pr-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent hover:border-slate-300 dark:hover:border-slate-600 text-slate-900 dark:text-white text-sm font-medium outline-none appearance-none cursor-pointer transition-all duration-200"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>

                    {/* Popular toggle */}
                    <button
                        onClick={onPopularToggle}
                        className={`flex items-center gap-2 h-11 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${
                            filters.onlyPopular
                                ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/25'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                    >
                        <Flame className="w-4 h-4" />
                        <span className="hidden sm:inline">{t('categoriesPage.popular')}</span>
                    </button>
                </div>

                {/* Right side - View mode and results */}
                <div className="flex items-center gap-4">
                    {/* Results count */}
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                        {resultsCount} {getResultsLabel(resultsCount, t)}
                    </span>

                    {/* View mode switcher */}
                    <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
                        <ViewModeButton
                            mode="grid"
                            currentMode={filters.viewMode}
                            onClick={() => onViewModeChange('grid')}
                            icon={<LayoutGrid className="w-4 h-4" />}
                        />
                        <ViewModeButton
                            mode="list"
                            currentMode={filters.viewMode}
                            onClick={() => onViewModeChange('list')}
                            icon={<List className="w-4 h-4" />}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ViewModeButtonProps {
    mode: ViewMode;
    currentMode: ViewMode;
    onClick: () => void;
    icon: React.ReactNode;
}

function ViewModeButton({ mode, currentMode, onClick, icon }: ViewModeButtonProps) {
    const isActive = mode === currentMode;

    return (
        <button
            onClick={onClick}
            className={`p-2 rounded-lg transition-all duration-200 ${
                isActive
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
            aria-label={mode === 'grid' ? 'Grid view' : 'List view'}
        >
            {icon}
        </button>
    );
}

function getResultsLabel(count: number, t: (key: string) => string): string {
    if (count === 1) return t('categoriesPage.category1');
    if (count >= 2 && count <= 4) return t('categoriesPage.category2_4');
    return t('categoriesPage.category5');
}
