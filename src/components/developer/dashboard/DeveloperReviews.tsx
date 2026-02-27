import { useState } from 'react';
import { Star, MessageSquare, Reply, ThumbsUp, Filter, Search } from 'lucide-react';

interface Review {
    id: string;
    productId: string;
    productName: string;
    authorName: string;
    authorCompany: string;
    rating: number;
    title: string;
    content: string;
    date: string;
    isReplied: boolean;
    reply?: string;
    helpful: number;
}

const mockReviews: Review[] = [
    {
        id: '1',
        productId: 'crm-pro',
        productName: 'CRM Pro Enterprise',
        authorName: 'Иван Петров',
        authorCompany: 'ООО "Альфа"',
        rating: 5,
        title: 'Отличная CRM система!',
        content: 'Используем CRM Pro уже год. Очень довольны функционалом и техподдержкой. Система помогла увеличить конверсию на 30%.',
        date: '2024-01-15',
        isReplied: true,
        reply: 'Спасибо за отзыв! Рады, что наш продукт помогает вашему бизнесу расти.',
        helpful: 12
    },
    {
        id: '2',
        productId: 'crm-pro',
        productName: 'CRM Pro Enterprise',
        authorName: 'Мария Сидорова',
        authorCompany: 'ИП Сидорова',
        rating: 4,
        title: 'Хороший продукт, но есть нюансы',
        content: 'В целом система работает хорошо, но хотелось бы больше интеграций и мобильное приложение.',
        date: '2024-01-10',
        isReplied: false,
        helpful: 5
    },
    {
        id: '3',
        productId: 'crm-lite',
        productName: 'CRM Lite',
        authorName: 'Алексей Козлов',
        authorCompany: 'Стартап "Бета"',
        rating: 5,
        title: 'Идеально для малого бизнеса',
        content: 'Простая и понятная система. Начали работать сразу без длительного обучения.',
        date: '2024-01-05',
        isReplied: false,
        helpful: 8
    }
];

export function DeveloperReviews() {
    const [reviews] = useState<Review[]>(mockReviews);
    const [filterRating, setFilterRating] = useState<number | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');

    const filteredReviews = reviews.filter(review => {
        const matchesRating = filterRating === 'all' || review.rating === filterRating;
        const matchesSearch = review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.productName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRating && matchesSearch;
    });

    const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
    const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
        rating,
        count: reviews.filter(r => r.rating === rating).length,
        percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
    }));

    const handleReply = (reviewId: string) => {
        if (replyText.trim()) {
            console.log('Reply to review:', reviewId, replyText);
            setReplyingTo(null);
            setReplyText('');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Отзывы
                </h1>
                <p className="text-slate-500 mt-1">
                    Управляйте отзывами о ваших решениях
                </p>
            </div>

            {/* Rating Summary */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Average Rating */}
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-slate-900 dark:text-white">
                                {averageRating}
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-5 h-5 ${star <= Math.round(Number(averageRating)) ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
                                    />
                                ))}
                            </div>
                            <div className="text-sm text-slate-500 mt-1">
                                {reviews.length} отзывов
                            </div>
                        </div>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="space-y-2">
                        {ratingCounts.map(({ rating, count, percentage }) => (
                            <div key={rating} className="flex items-center gap-3">
                                <span className="w-4 text-sm text-slate-500">{rating}</span>
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-amber-400 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className="w-8 text-sm text-slate-500 text-right">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Поиск по отзывам..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-slate-400" />
                    <select
                        value={filterRating === 'all' ? 'all' : filterRating.toString()}
                        onChange={(e) => setFilterRating(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                        className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Все оценки</option>
                        <option value="5">5 звезд</option>
                        <option value="4">4 звезды</option>
                        <option value="3">3 звезды</option>
                        <option value="2">2 звезды</option>
                        <option value="1">1 звезда</option>
                    </select>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {filteredReviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm"
                    >
                        {/* Review Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                                    {review.authorName.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-medium text-slate-900 dark:text-white">
                                        {review.authorName}
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        {review.authorCompany}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-4 h-4 ${star <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
                                        />
                                    ))}
                                </div>
                                <div className="text-xs text-slate-400 mt-1">
                                    {new Date(review.date).toLocaleDateString('ru-RU')}
                                </div>
                            </div>
                        </div>

                        {/* Product Badge */}
                        <div className="mb-3">
                            <span className="inline-flex items-center px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-xs text-slate-600 dark:text-slate-400">
                                {review.productName}
                            </span>
                        </div>

                        {/* Review Content */}
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                            {review.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-4">
                            {review.content}
                        </p>

                        {/* Reply */}
                        {review.isReplied && review.reply && (
                            <div className="ml-6 pl-4 border-l-2 border-blue-500 bg-blue-50 dark:bg-blue-500/10 rounded-r-xl p-4 mb-4">
                                <div className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">
                                    Ваш ответ:
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                    {review.reply}
                                </p>
                            </div>
                        )}

                        {/* Reply Form */}
                        {replyingTo === review.id && (
                            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Напишите ответ..."
                                    rows={3}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-600 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 resize-none mb-3"
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => {
                                            setReplyingTo(null);
                                            setReplyText('');
                                        }}
                                        className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors"
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        onClick={() => handleReply(review.id)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                                    >
                                        Отправить
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                            <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                                <ThumbsUp className="w-4 h-4" />
                                {review.helpful} полезно
                            </button>
                            {!review.isReplied && (
                                <button
                                    onClick={() => setReplyingTo(review.id)}
                                    className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600"
                                >
                                    <Reply className="w-4 h-4" />
                                    Ответить
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredReviews.length === 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center shadow-sm">
                    <MessageSquare className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        Отзывов не найдено
                    </h3>
                    <p className="text-slate-500">
                        Попробуйте изменить фильтры или поисковый запрос
                    </p>
                </div>
            )}
        </div>
    );
}
