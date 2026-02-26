import { ChevronRight, Sparkles } from 'lucide-react';
import type { CategoryDetails } from './types';

interface CategoryHeaderProps {
    category: CategoryDetails;
    onNavigateHome: () => void;
    onNavigateCategories: () => void;
}

export function CategoryHeader({ category, onNavigateHome, onNavigateCategories }: CategoryHeaderProps) {
    return (
        <section className={`relative overflow-hidden bg-gradient-to-br ${category.gradient} py-12 lg:py-16`}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
                    <button
                        onClick={onNavigateHome}
                        className="hover:text-white transition-colors"
                    >
                        Главная
                    </button>
                    <ChevronRight className="w-4 h-4" />
                    <button
                        onClick={onNavigateCategories}
                        className="hover:text-white transition-colors"
                    >
                        Категории
                    </button>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-white font-medium">{category.name}</span>
                </nav>

                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                    <div className="max-w-2xl">
                        {/* Title */}
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                            {category.name}
                        </h1>

                        {/* Count badge */}
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
                            <span className="text-white font-semibold">{category.count}</span>
                            <span className="text-white/80">
                                {category.count === 1 ? 'решение' :
                                 category.count < 5 ? 'решения' : 'решений'}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-white/90 text-lg leading-relaxed">
                            {category.longDescription}
                        </p>
                    </div>

                    {/* CTA Button */}
                    <button className="group flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm
                        rounded-2xl px-6 py-4 transition-all duration-300 border border-white/20 hover:border-white/40
                        hover:-translate-y-0.5 self-start lg:self-auto">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                            <div className="text-white font-semibold">Индивидуальное решение</div>
                            <div className="text-white/70 text-sm">Разработка под ваши задачи</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
}
