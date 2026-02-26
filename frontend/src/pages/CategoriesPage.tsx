import { useState, useMemo, useCallback, useEffect } from 'react';
import {
    CategoriesHero,
    CategoriesFilterBar,
    CategoriesGrid,
    PopularCategoriesBlock,
    CustomDevelopmentCTA,
    type Category,
    type FilterState,
    type SortOption,
    type ViewMode,
} from '../components/categories';

// Mock data - в production это будет API call
const allCategories: Category[] = [
    { id: 'crm', name: 'CRM-системы', description: 'Управление взаимоотношениями с клиентами', icon: 'users', count: 24, gradient: 'from-blue-500 to-blue-600', color: 'blue', isPopular: true },
    { id: 'ecommerce', name: 'Интернет-магазины', description: 'Платформы для онлайн продаж', icon: 'shopping-cart', count: 18, gradient: 'from-violet-500 to-purple-600', color: 'violet', isPopular: true },
    { id: 'delivery', name: 'Доставка', description: 'Логистика и управление доставкой', icon: 'truck', count: 12, gradient: 'from-emerald-500 to-teal-600', color: 'emerald', isPopular: true },
    { id: 'education', name: 'Образование', description: 'Платформы онлайн обучения', icon: 'graduation-cap', count: 15, gradient: 'from-amber-500 to-orange-500', color: 'amber', isPopular: true },
    { id: 'fitness', name: 'Фитнес и здоровье', description: 'Решения для спорта и wellness', icon: 'dumbbell', count: 9, gradient: 'from-rose-500 to-pink-600', color: 'rose' },
    { id: 'warehouse', name: 'Склад и логистика', description: 'Учёт и управление складом', icon: 'warehouse', count: 11, gradient: 'from-slate-500 to-slate-600', color: 'slate' },
    { id: 'realestate', name: 'Недвижимость', description: 'Аренда и продажа недвижимости', icon: 'building', count: 8, gradient: 'from-cyan-500 to-blue-500', color: 'cyan' },
    { id: 'food', name: 'HoReCa', description: 'Решения для ресторанов и кафе', icon: 'utensils', count: 14, gradient: 'from-orange-500 to-red-500', color: 'orange' },
    { id: 'hr', name: 'HR и рекрутинг', description: 'Управление персоналом', icon: 'briefcase', count: 7, gradient: 'from-indigo-500 to-violet-600', color: 'indigo' },
    { id: 'healthcare', name: 'Медицина', description: 'Решения для здравоохранения', icon: 'heart', count: 6, gradient: 'from-red-500 to-rose-600', color: 'red' },
    { id: 'it', name: 'IT и разработка', description: 'Инструменты для разработчиков', icon: 'cpu', count: 19, gradient: 'from-gray-600 to-gray-700', color: 'gray' },
    { id: 'analytics', name: 'Аналитика', description: 'Бизнес-аналитика и отчётность', icon: 'bar-chart', count: 13, gradient: 'from-blue-600 to-indigo-600', color: 'blue' },
    { id: 'marketing', name: 'Маркетинг', description: 'Инструменты продвижения', icon: 'megaphone', count: 16, gradient: 'from-pink-500 to-rose-500', color: 'pink' },
    { id: 'design', name: 'Дизайн', description: 'Инструменты для дизайнеров', icon: 'palette', count: 5, gradient: 'from-fuchsia-500 to-purple-600', color: 'fuchsia' },
    { id: 'communication', name: 'Коммуникации', description: 'Мессенджеры и видеосвязь', icon: 'globe', count: 10, gradient: 'from-teal-500 to-cyan-600', color: 'teal' },
];

const DEBOUNCE_DELAY = 300;

export function CategoriesPage() {
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        sort: 'popular',
        onlyPopular: false,
        viewMode: 'grid',
    });
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(filters.search);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timer);
    }, [filters.search]);

    // Filter and sort categories
    const filteredCategories = useMemo(() => {
        let result = [...allCategories];

        // Filter by search
        if (debouncedSearch) {
            const searchLower = debouncedSearch.toLowerCase();
            result = result.filter(
                (cat) =>
                    cat.name.toLowerCase().includes(searchLower) ||
                    cat.description.toLowerCase().includes(searchLower)
            );
        }

        // Filter by popular
        if (filters.onlyPopular) {
            result = result.filter((cat) => cat.isPopular);
        }

        // Sort
        switch (filters.sort) {
            case 'popular':
                result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.count - a.count);
                break;
            case 'count':
                result.sort((a, b) => b.count - a.count);
                break;
            case 'alphabetical':
                result.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
                break;
        }

        return result;
    }, [debouncedSearch, filters.sort, filters.onlyPopular]);

    // Handlers
    const handleSearchChange = useCallback((search: string) => {
        setFilters((prev) => ({ ...prev, search }));
    }, []);

    const handleSortChange = useCallback((sort: SortOption) => {
        setFilters((prev) => ({ ...prev, sort }));
    }, []);

    const handlePopularToggle = useCallback(() => {
        setFilters((prev) => ({ ...prev, onlyPopular: !prev.onlyPopular }));
    }, []);

    const handleViewModeChange = useCallback((viewMode: ViewMode) => {
        setFilters((prev) => ({ ...prev, viewMode }));
    }, []);

    // Stats
    const totalCategories = allCategories.length;
    const totalSolutions = allCategories.reduce((sum, cat) => sum + cat.count, 0);

    return (
        <div className="min-h-[calc(100vh-72px)] bg-[#f8fafc] dark:bg-[#0a0a0f]">
            <div className="max-w-[1400px] mx-auto px-6 py-8">
                {/* Hero Section */}
                <CategoriesHero
                    totalCategories={totalCategories}
                    totalSolutions={totalSolutions}
                    hasRecentUpdates={true}
                />

                {/* Filter Bar */}
                <CategoriesFilterBar
                    filters={filters}
                    onSearchChange={handleSearchChange}
                    onSortChange={handleSortChange}
                    onPopularToggle={handlePopularToggle}
                    onViewModeChange={handleViewModeChange}
                    resultsCount={filteredCategories.length}
                />

                {/* Popular Categories Block - only show if not filtering */}
                {!filters.search && !filters.onlyPopular && filters.viewMode === 'grid' && (
                    <PopularCategoriesBlock categories={allCategories} />
                )}

                {/* Section header for all categories */}
                {!filters.search && !filters.onlyPopular && filters.viewMode === 'grid' && (
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Все категории
                        </h2>
                    </div>
                )}

                {/* Categories Grid/List */}
                <CategoriesGrid
                    categories={filteredCategories}
                    viewMode={filters.viewMode}
                    isLoading={isLoading}
                />

                {/* Custom Development CTA */}
                <CustomDevelopmentCTA />
            </div>
        </div>
    );
}
