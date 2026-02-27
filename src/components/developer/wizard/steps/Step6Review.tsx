import { useEffect } from 'react';
import { Check, AlertCircle, Package, FileText, Image, CreditCard, Server } from 'lucide-react';
import type { DeveloperProduct } from '../../../../types/developer-product';

interface Step6ReviewProps {
    data: Partial<DeveloperProduct>;
    onChange: (data: Partial<DeveloperProduct>) => void;
    onValidChange: (isValid: boolean) => void;
}

interface SectionStatus {
    icon: React.ReactNode;
    title: string;
    isComplete: boolean;
    summary: string[];
}

export function Step6Review({ data, onValidChange }: Step6ReviewProps) {
    // Calculate completion status for each section
    const sections: SectionStatus[] = [
        {
            icon: <Package className="w-5 h-5" />,
            title: 'Основная информация',
            isComplete: !!(data.name && data.categoryId && data.shortDescription),
            summary: [
                data.name || 'Не указано',
                `Категория: ${data.categoryId || 'Не выбрана'}`,
                `Теги: ${data.tags?.length || 0}`
            ]
        },
        {
            icon: <FileText className="w-5 h-5" />,
            title: 'Описание',
            isComplete: !!(data.fullDescription && data.features?.length),
            summary: [
                `${data.fullDescription?.length || 0} символов описания`,
                `${data.features?.length || 0} возможностей`,
                `${data.useCases?.length || 0} сценариев`
            ]
        },
        {
            icon: <Image className="w-5 h-5" />,
            title: 'Медиа',
            isComplete: true, // Optional
            summary: [
                data.videoUrl ? 'Видео добавлено' : 'Видео не добавлено',
                data.demoUrl ? 'Демо доступно' : 'Демо не указано'
            ]
        },
        {
            icon: <CreditCard className="w-5 h-5" />,
            title: 'Тарифы',
            isComplete: !!(data.pricing?.length),
            summary: [
                `${data.pricing?.length || 0} тарифов`,
                data.pricing?.some(t => t.isFree) ? 'Есть бесплатный тариф' : 'Только платные тарифы'
            ]
        },
        {
            icon: <Server className="w-5 h-5" />,
            title: 'Техническая информация',
            isComplete: true, // Optional
            summary: [
                `${data.integrations?.length || 0} интеграций`,
                data.apiAvailable ? 'API доступен' : 'API недоступен',
                `${data.supportOptions?.length || 0} вариантов поддержки`
            ]
        }
    ];

    const allRequired = sections.filter(s => s.title !== 'Медиа' && s.title !== 'Техническая информация');
    const isAllComplete = allRequired.every(s => s.isComplete);

    useEffect(() => {
        onValidChange(isAllComplete);
    }, [isAllComplete, onValidChange]);

    return (
        <div className="space-y-6">
            {/* Preview Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 lg:p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                    Проверка перед отправкой
                </h2>

                {/* Status Overview */}
                <div className="mb-8">
                    {isAllComplete ? (
                        <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                                <Check className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-medium text-emerald-700 dark:text-emerald-400">
                                    Все готово к отправке!
                                </div>
                                <div className="text-sm text-emerald-600 dark:text-emerald-500">
                                    Проверьте информацию и отправьте на модерацию
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-500/10 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-medium text-amber-700 dark:text-amber-400">
                                    Заполнены не все обязательные поля
                                </div>
                                <div className="text-sm text-amber-600 dark:text-amber-500">
                                    Вернитесь к предыдущим шагам и заполните недостающую информацию
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Section Status */}
                <div className="space-y-4">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-xl border-2 transition-all ${
                                section.isComplete
                                    ? 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-500/5'
                                    : 'border-red-200 dark:border-red-500/30 bg-red-50/50 dark:bg-red-500/5'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                {/* Status Icon */}
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                    section.isComplete
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-red-500 text-white'
                                }`}>
                                    {section.isComplete ? <Check className="w-5 h-5" /> : section.icon}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-slate-900 dark:text-white">
                                            {section.title}
                                        </h3>
                                        <span className={`text-sm font-medium ${
                                            section.isComplete
                                                ? 'text-emerald-600 dark:text-emerald-400'
                                                : 'text-red-600 dark:text-red-400'
                                        }`}>
                                            {section.isComplete ? 'Заполнено' : 'Не заполнено'}
                                        </span>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {section.summary.map((item, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 bg-white dark:bg-slate-700 rounded-md text-xs text-slate-600 dark:text-slate-400"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Preview */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 lg:p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                    Превью карточки
                </h3>

                <div className="max-w-md">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl overflow-hidden">
                        {/* Preview Header */}
                        <div className="aspect-[16/9] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-white text-4xl font-bold">
                                {data.name?.charAt(0) || '?'}
                            </div>
                        </div>

                        {/* Preview Content */}
                        <div className="p-5">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                                {data.name || 'Название продукта'}
                            </h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                                {data.shortDescription || 'Краткое описание продукта'}
                            </p>

                            {data.tags && data.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {data.tags.slice(0, 3).map(tag => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0.5 bg-slate-200 dark:bg-slate-600 rounded text-xs text-slate-600 dark:text-slate-400"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-600">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                    {data.pricing?.[0]?.isFree
                                        ? 'Бесплатно'
                                        : data.pricing?.[0]?.price || 'Цена не указана'
                                    }
                                </span>
                                <span className="text-blue-500 text-sm font-medium">
                                    Подробнее →
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Moderation Info */}
            <div className="bg-blue-50 dark:bg-blue-500/10 rounded-2xl p-6">
                <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                    После отправки на модерацию
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <li>• Модератор проверит ваш продукт в течение 1-3 рабочих дней</li>
                    <li>• Вы получите уведомление о результате проверки</li>
                    <li>• Если нужны правки, вы сможете отредактировать и отправить повторно</li>
                    <li>• После одобрения продукт появится в каталоге</li>
                </ul>
            </div>
        </div>
    );
}
