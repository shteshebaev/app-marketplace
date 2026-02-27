import { Eye, MousePointer, MessageSquare, MoreVertical, Pencil, Trash2, ExternalLink, Send } from 'lucide-react';
import { ProductStatusBadge } from './ProductStatusBadge';
import type { DeveloperProduct } from '../../../types/developer-product';
import { useState } from 'react';

interface DeveloperProductCardProps {
    product: DeveloperProduct;
    onEdit?: (productId: string) => void;
    onDelete?: (productId: string) => void;
    onView?: (productId: string) => void;
    onSubmitForReview?: (productId: string) => void;
}

export function DeveloperProductCard({
    product,
    onEdit,
    onDelete,
    onView,
    onSubmitForReview
}: DeveloperProductCardProps) {
    const [showMenu, setShowMenu] = useState(false);

    const stats = product.stats || { views: 0, clicks: 0, inquiries: 0 };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="p-6">
                <div className="flex items-start gap-4">
                    {/* Product Logo */}
                    <div className="flex-shrink-0">
                        {product.logo ? (
                            <img
                                src={product.logo}
                                alt={product.name}
                                className="w-16 h-16 rounded-xl object-cover"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                                {product.name.charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                    {product.shortDescription || 'Нет описания'}
                                </p>
                            </div>

                            {/* Actions Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    <MoreVertical className="w-5 h-5 text-slate-400" />
                                </button>

                                {showMenu && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setShowMenu(false)}
                                        />
                                        <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50">
                                            <button
                                                onClick={() => {
                                                    onEdit?.(product.id);
                                                    setShowMenu(false);
                                                }}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                                            >
                                                <Pencil className="w-4 h-4" />
                                                Редактировать
                                            </button>
                                            {product.status === 'approved' && (
                                                <button
                                                    onClick={() => {
                                                        onView?.(product.id);
                                                        setShowMenu(false);
                                                    }}
                                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Открыть
                                                </button>
                                            )}
                                            {product.status === 'draft' && (
                                                <button
                                                    onClick={() => {
                                                        onSubmitForReview?.(product.id);
                                                        setShowMenu(false);
                                                    }}
                                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                                                >
                                                    <Send className="w-4 h-4" />
                                                    На модерацию
                                                </button>
                                            )}
                                            <button
                                                onClick={() => {
                                                    onDelete?.(product.id);
                                                    setShowMenu(false);
                                                }}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Удалить
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Status & Date */}
                        <div className="flex items-center gap-3 mt-3">
                            <ProductStatusBadge status={product.status} size="sm" />
                            {product.updatedAt && (
                                <span className="text-xs text-slate-400">
                                    Обновлено {formatDate(product.updatedAt)}
                                </span>
                            )}
                        </div>

                        {/* Tags */}
                        {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {product.tags.slice(0, 4).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs text-slate-600 dark:text-slate-400"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {product.tags.length > 4 && (
                                    <span className="text-xs text-slate-400">
                                        +{product.tags.length - 4}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats (only for approved products) */}
                {product.status === 'approved' && (
                    <div className="flex items-center gap-6 mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-slate-400" />
                            <span className="text-sm font-medium text-slate-900 dark:text-white">
                                {stats.views.toLocaleString()}
                            </span>
                            <span className="text-xs text-slate-400">просмотров</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MousePointer className="w-4 h-4 text-slate-400" />
                            <span className="text-sm font-medium text-slate-900 dark:text-white">
                                {stats.clicks.toLocaleString()}
                            </span>
                            <span className="text-xs text-slate-400">переходов</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-slate-400" />
                            <span className="text-sm font-medium text-slate-900 dark:text-white">
                                {stats.inquiries.toLocaleString()}
                            </span>
                            <span className="text-xs text-slate-400">заявок</span>
                        </div>
                    </div>
                )}

                {/* Rejection reason */}
                {product.status === 'rejected' && product.rejection && (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-500/10 rounded-xl">
                        <p className="text-sm text-red-600 dark:text-red-400">
                            <strong>Причина:</strong> {product.rejection.reason}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
