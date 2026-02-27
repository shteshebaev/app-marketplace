import { Users, ShoppingCart, Truck, GraduationCap, DollarSign, Utensils } from 'lucide-react';
import type { CategoryDetails } from './types';

interface QuickCategorySelectProps {
    categories: CategoryDetails[];
    selectedCategories: string[];
    onCategoryToggle: (categoryId: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
    crm: <Users className="w-5 h-5" />,
    ecommerce: <ShoppingCart className="w-5 h-5" />,
    delivery: <Truck className="w-5 h-5" />,
    education: <GraduationCap className="w-5 h-5" />,
    finance: <DollarSign className="w-5 h-5" />,
    horeca: <Utensils className="w-5 h-5" />,
};

const categoryGradients: Record<string, string> = {
    crm: 'from-blue-500 to-blue-600',
    ecommerce: 'from-violet-500 to-purple-600',
    delivery: 'from-emerald-500 to-teal-600',
    education: 'from-amber-500 to-orange-500',
    finance: 'from-green-500 to-emerald-600',
    horeca: 'from-orange-500 to-red-500',
};

export function QuickCategorySelect({
    categories,
    selectedCategories,
    onCategoryToggle
}: QuickCategorySelectProps) {
    return (
        <section className="py-8 bg-white dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-4">
                    Выберите направление:
                </h2>

                <div className="flex flex-wrap gap-3">
                    {categories.map((category) => {
                        const isSelected = selectedCategories.includes(category.id);
                        const gradient = categoryGradients[category.id] || category.gradient;
                        const icon = categoryIcons[category.id];

                        return (
                            <button
                                key={category.id}
                                onClick={() => onCategoryToggle(category.id)}
                                className={`
                                    group relative flex items-center gap-3 px-5 py-3 rounded-2xl
                                    font-medium transition-all duration-200
                                    ${isSelected
                                        ? `bg-gradient-to-r ${gradient} text-white shadow-lg hover:shadow-xl hover:scale-[1.02]`
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-[1.02]'
                                    }
                                `}
                            >
                                <span className={`
                                    flex items-center justify-center w-8 h-8 rounded-xl transition-all
                                    ${isSelected
                                        ? 'bg-white/20'
                                        : `bg-gradient-to-br ${gradient} text-white`
                                    }
                                `}>
                                    {icon}
                                </span>
                                <span>{category.name}</span>
                                <span className={`
                                    text-sm px-2 py-0.5 rounded-full transition-all
                                    ${isSelected
                                        ? 'bg-white/20 text-white'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                                    }
                                `}>
                                    {category.count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
