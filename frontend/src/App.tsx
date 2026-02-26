import { useState } from 'react';
import { DashboardLayout, PublicLayout } from './components/layout';
import { OrdersPage, DashboardPage, HomePage, CategoriesPage, SolutionsPage, OrderDevelopmentPage } from './pages';

type PublicPage = 'home' | 'categories' | 'solutions' | 'order-development';

interface NavigationState {
    page: PublicPage;
    categoryId?: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [navigation, setNavigation] = useState<NavigationState>({ page: 'home' });

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleNavigate = (path: string) => {
    const menuItem = path.replace('/', '');
    setActiveMenuItem(menuItem);
  };

  const handlePublicNavigate = (page: PublicPage, categoryId?: string) => {
    setNavigation({ page, categoryId });
  };

  const handleCategoryClick = (categoryId: string) => {
    setNavigation({ page: 'solutions', categoryId });
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
    switch (navigation.page) {
      case 'categories':
        return (
          <CategoriesPage
            onCategoryClick={handleCategoryClick}
          />
        );
      case 'solutions':
        return (
          <SolutionsPage
            categoryId={navigation.categoryId || 'crm'}
            onNavigateHome={() => handlePublicNavigate('home')}
            onNavigateCategories={() => handlePublicNavigate('categories')}
          />
        );
      case 'order-development':
        return (
          <OrderDevelopmentPage
            onNavigateHome={() => handlePublicNavigate('home')}
          />
        );
      default:
        return (
          <HomePage
            onNavigate={(page) => handlePublicNavigate(page as PublicPage)}
            onCategoryClick={handleCategoryClick}
          />
        );
    }
  };

  // Public view (not authenticated)
  if (!isAuthenticated) {
    return (
      <PublicLayout
        onLogin={handleLogin}
        onNavigate={(page) => handlePublicNavigate(page as PublicPage)}
        currentPage={navigation.page === 'solutions' ? 'categories' : navigation.page}
      >
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
