import { Star, TrendingUp, Gem, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Solution } from './types';

interface RecommendedSolutionsProps {
    solutions: Solution[];
    onSelect: (solutionId: string) => void;
    title?: string;
    subtitle?: string;
}

export function RecommendedSolutions({
    solutions,
    onSelect,
    title,
    subtitle
}: RecommendedSolutionsProps) {
    const { t } = useTranslation();

    const recommendationTypes = [
        { badge: 'top', icon: Star, labelKey: 'allSolutions.topLabel', color: 'from-amber-500 to-orange-500' },
        { badge: 'best-value', icon: TrendingUp, labelKey: 'allSolutions.recommendedLabel', color: 'from-emerald-500 to-teal-500' },
        { badge: 'popular', icon: Gem, labelKey: 'allSolutions.recommendedLabel', color: 'from-blue-500 to-indigo-500' }
    ];

    const displayTitle = title || t('allSolutions.recommended');
    const displaySubtitle = subtitle || t('allSolutions.recommendedSubtitle');
    if (solutions.length === 0) return null;

    return (
        <section className="py-8">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full" />
                    <div>
                        <h2 className="text-xl font-bold text-[var(--text-primary)]">
                            {displayTitle}
                        </h2>
                        <p className="text-sm text-[var(--text-secondary)]">
                            {displaySubtitle}
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {solutions.slice(0, 3).map((solution, index) => {
                        const recType = recommendationTypes[index] || recommendationTypes[0];
                        const Icon = recType.icon;

                        return (
                            <button
                                key={solution.id}
                                onClick={() => onSelect(solution.id)}
                                className="group relative bg-[var(--bg-card)] rounded-2xl p-5 border border-[var(--border-color)]
                                    hover:border-transparent hover:shadow-xl transition-all duration-300 text-left
                                    hover:-translate-y-1"
                            >
                                {/* Gradient border on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${recType.color} rounded-2xl
                                    opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-sm`} />

                                {/* Badge */}
                                <div className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${recType.color}
                                    rounded-full px-3 py-1 mb-4`}>
                                    <Icon className="w-3.5 h-3.5 text-white" />
                                    <span className="text-xs font-medium text-white">{t(recType.labelKey)}</span>
                                </div>

                                {/* Content */}
                                <div className="flex items-start gap-4">
                                    {/* Logo placeholder */}
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${solution.gradient}
                                        flex items-center justify-center flex-shrink-0`}>
                                        <span className="text-white font-bold text-lg">
                                            {solution.name.charAt(0)}
                                        </span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-[var(--text-primary)] mb-1 truncate">
                                            {solution.name}
                                        </h3>
                                        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-2">
                                            {solution.description}
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                                <span className="text-sm font-medium text-[var(--text-primary)]">
                                                    {solution.rating}
                                                </span>
                                            </div>
                                            <span className="text-sm text-[var(--text-secondary)]">
                                                {solution.reviewsCount} {t('allSolutions.reviews')}
                                            </span>
                                        </div>
                                    </div>

                                    <ChevronRight className="w-5 h-5 text-[var(--text-tertiary)]
                                        group-hover:text-[var(--text-primary)] group-hover:translate-x-1
                                        transition-all flex-shrink-0 mt-1" />
                                </div>

                                {/* Price */}
                                <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-lg font-bold text-[var(--text-primary)]">
                                            {solution.priceType === 'from' && `${t('allSolutions.from')} `}
                                            {solution.price === '0' ? t('allSolutions.free') : `${solution.price} ₽`}
                                        </span>
                                        {solution.price !== '0' && (
                                            <span className="text-sm text-[var(--text-secondary)]">
                                                / {t('allSolutions.perMonth')}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
