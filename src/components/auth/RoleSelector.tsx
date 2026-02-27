import { User, Code2, ChevronRight, TrendingUp, Users, Rocket } from 'lucide-react';

interface RoleSelectorProps {
    onSelectRole: (role: 'USER' | 'DEVELOPER') => void;
}

export function RoleSelector({ onSelectRole }: RoleSelectorProps) {
    return (
        <div className="space-y-4">
            {/* User Role */}
            <button
                onClick={() => onSelectRole('USER')}
                className="w-full group p-5 sm:p-6 bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-500/10 border-2 border-transparent hover:border-blue-500/30 rounded-2xl text-left transition-all duration-200"
            >
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        <User className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Я пользователь
                            </h3>
                            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Хочу находить и использовать бизнес-решения
                        </p>
                    </div>
                </div>
            </button>

            {/* Developer Role */}
            <button
                onClick={() => onSelectRole('DEVELOPER')}
                className="w-full group p-5 sm:p-6 bg-slate-50 dark:bg-slate-700/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border-2 border-transparent hover:border-indigo-500/30 rounded-2xl text-left transition-all duration-200"
            >
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                        <Code2 className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Я разработчик
                            </h3>
                            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Хочу публиковать свои решения на платформе
                        </p>
                    </div>
                </div>

                {/* Developer Benefits */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600 grid grid-cols-3 gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <Rocket className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Публикуйте</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <Users className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Клиенты</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Растите</span>
                    </div>
                </div>
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 pt-4">
                Уже есть аккаунт?{' '}
                <a href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
                    Войти
                </a>
            </p>
        </div>
    );
}
