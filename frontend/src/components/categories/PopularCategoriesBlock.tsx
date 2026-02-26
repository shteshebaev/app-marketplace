import { Flame } from 'lucide-react';
import { type Category } from './types';
import { CategoryCard } from './CategoryCard';

interface PopularCategoriesBlockProps {
    categories: Category[];
}

export function PopularCategoriesBlock({ categories }: PopularCategoriesBlockProps) {
    const popularCategories = categories.filter(c => c.isPopular).slice(0, 4);

    if (popularCategories.length === 0) return null;

    return (
        <section className="mb-10">
            {/* Section header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/25">
                    <Flame className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Популярные категории
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Самые востребованные направления
                    </p>
                </div>
            </div>

            {/* Popular categories grid - larger cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularCategories.map((category, index) => (
                    <CategoryCard key={category.id} category={category} index={index} />
                ))}
            </div>
        </section>
    );
}
