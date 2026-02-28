import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, CreditCard, RefreshCw, AlertTriangle } from 'lucide-react';
import { mockSubscriptions } from './mockData';

export function SubscriptionsBlock() {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long'
        });
    };

    const getDaysUntil = (dateString: string) => {
        const now = new Date();
        const date = new Date(dateString);
        const diff = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return diff;
    };

    // Get subscriptions with upcoming payments
    const upcomingPayments = mockSubscriptions
        .filter(s => s.status === 'ACTIVE' && s.nextPaymentDate)
        .sort((a, b) => new Date(a.nextPaymentDate!).getTime() - new Date(b.nextPaymentDate!).getTime());

    // Get expiring subscriptions (within 7 days)
    const expiring = upcomingPayments.filter(s => {
        const days = getDaysUntil(s.nextPaymentDate!);
        return days <= 7 && days > 0;
    });

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Подписки и платежи
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Управление подписками
                    </p>
                </div>
                <Link
                    to="/dashboard/subscriptions"
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600"
                >
                    Все подписки
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="p-5 space-y-4">
                {/* Expiring Warning */}
                {expiring.length > 0 && (
                    <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <h4 className="font-medium text-amber-800 dark:text-amber-300">
                                    Требуется внимание
                                </h4>
                                <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                                    {expiring.length === 1
                                        ? `Подписка на "${expiring[0].productName}" истекает ${formatDate(expiring[0].nextPaymentDate!)}`
                                        : `${expiring.length} подписки требуют продления`
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Upcoming Payments */}
                {upcomingPayments.length > 0 ? (
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Ближайшие платежи
                        </h3>
                        {upcomingPayments.slice(0, 3).map((subscription) => {
                            const daysUntil = getDaysUntil(subscription.nextPaymentDate!);

                            return (
                                <div
                                    key={subscription.id}
                                    className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                                >
                                    {/* Logo */}
                                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 overflow-hidden shrink-0">
                                        {subscription.productLogo ? (
                                            <img
                                                src={subscription.productLogo}
                                                alt={subscription.productName}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm font-bold">
                                                {subscription.productName.charAt(0)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-slate-900 dark:text-white truncate">
                                            {subscription.productName}
                                        </h4>
                                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>
                                                {daysUntil <= 0
                                                    ? 'Сегодня'
                                                    : daysUntil === 1
                                                    ? 'Завтра'
                                                    : formatDate(subscription.nextPaymentDate!)
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price & Action */}
                                    <div className="text-right">
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                            {subscription.price}
                                        </p>
                                        {subscription.autoRenew ? (
                                            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                                                <RefreshCw className="w-3 h-3" />
                                                <span>Авто</span>
                                            </div>
                                        ) : (
                                            <button className="text-xs text-blue-500 hover:text-blue-600 font-medium">
                                                Продлить
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-slate-400" />
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Нет активных подписок
                        </p>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="flex items-center gap-3 pt-2">
                    <Link
                        to="/dashboard/payments"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                        <CreditCard className="w-4 h-4" />
                        История платежей
                    </Link>
                </div>
            </div>
        </div>
    );
}
