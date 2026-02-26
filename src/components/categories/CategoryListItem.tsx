import { memo } from 'react';
import { ArrowRight, Users, ShoppingCart, Truck, GraduationCap, Dumbbell, Warehouse, Building2, Utensils, Briefcase, Heart, Cpu, BarChart3, Megaphone, Palette, Globe } from 'lucide-react';
import { type Category } from './types';

interface CategoryListItemProps {
    category: Category;
    index?: number;
    onClick?: (categoryId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
    users: <Users className="w-5 h-5" />,
    'shopping-cart': <ShoppingCart className="w-5 h-5" />,
    truck: <Truck className="w-5 h-5" />,
    'graduation-cap': <GraduationCap className="w-5 h-5" />,
    dumbbell: <Dumbbell className="w-5 h-5" />,
    warehouse: <Warehouse className="w-5 h-5" />,
    building: <Building2 className="w-5 h-5" />,
    utensils: <Utensils className="w-5 h-5" />,
    briefcase: <Briefcase className="w-5 h-5" />,
    heart: <Heart className="w-5 h-5" />,
    cpu: <Cpu className="w-5 h-5" />,
    'bar-chart': <BarChart3 className="w-5 h-5" />,
    megaphone: <Megaphone className="w-5 h-5" />,
    palette: <Palette className="w-5 h-5" />,
    globe: <Globe className="w-5 h-5" />,
};

export const CategoryListItem = memo(function CategoryListItem({ category, index = 0, onClick }: CategoryListItemProps) {
    const icon = iconMap[category.icon] || <Briefcase className="w-5 h-5" />;

    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            e.preventDefault();
            onClick(category.id);
        }
    };

    return (
        <a
            href={`/categories/${category.id}`}
            onClick={handleClick}
            className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200"
            style={{
                animationDelay: `${index * 30}ms`,
            }}
        >
            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                {icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                    {category.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                    {category.description}
                </p>
            </div>

            {/* Count */}
            <div className="hidden sm:block text-right flex-shrink-0">
                <span className={`text-sm font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                    {category.count} решений
                </span>
            </div>

            {/* Arrow */}
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
            </div>
        </a>
    );
});
