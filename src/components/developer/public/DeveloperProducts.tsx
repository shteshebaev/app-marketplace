import { ArrowRight, Package } from 'lucide-react';
import type { DeveloperProduct } from '../../../types/developer-product';

interface DeveloperProductsProps {
    products: DeveloperProduct[];
    onProductClick?: (productId: string) => void;
}

export function DeveloperProducts({ products, onProductClick }: DeveloperProductsProps) {
    // Only show approved products in public view
    const approvedProducts = products.filter(p => p.status === 'approved');

    if (approvedProducts.length === 0) {
        return null;
    }

    const formatPrice = (product: DeveloperProduct) => {
        if (!product.pricing || product.pricing.length === 0) {
            return 'По запросу';
        }

        const hasFree = product.pricing.some(t => t.isFree || t.price === '0 ₽');

        if (hasFree) {
            return 'Бесплатно';
        }

        // Get the first tier's price as minimum
        const firstTier = product.pricing[0];
        if (firstTier.priceType === 'custom') {
            return 'По запросу';
        }

        return `от ${firstTier.price}/мес`;
    };

    return (
        <section className="py-10 sm:py-16 lg:py-24 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-8 sm:mb-12">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 sm:gap-3">
                            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                            Решения
                        </h2>
                        <p className="text-sm sm:text-base text-slate-500 mt-1 sm:mt-2">
                            {approvedProducts.length} продуктов от этого разработчика
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {approvedProducts.map((product) => (
                        <article
                            key={product.id}
                            onClick={() => onProductClick?.(product.id)}
                            className="group bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                            {/* Product Image/Logo */}
                            <div className="aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 relative overflow-hidden">
                                {product.logo ? (
                                    <img
                                        src={product.logo}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
                                            {product.name.charAt(0)}
                                        </div>
                                    </div>
                                )}

                                {/* Category Badge */}
                                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {product.categoryId.toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-1.5 sm:mb-2 group-hover:text-blue-500 transition-colors line-clamp-1">
                                    {product.name}
                                </h3>

                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3 sm:mb-4 line-clamp-2">
                                    {product.shortDescription}
                                </p>

                                {/* Tags */}
                                {product.tags && product.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                                        {product.tags.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs text-slate-600 dark:text-slate-400"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {product.tags.length > 2 && (
                                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs text-slate-400">
                                                +{product.tags.length - 2}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-700">
                                    <div className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white">
                                        {formatPrice(product)}
                                    </div>

                                    <button className="flex items-center gap-1 text-blue-500 text-xs sm:text-sm font-medium group-hover:gap-2 transition-all">
                                        <span className="hidden sm:inline">Подробнее</span>
                                        <span className="sm:hidden">Ещё</span>
                                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
