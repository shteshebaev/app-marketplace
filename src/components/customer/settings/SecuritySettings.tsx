import { useState } from 'react';
import {
    Lock,
    Eye,
    EyeOff,
    Shield,
    Smartphone,
    Monitor,
    MapPin,
    LogOut,
    Check,
    AlertTriangle
} from 'lucide-react';

interface Session {
    id: string;
    device: string;
    deviceType: 'desktop' | 'mobile' | 'tablet';
    location: string;
    lastActive: string;
    isCurrent: boolean;
}

const mockSessions: Session[] = [
    {
        id: '1',
        device: 'Chrome на Windows',
        deviceType: 'desktop',
        location: 'Ташкент, Узбекистан',
        lastActive: 'Сейчас',
        isCurrent: true
    },
    {
        id: '2',
        device: 'Safari на iPhone',
        deviceType: 'mobile',
        location: 'Ташкент, Узбекистан',
        lastActive: '2 часа назад',
        isCurrent: false
    },
    {
        id: '3',
        device: 'Firefox на MacOS',
        deviceType: 'desktop',
        location: 'Самарканд, Узбекистан',
        lastActive: '3 дня назад',
        isCurrent: false
    }
];

export function SecuritySettings() {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [sessions, setSessions] = useState<Session[]>(mockSessions);

    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handlePasswordChange = (field: string, value: string) => {
        setPasswordForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
        setShowSuccess(false);
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Record<string, string> = {};

        if (!passwordForm.oldPassword) {
            newErrors.oldPassword = 'Введите текущий пароль';
        }
        if (passwordForm.newPassword.length < 8) {
            newErrors.newPassword = 'Минимум 8 символов';
        }
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        setShowSuccess(true);
        setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleLogoutAll = async () => {
        setSessions(prev => prev.filter(s => s.isCurrent));
    };

    const handleLogoutSession = (sessionId: string) => {
        setSessions(prev => prev.filter(s => s.id !== sessionId));
    };

    const getDeviceIcon = (type: string) => {
        switch (type) {
            case 'mobile':
                return <Smartphone className="w-5 h-5" />;
            case 'tablet':
                return <Smartphone className="w-5 h-5" />;
            default:
                return <Monitor className="w-5 h-5" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Change Password */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <Lock className="w-5 h-5 text-blue-500" />
                        Изменить пароль
                    </h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Регулярно обновляйте пароль для безопасности
                    </p>
                </div>

                <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
                    {/* Old Password */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Текущий пароль
                        </label>
                        <div className="relative">
                            <input
                                type={showOldPassword ? 'text' : 'password'}
                                value={passwordForm.oldPassword}
                                onChange={(e) => handlePasswordChange('oldPassword', e.target.value)}
                                className={`
                                    w-full px-4 py-3 pr-12 rounded-xl border bg-white dark:bg-slate-900
                                    text-slate-900 dark:text-white placeholder-slate-400
                                    transition-colors
                                    ${errors.oldPassword
                                        ? 'border-red-500'
                                        : 'border-slate-200 dark:border-slate-600 focus:border-blue-500'
                                    }
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                                `}
                                placeholder="Введите текущий пароль"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            >
                                {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.oldPassword && (
                            <p className="mt-1 text-sm text-red-500">{errors.oldPassword}</p>
                        )}
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Новый пароль
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={passwordForm.newPassword}
                                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                                className={`
                                    w-full px-4 py-3 pr-12 rounded-xl border bg-white dark:bg-slate-900
                                    text-slate-900 dark:text-white placeholder-slate-400
                                    transition-colors
                                    ${errors.newPassword
                                        ? 'border-red-500'
                                        : 'border-slate-200 dark:border-slate-600 focus:border-blue-500'
                                    }
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                                `}
                                placeholder="Минимум 8 символов"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            >
                                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Подтвердите пароль
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={passwordForm.confirmPassword}
                                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                                className={`
                                    w-full px-4 py-3 pr-12 rounded-xl border bg-white dark:bg-slate-900
                                    text-slate-900 dark:text-white placeholder-slate-400
                                    transition-colors
                                    ${errors.confirmPassword
                                        ? 'border-red-500'
                                        : 'border-slate-200 dark:border-slate-600 focus:border-blue-500'
                                    }
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                                `}
                                placeholder="Повторите новый пароль"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-between pt-4">
                        {showSuccess && (
                            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                <Check className="w-5 h-5" />
                                <span className="text-sm font-medium">Пароль обновлён</span>
                            </div>
                        )}
                        <button
                            type="submit"
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
                                    Обновление...
                                </>
                            ) : (
                                'Обновить пароль'
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                    Двухфакторная аутентификация
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Дополнительная защита вашего аккаунта
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                            className={`
                                relative w-14 h-8 rounded-full transition-colors
                                ${is2FAEnabled ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}
                            `}
                        >
                            <div
                                className={`
                                    absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform
                                    ${is2FAEnabled ? 'translate-x-7' : 'translate-x-1'}
                                `}
                            />
                        </button>
                    </div>
                    {is2FAEnabled && (
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-500/10 rounded-xl border border-green-200 dark:border-green-500/20">
                            <p className="text-sm text-green-700 dark:text-green-300">
                                2FA включена. Используйте приложение Google Authenticator для генерации кодов.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                Активные сессии
                            </h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Устройства, на которых выполнен вход
                            </p>
                        </div>
                        {sessions.length > 1 && (
                            <button
                                onClick={handleLogoutAll}
                                className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors text-sm font-medium flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                Выйти из всех
                            </button>
                        )}
                    </div>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {sessions.map((session) => (
                        <div key={session.id} className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`
                                    w-10 h-10 rounded-xl flex items-center justify-center
                                    ${session.isCurrent
                                        ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                                    }
                                `}>
                                    {getDeviceIcon(session.deviceType)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-slate-900 dark:text-white">
                                            {session.device}
                                        </span>
                                        {session.isCurrent && (
                                            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full">
                                                Текущая
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-1">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {session.location}
                                        </span>
                                        <span>{session.lastActive}</span>
                                    </div>
                                </div>
                            </div>
                            {!session.isCurrent && (
                                <button
                                    onClick={() => handleLogoutSession(session.id)}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Security Tips */}
            <div className="bg-amber-50 dark:bg-amber-500/10 rounded-2xl p-6 border border-amber-200 dark:border-amber-500/20">
                <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-amber-800 dark:text-amber-300">
                            Советы по безопасности
                        </h3>
                        <ul className="mt-2 space-y-1 text-sm text-amber-700 dark:text-amber-400">
                            <li>• Используйте уникальный пароль для каждого сервиса</li>
                            <li>• Включите двухфакторную аутентификацию</li>
                            <li>• Регулярно проверяйте активные сессии</li>
                            <li>• Не передавайте свой пароль третьим лицам</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
