import { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import type { LoginCredentials, AuthFormErrors } from '../../types/auth';

interface LoginFormProps {
    onSubmit: (data: LoginCredentials) => Promise<void>;
    isLoading?: boolean;
    error?: string | null;
}

export function LoginForm({ onSubmit, isLoading = false, error }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState<AuthFormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validate = (): boolean => {
        const newErrors: AuthFormErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Введите email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Некорректный email';
        }

        if (!password) {
            newErrors.password = 'Введите пароль';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ email: true, password: true });

        if (!validate()) return;

        await onSubmit({
            email: email.trim().toLowerCase(),
            password,
        });
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validate();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* General Error */}
            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl">
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                        <X className="w-4 h-4" />
                        {error}
                    </p>
                </div>
            )}

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="your@email.com"
                    autoComplete="email"
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        touched.email && errors.email
                            ? 'border-red-500'
                            : 'border-slate-200 dark:border-slate-600'
                    }`}
                />
                {touched.email && errors.email && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <X className="w-3.5 h-3.5" />
                        {errors.email}
                    </p>
                )}
            </div>

            {/* Password */}
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Пароль
                    </label>
                    <a
                        href="/forgot-password"
                        className="text-sm text-blue-500 hover:text-blue-600 font-medium"
                    >
                        Забыли пароль?
                    </a>
                </div>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => handleBlur('password')}
                        placeholder="Введите пароль"
                        autoComplete="current-password"
                        className={`w-full px-4 py-3 pr-12 bg-slate-50 dark:bg-slate-700 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                            touched.password && errors.password
                                ? 'border-red-500'
                                : 'border-slate-200 dark:border-slate-600'
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                {touched.password && errors.password && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <X className="w-3.5 h-3.5" />
                        {errors.password}
                    </p>
                )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                    Запомнить меня
                </label>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Вход...
                    </span>
                ) : (
                    'Войти'
                )}
            </button>

            {/* Register Link */}
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Нет аккаунта?{' '}
                <a href="/register" className="text-blue-500 hover:text-blue-600 font-medium">
                    Создать аккаунт
                </a>
            </p>
        </form>
    );
}
