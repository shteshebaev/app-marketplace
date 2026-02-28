import {
    DashboardWelcome,
    DashboardStats,
    MySolutions,
    OrdersTable,
    SubscriptionsBlock,
    NotificationsBlock,
    RecommendedSolutions
} from '../components/customer';

export function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <DashboardWelcome />

            {/* Quick Stats */}
            <DashboardStats />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Left Column - Main Content */}
                <div className="xl:col-span-2 space-y-6">
                    {/* My Solutions */}
                    <MySolutions />

                    {/* Orders History */}
                    <OrdersTable />
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-6">
                    {/* Notifications */}
                    <NotificationsBlock />

                    {/* Subscriptions & Payments */}
                    <SubscriptionsBlock />
                </div>
            </div>

            {/* Recommended Solutions - Cross-sell */}
            <RecommendedSolutions />
        </div>
    );
}
