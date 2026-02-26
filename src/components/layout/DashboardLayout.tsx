import { useState, type ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';

interface DashboardLayoutProps {
  children: ReactNode;
  activeMenuItem?: string;
  onNavigate?: (path: string) => void;
}

export function DashboardLayout({
  children,
  activeMenuItem = 'orders',
  onNavigate,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gradient-apple">
      {/* Header */}
      <Header onMenuToggle={toggleSidebar} />

      {/* Main content area */}
      <div className="flex pt-[72px]">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={closeSidebar}
          activeItem={activeMenuItem}
          onNavigate={onNavigate}
        />

        {/* Main content */}
        <main
          className="
            flex-1
            min-h-[calc(100vh-72px)]
            p-4 lg:p-6
            pb-20 lg:pb-6
          "
        >
          <div className="max-w-content mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom navigation (mobile only) */}
      <BottomNav activeItem={activeMenuItem} onNavigate={onNavigate} />
    </div>
  );
}
