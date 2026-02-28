import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function DashboardWelcome() {
    const { user } = useAuth();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Доброе утро';
        if (hour < 18) return 'Добрый день';
        return 'Добрый вечер';
    };

    const firstName = user?.name?.split(' ')[0] || 'Пользователь';

    return (
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-blue-100 text-sm mb-2">
                        <Sparkles className="w-4 h-4" />
                        <span>{getGreeting()}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                        {firstName}, добро пожаловать!
                    </h1>
                    <p className="text-blue-100 text-sm sm:text-base max-w-md">
                        Управляйте своими бизнес-решениями, отслеживайте подписки и находите новые инструменты для роста.
                    </p>
                </div>

                <Link
                    to="/catalog"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors shrink-0 self-start sm:self-center"
                >
                    <span>Каталог решений</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
