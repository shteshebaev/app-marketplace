import { Star, Quote, BadgeCheck } from 'lucide-react';
import type { ProductReview } from './types';

interface ProductReviewsProps {
    reviews: ProductReview[];
    totalReviews: number;
    avgRating: number;
}

export function ProductReviews({ reviews, totalReviews, avgRating }: ProductReviewsProps) {
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
                    />
                ))}
            </div>
        );
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <section data-section="reviews" className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                {/* Header with stats */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Отзывы клиентов
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Что говорят о нас наши пользователи
                        </p>
                    </div>

                    {/* Rating summary */}
                    <div className="flex items-center gap-6 bg-white dark:bg-slate-800 rounded-2xl px-6 py-4 shadow-sm">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-slate-900 dark:text-white">{avgRating}</div>
                            <div className="flex justify-center mt-1">{renderStars(Math.round(avgRating))}</div>
                        </div>
                        <div className="w-px h-12 bg-slate-200 dark:bg-slate-700" />
                        <div className="text-center">
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">{totalReviews}</div>
                            <div className="text-sm text-slate-500">отзывов</div>
                        </div>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                            {/* Quote icon */}
                            <Quote className="w-8 h-8 text-blue-500/20 mb-4" />

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                                {renderStars(review.rating)}
                                {review.isVerified && (
                                    <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                        <BadgeCheck className="w-4 h-4" />
                                        Проверено
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                {review.title}
                            </h3>

                            {/* Content */}
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                {review.content}
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                                    {getInitials(review.authorName)}
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-slate-900 dark:text-white">
                                        {review.authorName}
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        {review.authorRole}, {review.authorCompany}
                                    </div>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="text-xs text-slate-400 mt-3">
                                {formatDate(review.date)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
