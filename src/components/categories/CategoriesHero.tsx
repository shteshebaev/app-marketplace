import { Layers, Package, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CategoriesHeroProps {
    totalCategories: number;
    totalSolutions: number;
    hasRecentUpdates?: boolean;
}

export function CategoriesHero({ totalCategories, totalSolutions, hasRecentUpdates = true }: CategoriesHeroProps) {
    const { t } = useTranslation();

    return (
        <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 lg:p-10 mb-6">
            {/* Subtle gradient orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />

            <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Left - Title */}
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 tracking-tight">
                            {t('categoriesPage.heroTitle')}
                        </h1>
                        <p className="text-slate-400 text-lg max-w-lg">
                            {t('categoriesPage.heroSubtitle')}
                        </p>
                    </div>

                    {/* Right - Stats */}
                    <div className="flex items-center gap-6">
                        <StatBadge
                            icon={<Layers className="w-5 h-5" />}
                            value={totalCategories}
                            label={t('categoriesPage.categoriesLabel')}
                            color="blue"
                        />
                        <StatBadge
                            icon={<Package className="w-5 h-5" />}
                            value={`${totalSolutions}+`}
                            label={t('categoriesPage.solutionsLabel')}
                            color="violet"
                        />
                        {hasRecentUpdates && (
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                <Sparkles className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm font-medium text-emerald-400">{t('categoriesPage.updated')}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

interface StatBadgeProps {
    icon: React.ReactNode;
    value: string | number;
    label: string;
    color: 'blue' | 'violet' | 'emerald';
}

function StatBadge({ icon, value, label, color }: StatBadgeProps) {
    const colors = {
        blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
        violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
        emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    };

    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${colors[color]}`}>
            <div className="opacity-80">{icon}</div>
            <div>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-sm opacity-80">{label}</div>
            </div>
        </div>
    );
}
