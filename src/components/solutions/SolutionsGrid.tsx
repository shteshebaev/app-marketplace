import { memo } from 'react';
import { Search, RefreshCw, Sparkles } from 'lucide-react';
import type { Solution, SolutionViewMode, CompareItem } from './types';
import { SolutionCard } from './SolutionCard';
import { SolutionListItem } from './SolutionListItem';

interface SolutionsGridProps {
    solutions: Solution[];
    viewMode: SolutionViewMode;
    isLoading?: boolean;
    compareItems: CompareItem[];
    onCompareToggle: (solution: Solution) => void;
    onSolutionSelect: (solutionId: string) => void;
    onSolutionConnect: (solutionId: string) => void;
    onResetFilters: () => void;
    onOrderDevelopment?: () => void;
}

function SolutionSkeleton({ viewMode }: { viewMode: SolutionViewMode }) {
    if (viewMode === 'list') {
        return (
            <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-4 lg:p-5 animate-pulse">
                <div className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-md bg-[var(--bg-default)]" />
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-[var(--bg-default)]" />
                    <div className="flex-1">
                        <div className="h-5 bg-[var(--bg-default)] rounded w-1/3 mb-2" />
                        <div className="h-4 bg-[var(--bg-default)] rounded w-2/3" />
                    </div>
                    <div className="hidden lg:flex gap-2">
                        <div className="h-6 w-16 bg-[var(--bg-default)] rounded-lg" />
                        <div className="h-6 w-16 bg-[var(--bg-default)] rounded-lg" />
                    </div>
                    <div className="hidden lg:block">
                        <div className="h-6 w-20 bg-[var(--bg-default)] rounded" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] p-6 animate-pulse">
            <div className="h-6 w-20 bg-[var(--bg-default)] rounded-full mb-4" />
            <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[var(--bg-default)]" />
                <div className="flex-1">
                    <div className="h-5 bg-[var(--bg-default)] rounded w-2/3 mb-2" />
                    <div className="h-4 bg-[var(--bg-default)] rounded w-1/3" />
                </div>
            </div>
            <div className="h-10 bg-[var(--bg-default)] rounded mb-4" />
            <div className="flex gap-2 mb-4">
                <div className="h-8 w-16 bg-[var(--bg-default)] rounded" />
                <div className="h-8 w-24 bg-[var(--bg-default)] rounded" />
            </div>
            <div className="flex gap-2 mb-4">
                <div className="h-6 w-14 bg-[var(--bg-default)] rounded-lg" />
                <div className="h-6 w-14 bg-[var(--bg-default)] rounded-lg" />
            </div>
            <div className="pt-4 border-t border-[var(--border-color)]">
                <div className="h-8 bg-[var(--bg-default)] rounded w-1/3 mb-4" />
                <div className="flex gap-3">
                    <div className="flex-1 h-11 bg-[var(--bg-default)] rounded-xl" />
                    <div className="flex-1 h-11 bg-[var(--bg-default)] rounded-xl" />
                </div>
            </div>
        </div>
    );
}

function EmptyState({ onResetFilters, onOrderDevelopment }: { onResetFilters: () => void; onOrderDevelopment?: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-20 h-20 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)]
                flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-[var(--text-tertiary)]" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                Ничего не найдено
            </h3>
            <p className="text-[var(--text-secondary)] max-w-md mb-6">
                Попробуйте изменить фильтр или закажите индивидуальную разработку под ваши задачи.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={onResetFilters}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--bg-card)]
                        border border-[var(--border-color)] rounded-xl text-[var(--text-primary)]
                        font-medium hover:bg-[var(--hover-overlay)] transition-all"
                >
                    <RefreshCw className="w-4 h-4" />
                    Сбросить фильтры
                </button>
                <button
                    onClick={onOrderDevelopment}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r
                        from-orange-500 to-pink-500 rounded-xl text-white font-medium
                        hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                >
                    <Sparkles className="w-4 h-4" />
                    Заказать разработку
                </button>
            </div>
        </div>
    );
}

export const SolutionsGrid = memo(function SolutionsGrid({
    solutions,
    viewMode,
    isLoading = false,
    compareItems,
    onCompareToggle,
    onSolutionSelect,
    onSolutionConnect,
    onResetFilters,
    onOrderDevelopment
}: SolutionsGridProps) {
    const maxCompare = 3;
    const canCompare = compareItems.length < maxCompare;

    if (isLoading) {
        return (
            <div className={viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
            }>
                {Array.from({ length: 6 }).map((_, i) => (
                    <SolutionSkeleton key={i} viewMode={viewMode} />
                ))}
            </div>
        );
    }

    if (solutions.length === 0) {
        return <EmptyState onResetFilters={onResetFilters} onOrderDevelopment={onOrderDevelopment} />;
    }

    const isSelected = (id: string) => compareItems.some(item => item.id === id);

    const handleCompareToggle = (solution: Solution) => {
        onCompareToggle(solution);
    };

    if (viewMode === 'list') {
        return (
            <div className="flex flex-col gap-4">
                {solutions.map((solution, index) => (
                    <SolutionListItem
                        key={solution.id}
                        solution={solution}
                        index={index}
                        isSelected={isSelected(solution.id)}
                        onSelect={() => onSolutionSelect(solution.id)}
                        onConnect={() => onSolutionConnect(solution.id)}
                        onCompareToggle={() => handleCompareToggle(solution)}
                        canCompare={canCompare}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
                <SolutionCard
                    key={solution.id}
                    solution={solution}
                    index={index}
                    isSelected={isSelected(solution.id)}
                    onSelect={() => onSolutionSelect(solution.id)}
                    onConnect={() => onSolutionConnect(solution.id)}
                    onCompareToggle={() => handleCompareToggle(solution)}
                    canCompare={canCompare}
                />
            ))}
        </div>
    );
});
