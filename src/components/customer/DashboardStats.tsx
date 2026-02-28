import { Package, Clock, Wallet, Calendar } from 'lucide-react';
import { mockDashboardStats } from './mockData';

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    subtext?: string;
    iconBg: string;
    iconColor: string;
}

function StatCard({ icon, label, value, subtext, iconBg, iconColor }: StatCardProps) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                    <div className={iconColor}>{icon}</div>
                </div>
                <div className="min-w-0">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
                    {subtext && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtext}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export function DashboardStats() {
    const stats = mockDashboardStats;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
                icon={<Package className="w-6 h-6" />}
                label="Активных решений"
                value={stats.activeSolutions}
                subtext="подключено"
                iconBg="bg-emerald-100 dark:bg-emerald-500/20"
                iconColor="text-emerald-600 dark:text-emerald-400"
            />
            <StatCard
                icon={<Clock className="w-6 h-6" />}
                label="Заявок в обработке"
                value={stats.pendingOrders}
                subtext="ожидают ответа"
                iconBg="bg-amber-100 dark:bg-amber-500/20"
                iconColor="text-amber-600 dark:text-amber-400"
            />
            <StatCard
                icon={<Wallet className="w-6 h-6" />}
                label="Потрачено"
                value={stats.totalSpent}
                subtext="сум за всё время"
                iconBg="bg-blue-100 dark:bg-blue-500/20"
                iconColor="text-blue-600 dark:text-blue-400"
            />
            <StatCard
                icon={<Calendar className="w-6 h-6" />}
                label="Следующий платёж"
                value={stats.nextPayment}
                subtext="к оплате"
                iconBg="bg-violet-100 dark:bg-violet-500/20"
                iconColor="text-violet-600 dark:text-violet-400"
            />
        </div>
    );
}
