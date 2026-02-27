import { useState } from 'react';
import { Plus, Search, Filter, Package } from 'lucide-react';
import { DeveloperProductCard } from './DeveloperProductCard';
import type { DeveloperProduct, ProductStatus } from '../../../types/developer-product';
import { mockDeveloperProducts } from '../mockData';

interface ProductsListProps {
    onCreateNew?: () => void;
    onEditProduct?: (productId: string) => void;
    onViewProduct?: (productId: string) => void;
}

const statusFilters: { value: ProductStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'Все' },
    { value: 'approved', label: 'Опубликованные' },
    { value: 'pending', label: 'На проверке' },
    { value: 'draft', label: 'Черновики' },
    { value: 'rejected', label: 'Отклоненные' }
];

export function ProductsList({ onCreateNew, onEditProduct, onViewProduct }: ProductsListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<ProductStatus | 'all'>('all');
    const [products] = useState<DeveloperProduct[]>(mockDeveloperProducts);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleDelete = (productId: string) => {
        // In real app, call API to delete
        console.log('Delete product:', productId);
    };

    const handleSubmitForReview = (productId: string) => {
        // In real app, call API to submit
        console.log('Submit for review:', productId);
    };

    const statusCounts = {
        all: products.length,
        approved: products.filter(p => p.status === 'approved').length,
        pending: products.filter(p => p.status === 'pending').length,
        draft: products.filter(p => p.status === 'draft').length,
        rejected: products.filter(p => p.status === 'rejected').length
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Мои решения
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Управляйте своими продуктами
                    </p>
                </div>

                <button
                    onClick={onCreateNew}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Создать решение
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Поиск по названию..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
                        <Filter className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        {statusFilters.map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => setStatusFilter(filter.value)}
                                className={`
                                    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all
                                    ${statusFilter === filter.value
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                                    }
                                `}
                            >
                                {filter.label}
                                <span className={`
                                    px-1.5 py-0.5 rounded-md text-xs
                                    ${statusFilter === filter.value
                                        ? 'bg-white/20'
                                        : 'bg-slate-200 dark:bg-slate-600'
                                    }
                                `}>
                                    {statusCounts[filter.value]}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products List */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {filteredProducts.map((product) => (
                        <DeveloperProductCard
                            key={product.id}
                            product={product}
                            onEdit={onEditProduct}
                            onView={onViewProduct}
                            onDelete={handleDelete}
                            onSubmitForReview={handleSubmitForReview}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center shadow-sm">
                    <Package className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        {searchQuery || statusFilter !== 'all'
                            ? 'Ничего не найдено'
                            : 'Нет решений'
                        }
                    </h3>
                    <p className="text-slate-500 mb-6">
                        {searchQuery || statusFilter !== 'all'
                            ? 'Попробуйте изменить фильтры или поисковый запрос'
                            : 'Создайте ваше первое решение для публикации в каталоге'
                        }
                    </p>
                    {!searchQuery && statusFilter === 'all' && (
                        <button
                            onClick={onCreateNew}
                            className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Создать решение
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
