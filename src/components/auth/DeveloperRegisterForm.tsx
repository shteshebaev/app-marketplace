import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Check, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { DeveloperRegisterData, AuthFormErrors, PasswordStrength } from '../../types/auth';

interface DeveloperRegisterFormProps {
    onSubmit: (data: DeveloperRegisterData) => Promise<void>;
    onBack: () => void;
    isLoading?: boolean;
}

export function DeveloperRegisterForm({ onSubmit, onBack, isLoading = false }: DeveloperRegisterFormProps) {
    const { t } = useTranslation();
    const [companyName, setCompanyName] = useState('');
    const [contactName, setContactName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [website, setWebsite] = useState('');
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

        if (!companyName.trim()) {
            newErrors.companyName = t('devRegister.errorCompanyRequired');
        } else if (companyName.trim().length < 2) {
            newErrors.companyName = t('devRegister.errorCompanyMin');
        }

        if (!contactName.trim()) {
            newErrors.contactName = t('devRegister.errorContactRequired');
        } else if (contactName.trim().length < 2) {
            newErrors.contactName = t('devRegister.errorContactMin');
        }

        if (!email.trim()) {
            newErrors.email = t('devRegister.errorEmailRequired');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = t('devRegister.errorEmailInvalid');
        }

        if (!password) {
            newErrors.password = t('devRegister.errorPasswordRequired');
        } else if (password.length < 8) {
            newErrors.password = t('devRegister.errorPasswordMin');
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = t('devRegister.errorConfirmRequired');
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = t('devRegister.errorPasswordsNotMatch');
        }

        if (website && !/^https?:\/\/.+\..+/.test(website)) {
            newErrors.website = t('devRegister.errorWebsiteInvalid');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({
            companyName: true,
            contactName: true,
            email: true,
            password: true,
            confirmPassword: true,
            website: true
        });

        if (!validate()) return;

        await onSubmit({
            role: 'DEVELOPER',
            companyName: companyName.trim(),
            contactName: contactName.trim(),
            email: email.trim().toLowerCase(),
            password,
            website: website.trim() || undefined,
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
                {t('devRegister.backToRoles')}
            </button>

            {/* Company Name */}
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('devRegister.companyName')}
                </label>
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    onBlur={() => handleBlur('companyName')}
                    placeholder={t('devRegister.companyPlaceholder')}
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                        touched.companyName && errors.companyName
                            ? 'border-red-500'
                            : 'border-slate-200 dark:border-slate-600'
                    }`}
                />
                {touched.companyName && errors.companyName && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <X className="w-3.5 h-3.5" />
                        {errors.companyName}
                    </p>
                )}
            </div>

            {/* Contact Name */}
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('devRegister.contactPerson')}
                </label>
                <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    onBlur={() => handleBlur('contactName')}
                    placeholder={t('devRegister.contactPlaceholder')}
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                        touched.contactName && errors.contactName
                            ? 'border-red-500'
                            : 'border-slate-200 dark:border-slate-600'
                    }`}
                />
                {touched.contactName && errors.contactName && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <X className="w-3.5 h-3.5" />
                        {errors.contactName}
                    </p>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('devRegister.workEmail')}
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="contact@company.com"
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
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

            {/* Website */}
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('devRegister.website')} <span className="text-slate-400 font-normal">({t('devRegister.websiteOptional')})</span>
                </label>
                <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        onBlur={() => handleBlur('website')}
                        placeholder="https://company.com"
                        className={`w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                            touched.website && errors.website
                                ? 'border-red-500'
                                : 'border-slate-200 dark:border-slate-600'
                        }`}
                    />
                </div>
                {touched.website && errors.website && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <X className="w-3.5 h-3.5" />
                        {errors.website}
                    </p>
                )}
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('devRegister.password')}
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => handleBlur('password')}
                        placeholder={t('devRegister.passwordPlaceholder')}
                        className={`w-full px-4 py-3 pr-12 bg-slate-50 dark:bg-slate-700 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
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
                            {passwordStrength === 'weak' ? t('devRegister.passwordWeak') : passwordStrength === 'medium' ? t('devRegister.passwordMedium') : t('devRegister.passwordStrong')}
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
                    {t('devRegister.confirmPassword')}
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={() => handleBlur('confirmPassword')}
                        placeholder={t('devRegister.confirmPlaceholder')}
                        className={`w-full px-4 py-3 pr-12 bg-slate-50 dark:bg-slate-700 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
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
                        {t('devRegister.passwordsMatch')}
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
                className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t('devRegister.creatingAccount')}
                    </span>
                ) : (
                    t('devRegister.createDevAccount')
                )}
            </button>

            {/* Terms */}
            <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                {t('devRegister.termsText')}{' '}
                <a href="/terms" className="text-indigo-500 hover:underline">
                    {t('devRegister.termsLink')}
                </a>{' '}
                {t('common.and')}{' '}
                <a href="/privacy" className="text-indigo-500 hover:underline">
                    {t('devRegister.privacyLink')}
                </a>
            </p>
        </form>
    );
}
