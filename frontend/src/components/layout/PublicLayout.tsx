import { type ReactNode } from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { Button } from '../ui';
import { useTheme } from '../../hooks';

interface PublicLayoutProps {
  children: ReactNode;
  onLogin?: () => void;
}

export function PublicLayout({ children, onLogin }: PublicLayoutProps) {
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
          <a href="/" className="flex items-center gap-3">
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
          </a>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink href="#categories">Категории</NavLink>
            <NavLink href="#solutions">Решения</NavLink>
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

            {/* Login button */}
            <Button variant="ghost" size="sm" onClick={onLogin}>
              Войти
            </Button>

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
