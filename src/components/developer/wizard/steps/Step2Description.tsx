import { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { DeveloperProduct } from '../../../../types/developer-product';

interface Step2DescriptionProps {
    data: Partial<DeveloperProduct>;
    onChange: (data: Partial<DeveloperProduct>) => void;
    onValidChange: (isValid: boolean) => void;
}

export function Step2Description({ data, onChange, onValidChange }: Step2DescriptionProps) {
    const [fullDescription, setFullDescription] = useState(data.fullDescription || '');
    const [features, setFeatures] = useState<string[]>(data.features || []);
    const [featureInput, setFeatureInput] = useState('');
    const [targetAudience, setTargetAudience] = useState(data.targetAudience || '');
    const [useCases, setUseCases] = useState<string[]>(data.useCases || []);
    const [useCaseInput, setUseCaseInput] = useState('');

    // Validate form
    useEffect(() => {
        const isValid = fullDescription.trim().length >= 50 &&
            features.length >= 1 &&
            targetAudience.trim().length >= 10;
        onValidChange(isValid);
    }, [fullDescription, features, targetAudience, onValidChange]);

    // Update parent data
    useEffect(() => {
        onChange({ fullDescription, features, targetAudience, useCases });
    }, [fullDescription, features, targetAudience, useCases, onChange]);

    const handleAddFeature = () => {
        if (featureInput.trim() && features.length < 20) {
            setFeatures([...features, featureInput.trim()]);
            setFeatureInput('');
        }
    };

    const handleRemoveFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    const handleAddUseCase = () => {
        if (useCaseInput.trim() && useCases.length < 10) {
            setUseCases([...useCases, useCaseInput.trim()]);
            setUseCaseInput('');
        }
    };

    const handleRemoveUseCase = (index: number) => {
        setUseCases(useCases.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 lg:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                Описание продукта
            </h2>

            <div className="space-y-6">
                {/* Full Description */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Полное описание *
                    </label>
                    <textarea
                        value={fullDescription}
                        onChange={(e) => setFullDescription(e.target.value)}
                        placeholder="Подробно опишите ваш продукт: его возможности, преимущества, для кого он создан..."
                        rows={8}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 resize-none"
                        maxLength={5000}
                    />
                    <p className="text-xs text-slate-400 mt-1">
                        {fullDescription.length}/5000 символов (минимум 50)
                    </p>
                </div>

                {/* Features */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Ключевые возможности *
                    </label>
                    <div className="space-y-2 mb-3">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl"
                            >
                                <span className="flex-1 text-sm text-slate-700 dark:text-slate-300">
                                    {feature}
                                </span>
                                <button
                                    onClick={() => handleRemoveFeature(index)}
                                    className="text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={featureInput}
                            onChange={(e) => setFeatureInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                            placeholder="Например: Автоматизация воронки продаж"
                            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                            disabled={features.length >= 20}
                        />
                        <button
                            onClick={handleAddFeature}
                            disabled={!featureInput.trim() || features.length >= 20}
                            className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Plus className="w-4 h-4" />
                            Добавить
                        </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{features.length}/20 возможностей (минимум 1)</p>
                </div>

                {/* Target Audience */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Целевая аудитория *
                    </label>
                    <textarea
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        placeholder="Опишите, для кого предназначен продукт: размер компании, отрасль, роли пользователей..."
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 resize-none"
                        maxLength={500}
                    />
                    <p className="text-xs text-slate-400 mt-1">{targetAudience.length}/500 символов</p>
                </div>

                {/* Use Cases */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Сценарии использования
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {useCases.map((useCase, index) => (
                            <span
                                key={index}
                                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm"
                            >
                                {useCase}
                                <button
                                    onClick={() => handleRemoveUseCase(index)}
                                    className="hover:text-emerald-900 dark:hover:text-emerald-100"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={useCaseInput}
                            onChange={(e) => setUseCaseInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddUseCase())}
                            placeholder="Например: B2B продажи"
                            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                            disabled={useCases.length >= 10}
                        />
                        <button
                            onClick={handleAddUseCase}
                            disabled={!useCaseInput.trim() || useCases.length >= 10}
                            className="px-4 py-3 bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Добавить
                        </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{useCases.length}/10 сценариев</p>
                </div>
            </div>
        </div>
    );
}
