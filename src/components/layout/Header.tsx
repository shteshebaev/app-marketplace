import { Menu, Search, Bell, User, Sun, Moon } from 'lucide-react';
import { Button } from '../ui';
import { useTheme } from '../../hooks';

interface HeaderProps {
  onMenuToggle?: () => void;
  hideMobileMenu?: boolean;
}

export function Header({ onMenuToggle, hideMobileMenu = false }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        h-[72px]
        bg-white/70 dark:bg-black/70
        backdrop-blur-apple
        border-b border-black/5 dark:border-white/10
        safe-top
        transition-colors duration-apple
      "
    >
      <div className="h-full max-w-content mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Left section: Menu button (mobile) + Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          {!hideMobileMenu && (
            <button
              onClick={onMenuToggle}
              className="
                lg:hidden
                w-10 h-10
                flex items-center justify-center
                rounded-apple
                text-text-primary
                transition-all duration-apple ease-apple
                hover:bg-black/5 dark:hover:bg-white/10
                active:scale-95
              "
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div
              className="
                w-9 h-9
                bg-primary rounded-apple-sm
                flex items-center justify-center
                shadow-apple-sm
              "
            >
              <span className="text-white font-semibold text-lg">M</span>
            </div>
            <span className="hidden sm:block text-h3 text-text-primary">
              Marketplace
            </span>
          </a>
        </div>

        {/* Center section: Navigation (desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          <NavLink href="/catalog" active>Каталог</NavLink>
          <NavLink href="/services">Услуги</NavLink>
          <NavLink href="/about">О нас</NavLink>
          <NavLink href="/support">Поддержка</NavLink>
        </nav>

        {/* Right section: Actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Search button */}
          <button
            className="
              w-10 h-10
              flex items-center justify-center
              rounded-apple
              text-text-secondary
              transition-all duration-apple ease-apple
              hover:bg-black/5 dark:hover:bg-white/10
              hover:text-text-primary
              active:scale-95
            "
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button
            className="
              relative
              w-10 h-10
              flex items-center justify-center
              rounded-apple
              text-text-secondary
              transition-all duration-apple ease-apple
              hover:bg-black/5 dark:hover:bg-white/10
              hover:text-text-primary
              active:scale-95
            "
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {/* Notification badge */}
            <span
              className="
                absolute top-2 right-2
                w-2 h-2
                bg-red-500 rounded-full
              "
            />
          </button>

          {/* Profile button */}
          <button
            className="
              hidden sm:flex
              items-center gap-2
              h-10 pl-2 pr-3
              rounded-apple
              text-text-primary
              transition-all duration-apple ease-apple
              hover:bg-black/5 dark:hover:bg-white/10
              active:scale-95
            "
          >
            <div
              className="
                w-7 h-7
                bg-gray-200 dark:bg-[#3A3A3C] rounded-full
                flex items-center justify-center
              "
            >
              <User className="w-4 h-4 text-text-secondary" />
            </div>
            <span className="text-body-sm font-medium">Профиль</span>
          </button>

          {/* CTA Button */}
          <Button
            variant="primary"
            size="sm"
            className="hidden md:flex ml-2"
          >
            Начать бесплатно
          </Button>
        </div>
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}

function NavLink({ href, active, children }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`
        px-4 py-2
        text-body-sm font-medium
        rounded-apple
        transition-all duration-apple ease-apple
        ${active
          ? 'text-primary'
          : 'text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/10'
        }
      `}
    >
      {children}
    </a>
  );
}
