import { useState } from 'react';
import { Bell, Mail, MessageSquare, Megaphone, Check } from 'lucide-react';

interface NotificationSetting {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    enabled: boolean;
}

export function NotificationSettings() {
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [emailNotifications, setEmailNotifications] = useState<NotificationSetting[]>([
        {
            id: 'order_status',
            title: 'Статус заявки',
            description: 'Уведомления об изменении статуса ваших заявок',
            icon: <MessageSquare className="w-5 h-5" />,
            enabled: true
        },
        {
            id: 'payment_reminder',
            title: 'Напоминание о платеже',
            description: 'Напоминания о предстоящих платежах и сроках',
            icon: <Bell className="w-5 h-5" />,
            enabled: true
        },
        {
            id: 'subscription_updates',
            title: 'Обновления подписок',
            description: 'Информация об окончании или продлении подписок',
            icon: <Mail className="w-5 h-5" />,
            enabled: true
        },
        {
            id: 'promo',
            title: 'Рекламные предложения',
            description: 'Специальные предложения и акции',
            icon: <Megaphone className="w-5 h-5" />,
            enabled: false
        }
    ]);

    const [pushNotifications, setPushNotifications] = useState(true);

    const toggleEmailNotification = (id: string) => {
        setEmailNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n)
        );
        setShowSuccess(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="space-y-6">
            {/* Email Notifications */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                Email уведомления
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Настройте какие письма вы хотите получать
                            </p>
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {emailNotifications.map((notification) => (
                        <div key={notification.id} className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`
                                    w-10 h-10 rounded-xl flex items-center justify-center
                                    ${notification.enabled
                                        ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
                                    }
                                `}>
                                    {notification.icon}
                                </div>
                                <div>
                                    <h3 className="font-medium text-slate-900 dark:text-white">
                                        {notification.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {notification.description}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleEmailNotification(notification.id)}
                                className={`
                                    relative w-14 h-8 rounded-full transition-colors
                                    ${notification.enabled ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}
                                `}
                            >
                                <div
                                    className={`
                                        absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform
                                        ${notification.enabled ? 'translate-x-7' : 'translate-x-1'}
                                    `}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Push Notifications */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`
                                w-12 h-12 rounded-xl flex items-center justify-center
                                ${pushNotifications
                                    ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
                                }
                            `}>
                                <Bell className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                    Push-уведомления
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Получайте уведомления в браузере
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setPushNotifications(!pushNotifications);
                                setShowSuccess(false);
                            }}
                            className={`
                                relative w-14 h-8 rounded-full transition-colors
                                ${pushNotifications ? 'bg-purple-500' : 'bg-slate-300 dark:bg-slate-600'}
                            `}
                        >
                            <div
                                className={`
                                    absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform
                                    ${pushNotifications ? 'translate-x-7' : 'translate-x-1'}
                                `}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Frequency Settings */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                        Частота дайджеста
                    </h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Как часто получать сводку уведомлений
                    </p>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['Сразу', 'Ежедневно', 'Еженедельно'].map((option, index) => (
                            <button
                                key={option}
                                className={`
                                    p-4 rounded-xl border-2 transition-all text-center
                                    ${index === 0
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                        : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500'
                                    }
                                `}
                            >
                                <span className="font-medium">{option}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                {showSuccess && (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <Check className="w-5 h-5" />
                        <span className="text-sm font-medium">Настройки сохранены</span>
                    </div>
                )}
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="
                        ml-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl
                        transition-all shadow-lg shadow-blue-500/25
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center gap-2
                    "
                >
                    {isSaving ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Сохранение...
                        </>
                    ) : (
                        'Сохранить'
                    )}
                </button>
            </div>
        </div>
    );
}
