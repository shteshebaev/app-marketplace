import { useEffect } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Heart,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem?: string;
  onNavigate?: (path: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Обзор',
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: '/dashboard',
  },
  {
    id: 'orders',
    label: 'Мои заказы',
    icon: <ShoppingBag className="w-5 h-5" />,
    path: '/orders',
    badge: 3,
  },
  {
    id: 'products',
    label: 'Товары',
    icon: <Package className="w-5 h-5" />,
    path: '/products',
  },
  {
    id: 'favorites',
    label: 'Избранное',
    icon: <Heart className="w-5 h-5" />,
    path: '/favorites',
  },
  {
    id: 'payments',
    label: 'Платежи',
    icon: <CreditCard className="w-5 h-5" />,
    path: '/payments',
  },
];

const bottomMenuItems: MenuItem[] = [
  {
    id: 'settings',
    label: 'Настройки',
    icon: <Settings className="w-5 h-5" />,
    path: '/settings',
  },
  {
    id: 'help',
    label: 'Помощь',
    icon: <HelpCircle className="w-5 h-5" />,
    path: '/help',
  },
];

export function Sidebar({ isOpen, onClose, activeItem = 'orders', onNavigate }: SidebarProps) {
  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    onNavigate?.(path);
    onClose();
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`
          fixed inset-0 z-40
          bg-black/20 dark:bg-black/50 backdrop-blur-sm
          transition-opacity duration-apple ease-apple
          lg:hidden
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar container */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50
          w-[280px] lg:w-[260px]
          h-screen lg:h-[calc(100vh-72px)]
          lg:top-[72px]
          pt-[72px] lg:pt-0
          transition-transform duration-apple ease-apple
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div
          className="
            h-full m-4 lg:m-0 lg:mt-6 lg:ml-6
            p-5
            bg-white/80 dark:bg-[#1C1C1E]/80
            backdrop-blur-apple
            rounded-apple-lg lg:rounded-apple-xl
            shadow-apple-md dark:shadow-apple-dark
            border border-white/20 dark:border-white/10
            flex flex-col
            overflow-hidden
            transition-colors duration-apple
          "
        >
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="
              absolute top-6 right-4
              w-8 h-8
              flex items-center justify-center
              rounded-apple-sm
              text-text-secondary
              transition-all duration-apple ease-apple
              hover:bg-black/5 dark:hover:bg-white/10 hover:text-text-primary
              lg:hidden
            "
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          {/* User info */}
          <div className="mb-6 pb-5 border-b border-apple-gray5 dark:border-[#3A3A3C]">
            <div className="flex items-center gap-3">
              <div
                className="
                  w-11 h-11
                  bg-gradient-to-br from-primary to-primary-600
                  rounded-full
                  flex items-center justify-center
                  text-white font-semibold
                  shadow-apple-sm
                "
              >
                АИ
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-body-sm font-semibold text-text-primary truncate">
                  Александр Иванов
                </p>
                <p className="text-caption text-text-secondary truncate">
                  alex@example.com
                </p>
              </div>
            </div>
          </div>

          {/* Main menu */}
          <nav className="flex-1 space-y-1 overflow-y-auto scrollbar-hide">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.id}
                {...item}
                isActive={activeItem === item.id}
                onClick={() => handleNavigation(item.path)}
              />
            ))}
          </nav>

          {/* Bottom menu */}
          <div className="mt-auto pt-5 border-t border-apple-gray5 dark:border-[#3A3A3C] space-y-1">
            {bottomMenuItems.map((item) => (
              <SidebarItem
                key={item.id}
                {...item}
                isActive={activeItem === item.id}
                onClick={() => handleNavigation(item.path)}
              />
            ))}

            {/* Logout button */}
            <button
              className="
                w-full
                flex items-center gap-3
                h-11 px-4
                rounded-apple
                text-body-sm font-medium
                text-red-500
                transition-all duration-apple ease-apple
                hover:bg-red-50 dark:hover:bg-red-500/10 hover:scale-[1.02]
                active:scale-[0.98]
              "
              onClick={() => console.log('Logout')}
            >
              <LogOut className="w-5 h-5" />
              <span>Выйти</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

interface SidebarItemProps {
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  badge?: number;
  onClick?: () => void;
}

function SidebarItem({ label, icon, isActive, badge, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        flex items-center gap-3
        h-11 px-4
        rounded-apple
        text-body-sm font-medium
        transition-all duration-apple ease-apple
        cursor-pointer select-none
        active:scale-[0.98]
        ${isActive
          ? 'bg-primary text-white shadow-apple-glow'
          : 'text-text-primary hover:bg-black/5 dark:hover:bg-white/10 hover:scale-[1.02]'
        }
      `}
    >
      <span className={isActive ? 'text-white' : 'text-text-secondary'}>
        {icon}
      </span>
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span
          className={`
            px-2 py-0.5
            text-caption-sm font-semibold
            rounded-full
            ${isActive
              ? 'bg-white/20 text-white'
              : 'bg-primary/10 text-primary'
            }
          `}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
