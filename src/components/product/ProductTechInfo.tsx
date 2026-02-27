import { Server, Shield, Plug, Info } from 'lucide-react';
import type { TechInfo } from './types';

interface ProductTechInfoProps {
    techInfo: TechInfo[];
}

const sectionIcons: Record<string, React.ReactNode> = {
    'Технические требования': <Server className="w-5 h-5" />,
    'Безопасность': <Shield className="w-5 h-5" />,
    'Интеграции': <Plug className="w-5 h-5" />,
};

export function ProductTechInfo({ techInfo }: ProductTechInfoProps) {
    return (
        <section className="py-16 lg:py-24">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Техническая информация
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Подробные характеристики и требования
                    </p>
                </div>

                {/* Tech Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {techInfo.map((section, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm"
                        >
                            {/* Section header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400">
                                    {sectionIcons[section.section] || <Info className="w-5 h-5" />}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {section.section}
                                </h3>
                            </div>

                            {/* Items */}
                            <div className="space-y-4">
                                {section.items.map((item, itemIndex) => (
                                    <div key={itemIndex}>
                                        <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                                            {item.label}
                                        </div>
                                        <div className="text-slate-900 dark:text-white font-medium">
                                            {item.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
