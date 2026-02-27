import { ArrowRight, MessageCircle } from 'lucide-react';

interface ProductCTAProps {
    productName: string;
    ctaPrimary: {
        text: string;
        url?: string;
    };
    ctaSecondary?: {
        text: string;
        url?: string;
    };
    gradient?: string;
    onConnect?: () => void;
    onContact?: () => void;
}

export function ProductCTA({
    productName,
    ctaPrimary,
    ctaSecondary,
    gradient = 'from-blue-500 to-indigo-600',
    onConnect,
    onContact
}: ProductCTAProps) {
    return (
        <section className="py-16 lg:py-24">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-12 lg:p-16 text-center`}>
                    {/* Background decorations */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.2)_0%,_transparent_50%)]" />
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

                    <div className="relative">
                        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                            Готовы подключить {productName}?
                        </h2>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
                            Начните бесплатно и убедитесь, что это именно то, что нужно вашему бизнесу
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={onConnect}
                                className="flex items-center gap-3 bg-white text-slate-900 font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            >
                                {ctaPrimary.text}
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            {ctaSecondary && (
                                <button
                                    onClick={onContact}
                                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    {ctaSecondary.text}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
