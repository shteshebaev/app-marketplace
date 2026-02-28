import { useState } from 'react';
import { Camera, Check, Mail, Phone, Building2, User, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';
import { languages, type LanguageCode } from '../../../i18n';

interface ProfileForm {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phone: string;
}

export function ProfileSettings() {
    const { t, i18n } = useTranslation();
    const { user } = useAuth();
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState<Partial<ProfileForm>>({});

    const [form, setForm] = useState<ProfileForm>({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        company: 'ООО "Моя компания"',
        email: user?.email || '',
        phone: '+998 90 123 45 67'
    });

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleChange = (field: keyof ProfileForm, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: undefined }));
        setShowSuccess(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Partial<ProfileForm> = {};

        if (!form.firstName.trim()) {
            newErrors.firstName = t('errors.required');
        }
        if (!form.lastName.trim()) {
            newErrors.lastName = t('errors.required');
        }
        if (!validateEmail(form.email)) {
            newErrors.email = t('errors.invalidEmail');
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSaving(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSaving(false);
        setShowSuccess(true);

        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {t('settings.profileTitle')}
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {t('settings.profileSubtitle')}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-semibold shadow-lg">
                            {form.firstName.charAt(0)}{form.lastName.charAt(0)}
                        </div>
                        <button
                            type="button"
                            className="absolute -bottom-2 -right-2 w-10 h-10 bg-white dark:bg-slate-700 rounded-xl shadow-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                        >
                            <Camera className="w-5 h-5" />
                        </button>
                    </div>
                    <div>
                        <h3 className="font-medium text-slate-900 dark:text-white">
                            {t('settings.profilePhoto')}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {t('settings.photoHint')}
                        </p>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            {t('settings.firstName')} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={form.firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                                className={`
                                    w-full pl-12 pr-4 py-3 rounded-xl border bg-white dark:bg-slate-900
                                    text-slate-900 dark:text-white placeholder-slate-400
                                    transition-colors
                                    ${errors.firstName
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500'
                                    }
                                    focus:outline-none focus:ring-2 focus:ring-opacity-50
                                `}
                                placeholder={t('settings.firstName')}
                            />
                        </div>
                        {errors.firstName && (
                            <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            {t('settings.lastName')} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={form.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                                className={`
                                    w-full pl-12 pr-4 py-3 rounded-xl border bg-white dark:bg-slate-900
                                    text-slate-900 dark:text-white placeholder-slate-400
                                    transition-colors
                                    ${errors.lastName
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500'
                                    }
                                    focus:outline-none focus:ring-2 focus:ring-opacity-50
                                `}
                                placeholder={t('settings.lastName')}
                            />
                        </div>
                        {errors.lastName && (
                            <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                        )}
                    </div>

                    {/* Company */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            {t('settings.company')}
                        </label>
                        <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={form.company}
                                onChange={(e) => handleChange('company', e.target.value)}
                                className="
                                    w-full pl-12 pr-4 py-3 rounded-xl border bg-white dark:bg-slate-900
                                    border-slate-200 dark:border-slate-600
                                    text-slate-900 dark:text-white placeholder-slate-400
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500
                                    transition-colors
                                "
                                placeholder={t('settings.company')}
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            {t('settings.phone')}
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="tel"
                                value={form.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                className="
                                    w-full pl-12 pr-4 py-3 rounded-xl border bg-white dark:bg-slate-900
                                    border-slate-200 dark:border-slate-600
                                    text-slate-900 dark:text-white placeholder-slate-400
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500
                                    transition-colors
                                "
                                placeholder="+998 XX XXX XX XX"
                            />
                        </div>
                    </div>

                    {/* Email - Full Width */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            {t('auth.email')} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className={`
                                    w-full pl-12 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50
                                    text-slate-900 dark:text-white placeholder-slate-400
                                    transition-colors
                                    ${errors.email
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500'
                                    }
                                    focus:outline-none focus:ring-2 focus:ring-opacity-50
                                `}
                                placeholder="email@example.com"
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            {t('settings.emailChangeHint')}
                        </p>
                    </div>

                    {/* Language */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            {t('settings.language')}
                        </label>
                        <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <select
                                value={i18n.language}
                                onChange={(e) => {
                                    i18n.changeLanguage(e.target.value as LanguageCode);
                                    localStorage.setItem('language', e.target.value);
                                }}
                                className="
                                    w-full pl-12 pr-4 py-3 rounded-xl border bg-white dark:bg-slate-900
                                    border-slate-200 dark:border-slate-600
                                    text-slate-900 dark:text-white
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500
                                    transition-colors appearance-none cursor-pointer
                                "
                            >
                                {languages.map((lang) => (
                                    <option key={lang.code} value={lang.code}>
                                        {lang.flag} {lang.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            {t('settings.languageHint')}
                        </p>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                    {showSuccess && (
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <Check className="w-5 h-5" />
                            <span className="text-sm font-medium">{t('settings.changesSaved')}</span>
                        </div>
                    )}
                    <div className={!showSuccess ? 'ml-auto' : ''}>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="
                                px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl
                                transition-all shadow-lg shadow-blue-500/25
                                disabled:opacity-50 disabled:cursor-not-allowed
                                flex items-center gap-2
                            "
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    {t('common.loading')}
                                </>
                            ) : (
                                t('settings.saveChanges')
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
