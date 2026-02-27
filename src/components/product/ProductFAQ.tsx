import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import type { FAQItem } from './types';

interface ProductFAQProps {
    items: FAQItem[];
}

export function ProductFAQ({ items }: ProductFAQProps) {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    const toggleItem = (id: string) => {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    // Group items by category
    const groupedItems = items.reduce((acc, item) => {
        const category = item.category || 'Общие вопросы';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {} as Record<string, FAQItem[]>);

    return (
        <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <HelpCircle className="w-4 h-4" />
                        Частые вопросы
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Есть вопросы?
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Ответы на самые популярные вопросы наших клиентов
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto space-y-6">
                    {Object.entries(groupedItems).map(([category, categoryItems]) => (
                        <div key={category}>
                            {/* Category label */}
                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">
                                {category}
                            </div>

                            {/* Items */}
                            <div className="space-y-3">
                                {categoryItems.map((item) => {
                                    const isOpen = openItems.has(item.id);

                                    return (
                                        <div
                                            key={item.id}
                                            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden"
                                        >
                                            <button
                                                onClick={() => toggleItem(item.id)}
                                                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                            >
                                                <span className="font-semibold text-slate-900 dark:text-white pr-4">
                                                    {item.question}
                                                </span>
                                                <ChevronDown
                                                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                                />
                                            </button>

                                            <div
                                                className={`
                                                    overflow-hidden transition-all duration-200
                                                    ${isOpen ? 'max-h-96' : 'max-h-0'}
                                                `}
                                            >
                                                <div className="px-5 pb-5 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed">
                                                    {item.answer}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
