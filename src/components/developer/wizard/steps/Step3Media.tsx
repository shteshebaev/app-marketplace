import { useEffect, useState } from 'react';
import { Upload, Image, Play, Globe, Lock, X } from 'lucide-react';
import type { DeveloperProduct } from '../../../../types/developer-product';

interface Step3MediaProps {
    data: Partial<DeveloperProduct>;
    onChange: (data: Partial<DeveloperProduct>) => void;
    onValidChange: (isValid: boolean) => void;
}

export function Step3Media({ data, onChange, onValidChange }: Step3MediaProps) {
    const [videoUrl, setVideoUrl] = useState(data.videoUrl || '');
    const [demoUrl, setDemoUrl] = useState(data.demoUrl || '');
    const [demoLogin, setDemoLogin] = useState(data.demoCredentials?.login || '');
    const [demoPassword, setDemoPassword] = useState(data.demoCredentials?.password || '');

    // This step is optional, so always valid
    useEffect(() => {
        onValidChange(true);
    }, [onValidChange]);

    // Update parent data
    useEffect(() => {
        onChange({
            videoUrl: videoUrl || undefined,
            demoUrl: demoUrl || undefined,
            demoCredentials: (demoLogin && demoPassword) ? { login: demoLogin, password: demoPassword } : undefined
        });
    }, [videoUrl, demoUrl, demoLogin, demoPassword, onChange]);

    // Mock screenshots for demonstration
    const [screenshots] = useState([
        { id: '1', gradient: 'from-blue-400 to-indigo-500' },
        { id: '2', gradient: 'from-emerald-400 to-teal-500' },
        { id: '3', gradient: 'from-amber-400 to-orange-500' }
    ]);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 lg:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                Медиа-контент
            </h2>

            <div className="space-y-8">
                {/* Screenshots */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                        Скриншоты продукта
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {screenshots.map((screenshot) => (
                            <div
                                key={screenshot.id}
                                className={`relative aspect-video rounded-xl bg-gradient-to-br ${screenshot.gradient} overflow-hidden group`}
                            >
                                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                                    <Image className="w-8 h-8" />
                                </div>
                                <button className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}

                        {/* Upload button */}
                        <button className="aspect-video rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-600 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-colors">
                            <Upload className="w-6 h-6" />
                            <span className="text-xs">Загрузить</span>
                        </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                        PNG или JPG, максимум 2MB каждый, рекомендуемый размер 1280x720px
                    </p>
                </div>

                {/* Video URL */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Видео-презентация
                    </label>
                    <div className="relative">
                        <Play className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="url"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            placeholder="Ссылка на YouTube или Vimeo"
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                        Поддерживаются ссылки YouTube, Vimeo
                    </p>

                    {/* Video Preview */}
                    {videoUrl && (
                        <div className="mt-4 aspect-video rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                            <div className="text-center text-white/60">
                                <Play className="w-12 h-12 mx-auto mb-2" />
                                <p className="text-sm">Превью видео</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Demo Access */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                        Демо-доступ
                    </label>

                    {/* Demo URL */}
                    <div className="relative mb-4">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="url"
                            value={demoUrl}
                            onChange={(e) => setDemoUrl(e.target.value)}
                            placeholder="Ссылка на демо-версию"
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Demo Credentials */}
                    {demoUrl && (
                        <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl space-y-4">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Данные для входа (опционально)
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    value={demoLogin}
                                    onChange={(e) => setDemoLogin(e.target.value)}
                                    placeholder="Логин"
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-600 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    value={demoPassword}
                                    onChange={(e) => setDemoPassword(e.target.value)}
                                    placeholder="Пароль"
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-600 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <p className="text-xs text-slate-400">
                                Эти данные будут показаны пользователям для входа в демо-версию
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
