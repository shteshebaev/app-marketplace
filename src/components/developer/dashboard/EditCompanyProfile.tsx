import { useState } from 'react';
import { Upload, Save, Globe, Mail, Phone, MapPin, MessageCircle, Linkedin, Github } from 'lucide-react';
import { mockDeveloper } from '../mockData';

export function EditCompanyProfile() {
    const [formData, setFormData] = useState({
        companyName: mockDeveloper.companyName,
        description: mockDeveloper.description,
        aboutCompany: mockDeveloper.aboutCompany,
        foundedYear: mockDeveloper.foundedYear?.toString() || '',
        employeesCount: mockDeveloper.employeesCount || '',
        email: mockDeveloper.contact.email,
        phone: mockDeveloper.contact.phone || '',
        address: mockDeveloper.contact.address || '',
        website: mockDeveloper.socialLinks.website || '',
        telegram: mockDeveloper.socialLinks.telegram || '',
        linkedin: mockDeveloper.socialLinks.linkedin || '',
        github: mockDeveloper.socialLinks.github || ''
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setSaveSuccess(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // In real app, call API to save
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Saving profile:', formData);
            setSaveSuccess(true);
        } catch (error) {
            console.error('Error saving:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Профиль компании
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Информация о вашей компании на маркетплейсе
                    </p>
                </div>

                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                    {isSaving ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Сохранение...
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5" />
                            Сохранить
                        </>
                    )}
                </button>
            </div>

            {/* Success Message */}
            {saveSuccess && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-xl text-emerald-700 dark:text-emerald-400">
                    Профиль успешно сохранен!
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Company Logo */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                            Логотип компании
                        </h2>
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                                {formData.companyName.charAt(0)}
                            </div>
                            <div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                                    <Upload className="w-4 h-4" />
                                    Загрузить логотип
                                </button>
                                <p className="text-xs text-slate-400 mt-2">
                                    PNG или JPG, максимум 1MB, рекомендуемый размер 512x512px
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                            Основная информация
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Название компании *
                                </label>
                                <input
                                    type="text"
                                    value={formData.companyName}
                                    onChange={(e) => handleChange('companyName', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Краткое описание *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    О компании
                                </label>
                                <textarea
                                    value={formData.aboutCompany}
                                    onChange={(e) => handleChange('aboutCompany', e.target.value)}
                                    rows={6}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Год основания
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.foundedYear}
                                        onChange={(e) => handleChange('foundedYear', e.target.value)}
                                        placeholder="2020"
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Количество сотрудников
                                    </label>
                                    <select
                                        value={formData.employeesCount}
                                        onChange={(e) => handleChange('employeesCount', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Выберите</option>
                                        <option value="1-10">1-10</option>
                                        <option value="11-50">11-50</option>
                                        <option value="50-100">50-100</option>
                                        <option value="100-500">100-500</option>
                                        <option value="500+">500+</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                            Социальные сети
                        </h2>

                        <div className="space-y-4">
                            <div className="relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="url"
                                    value={formData.website}
                                    onChange={(e) => handleChange('website', e.target.value)}
                                    placeholder="https://example.com"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="relative">
                                <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="url"
                                    value={formData.telegram}
                                    onChange={(e) => handleChange('telegram', e.target.value)}
                                    placeholder="https://t.me/username"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="relative">
                                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="url"
                                    value={formData.linkedin}
                                    onChange={(e) => handleChange('linkedin', e.target.value)}
                                    placeholder="https://linkedin.com/company/..."
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="relative">
                                <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="url"
                                    value={formData.github}
                                    onChange={(e) => handleChange('github', e.target.value)}
                                    placeholder="https://github.com/..."
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                            Контактная информация
                        </h2>

                        <div className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    placeholder="email@example.com"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    placeholder="+7 (999) 123-45-67"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="relative">
                                <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                    placeholder="Адрес офиса"
                                    rows={2}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Verification Status */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                            Верификация
                        </h2>

                        {mockDeveloper.isVerified ? (
                            <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-medium text-emerald-700 dark:text-emerald-400">
                                        Верифицирован
                                    </div>
                                    <div className="text-sm text-emerald-600 dark:text-emerald-500">
                                        Ваш профиль подтвержден
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-500/10 rounded-xl">
                                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white">
                                    !
                                </div>
                                <div>
                                    <div className="font-medium text-amber-700 dark:text-amber-400">
                                        Не верифицирован
                                    </div>
                                    <div className="text-sm text-amber-600 dark:text-amber-500">
                                        Пройдите верификацию
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
