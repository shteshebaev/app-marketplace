import { Link } from 'react-router-dom';
import { Star, ArrowRight, Sparkles } from 'lucide-react';
import { mockRecommendedProducts } from './mockData';

export function RecommendedSolutions() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Рекомендуем для вас
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            На основе ваших подключений
                        </p>
                    </div>
                </div>
                <Link
                    to="/catalog"
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600"
                >
                    Все решения
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Products Grid */}
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockRecommendedProducts.map((product) => (
                    <Link
                        key={product.id}
                        to={`/catalog/${product.id}`}
                        className="group block p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        <div className="flex items-start gap-3">
                            {/* Logo */}
                            <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 overflow-hidden shrink-0">
                                <img
                                    src={product.logo}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                                    {product.shortDescription}
                                </p>
                            </div>
                        </div>

                        {/* Meta */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                    {product.rating}
                                </span>
                            </div>
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                от {product.price}
                            </span>
                        </div>

                        {/* Category Badge */}
                        <div className="mt-2">
                            <span className="inline-flex px-2 py-0.5 bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-md text-xs">
                                {product.category}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
