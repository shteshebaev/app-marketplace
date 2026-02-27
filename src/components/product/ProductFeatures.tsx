import {
    BarChart2,
    GitBranch,
    Mail,
    Plug,
    Smartphone,
    ShieldCheck,
    Zap,
    Users,
    Clock,
    TrendingUp,
    Settings,
    Cloud
} from 'lucide-react';
import type { ProductFeature } from './types';

interface ProductFeaturesProps {
    features: ProductFeature[];
}

const iconMap: Record<string, React.ReactNode> = {
    'bar-chart-2': <BarChart2 className="w-6 h-6" />,
    'git-branch': <GitBranch className="w-6 h-6" />,
    mail: <Mail className="w-6 h-6" />,
    plug: <Plug className="w-6 h-6" />,
    smartphone: <Smartphone className="w-6 h-6" />,
    'shield-check': <ShieldCheck className="w-6 h-6" />,
    zap: <Zap className="w-6 h-6" />,
    users: <Users className="w-6 h-6" />,
    clock: <Clock className="w-6 h-6" />,
    'trending-up': <TrendingUp className="w-6 h-6" />,
    settings: <Settings className="w-6 h-6" />,
    cloud: <Cloud className="w-6 h-6" />,
};

const categoryColors: Record<string, string> = {
    'Аналитика': 'from-blue-500 to-cyan-500',
    'Продажи': 'from-emerald-500 to-teal-500',
    'Коммуникации': 'from-violet-500 to-purple-500',
    'Техническое': 'from-slate-500 to-slate-600',
    'Безопасность': 'from-amber-500 to-orange-500',
};

export function ProductFeatures({ features }: ProductFeaturesProps) {
    return (
        <section data-section="features" className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Возможности
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Всё, что нужно для эффективного управления продажами и клиентами
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const gradient = categoryColors[feature.category || ''] || 'from-blue-500 to-indigo-600';

                        return (
                            <div
                                key={feature.id}
                                className="group relative bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {iconMap[feature.icon] || <Zap className="w-6 h-6" />}
                                </div>

                                {/* Category tag */}
                                {feature.category && (
                                    <span className="inline-block px-2.5 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 mb-3">
                                        {feature.category}
                                    </span>
                                )}

                                {/* Title */}
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
