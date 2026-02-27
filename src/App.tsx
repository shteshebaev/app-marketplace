import { useState } from 'react';
import { DashboardLayout, PublicLayout, DeveloperDashboardLayout } from './components/layout';
import { OrdersPage, DashboardPage, HomePage, CategoriesPage, SolutionsPage, AllSolutionsPage, OrderDevelopmentPage } from './pages';
import { ProductPage } from './components/product';
import { DeveloperDashboard, DeveloperStats, DeveloperReviews, EditCompanyProfile } from './components/developer/dashboard';
import { DeveloperProfilePage } from './components/developer/public';
import { ProductsList } from './components/developer/products';
import { CreateProductWizard } from './components/developer/wizard';
import { useAuth } from './context';

type PublicPage = 'home' | 'categories' | 'solutions' | 'all-solutions' | 'order-development' | 'product' | 'developer-profile';
type DeveloperPage = 'dashboard' | 'products' | 'create' | 'stats' | 'reviews' | 'company' | 'preview' | 'settings';

interface NavigationState {
    page: PublicPage;
    categoryId?: string;
    solutionId?: string;
    developerId?: string;
}

function App() {
  const { isAuthenticated, isDeveloper, logout, loginAsDeveloper, loginAsUser } = useAuth();
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [developerPage, setDeveloperPage] = useState<DeveloperPage>('dashboard');
  const [navigation, setNavigation] = useState<NavigationState>({ page: 'home' });

  const handleLogin = (asDeveloper: boolean = false) => {
    if (asDeveloper) {
      loginAsDeveloper();
      setDeveloperPage('dashboard');
    } else {
      loginAsUser();
      setActiveMenuItem('dashboard');
    }
  };

  const handleNavigate = (path: string) => {
    const menuItem = path.replace('/', '');
    setActiveMenuItem(menuItem);
  };

  const handlePublicNavigate = (page: PublicPage, categoryId?: string, solutionId?: string) => {
    console.log('Navigate to:', page);
    setNavigation({ page, categoryId, solutionId });
  };

  const handleCategoryClick = (categoryId: string) => {
    setNavigation({ page: 'solutions', categoryId });
  };

  const handleSolutionClick = (solutionId: string) => {
    setNavigation({ page: 'product', solutionId, categoryId: navigation.categoryId });
  };

  const handleDeveloperNavigate = (page: string) => {
    setDeveloperPage(page as DeveloperPage);
  };

  // Render page based on active menu item (User Dashboard)
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

  // Render developer dashboard page
  const renderDeveloperPage = () => {
    switch (developerPage) {
      case 'dashboard':
        return <DeveloperDashboard onNavigate={handleDeveloperNavigate} />;
      case 'products':
        return (
          <ProductsList
            onCreateNew={() => handleDeveloperNavigate('create')}
            onEditProduct={(id) => console.log('Edit product:', id)}
            onViewProduct={(id) => console.log('View product:', id)}
          />
        );
      case 'create':
        return (
          <CreateProductWizard
            onCancel={() => handleDeveloperNavigate('products')}
            onComplete={(product) => {
              console.log('Product created:', product);
              handleDeveloperNavigate('products');
            }}
          />
        );
      case 'stats':
        return <DeveloperStats onNavigate={handleDeveloperNavigate} />;
      case 'reviews':
        return <DeveloperReviews />;
      case 'company':
        return <EditCompanyProfile />;
      case 'preview':
        return <div className="text-slate-900 dark:text-white">Публичный профиль (в разработке)</div>;
      case 'settings':
        return <div className="text-slate-900 dark:text-white">Настройки (в разработке)</div>;
      default:
        return <DeveloperDashboard onNavigate={handleDeveloperNavigate} />;
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
            onSolutionSelect={handleSolutionClick}
          />
        );
      case 'all-solutions':
        return (
          <AllSolutionsPage
            onOrderDevelopment={() => handlePublicNavigate('order-development')}
            onSolutionSelect={handleSolutionClick}
          />
        );
      case 'product':
        return (
          <ProductPage
            solutionId={navigation.solutionId || 'crm-1'}
            onNavigateBack={() => handlePublicNavigate(navigation.categoryId ? 'solutions' : 'all-solutions', navigation.categoryId)}
          />
        );
      case 'order-development':
        return (
          <OrderDevelopmentPage
            onNavigateHome={() => handlePublicNavigate('home')}
          />
        );
      case 'developer-profile':
        return (
          <DeveloperProfilePage
            developerId={navigation.developerId}
            onNavigateBack={() => handlePublicNavigate('all-solutions')}
            onProductClick={handleSolutionClick}
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
        onLogin={() => handleLogin(false)}
        onLoginAsDeveloper={() => handleLogin(true)}
        onNavigate={(page) => handlePublicNavigate(page as PublicPage)}
        currentPage={
          navigation.page === 'solutions' || navigation.page === 'product' || navigation.page === 'developer-profile'
            ? 'categories'
            : navigation.page === 'order-development'
            ? 'home'
            : navigation.page as 'home' | 'categories' | 'all-solutions' | 'order-development'
        }
      >
        {renderPublicPage()}
      </PublicLayout>
    );
  }

  // Developer dashboard view
  if (isDeveloper) {
    return (
      <DeveloperDashboardLayout
        activeMenuItem={developerPage}
        onNavigate={handleDeveloperNavigate}
        onLogout={logout}
      >
        {renderDeveloperPage()}
      </DeveloperDashboardLayout>
    );
  }

  // User dashboard view
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
