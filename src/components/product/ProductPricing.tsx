import { Check, X, Sparkles } from 'lucide-react';
import type { PricingTier, PricingComparisonRow } from './types';

interface ProductPricingProps {
    tiers: PricingTier[];
    comparison?: PricingComparisonRow[];
    billingNote?: string;
    gradient?: string;
}

export function ProductPricing({ tiers, comparison, billingNote, gradient = 'from-blue-500 to-indigo-600' }: ProductPricingProps) {
    return (
        <section data-section="pricing" className="py-16 lg:py-24">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Тарифы
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Выберите план, который подходит именно вам
                    </p>
                    {billingNote && (
                        <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                            {billingNote}
                        </p>
                    )}
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`
                                relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2
                                ${tier.isPopular
                                    ? `bg-gradient-to-br ${gradient} text-white shadow-2xl scale-105`
                                    : 'bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-700'
                                }
                            `}
                        >
                            {/* Popular badge */}
                            {tier.isPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-slate-900 rounded-full text-sm font-bold shadow-lg">
                                        <Sparkles className="w-4 h-4 text-amber-500" />
                                        Популярный
                                    </span>
                                </div>
                            )}

                            {/* Tier name */}
                            <h3 className={`text-2xl font-bold mb-2 ${tier.isPopular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                {tier.name}
                            </h3>
                            <p className={`mb-6 ${tier.isPopular ? 'text-white/80' : 'text-slate-600 dark:text-slate-400'}`}>
                                {tier.description}
                            </p>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    {tier.priceType === 'custom' ? (
                                        <span className={`text-3xl font-bold ${tier.isPopular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                            {tier.price}
                                        </span>
                                    ) : (
                                        <>
                                            <span className={`text-4xl font-bold ${tier.isPopular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                                {tier.price === '0' ? 'Бесплатно' : `${tier.price} ₽`}
                                            </span>
                                            {tier.price !== '0' && (
                                                <span className={tier.isPopular ? 'text-white/70' : 'text-slate-500'}>
                                                    / мес
                                                </span>
                                            )}
                                        </>
                                    )}
                                </div>
                                {tier.priceNote && (
                                    <p className={`text-sm mt-1 ${tier.isPopular ? 'text-white/70' : 'text-slate-500'}`}>
                                        {tier.priceNote}
                                    </p>
                                )}
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.isPopular ? 'text-white' : 'text-emerald-500'}`} />
                                        <span className={tier.isPopular ? 'text-white/90' : 'text-slate-700 dark:text-slate-300'}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button
                                className={`
                                    w-full py-4 rounded-2xl font-semibold transition-all duration-200
                                    ${tier.isPopular
                                        ? 'bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl'
                                        : `bg-gradient-to-r ${gradient} text-white hover:shadow-lg hover:scale-[1.02]`
                                    }
                                `}
                            >
                                {tier.ctaText}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Comparison Table */}
                {comparison && comparison.length > 0 && (
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                Сравнение тарифов
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-700">
                                        <th className="text-left px-6 py-4 font-semibold text-slate-900 dark:text-white">
                                            Функция
                                        </th>
                                        {tiers.map((tier) => (
                                            <th key={tier.id} className="text-center px-6 py-4 font-semibold text-slate-900 dark:text-white">
                                                {tier.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparison.map((row, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-slate-100 dark:border-slate-700/50 last:border-0"
                                        >
                                            <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                                                {row.feature}
                                            </td>
                                            {tiers.map((tier) => {
                                                const value = row.values[tier.id];
                                                return (
                                                    <td key={tier.id} className="text-center px-6 py-4">
                                                        {typeof value === 'boolean' ? (
                                                            value ? (
                                                                <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                                                            ) : (
                                                                <X className="w-5 h-5 text-slate-300 dark:text-slate-600 mx-auto" />
                                                            )
                                                        ) : (
                                                            <span className="text-slate-700 dark:text-slate-300 font-medium">
                                                                {value}
                                                            </span>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
