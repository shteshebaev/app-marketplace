import {
    Package,
    PlusCircle,
    BarChart3,
    MessageSquare,
    Building2,
    Settings,
    LogOut,
    Eye,
    BadgeCheck,
    X
} from 'lucide-react';
import { useAuth } from '../../../context';

interface MenuItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    badge?: number;
}

const mainMenuItems: MenuItem[] = [
    { id: 'products', label: 'Мои решения', icon: <Package className="w-5 h-5" /> },
    { id: 'create', label: 'Создать решение', icon: <PlusCircle className="w-5 h-5" /> },
    { id: 'stats', label: 'Статистика', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'reviews', label: 'Отзывы', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'company', label: 'Профиль компании', icon: <Building2 className="w-5 h-5" /> },
];

const bottomMenuItems: MenuItem[] = [
    { id: 'preview', label: 'Публичный профиль', icon: <Eye className="w-5 h-5" /> },
    { id: 'settings', label: 'Настройки', icon: <Settings className="w-5 h-5" /> },
];

interface DeveloperSidebarProps {
    activeMenuItem: string;
    onNavigate: (menuId: string) => void;
    onLogout: () => void;
    isCollapsed?: boolean;
    isMobileOpen?: boolean;
    onCloseMobile?: () => void;
}

export function DeveloperSidebar({
    activeMenuItem,
    onNavigate,
    onLogout,
    isCollapsed = false,
    isMobileOpen = false,
    onCloseMobile
}: DeveloperSidebarProps) {
    const { developer, user } = useAuth();

    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className={`
                    hidden lg:flex
                    fixed left-0 top-[72px] bottom-0 z-50
                    bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
                    flex-col
                    ${isCollapsed ? 'w-20' : 'w-[280px]'}
                `}
            >
                {/* Developer Info */}
                {!isCollapsed && (
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0">
                                {developer?.companyName?.charAt(0) || 'D'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                                        {developer?.companyName || 'Компания'}
                                    </h3>
                                    {developer?.isVerified && (
                                        <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                    )}
                                </div>
                                <p className="text-sm text-slate-500 truncate">
                                    {user?.email || 'developer@example.com'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4 text-sm">
                            <div>
                                <span className="font-semibold text-slate-900 dark:text-white">{developer?.productsCount || 0}</span>
                                <span className="text-slate-500 ml-1">решений</span>
                            </div>
                            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" />
                            <div>
                                <span className="font-semibold text-slate-900 dark:text-white">{developer?.rating || 0}</span>
                                <span className="text-slate-500 ml-1">рейтинг</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Desktop Main Menu */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-1">
                        {mainMenuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                                    ${activeMenuItem === item.id
                                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }
                                `}
                            >
                                {item.icon}
                                {!isCollapsed && (
                                    <>
                                        <span className="flex-1 text-left">{item.label}</span>
                                        {item.badge !== undefined && item.badge > 0 && (
                                            <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </>
                                )}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Desktop Bottom Menu */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="space-y-1">
                        {bottomMenuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                                    ${activeMenuItem === item.id
                                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }
                                `}
                            >
                                {item.icon}
                                {!isCollapsed && <span>{item.label}</span>}
                            </button>
                        ))}
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            {!isCollapsed && <span>Выйти</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Bottom Sheet */}
            <div
                className={`
                    lg:hidden fixed inset-0 z-50
                    transition-all duration-300 ease-out
                    ${isMobileOpen ? 'visible' : 'invisible'}
                `}
            >
                {/* Overlay */}
                <div
                    className={`
                        absolute inset-0 bg-black/60 backdrop-blur-sm
                        transition-opacity duration-300
                        ${isMobileOpen ? 'opacity-100' : 'opacity-0'}
                    `}
                    onClick={onCloseMobile}
                />

                {/* Bottom Sheet */}
                <div
                    className={`
                        absolute bottom-0 left-0 right-0
                        bg-slate-900 rounded-t-3xl
                        transition-transform duration-300 ease-out
                        ${isMobileOpen ? 'translate-y-0' : 'translate-y-full'}
                    `}
                    style={{
                        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
                        maxHeight: '85vh'
                    }}
                >
                    {/* Handle */}
                    <div className="flex justify-center pt-3 pb-2">
                        <div className="w-10 h-1 bg-slate-700 rounded-full" />
                    </div>

                    {/* Header */}
                    <div className="flex items-center justify-between px-5 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                                {developer?.companyName?.charAt(0) || 'D'}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-white">
                                        {developer?.companyName || 'Компания'}
                                    </span>
                                    {developer?.isVerified && (
                                        <BadgeCheck className="w-4 h-4 text-blue-400" />
                                    )}
                                </div>
                                <span className="text-sm text-slate-400">
                                    {user?.email || 'developer@example.com'}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={onCloseMobile}
                            className="p-2 text-slate-400 hover:text-white active:scale-95 transition-all touch-manipulation"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="px-3 pb-2 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 180px)' }}>
                        <div className="space-y-1">
                            {mainMenuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`
                                        w-full flex items-center gap-3 px-4 py-3.5 rounded-xl
                                        transition-all active:scale-[0.98] touch-manipulation
                                        ${activeMenuItem === item.id
                                            ? 'bg-blue-500/20 text-blue-400'
                                            : 'text-slate-300 active:bg-slate-800'
                                        }
                                    `}
                                >
                                    {item.icon}
                                    <span className="flex-1 text-left">{item.label}</span>
                                    {item.badge !== undefined && item.badge > 0 && (
                                        <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="h-px bg-slate-800 my-3" />

                        <div className="space-y-1">
                            {bottomMenuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`
                                        w-full flex items-center gap-3 px-4 py-3.5 rounded-xl
                                        transition-all active:scale-[0.98] touch-manipulation
                                        ${activeMenuItem === item.id
                                            ? 'bg-blue-500/20 text-blue-400'
                                            : 'text-slate-300 active:bg-slate-800'
                                        }
                                    `}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="px-3 py-3 border-t border-slate-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                                    <Settings className="w-5 h-5" />
                                </div>
                            </div>
                            <button
                                onClick={onLogout}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-400 active:bg-red-500/10 transition-all active:scale-[0.98] touch-manipulation"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Выйти</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
