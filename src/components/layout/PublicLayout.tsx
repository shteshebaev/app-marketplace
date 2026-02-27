import { type ReactNode, useState } from 'react';
import { Menu, Sun, Moon, User, Code2 } from 'lucide-react';
import { Button } from '../ui';
import { useTheme } from '../../hooks';

type PublicPage = 'home' | 'categories' | 'all-solutions' | 'order-development';

interface PublicLayoutProps {
  children: ReactNode;
  onLogin?: () => void;
  onLoginAsDeveloper?: () => void;
  onNavigate?: (page: PublicPage) => void;
  currentPage?: PublicPage;
}

export function PublicLayout({ children, onLogin, onLoginAsDeveloper, onNavigate, currentPage = 'home' }: PublicLayoutProps) {
  const { isDark, toggleTheme } = useTheme();
  const [showLoginMenu, setShowLoginMenu] = useState(false);

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
              Категории
            </NavButton>
            <NavButton onClick={() => onNavigate?.('all-solutions')} isActive={currentPage === 'all-solutions'}>
              Решения
            </NavButton>
            <NavLink href="#pricing">Цены</NavLink>
            <NavLink href="#about">О нас</NavLink>
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={isDark ? 'Светлая тема' : 'Тёмная тема'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Login button with dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLoginMenu(!showLoginMenu)}
              >
                Войти
              </Button>

              {showLoginMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowLoginMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50">
                    <button
                      onClick={() => {
                        onLogin?.();
                        setShowLoginMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <User className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium">Войти как клиент</div>
                        <div className="text-sm text-slate-500">Просмотр и заказ решений</div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        onLoginAsDeveloper?.();
                        setShowLoginMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Code2 className="w-5 h-5 text-emerald-500" />
                      <div>
                        <div className="font-medium">Войти как разработчик</div>
                        <div className="text-sm text-slate-500">Управление решениями</div>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* CTA button */}
            <Button variant="primary" size="sm" className="hidden sm:flex">
              Начать бесплатно
            </Button>

            {/* Mobile menu */}
            <button
              className="
                lg:hidden w-10 h-10
                flex items-center justify-center
                rounded-apple text-text-primary
                hover:bg-black/5 dark:hover:bg-white/10
              "
            >
              <Menu className="w-5 h-5" />
            </button>
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

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <a
      href={href}
      className="
        px-4 py-2
        text-body-sm font-medium
        text-text-secondary
        rounded-apple
        transition-all duration-apple ease-apple
        hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/10
      "
    >
      {children}
    </a>
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
