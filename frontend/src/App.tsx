import { useState } from 'react';
import { DashboardLayout, PublicLayout } from './components/layout';
import { OrdersPage, DashboardPage, HomePage } from './pages';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };


  const handleNavigate = (path: string) => {
    const menuItem = path.replace('/', '');
    setActiveMenuItem(menuItem);
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

  // Public view (not authenticated)
  if (!isAuthenticated) {
    return (
      <PublicLayout onLogin={handleLogin}>
        <HomePage />
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
