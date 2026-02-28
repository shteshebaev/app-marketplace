import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { PublicLayout, DeveloperDashboardLayout } from './components/layout';
import { CustomerDashboardLayout } from './components/customer';
import {
  HomePage,
  CategoriesPage,
  SolutionsPage,
  AllSolutionsPage,
  OrderDevelopmentPage,
  RegisterPage,
  LoginPage,
  SelectDashboardPage
} from './pages';
import { ProductPage } from './components/product';
import { DeveloperDashboard, DeveloperStats, DeveloperReviews, EditCompanyProfile } from './components/developer/dashboard';
import { DeveloperProfilePage } from './components/developer/public';
import { ProductsList } from './components/developer/products';
import { CreateProductWizard } from './components/developer/wizard';
import { useAuth, AuthProvider } from './context';

// Protected route wrapper
function ProtectedRoute({ children, allowedDashboards }: { children: React.ReactNode; allowedDashboards?: ('customer' | 'developer' | 'admin')[] }) {
  const { isAuthenticated, selectedDashboard, needsDashboardSelection } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user needs to select a dashboard, redirect to selection
  if (needsDashboardSelection) {
    return <Navigate to="/select-dashboard" replace />;
  }

  // Check if user has access to this dashboard
  if (allowedDashboards && selectedDashboard && !allowedDashboards.includes(selectedDashboard)) {
    return <Navigate to="/select-dashboard" replace />;
  }

  return <>{children}</>;
}

// Public route wrapper - redirects authenticated users to their dashboard
function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, selectedDashboard, needsDashboardSelection } = useAuth();

  if (isAuthenticated) {
    if (needsDashboardSelection) {
      return <Navigate to="/select-dashboard" replace />;
    }
    if (selectedDashboard === 'developer') {
      return <Navigate to="/developer/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

// Dashboard selection route - only for authenticated users who need to choose
function DashboardSelectionRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, needsDashboardSelection, selectedDashboard } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If already selected and doesn't need selection, redirect to selected dashboard
  if (!needsDashboardSelection && selectedDashboard) {
    if (selectedDashboard === 'developer') {
      return <Navigate to="/developer/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

// Developer Dashboard wrapper component
function DeveloperDashboardWrapper() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [developerPage, setDeveloperPage] = useState<string>('dashboard');

  const handleNavigate = (page: string) => {
    setDeveloperPage(page);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderDeveloperPage = () => {
    switch (developerPage) {
      case 'dashboard':
        return <DeveloperDashboard onNavigate={handleNavigate} />;
      case 'products':
        return (
          <ProductsList
            onCreateNew={() => handleNavigate('create')}
            onEditProduct={(id) => console.log('Edit product:', id)}
            onViewProduct={(id) => console.log('View product:', id)}
          />
        );
      case 'create':
        return (
          <CreateProductWizard
            onCancel={() => handleNavigate('products')}
            onComplete={(product) => {
              console.log('Product created:', product);
              handleNavigate('products');
            }}
          />
        );
      case 'stats':
        return <DeveloperStats onNavigate={handleNavigate} />;
      case 'reviews':
        return <DeveloperReviews />;
      case 'company':
        return <EditCompanyProfile />;
      case 'preview':
        return <div className="text-slate-900 dark:text-white">Публичный профиль (в разработке)</div>;
      case 'settings':
        return <div className="text-slate-900 dark:text-white">Настройки (в разработке)</div>;
      default:
        return <DeveloperDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <DeveloperDashboardLayout
      activeMenuItem={developerPage}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    >
      {renderDeveloperPage()}
    </DeveloperDashboardLayout>
  );
}

// Public pages wrapper with navigation
function PublicPagesWrapper({ children, currentPage }: { children: React.ReactNode; currentPage: 'home' | 'categories' | 'all-solutions' | 'order-development' }) {
  const navigate = useNavigate();

  return (
    <PublicLayout
      onLogin={() => navigate('/login')}
      onLoginAsDeveloper={() => navigate('/register')}
      onNavigate={(page) => {
        switch (page) {
          case 'home':
            navigate('/');
            break;
          case 'categories':
            navigate('/categories');
            break;
          case 'all-solutions':
            navigate('/solutions');
            break;
          case 'order-development':
            navigate('/order-development');
            break;
        }
      }}
      currentPage={currentPage}
    >
      {children}
    </PublicLayout>
  );
}

// Home page wrapper
function HomePageWrapper() {
  const navigate = useNavigate();

  return (
    <PublicPagesWrapper currentPage="home">
      <HomePage
        onNavigate={(page) => {
          switch (page) {
            case 'home':
              navigate('/');
              break;
            case 'categories':
              navigate('/categories');
              break;
            case 'all-solutions':
              navigate('/solutions');
              break;
            case 'order-development':
              navigate('/order-development');
              break;
          }
        }}
        onCategoryClick={(categoryId) => navigate(`/category/${categoryId}`)}
      />
    </PublicPagesWrapper>
  );
}

// Categories page wrapper
function CategoriesPageWrapper() {
  const navigate = useNavigate();

  return (
    <PublicPagesWrapper currentPage="categories">
      <CategoriesPage
        onCategoryClick={(categoryId) => navigate(`/category/${categoryId}`)}
      />
    </PublicPagesWrapper>
  );
}

// Solutions page wrapper (category specific)
function CategorySolutionsPageWrapper() {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();

  return (
    <PublicPagesWrapper currentPage="categories">
      <SolutionsPage
        categoryId={categoryId || 'crm'}
        onNavigateHome={() => navigate('/')}
        onNavigateCategories={() => navigate('/categories')}
        onSolutionSelect={(solutionId) => navigate(`/product/${solutionId}`)}
      />
    </PublicPagesWrapper>
  );
}

// All solutions page wrapper
function AllSolutionsPageWrapper() {
  const navigate = useNavigate();

  return (
    <PublicPagesWrapper currentPage="all-solutions">
      <AllSolutionsPage
        onOrderDevelopment={() => navigate('/order-development')}
        onSolutionSelect={(solutionId) => navigate(`/product/${solutionId}`)}
      />
    </PublicPagesWrapper>
  );
}

// Product page wrapper
function ProductPageWrapper() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  return (
    <PublicPagesWrapper currentPage="all-solutions">
      <ProductPage
        solutionId={productId || 'crm-1'}
        onNavigateBack={() => navigate('/solutions')}
      />
    </PublicPagesWrapper>
  );
}

// Order development page wrapper
function OrderDevelopmentPageWrapper() {
  const navigate = useNavigate();

  return (
    <PublicPagesWrapper currentPage="order-development">
      <OrderDevelopmentPage
        onNavigateHome={() => navigate('/')}
      />
    </PublicPagesWrapper>
  );
}

// Developer profile page wrapper
function DeveloperProfilePageWrapper() {
  const navigate = useNavigate();
  const { developerId } = useParams<{ developerId: string }>();

  return (
    <PublicPagesWrapper currentPage="all-solutions">
      <DeveloperProfilePage
        developerId={developerId}
        onNavigateBack={() => navigate('/solutions')}
        onProductClick={(productId) => navigate(`/product/${productId}`)}
      />
    </PublicPagesWrapper>
  );
}

// Main App with routes
function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />

      {/* Dashboard selection */}
      <Route
        path="/select-dashboard"
        element={
          <DashboardSelectionRoute>
            <SelectDashboardPage />
          </DashboardSelectionRoute>
        }
      />

      {/* Customer dashboard */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute allowedDashboards={['customer']}>
            <CustomerDashboardLayout />
          </ProtectedRoute>
        }
      />

      {/* Developer dashboard */}
      <Route
        path="/developer/*"
        element={
          <ProtectedRoute allowedDashboards={['developer']}>
            <DeveloperDashboardWrapper />
          </ProtectedRoute>
        }
      />

      {/* Public routes */}
      <Route path="/" element={<HomePageWrapper />} />
      <Route path="/categories" element={<CategoriesPageWrapper />} />
      <Route path="/category/:categoryId" element={<CategorySolutionsPageWrapper />} />
      <Route path="/solutions" element={<AllSolutionsPageWrapper />} />
      <Route path="/product/:productId" element={<ProductPageWrapper />} />
      <Route path="/order-development" element={<OrderDevelopmentPageWrapper />} />
      <Route path="/developer-profile/:developerId" element={<DeveloperProfilePageWrapper />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
