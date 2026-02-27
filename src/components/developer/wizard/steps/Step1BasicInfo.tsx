import { useEffect, useState, useCallback, useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';
import type { DeveloperProduct } from '../../../../types/developer-product';

interface Step1BasicInfoProps {
    data: Partial<DeveloperProduct>;
    onChange: (data: Partial<DeveloperProduct>) => void;
    onValidChange: (isValid: boolean) => void;
}

const categories = [
    { id: 'crm', name: 'CRM системы' },
    { id: 'erp', name: 'ERP системы' },
    { id: 'bi', name: 'Бизнес-аналитика' },
    { id: 'hr', name: 'HR и управление персоналом' },
    { id: 'finance', name: 'Финансы и бухгалтерия' },
    { id: 'project', name: 'Управление проектами' },
    { id: 'marketing', name: 'Маркетинг и продажи' },
    { id: 'security', name: 'Безопасность' },
    { id: 'other', name: 'Другое' }
];

export function Step1BasicInfo({ data, onChange, onValidChange }: Step1BasicInfoProps) {
    const [name, setName] = useState(data.name || '');
    const [categoryId, setCategoryId] = useState(data.categoryId || '');
    const [shortDescription, setShortDescription] = useState(data.shortDescription || '');
    const [tags, setTags] = useState<string[]>(data.tags || []);
    const [tagInput, setTagInput] = useState('');
    const [logoPreview, setLogoPreview] = useState<string | null>(data.logo || null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const isFirstRender = useRef(true);

    // Validate form
    useEffect(() => {
        const isValid = name.trim().length >= 3 &&
            categoryId !== '' &&
            shortDescription.trim().length >= 10;
        onValidChange(isValid);
    }, [name, categoryId, shortDescription, onValidChange]);

    // Update parent data - only after first render and when values actually change
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        onChange({ name, categoryId, shortDescription, tags, logo: logoPreview || undefined });
    }, [name, categoryId, shortDescription, tags, logoPreview]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleAddTag = useCallback(() => {
        if (tagInput.trim() && tags.length < 10 && !tags.includes(tagInput.trim())) {
            setTags(prev => [...prev, tagInput.trim()]);
            setTagInput('');
        }
    }, [tagInput, tags]);

    const handleRemoveTag = useCallback((tagToRemove: string) => {
        setTags(prev => prev.filter(tag => tag !== tagToRemove));
    }, []);

    const handleTagKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                alert('Файл слишком большой. Максимальный размер 1MB');
                return;
            }
            if (!file.type.startsWith('image/')) {
                alert('Пожалуйста, выберите изображение');
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                setLogoPreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveLogo = () => {
        setLogoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 lg:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                Основная информация
            </h2>

            <div className="space-y-6">
                {/* Product Logo */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Логотип продукта
                    </label>
                    <div className="flex items-center gap-4">
                        {logoPreview ? (
                            <div className="relative">
                                <img
                                    src={logoPreview}
                                    alt="Logo preview"
                                    className="w-24 h-24 rounded-2xl object-cover"
                                />
                                <button
                                    onClick={handleRemoveLogo}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                                {name.charAt(0) || <Image className="w-8 h-8 opacity-50" />}
                            </div>
                        )}
                        <div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                <Upload className="w-4 h-4" />
                                {logoPreview ? 'Изменить' : 'Загрузить'}
                            </button>
                            <p className="text-xs text-slate-400 mt-2">PNG или JPG, максимум 1MB</p>
                        </div>
                    </div>
                </div>

                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Название продукта *
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Например: CRM Pro Enterprise"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                        maxLength={100}
                    />
                    <div className="flex justify-between mt-1">
                        <p className={`text-xs ${name.trim().length >= 3 ? 'text-emerald-500' : 'text-slate-400'}`}>
                            {name.trim().length >= 3 ? '✓ Минимум 3 символа' : 'Минимум 3 символа'}
                        </p>
                        <p className="text-xs text-slate-400">{name.length}/100</p>
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Категория *
                    </label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    {categoryId && (
                        <p className="text-xs text-emerald-500 mt-1">✓ Категория выбрана</p>
                    )}
                </div>

                {/* Short Description */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Краткое описание *
                    </label>
                    <textarea
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        placeholder="Опишите продукт в одном-двух предложениях"
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 resize-none"
                        maxLength={200}
                    />
                    <div className="flex justify-between mt-1">
                        <p className={`text-xs ${shortDescription.trim().length >= 10 ? 'text-emerald-500' : 'text-slate-400'}`}>
                            {shortDescription.trim().length >= 10 ? '✓ Минимум 10 символов' : `Ещё ${Math.max(0, 10 - shortDescription.trim().length)} символов`}
                        </p>
                        <p className="text-xs text-slate-400">{shortDescription.length}/200</p>
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Теги <span className="text-slate-400 font-normal">(опционально)</span>
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map(tag => (
                            <span
                                key={tag}
                                className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="hover:text-blue-900 dark:hover:text-blue-100"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            placeholder="Добавьте тег и нажмите Enter"
                            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                            disabled={tags.length >= 10}
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            disabled={!tagInput.trim() || tags.length >= 10}
                            className="px-4 py-3 bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Добавить
                        </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{tags.length}/10 тегов</p>
                </div>

                {/* Validation Summary */}
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Для перехода к следующему шагу заполните:
                    </p>
                    <ul className="space-y-1 text-sm">
                        <li className={name.trim().length >= 3 ? 'text-emerald-500' : 'text-slate-500'}>
                            {name.trim().length >= 3 ? '✓' : '○'} Название продукта (минимум 3 символа)
                        </li>
                        <li className={categoryId ? 'text-emerald-500' : 'text-slate-500'}>
                            {categoryId ? '✓' : '○'} Выберите категорию
                        </li>
                        <li className={shortDescription.trim().length >= 10 ? 'text-emerald-500' : 'text-slate-500'}>
                            {shortDescription.trim().length >= 10 ? '✓' : '○'} Краткое описание (минимум 10 символов)
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
