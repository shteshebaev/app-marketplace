import { useState } from 'react';
import { DashboardLayout, PublicLayout } from './components/layout';
import { OrdersPage, DashboardPage, HomePage, CategoriesPage } from './pages';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState<'home' | 'categories'>('home');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleNavigate = (path: string) => {
    const menuItem = path.replace('/', '');
    setActiveMenuItem(menuItem);
  };

  const handlePublicNavigate = (page: 'home' | 'categories') => {
    setCurrentPage(page);
  };

  // Render page based on active menu item
  const renderPage = () => {
    switch (activeMenuItem) {
      case 'dashboard':
        return <DashboardPage />;
      case 'orders':
        return <OrdersPage />;
      default:
        return <DashboardPage />;
    }
  };

  // Render public page
  const renderPublicPage = () => {
    switch (currentPage) {
      case 'categories':
        return <CategoriesPage />;
      default:
        return <HomePage onNavigate={handlePublicNavigate} />;
    }
  };

  // Public view (not authenticated)
  if (!isAuthenticated) {
    return (
      <PublicLayout onLogin={handleLogin} onNavigate={handlePublicNavigate} currentPage={currentPage}>
        {renderPublicPage()}
      </PublicLayout>
    );
  }

  // Authenticated view with sidebar
  return (
    <DashboardLayout
      activeMenuItem={activeMenuItem}
      onNavigate={handleNavigate}
    >
      {renderPage()}
    </DashboardLayout>
  );
}

export default App;
