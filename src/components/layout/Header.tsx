import { Menu, Search, Bell, User, Sun, Moon, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui';
import { useTheme } from '../../hooks';
import { useAuth } from '../../context/AuthContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  onMenuToggle?: () => void;
  hideMobileMenu?: boolean;
  hideNavigation?: boolean;
}

export function Header({ onMenuToggle, hideMobileMenu = false, hideNavigation = false }: HeaderProps) {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout, selectedDashboard } = useAuth();

  // Determine dashboard URL based on selected dashboard
  const getDashboardUrl = () => {
    if (!selectedDashboard) return '/select-dashboard';
    switch (selectedDashboard) {
      case 'customer': return '/dashboard';
      case 'developer': return '/developer/dashboard';
      case 'admin': return '/admin';
      default: return '/dashboard';
    }
  };

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
        {!hideNavigation && (
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink href="/solutions" active>{t('header.catalog')}</NavLink>
            <NavLink href="/categories">{t('header.categories')}</NavLink>
            <NavLink href="/support">{t('header.support')}</NavLink>
          </nav>
        )}

        {/* Right section: Actions */}
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <LanguageSwitcher />

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={isDark ? t('header.lightMode') : t('header.darkMode')}
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

          {isAuthenticated ? (
            <>
              {/* Profile button - when authenticated */}
              <Link
                to={getDashboardUrl()}
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
                    bg-primary/10 dark:bg-primary/20 rounded-full
                    flex items-center justify-center
                  "
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-primary" />
                  )}
                </div>
                <span className="text-body-sm font-medium">{user?.name?.split(' ')[0] || t('header.profile')}</span>
              </Link>

              {/* Logout button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="hidden md:flex ml-2"
              >
                {t('header.logout')}
              </Button>
            </>
          ) : (
            <>
              {/* Login button */}
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  {t('header.login')}
                </Button>
              </Link>

              {/* Register button */}
              <Link to="/register">
                <Button
                  variant="primary"
                  size="sm"
                  className="hidden md:inline-flex items-center gap-1.5 ml-2"
                >
                  <UserPlus className="w-4 h-4" />
                  {t('header.register')}
                </Button>
              </Link>
            </>
          )}
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
