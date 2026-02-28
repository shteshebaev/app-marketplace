import { useState } from 'react';
import { AlertTriangle, Trash2, X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export function DangerZone() {
    const { logout } = useAuth();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmText, setConfirmText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');

    const handleDeleteAccount = async () => {
        if (confirmText !== 'УДАЛИТЬ') {
            setError('Введите УДАЛИТЬ для подтверждения');
            return;
        }

        if (!password) {
            setError('Введите пароль');
            return;
        }

        setIsDeleting(true);
        setError('');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // In real app, this would call the API to delete the account
        logout();
    };

    const closeModal = () => {
        setShowDeleteModal(false);
        setPassword('');
        setConfirmText('');
        setError('');
    };

    return (
        <div className="space-y-6">
            {/* Warning Banner */}
            <div className="bg-red-50 dark:bg-red-500/10 rounded-2xl p-6 border border-red-200 dark:border-red-500/20">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-red-800 dark:text-red-300">
                            Опасная зона
                        </h2>
                        <p className="mt-2 text-red-700 dark:text-red-400">
                            Действия в этом разделе необратимы. Пожалуйста, будьте осторожны.
                        </p>
                    </div>
                </div>
            </div>

            {/* Delete Account Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border-2 border-red-200 dark:border-red-500/30">
                <div className="p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Удаление аккаунта
                            </h3>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">
                                После удаления аккаунта все ваши данные будут безвозвратно потеряны:
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    Все подключённые решения будут отключены
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    Активные подписки будут отменены
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    История заявок и платежей будет удалена
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    Все API ключи будут деактивированы
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-red-500/25"
                        >
                            <Trash2 className="w-5 h-5" />
                            Удалить аккаунт
                        </button>
                    </div>
                </div>
            </div>

            {/* Export Data */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Экспорт данных
                    </h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        Перед удалением аккаунта вы можете скачать копию своих данных.
                    </p>
                    <button className="mt-4 px-4 py-2 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        Скачать мои данные
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-red-500 p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className="w-8 h-8" />
                                    <h3 className="text-xl font-semibold">
                                        Удаление аккаунта
                                    </h3>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="mt-2 text-red-100">
                                Это действие нельзя отменить
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            <p className="text-slate-600 dark:text-slate-400">
                                Для подтверждения удаления аккаунта, пожалуйста:
                            </p>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Введите ваш пароль
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError('');
                                        }}
                                        placeholder="Ваш пароль"
                                        className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirmation Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Введите <span className="font-bold text-red-500">УДАЛИТЬ</span> для подтверждения
                                </label>
                                <input
                                    type="text"
                                    value={confirmText}
                                    onChange={(e) => {
                                        setConfirmText(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="УДАЛИТЬ"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl">
                                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="p-6 pt-0 flex gap-3">
                            <button
                                onClick={closeModal}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={isDeleting || confirmText !== 'УДАЛИТЬ' || !password}
                                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isDeleting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Удаление...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-5 h-5" />
                                        Удалить навсегда
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
