import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    CreditCard,
    Bell,
    Settings,
    LogOut,
    Search,
    ChevronRight,
    X,
    Menu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockNotifications, mockOrders } from './mockData';

type CustomerPage = 'dashboard' | 'solutions' | 'orders' | 'subscriptions' | 'notifications' | 'settings';

interface CustomerSidebarProps {
    className?: string;
    activeItem?: CustomerPage;
    onNavigate?: (page: CustomerPage) => void;
}

interface MenuItem {
    id: CustomerPage;
    label: string;
    icon: React.ReactNode;
    badge?: number;
}

export function CustomerSidebar({ className = '', activeItem = 'dashboard', onNavigate }: CustomerSidebarProps) {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const unreadNotifications = mockNotifications.filter(n => !n.isRead).length;
    const pendingOrders = mockOrders.filter(o => o.status === 'PENDING' || o.status === 'WAITING_PAYMENT').length;

    const menuItems: MenuItem[] = [
        {
            id: 'dashboard',
            label: 'Главная',
            icon: <LayoutDashboard className="w-5 h-5" />
        },
        {
            id: 'solutions',
            label: 'Мои продукты',
            icon: <Package className="w-5 h-5" />
        },
        {
            id: 'orders',
            label: 'Заявки',
            icon: <ShoppingCart className="w-5 h-5" />,
            badge: pendingOrders > 0 ? pendingOrders : undefined
        },
        {
            id: 'subscriptions',
            label: 'Подписки',
            icon: <CreditCard className="w-5 h-5" />
        },
        {
            id: 'notifications',
            label: 'Уведомления',
            icon: <Bell className="w-5 h-5" />,
            badge: unreadNotifications > 0 ? unreadNotifications : undefined
        }
    ];

    const bottomMenuItems: MenuItem[] = [
        {
            id: 'settings',
            label: 'Настройки',
            icon: <Settings className="w-5 h-5" />
        }
    ];

    const handleNavigate = (page: CustomerPage) => {
        if (onNavigate) {
            onNavigate(page);
        }
    };

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
    };

    const isActive = (id: CustomerPage) => {
        return activeItem === id;
    };

    const renderMenuItem = (item: MenuItem, onClick?: () => void) => (
        <button
            key={item.id}
            onClick={() => {
                handleNavigate(item.id);
                onClick?.();
            }}
            className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left
                ${isActive(item.id)
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }
            `}
        >
            {item.icon}
            <span className="flex-1 font-medium">{item.label}</span>
            {item.badge && item.badge > 0 && (
                <span className={`
                    min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium flex items-center justify-center
                    ${isActive(item.id)
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-500 text-white'
                    }
                `}>
                    {item.badge}
                </span>
            )}
            {!item.badge && (
                <ChevronRight className={`w-4 h-4 transition-opacity ${isActive(item.id) ? 'opacity-100' : 'opacity-0'}`} />
            )}
        </button>
    );

    // Desktop Sidebar
    const DesktopSidebar = (
        <aside className={`hidden lg:flex flex-col w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-screen sticky top-0 ${className}`}>
            {/* User Info */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                            {user?.name || 'Пользователь'}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                            {user?.email || 'user@example.com'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Menu */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {menuItems.map(item => renderMenuItem(item))}

                <div className="h-px bg-slate-200 dark:bg-slate-700 my-4" />

                {/* Catalog Link */}
                <Link
                    to="/solutions"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all"
                >
                    <Search className="w-5 h-5" />
                    <span className="flex-1 font-medium">Каталог решений</span>
                </Link>

                {bottomMenuItems.map(item => renderMenuItem(item))}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Выйти</span>
                </button>
            </div>
        </aside>
    );

    // Mobile FAB Button
    const MobileFAB = (
        <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center z-40 hover:bg-blue-600 transition-colors"
        >
            <Menu className="w-6 h-6" />
            {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                    {unreadNotifications}
                </span>
            )}
        </button>
    );

    // Mobile Bottom Sheet
    const MobileBottomSheet = (
        <>
            {/* Backdrop */}
            <div
                className={`lg:hidden fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
                    isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Bottom Sheet */}
            <div
                className={`lg:hidden fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-out ${
                    isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
                }`}
            >
                <div
                    className="bg-white dark:bg-slate-800 rounded-t-3xl max-h-[85vh] overflow-hidden"
                    style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
                >
                    {/* Handle */}
                    <div className="flex justify-center pt-3 pb-2">
                        <div className="w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
                    </div>

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                    {user?.name || 'Пользователь'}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {user?.email || 'user@example.com'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <nav className="p-4 space-y-1 overflow-y-auto max-h-[50vh]">
                        {menuItems.map(item => renderMenuItem(item, () => setIsMobileMenuOpen(false)))}

                        <div className="h-px bg-slate-200 dark:bg-slate-700 my-4" />

                        {/* Catalog Link */}
                        <Link
                            to="/solutions"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Search className="w-5 h-5" />
                            <span className="flex-1 font-medium">Каталог решений</span>
                        </Link>

                        {bottomMenuItems.map(item => renderMenuItem(item, () => setIsMobileMenuOpen(false)))}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Выйти</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            {DesktopSidebar}
            {MobileFAB}
            {MobileBottomSheet}
        </>
    );
}
