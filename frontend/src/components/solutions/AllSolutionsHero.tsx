import { Package, Layers, Star } from 'lucide-react';

interface AllSolutionsHeroProps {
    totalSolutions: number;
    totalCategories: number;
    avgRating: number;
}

export function AllSolutionsHero({ totalSolutions, totalCategories, avgRating }: AllSolutionsHeroProps) {
    return (
        <section className="relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

            {/* Mesh gradient effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#3b82f6_0%,_transparent_50%)] opacity-30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#8b5cf6_0%,_transparent_50%)] opacity-20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#06b6d4_0%,_transparent_40%)] opacity-15" />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}
            />

            <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-12 md:py-16">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                    {/* Left - Title & Subtitle */}
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                            Все решения для бизнеса
                        </h1>
                        <p className="text-lg text-slate-300 max-w-xl">
                            {totalSolutions}+ проверенных инструментов для автоматизации и роста вашего бизнеса
                        </p>
                    </div>

                    {/* Right - Stats */}
                    <div className="flex gap-4 md:gap-6">
                        {/* Categories */}
                        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/10">
                            <div className="w-11 h-11 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                <Layers className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">{totalCategories}</div>
                                <div className="text-sm text-slate-400">категорий</div>
                            </div>
                        </div>

                        {/* Solutions */}
                        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/10">
                            <div className="w-11 h-11 rounded-xl bg-violet-500/20 flex items-center justify-center">
                                <Package className="w-5 h-5 text-violet-400" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">{totalSolutions}+</div>
                                <div className="text-sm text-slate-400">решений</div>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/10">
                            <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">{avgRating}</div>
                                <div className="text-sm text-slate-400">рейтинг</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
