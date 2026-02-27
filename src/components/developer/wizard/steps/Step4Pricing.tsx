import { useEffect, useState } from 'react';
import { Plus, X, Star, Check } from 'lucide-react';
import type { DeveloperProduct } from '../../../../types/developer-product';
import type { PricingTier } from '../../../product/types';

interface Step4PricingProps {
    data: Partial<DeveloperProduct>;
    onChange: (data: Partial<DeveloperProduct>) => void;
    onValidChange: (isValid: boolean) => void;
}

interface TierFormData {
    id: string;
    name: string;
    price: string;
    priceType: 'monthly' | 'yearly' | 'one-time' | 'custom';
    description: string;
    features: string[];
    isPopular: boolean;
    isFree: boolean;
    ctaText: string;
}

const emptyTier: TierFormData = {
    id: '',
    name: '',
    price: '',
    priceType: 'monthly',
    description: '',
    features: [],
    isPopular: false,
    isFree: false,
    ctaText: 'Выбрать'
};

export function Step4Pricing({ data, onChange, onValidChange }: Step4PricingProps) {
    const [tiers, setTiers] = useState<TierFormData[]>(() => {
        if (data.pricing && data.pricing.length > 0) {
            return data.pricing.map(tier => ({
                ...tier,
                isFree: tier.isFree || false,
                isPopular: tier.isPopular || false,
                priceType: tier.priceType || 'monthly'
            }));
        }
        return [{ ...emptyTier, id: crypto.randomUUID() }];
    });

    const [billingNote, setBillingNote] = useState(data.billingNote || '');

    // Validate form
    useEffect(() => {
        const isValid = tiers.length >= 1 && tiers.every(tier =>
            tier.name.trim() &&
            (tier.isFree || tier.price.trim() || tier.priceType === 'custom')
        );
        onValidChange(isValid);
    }, [tiers, onValidChange]);

    // Update parent data
    useEffect(() => {
        const pricingTiers: PricingTier[] = tiers.map(tier => ({
            id: tier.id,
            name: tier.name,
            price: tier.isFree ? '0 ₽' : tier.price,
            priceType: tier.priceType,
            description: tier.description,
            features: tier.features,
            isPopular: tier.isPopular,
            isFree: tier.isFree,
            ctaText: tier.ctaText
        }));
        onChange({ pricing: pricingTiers, billingNote: billingNote || undefined });
    }, [tiers, billingNote, onChange]);

    const addTier = () => {
        if (tiers.length < 5) {
            setTiers([...tiers, { ...emptyTier, id: crypto.randomUUID() }]);
        }
    };

    const removeTier = (index: number) => {
        if (tiers.length > 1) {
            setTiers(tiers.filter((_, i) => i !== index));
        }
    };

    const updateTier = (index: number, updates: Partial<TierFormData>) => {
        setTiers(tiers.map((tier, i) => i === index ? { ...tier, ...updates } : tier));
    };

    const setPopular = (index: number) => {
        setTiers(tiers.map((tier, i) => ({ ...tier, isPopular: i === index })));
    };

    const addFeatureToTier = (tierIndex: number, feature: string) => {
        if (feature.trim()) {
            const newFeatures = [...tiers[tierIndex].features, feature.trim()];
            updateTier(tierIndex, { features: newFeatures });
        }
    };

    const removeFeatureFromTier = (tierIndex: number, featureIndex: number) => {
        const newFeatures = tiers[tierIndex].features.filter((_, i) => i !== featureIndex);
        updateTier(tierIndex, { features: newFeatures });
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 lg:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                Тарифные планы
            </h2>

            <div className="space-y-6">
                {tiers.map((tier, tierIndex) => (
                    <div
                        key={tier.id}
                        className={`p-6 rounded-xl border-2 transition-all ${
                            tier.isPopular
                                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-500/10'
                                : 'border-slate-200 dark:border-slate-700'
                        }`}
                    >
                        {/* Tier Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                    Тариф {tierIndex + 1}
                                </h3>
                                {tier.isPopular && (
                                    <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                                        <Star className="w-3 h-3" />
                                        Популярный
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                {!tier.isPopular && (
                                    <button
                                        onClick={() => setPopular(tierIndex)}
                                        className="text-xs text-slate-500 hover:text-blue-500 transition-colors"
                                    >
                                        Сделать популярным
                                    </button>
                                )}
                                {tiers.length > 1 && (
                                    <button
                                        onClick={() => removeTier(tierIndex)}
                                        className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Tier Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                                    Название *
                                </label>
                                <input
                                    type="text"
                                    value={tier.name}
                                    onChange={(e) => updateTier(tierIndex, { name: e.target.value })}
                                    placeholder="Например: Базовый, Про, Enterprise"
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                                    Цена *
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={tier.isFree ? 'Бесплатно' : tier.price}
                                        onChange={(e) => updateTier(tierIndex, { price: e.target.value, isFree: false })}
                                        placeholder="15 000 ₽"
                                        disabled={tier.isFree}
                                        className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                    />
                                    <select
                                        value={tier.priceType}
                                        onChange={(e) => updateTier(tierIndex, { priceType: e.target.value as TierFormData['priceType'] })}
                                        className="px-3 py-2.5 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="monthly">/мес</option>
                                        <option value="yearly">/год</option>
                                        <option value="one-time">разово</option>
                                        <option value="custom">по запросу</option>
                                    </select>
                                </div>
                                <label className="flex items-center gap-2 mt-2">
                                    <input
                                        type="checkbox"
                                        checked={tier.isFree}
                                        onChange={(e) => updateTier(tierIndex, { isFree: e.target.checked, price: e.target.checked ? '' : tier.price })}
                                        className="rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-slate-500">Бесплатный тариф</span>
                                </label>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                                    Описание
                                </label>
                                <input
                                    type="text"
                                    value={tier.description}
                                    onChange={(e) => updateTier(tierIndex, { description: e.target.value })}
                                    placeholder="Краткое описание тарифа"
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Features */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                                    Что включено
                                </label>
                                <div className="space-y-2 mb-3">
                                    {tier.features.map((feature, featureIndex) => (
                                        <div
                                            key={featureIndex}
                                            className="flex items-center gap-2 text-sm"
                                        >
                                            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                            <span className="flex-1 text-slate-600 dark:text-slate-300">{feature}</span>
                                            <button
                                                onClick={() => removeFeatureFromTier(tierIndex, featureIndex)}
                                                className="text-slate-400 hover:text-red-500"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Добавить пункт"
                                        className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                addFeatureToTier(tierIndex, e.currentTarget.value);
                                                e.currentTarget.value = '';
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* CTA Text */}
                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                                    Текст кнопки
                                </label>
                                <input
                                    type="text"
                                    value={tier.ctaText}
                                    onChange={(e) => updateTier(tierIndex, { ctaText: e.target.value })}
                                    placeholder="Выбрать"
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add Tier Button */}
                {tiers.length < 5 && (
                    <button
                        onClick={addTier}
                        className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Добавить тариф
                    </button>
                )}

                {/* Billing Note */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Примечание к тарифам
                    </label>
                    <input
                        type="text"
                        value={billingNote}
                        onChange={(e) => setBillingNote(e.target.value)}
                        placeholder="Например: Все цены указаны без НДС"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    );
}
