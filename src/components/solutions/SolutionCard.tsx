import { Star, Users, ChevronRight, Check } from 'lucide-react';
import type { Solution } from './types';

interface SolutionCardProps {
    solution: Solution;
    index: number;
    isSelected: boolean;
    onSelect: () => void;
    onConnect: () => void;
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

export function SolutionCard({
    solution,
    index,
    isSelected,
    onSelect,
    onConnect,
    onCompareToggle,
    canCompare
}: SolutionCardProps) {
    const badge = solution.badge ? badgeConfig[solution.badge] : null;

    return (
        <div
            className="group relative bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)]
                overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
                hover:shadow-black/10 dark:hover:shadow-black/30"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            {/* Gradient glow on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0
                group-hover:opacity-5 transition-opacity duration-300`} />

            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                bg-gradient-to-r from-transparent via-white/10 to-transparent
                -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {/* Compare checkbox */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onCompareToggle();
                }}
                disabled={!canCompare && !isSelected}
                className={`absolute top-4 right-4 z-10 w-6 h-6 rounded-lg border-2 flex items-center justify-center
                    transition-all duration-200 ${isSelected
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : canCompare
                            ? 'border-[var(--border-color)] hover:border-blue-500 bg-white/80 dark:bg-black/50 backdrop-blur-sm'
                            : 'border-[var(--border-color)] bg-[var(--bg-card)] opacity-50 cursor-not-allowed'}`}
            >
                {isSelected && <Check className="w-4 h-4" />}
            </button>

            {/* Content */}
            <div className="relative p-6">
                {/* Badge */}
                {badge && (
                    <div className={`inline-flex items-center gap-1 bg-gradient-to-r ${badge.color}
                        rounded-full px-3 py-1 mb-4`}>
                        <span className="text-xs font-bold text-white tracking-wide">{badge.label}</span>
                    </div>
                )}

                {/* Logo & Title */}
                <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${solution.gradient}
                        flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <span className="text-white font-bold text-xl">
                            {solution.name.charAt(0)}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1 truncate">
                            {solution.name}
                        </h3>
                        {solution.targetAudience && (
                            <span className="text-xs text-blue-500 font-medium">
                                {solution.targetAudience}
                            </span>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-sm line-clamp-2 mb-4 min-h-[40px]">
                    {solution.description}
                </p>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5">
                        <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                        <span className="font-bold text-[var(--text-primary)]">{solution.rating}</span>
                    </div>
                    <span className="text-sm text-[var(--text-secondary)]">
                        {solution.reviewsCount} отзывов
                    </span>
                    {solution.clientsCount && (
                        <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
                            <Users className="w-4 h-4" />
                            <span>{solution.clientsCount.toLocaleString()}</span>
                        </div>
                    )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {solution.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-1 bg-[var(--bg-default)] rounded-lg text-xs
                                text-[var(--text-secondary)] font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                    {solution.tags.length > 3 && (
                        <span className="px-2.5 py-1 text-xs text-[var(--text-tertiary)]">
                            +{solution.tags.length - 3}
                        </span>
                    )}
                </div>

                {/* Price */}
                <div className="pt-4 border-t border-[var(--border-color)]">
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold text-[var(--text-primary)]">
                            {solution.priceType === 'from' && 'от '}
                            {solution.price === '0' ? 'Бесплатно' : `${solution.price} ₽`}
                        </span>
                        {solution.price !== '0' && (
                            <span className="text-sm text-[var(--text-secondary)]">
                                / мес
                            </span>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onSelect}
                            className="flex-1 py-3 px-4 bg-[var(--bg-default)] hover:bg-[var(--hover-overlay)]
                                rounded-xl text-[var(--text-primary)] font-medium text-sm
                                transition-all duration-200 group/btn"
                        >
                            <span className="flex items-center justify-center gap-2">
                                Подробнее
                                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                            </span>
                        </button>
                        <button
                            onClick={onConnect}
                            className={`flex-1 py-3 px-4 bg-gradient-to-r ${solution.gradient}
                                rounded-xl text-white font-medium text-sm
                                transition-all duration-200 hover:shadow-lg hover:shadow-black/20
                                hover:-translate-y-0.5 active:translate-y-0`}
                        >
                            Подключить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
