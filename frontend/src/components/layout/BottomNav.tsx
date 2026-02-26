import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Heart,
  User,
} from 'lucide-react';

interface BottomNavProps {
  activeItem?: string;
  onNavigate?: (path: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Обзор',
    icon: <LayoutDashboard className="w-6 h-6" />,
    path: '/dashboard',
  },
  {
    id: 'orders',
    label: 'Заказы',
    icon: <ShoppingBag className="w-6 h-6" />,
    path: '/orders',
  },
  {
    id: 'products',
    label: 'Товары',
    icon: <Package className="w-6 h-6" />,
    path: '/products',
  },
  {
    id: 'favorites',
    label: 'Избранное',
    icon: <Heart className="w-6 h-6" />,
    path: '/favorites',
  },
  {
    id: 'profile',
    label: 'Профиль',
    icon: <User className="w-6 h-6" />,
    path: '/profile',
  },
];

export function BottomNav({ activeItem = 'orders', onNavigate }: BottomNavProps) {
  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-40
        lg:hidden
        bg-white/80 dark:bg-[#1C1C1E]/80
        backdrop-blur-apple
        border-t border-black/5 dark:border-white/10
        safe-bottom
        transition-colors duration-apple
      "
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <BottomNavItem
            key={item.id}
            {...item}
            isActive={activeItem === item.id}
            onClick={() => onNavigate?.(item.path)}
          />
        ))}
      </div>
    </nav>
  );
}

interface BottomNavItemProps {
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

function BottomNavItem({ label, icon, isActive, onClick }: BottomNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center
        flex-1 h-full
        transition-all duration-apple ease-apple
        active:scale-95
        ${isActive ? 'text-primary' : 'text-text-secondary'}
      `}
    >
      <span
        className={`
          mb-1
          transition-transform duration-apple ease-apple
          ${isActive ? 'scale-110' : ''}
        `}
      >
        {icon}
      </span>
      <span
        className={`
          text-[10px] font-medium
          ${isActive ? 'text-primary' : 'text-text-tertiary'}
        `}
      >
        {label}
      </span>
    </button>
  );
}
