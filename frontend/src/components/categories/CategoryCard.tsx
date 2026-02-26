import { memo } from 'react';
import { ArrowRight, Users, ShoppingCart, Truck, GraduationCap, Dumbbell, Warehouse, Building2, Utensils, Briefcase, Heart, Cpu, BarChart3, Megaphone, Palette, Globe } from 'lucide-react';
import { type Category } from './types';

interface CategoryCardProps {
    category: Category;
    index?: number;
}

const iconMap: Record<string, React.ReactNode> = {
    users: <Users className="w-7 h-7" />,
    'shopping-cart': <ShoppingCart className="w-7 h-7" />,
    truck: <Truck className="w-7 h-7" />,
    'graduation-cap': <GraduationCap className="w-7 h-7" />,
    dumbbell: <Dumbbell className="w-7 h-7" />,
    warehouse: <Warehouse className="w-7 h-7" />,
    building: <Building2 className="w-7 h-7" />,
    utensils: <Utensils className="w-7 h-7" />,
    briefcase: <Briefcase className="w-7 h-7" />,
    heart: <Heart className="w-7 h-7" />,
    cpu: <Cpu className="w-7 h-7" />,
    'bar-chart': <BarChart3 className="w-7 h-7" />,
    megaphone: <Megaphone className="w-7 h-7" />,
    palette: <Palette className="w-7 h-7" />,
    globe: <Globe className="w-7 h-7" />,
};

export const CategoryCard = memo(function CategoryCard({ category, index = 0 }: CategoryCardProps) {
    const icon = iconMap[category.icon] || <Briefcase className="w-7 h-7" />;

    return (
        <a
            href={`/categories/${category.id}`}
            className={`group relative overflow-hidden rounded-[24px] bg-gradient-to-br ${category.gradient} p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20`}
            style={{
                animationDelay: `${index * 50}ms`,
            }}
        >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10" />

            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Large background icon */}
            <div className="absolute -right-4 -bottom-4 opacity-15 text-white scale-[3.5] group-hover:scale-[4] group-hover:opacity-20 transition-all duration-700">
                {icon}
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between min-h-[160px]">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-lg shadow-black/10 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                    {icon}
                </div>

                <div className="mt-auto">
                    {/* Title */}
                    <h3 className="font-bold text-white text-xl mb-1.5 drop-shadow-sm">
                        {category.name}
                    </h3>

                    {/* Description */}
                    <p className="text-white/70 text-sm mb-3 line-clamp-1">
                        {category.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                        <span className="text-white/90 font-medium">
                            {category.count} решений
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
});
