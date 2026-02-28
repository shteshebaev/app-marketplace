import { useState, type ReactNode } from 'react';
import { CustomerSidebar } from './CustomerSidebar';
import { Header } from '../layout/Header';
import {
    DashboardWelcome,
    DashboardStats,
    MySolutions,
    OrdersTable,
    SubscriptionsBlock,
    NotificationsBlock,
    RecommendedSolutions
} from './';

type CustomerPage = 'dashboard' | 'solutions' | 'orders' | 'subscriptions' | 'notifications' | 'settings';

interface CustomerDashboardLayoutProps {
    children?: ReactNode;
    initialPage?: CustomerPage;
}

// Import pages lazily to avoid circular dependencies
import { OrdersPage } from '../../pages/OrdersPage';
import { SubscriptionsPage } from '../../pages/SubscriptionsPage';
import { NotificationsPage } from '../../pages/NotificationsPage';
import { MySolutionsPage } from '../../pages/MySolutionsPage';
import { SettingsPage } from './settings';

// Main dashboard content
function DashboardContent() {
    return (
        <div className="space-y-6">
            <DashboardWelcome />
            <DashboardStats />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 space-y-6">
                    <MySolutions />
                    <OrdersTable />
                </div>
                <div className="space-y-6">
                    <NotificationsBlock />
                    <SubscriptionsBlock />
                </div>
            </div>
            <RecommendedSolutions />
        </div>
    );
}

export function CustomerDashboardLayout({ children, initialPage = 'dashboard' }: CustomerDashboardLayoutProps) {
    const [currentPage, setCurrentPage] = useState<CustomerPage>(initialPage);

    const handleNavigate = (page: CustomerPage) => {
        setCurrentPage(page);
    };

    const renderContent = () => {
        // If children provided, render them
        if (children) {
            return children;
        }

        // Otherwise render based on current page
        switch (currentPage) {
            case 'dashboard':
                return <DashboardContent />;
            case 'solutions':
                return <MySolutionsPage />;
            case 'orders':
                return <OrdersPage />;
            case 'subscriptions':
                return <SubscriptionsPage />;
            case 'notifications':
                return <NotificationsPage />;
            case 'settings':
                return <SettingsPage />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Header - hide mobile menu since we have sidebar */}
            <Header hideMobileMenu hideNavigation />

            <div className="flex">
                {/* Sidebar */}
                <CustomerSidebar
                    activeItem={currentPage}
                    onNavigate={handleNavigate}
                />

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 lg:pb-8">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
}
