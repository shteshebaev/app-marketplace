import { Play, TrendingUp, Clock, Users, Zap, Target, BarChart } from 'lucide-react';
import { useState } from 'react';
import type { ProductVideo as ProductVideoType, KeyBenefit } from './types';

interface ProductVideoProps {
    video: ProductVideoType;
    benefits: KeyBenefit[];
}

const iconMap: Record<string, React.ReactNode> = {
    'trending-up': <TrendingUp className="w-6 h-6" />,
    clock: <Clock className="w-6 h-6" />,
    users: <Users className="w-6 h-6" />,
    zap: <Zap className="w-6 h-6" />,
    target: <Target className="w-6 h-6" />,
    'bar-chart': <BarChart className="w-6 h-6" />,
};

export function ProductVideo({ video, benefits }: ProductVideoProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section data-section="video" className="py-16 lg:py-24">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Как это работает?
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Посмотрите короткое видео и узнайте, как наше решение поможет вашему бизнесу
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Video Player */}
                    <div className="lg:col-span-2">
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900">
                            {isPlaying ? (
                                <iframe
                                    src={`${video.url}?autoplay=1`}
                                    title={video.title}
                                    className="absolute inset-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <>
                                    {/* Video placeholder */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center mb-4">
                                            <Play className="w-16 h-16 text-white/80" />
                                        </div>
                                        <p className="text-white/60 text-lg">{video.title}</p>
                                        {video.duration && (
                                            <p className="text-white/40 text-sm mt-1">{video.duration}</p>
                                        )}
                                    </div>

                                    {/* Play button overlay */}
                                    <button
                                        onClick={() => setIsPlaying(true)}
                                        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors group cursor-pointer"
                                    >
                                        <div className="w-24 h-24 rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Play className="w-10 h-10 text-slate-900 ml-1" fill="currentColor" />
                                        </div>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Key Benefits */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                            Ключевые преимущества
                        </h3>

                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                                    {iconMap[benefit.icon] || <Zap className="w-6 h-6" />}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900 dark:text-white text-lg">
                                        {benefit.title}
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
