import { useNavigate } from 'react-router-dom';
import { Briefcase, Code2, ArrowRight, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { DashboardType } from '../types/auth';

interface DashboardOption {
    type: DashboardType;
    title: string;
    description: string;
    icon: React.ReactNode;
    gradient: string;
    iconBg: string;
    path: string;
}

const dashboardOptions: DashboardOption[] = [
    {
        type: 'customer',
        title: 'Кабинет клиента',
        description: 'Управление подключёнными решениями, подписками и платежами',
        icon: <Briefcase className="w-8 h-8" />,
        gradient: 'from-blue-500 to-indigo-600',
        iconBg: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
        path: '/dashboard',
    },
    {
        type: 'developer',
        title: 'Кабинет разработчика',
        description: 'Публикация и управление программными продуктами',
        icon: <Code2 className="w-8 h-8" />,
        gradient: 'from-emerald-500 to-teal-600',
        iconBg: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
        path: '/developer/dashboard',
    },
];

export function SelectDashboardPage() {
    const navigate = useNavigate();
    const { user, selectDashboard, logout } = useAuth();

    const handleSelectDashboard = (option: DashboardOption) => {
        selectDashboard(option.type);
        navigate(option.path);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25 mb-6">
                        <span className="text-2xl font-bold text-white">M</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                        Добро пожаловать{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400">
                        Выберите, в каком кабинете продолжить работу
                    </p>
                </div>

                {/* Dashboard options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {dashboardOptions.map((option) => (
                        <button
                            key={option.type}
                            onClick={() => handleSelectDashboard(option)}
                            className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 text-left transition-all duration-300 hover:border-transparent hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-1"
                        >
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                            <div className="relative">
                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-xl ${option.iconBg} flex items-center justify-center mb-5`}>
                                    {option.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    {option.title}
                                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400">
                                    {option.description}
                                </p>
                            </div>

                            {/* Border gradient effect on hover */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm`} />
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center">
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Выйти из аккаунта
                    </button>
                </div>
            </div>
        </div>
    );
}
