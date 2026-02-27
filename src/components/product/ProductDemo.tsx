import { Play, ExternalLink, Clock, Key, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import type { ProductDemo as ProductDemoType } from './types';

interface ProductDemoProps {
    demo: ProductDemoType;
    gradient?: string;
}

export function ProductDemo({ demo, gradient = 'from-blue-500 to-indigo-600' }: ProductDemoProps) {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const demoTypeLabels: Record<string, { icon: React.ReactNode; label: string }> = {
        sandbox: { icon: <Play className="w-5 h-5" />, label: 'Демо-среда' },
        trial: { icon: <Clock className="w-5 h-5" />, label: 'Пробный период' },
        'live-demo': { icon: <ExternalLink className="w-5 h-5" />, label: 'Живая демонстрация' },
        video: { icon: <Play className="w-5 h-5" />, label: 'Видео-демо' },
    };

    const typeInfo = demoTypeLabels[demo.type] || demoTypeLabels.sandbox;

    return (
        <section className="py-16 lg:py-24">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-8 lg:p-12`}>
                    {/* Background decorations */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.2)_0%,_transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,0,0,0.1)_0%,_transparent_50%)]" />

                    <div className="relative flex flex-col lg:flex-row lg:items-center gap-8">
                        {/* Left - Content */}
                        <div className="flex-1">
                            {/* Type badge */}
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
                                {typeInfo.icon}
                                {typeInfo.label}
                                {demo.duration && <span className="text-white/70">• {demo.duration}</span>}
                            </div>

                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                                Попробуйте прямо сейчас
                            </h2>

                            <p className="text-xl text-white/80 mb-8 max-w-lg">
                                {demo.description}
                            </p>

                            {/* Credentials (if available) */}
                            {demo.credentials && (
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-md">
                                    <div className="flex items-center gap-2 text-white/80 mb-4">
                                        <Key className="w-5 h-5" />
                                        <span className="font-medium">Данные для входа:</span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
                                            <div>
                                                <div className="text-white/60 text-xs mb-0.5">Логин</div>
                                                <div className="text-white font-mono">{demo.credentials.login}</div>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(demo.credentials!.login, 'login')}
                                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                            >
                                                {copiedField === 'login' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
                                            <div>
                                                <div className="text-white/60 text-xs mb-0.5">Пароль</div>
                                                <div className="text-white font-mono">{demo.credentials.password}</div>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(demo.credentials!.password, 'password')}
                                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                                            >
                                                {copiedField === 'password' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CTA Button */}
                            <a
                                href={demo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-white text-slate-900 font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            >
                                {demo.buttonText}
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>

                        {/* Right - Decorative */}
                        <div className="hidden lg:flex items-center justify-center w-80 h-80">
                            <div className="relative">
                                <div className="w-64 h-64 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                    <div className="w-48 h-48 rounded-full bg-white/10 flex items-center justify-center">
                                        <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center">
                                            <Play className="w-16 h-16 text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating elements */}
                                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm animate-pulse" />
                                <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm animate-pulse delay-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
