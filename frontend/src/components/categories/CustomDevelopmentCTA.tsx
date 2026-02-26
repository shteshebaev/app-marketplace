import { Code2, ArrowRight, Sparkles } from 'lucide-react';

export function CustomDevelopmentCTA() {
    return (
        <section className="mt-12">
            <a
                href="#order-development"
                className="block relative overflow-hidden rounded-[28px] bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-8 lg:p-10 cursor-pointer group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/25"
            >
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/10" />

                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

                {/* Floating icons */}
                <div className="absolute top-6 right-6 opacity-20">
                    <Sparkles className="w-8 h-8 text-white" />
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Left content */}
                    <div className="flex items-start gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 flex-shrink-0">
                            <Code2 className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2 drop-shadow-sm">
                                Не нашли нужное решение?
                            </h2>
                            <p className="text-white/80 text-lg max-w-lg">
                                Закажите индивидуальную разработку под ваши бизнес-процессы
                            </p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button className="flex items-center gap-3 bg-white text-purple-600 font-bold px-8 py-4 rounded-full hover:bg-white/90 transition-all shadow-lg shadow-black/10 group-hover:gap-4 self-start lg:self-center">
                        Заказать разработку
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </a>
        </section>
    );
}
