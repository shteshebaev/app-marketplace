import { type ReactNode, useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Prevent body scroll when mobile menu is open (iOS fix)
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
        };
    }, [isMobileMenuOpen]);

    const handleNavigate = (menuId: string) => {
        onNavigate(menuId);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Header */}
            <Header />

            {/* Mobile Menu Button - Fixed at bottom */}
            <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-40 p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 active:scale-95 transition-all touch-manipulation"
                style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}
                aria-label="Открыть меню"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Sidebar */}
            <DeveloperSidebar
                activeMenuItem={activeMenuItem}
                onNavigate={handleNavigate}
                onLogout={onLogout}
                isMobileOpen={isMobileMenuOpen}
                onCloseMobile={() => setIsMobileMenuOpen(false)}
            />

            {/* Main Content */}
            <main className="lg:ml-[280px] pt-[72px] min-h-screen">
                <div className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
