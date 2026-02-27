import { type ReactNode } from 'react';
import { Header } from './Header';
import { DeveloperSidebar } from '../developer/dashboard/DeveloperSidebar';

interface DeveloperDashboardLayoutProps {
    children: ReactNode;
    activeMenuItem: string;
    onNavigate: (menuId: string) => void;
    onLogout: () => void;
}

export function DeveloperDashboardLayout({
    children,
    activeMenuItem,
    onNavigate,
    onLogout
}: DeveloperDashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Header */}
            <Header />

            {/* Sidebar */}
            <DeveloperSidebar
                activeMenuItem={activeMenuItem}
                onNavigate={onNavigate}
                onLogout={onLogout}
            />

            {/* Main Content */}
            <main className="ml-[280px] pt-[72px] min-h-screen">
                <div className="p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
