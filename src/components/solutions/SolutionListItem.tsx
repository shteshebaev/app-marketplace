import { Star, Users, ChevronRight, Check } from 'lucide-react';
import type { Solution } from './types';

interface SolutionListItemProps {
    solution: Solution;
    index: number;
    isSelected: boolean;
    onSelect: () => void;
    onCompareToggle: () => void;
    canCompare: boolean;
}

const badgeConfig: Record<string, { label: string; color: string }> = {
    'top': { label: 'TOP', color: 'from-amber-500 to-orange-500' },
    'best-value': { label: 'ЛУЧШАЯ ЦЕНА', color: 'from-emerald-500 to-teal-500' },
    'new': { label: 'НОВИНКА', color: 'from-blue-500 to-indigo-500' },
    'enterprise': { label: 'ENTERPRISE', color: 'from-slate-600 to-slate-700' },
    'small-business': { label: 'ДЛЯ МСБ', color: 'from-violet-500 to-purple-500' }
};

export function SolutionListItem({
    solution,
    index,
    isSelected,
    onSelect,
    onCompareToggle,
    canCompare
}: SolutionListItemProps) {
    const badge = solution.badge ? badgeConfig[solution.badge] : null;

    return (
        <div
            className="group relative bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]
                overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/5
                dark:hover:shadow-black/20 hover:border-[var(--text-tertiary)]"
            style={{ animationDelay: `${index * 30}ms` }}
        >
            <div className="flex items-center gap-4 p-4 lg:p-5">
                {/* Compare checkbox */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onCompareToggle();
                    }}
                    disabled={!canCompare && !isSelected}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0
                        transition-all duration-200 ${isSelected
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : canCompare
                                ? 'border-[var(--border-color)] hover:border-blue-500'
                                : 'border-[var(--border-color)] opacity-50 cursor-not-allowed'}`}
                >
                    {isSelected && <Check className="w-3 h-3" />}
                </button>

                {/* Logo */}
                <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br ${solution.gradient}
                    flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-lg lg:text-xl">
                        {solution.name.charAt(0)}
                    </span>
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-[1fr_auto_auto_auto] lg:gap-6 lg:items-center">
                    {/* Title & Description */}
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-[var(--text-primary)] truncate">
                                {solution.name}
                            </h3>
                            {badge && (
                                <span className={`hidden sm:inline-flex items-center bg-gradient-to-r ${badge.color}
                                    rounded-full px-2 py-0.5 text-[10px] font-bold text-white tracking-wide`}>
                                    {badge.label}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] line-clamp-1 mb-2 lg:mb-0">
                            {solution.description}
                        </p>

                        {/* Tags - Mobile */}
                        <div className="flex flex-wrap gap-1.5 lg:hidden mt-2">
                            {solution.tags.slice(0, 2).map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-0.5 bg-[var(--bg-default)] rounded text-xs
                                        text-[var(--text-secondary)]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tags - Desktop */}
                    <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
                        {solution.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-[var(--bg-default)] rounded-lg text-xs
                                    text-[var(--text-secondary)] whitespace-nowrap"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Rating */}
                    <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="font-semibold text-[var(--text-primary)]">{solution.rating}</span>
                        </div>
                        <span className="text-sm text-[var(--text-secondary)]">
                            ({solution.reviewsCount})
                        </span>
                        {solution.clientsCount && (
                            <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
                                <Users className="w-4 h-4" />
                                <span>{solution.clientsCount.toLocaleString()}</span>
                            </div>
                        )}
                    </div>

                    {/* Price */}
                    <div className="hidden lg:block text-right flex-shrink-0 min-w-[120px]">
                        <div className="font-bold text-lg text-[var(--text-primary)]">
                            {solution.priceType === 'from' && 'от '}
                            {solution.price === '0' ? 'Бесплатно' : `${solution.price} ₽`}
                        </div>
                        {solution.price !== '0' && (
                            <span className="text-xs text-[var(--text-secondary)]">/ мес</span>
                        )}
                    </div>
                </div>

                {/* Mobile: Price & Rating */}
                <div className="flex flex-col items-end gap-1 lg:hidden flex-shrink-0">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-semibold text-sm text-[var(--text-primary)]">{solution.rating}</span>
                    </div>
                    <div className="font-bold text-[var(--text-primary)]">
                        {solution.price === '0' ? 'Бесплатно' : `${solution.price} ₽`}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
                    <button
                        onClick={onSelect}
                        className="px-4 py-2 bg-[var(--bg-default)] hover:bg-[var(--hover-overlay)]
                            rounded-xl text-[var(--text-primary)] font-medium text-sm
                            transition-all duration-200 flex items-center gap-1"
                    >
                        Подробнее
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <button
                        className={`px-4 py-2 bg-gradient-to-r ${solution.gradient}
                            rounded-xl text-white font-medium text-sm
                            transition-all duration-200 hover:shadow-lg hover:shadow-black/20`}
                    >
                        Подключить
                    </button>
                </div>

                {/* Mobile: Arrow */}
                <ChevronRight
                    className="lg:hidden w-5 h-5 text-[var(--text-tertiary)] flex-shrink-0"
                    onClick={onSelect}
                />
            </div>
        </div>
    );
}
