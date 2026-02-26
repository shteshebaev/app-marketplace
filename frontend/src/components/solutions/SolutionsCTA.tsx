import { Sparkles, ArrowRight, MessageCircle, CheckCircle } from 'lucide-react';

interface SolutionsCTAProps {
    categoryName: string;
    onOrderDevelopment?: () => void;
}

export function SolutionsCTA({ categoryName, onOrderDevelopment }: SolutionsCTAProps) {
    return (
        <section className="py-12 lg:py-16">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-8 lg:p-12">
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
                    </div>

                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        }}
                    />

                    <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                        {/* Content */}
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full
                                px-4 py-2 mb-6">
                                <Sparkles className="w-4 h-4 text-white" />
                                <span className="text-sm font-medium text-white">Индивидуальный подход</span>
                            </div>

                            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                                Не нашли подходящее решение?
                            </h2>

                            <p className="text-lg text-white/80 mb-6">
                                {categoryName
                                    ? `Разработаем ${categoryName.toLowerCase()} под ваши уникальные задачи.`
                                    : 'Разработаем решение под ваши уникальные задачи.'
                                }
                                {' '}Полная интеграция с вашими бизнес-процессами.
                            </p>

                            {/* Benefits */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                {[
                                    'Анализ требований',
                                    'Индивидуальный дизайн',
                                    'Интеграция с системами',
                                    'Техподдержка 24/7'
                                ].map((benefit) => (
                                    <div key={benefit} className="flex items-center gap-2 text-white/90">
                                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                        <span className="text-sm">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={onOrderDevelopment}
                                    className="group flex items-center justify-center gap-2 px-6 py-4 bg-white
                                    rounded-xl text-indigo-600 font-semibold hover:bg-white/90
                                    transition-all duration-200 hover:shadow-xl hover:shadow-black/20
                                    hover:-translate-y-0.5">
                                    <span>Заказать разработку</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white/20
                                    backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold
                                    hover:bg-white/30 transition-all duration-200">
                                    <MessageCircle className="w-5 h-5" />
                                    <span>Получить консультацию</span>
                                </button>
                            </div>
                        </div>

                        {/* Decorative card */}
                        <div className="hidden lg:block relative">
                            <div className="w-72 h-72 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20
                                flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-500">
                                <div className="w-60 h-60 bg-white/10 rounded-2xl flex flex-col items-center justify-center p-6">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/40 to-white/10
                                        flex items-center justify-center mb-4">
                                        <Sparkles className="w-10 h-10 text-white" />
                                    </div>
                                    <div className="text-center">
                                        <div className="text-white font-bold text-lg mb-1">Ваше решение</div>
                                        <div className="text-white/70 text-sm">Разработано специально для вас</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
