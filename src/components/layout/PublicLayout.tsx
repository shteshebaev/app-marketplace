import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, LogIn, UserPlus } from 'lucide-react';
import { Button } from '../ui';
import { useTheme } from '../../hooks';
import { LanguageSwitcher } from './LanguageSwitcher';

type PublicPage = 'home' | 'categories' | 'all-solutions' | 'order-development';

interface PublicLayoutProps {
  children: ReactNode;
  onNavigate?: (page: PublicPage) => void;
  currentPage?: PublicPage;
}

export function PublicLayout({ children, onNavigate, currentPage = 'home' }: PublicLayoutProps) {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-apple flex flex-col">
      {/* Header */}
      <header
        className="
          fixed top-0 left-0 right-0 z-50
          h-[72px]
          bg-white/70 dark:bg-black/70
          backdrop-blur-apple
          border-b border-black/5 dark:border-white/10
          transition-colors duration-apple
        "
      >
        <div className="h-full max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => onNavigate?.('home')} className="flex items-center gap-3">
            <div
              className="
                w-10 h-10
                bg-primary rounded-apple-sm
                flex items-center justify-center
                shadow-apple-sm
              "
            >
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-h3 text-text-primary font-semibold">
              Marketplace
            </span>
          </button>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavButton onClick={() => onNavigate?.('categories')} isActive={currentPage === 'categories'}>
              {t('header.categories')}
            </NavButton>
            <NavButton onClick={() => onNavigate?.('all-solutions')} isActive={currentPage === 'all-solutions'}>
              {t('header.catalog')}
            </NavButton>
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language switcher */}
            <LanguageSwitcher />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={isDark ? t('header.lightMode') : t('header.darkMode')}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Login button */}
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="inline-flex items-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">{t('header.login')}</span>
              </Button>
            </Link>

            {/* Register button */}
            <Link to="/register">
              <Button
                variant="primary"
                size="sm"
                className="inline-flex items-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">{t('header.register')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-[72px]">
        {children}
      </main>
    </div>
  );
}

interface NavButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
}

function NavButton({ onClick, isActive, children }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2
        text-body-sm font-medium
        rounded-apple
        transition-all duration-apple ease-apple
        ${isActive
          ? 'text-text-primary bg-black/5 dark:bg-white/10'
          : 'text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/10'
        }
      `}
    >
      {children}
    </button>
  );
}
