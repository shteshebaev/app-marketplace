import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Check, X } from 'lucide-react';
import type { UserRegisterData, AuthFormErrors, PasswordStrength } from '../../types/auth';

interface UserRegisterFormProps {
    onSubmit: (data: UserRegisterData) => Promise<void>;
    onBack: () => void;
    isLoading?: boolean;
}

export function UserRegisterForm({ onSubmit, onBack, isLoading = false }: UserRegisterFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<AuthFormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const getPasswordStrength = (pwd: string): PasswordStrength => {
        if (pwd.length < 8) return 'weak';
        const hasUpper = /[A-Z]/.test(pwd);
        const hasLower = /[a-z]/.test(pwd);
        const hasNumber = /[0-9]/.test(pwd);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
        const score = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
        if (score >= 3 && pwd.length >= 10) return 'strong';
        if (score >= 2) return 'medium';
        return 'weak';
    };

    const passwordStrength = getPasswordStrength(password);

    const validate = (): boolean => {
        const newErrors: AuthFormErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Введите имя';
        } else if (name.trim().length < 2) {
            newErrors.name = 'Имя должно быть не менее 2 символов';
        }

        if (!email.trim()) {
            newErrors.email = 'Введите email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Некорректный email';
        }

        if (!password) {
            newErrors.password = 'Введите пароль';
        } else if (password.length < 8) {
            newErrors.password = 'Пароль должен быть не менее 8 символов';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Подтвердите пароль';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ name: true, email: true, password: true, confirmPassword: true });

        if (!validate()) return;

        await onSubmit({
            role: 'USER',
            name: name.trim(),
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
            {/* Back Button */}
            <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Назад к выбору роли
            </button>

            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Имя
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="Иван Иванов"
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        touched.name && errors.name
                            ? 'border-red-500'
                            : 'border-slate-200 dark:border-slate-600'
                    }`}
                />
                {touched.name && errors.name && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <X className="w-3.5 h-3.5" />
                        {errors.name}
                    </p>
                )}
            </div>

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
                    placeholder="ivan@example.com"
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
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Пароль
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => handleBlur('password')}
                        placeholder="Минимум 8 символов"
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

                {/* Password Strength */}
                {password && (
                    <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                            <div className={`h-1 flex-1 rounded-full ${passwordStrength === 'weak' ? 'bg-red-500' : passwordStrength === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                            <div className={`h-1 flex-1 rounded-full ${passwordStrength === 'medium' || passwordStrength === 'strong' ? (passwordStrength === 'medium' ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-slate-200 dark:bg-slate-600'}`} />
                            <div className={`h-1 flex-1 rounded-full ${passwordStrength === 'strong' ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-600'}`} />
                        </div>
                        <p className={`text-xs ${passwordStrength === 'weak' ? 'text-red-500' : passwordStrength === 'medium' ? 'text-amber-500' : 'text-emerald-500'}`}>
                            {passwordStrength === 'weak' ? 'Слабый пароль' : passwordStrength === 'medium' ? 'Средний пароль' : 'Надёжный пароль'}
                        </p>
                    </div>
                )}

                {touched.password && errors.password && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <X className="w-3.5 h-3.5" />
                        {errors.password}
                    </p>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Подтвердите пароль
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={() => handleBlur('confirmPassword')}
                        placeholder="Повторите пароль"
                        className={`w-full px-4 py-3 pr-12 bg-slate-50 dark:bg-slate-700 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                            touched.confirmPassword && errors.confirmPassword
                                ? 'border-red-500'
                                : confirmPassword && password === confirmPassword
                                ? 'border-emerald-500'
                                : 'border-slate-200 dark:border-slate-600'
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                {confirmPassword && password === confirmPassword && (
                    <p className="mt-1.5 text-sm text-emerald-500 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Пароли совпадают
                    </p>
                )}
                {touched.confirmPassword && errors.confirmPassword && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <X className="w-3.5 h-3.5" />
                        {errors.confirmPassword}
                    </p>
                )}
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
                        Создание аккаунта...
                    </span>
                ) : (
                    'Создать аккаунт'
                )}
            </button>

            {/* Terms */}
            <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                Создавая аккаунт, вы соглашаетесь с{' '}
                <a href="/terms" className="text-blue-500 hover:underline">
                    условиями использования
                </a>{' '}
                и{' '}
                <a href="/privacy" className="text-blue-500 hover:underline">
                    политикой конфиденциальности
                </a>
            </p>
        </form>
    );
}
