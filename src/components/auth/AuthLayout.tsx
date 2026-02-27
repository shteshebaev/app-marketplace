import type { ReactNode } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col">
            {/* Header */}
            <header className="p-4 sm:p-6 flex items-center justify-between">
                <a href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">M</span>
                    </div>
                    <span className="text-xl font-semibold text-slate-900 dark:text-white">
                        Marketplace
                    </span>
                </a>

                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    aria-label={isDark ? 'Светлая тема' : 'Тёмная тема'}
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
                <div className="w-full max-w-md">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-slate-500 dark:text-slate-400">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/50 dark:border-slate-700/50 p-6 sm:p-8">
                        {children}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="p-4 sm:p-6 text-center text-sm text-slate-500 dark:text-slate-400">
                <p>© 2024 Marketplace. Все права защищены.</p>
            </footer>
        </div>
    );
}
