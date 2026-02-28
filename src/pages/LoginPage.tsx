import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthLayout, LoginForm, SocialAuth, AuthDivider } from '../components/auth';
import { useAuth } from '../context/AuthContext';
import type { LoginCredentials, SocialProvider, DashboardType } from '../types/auth';

const LAST_DASHBOARD_KEY = 'marketplace_last_dashboard';

export function LoginPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login, isLoading, error, selectDashboard } = useAuth();

    const handleLogin = async (data: LoginCredentials) => {
        try {
            const roles = await login(data);

            // If user has multiple roles (USER + DEVELOPER)
            if (roles.length > 1) {
                const hasUser = roles.includes('USER');
                const hasDeveloper = roles.includes('DEVELOPER');

                if (hasUser && hasDeveloper) {
                    // Check if there's a saved preference
                    const lastDashboard = localStorage.getItem(LAST_DASHBOARD_KEY) as DashboardType | null;

                    if (lastDashboard === 'customer' || lastDashboard === 'developer') {
                        // Use saved preference
                        selectDashboard(lastDashboard);
                        navigate(lastDashboard === 'developer' ? '/developer/dashboard' : '/dashboard');
                    } else {
                        // No saved preference - show selection page
                        navigate('/select-dashboard');
                    }
                    return;
                }
            }

            // Single role - redirect directly
            if (roles.includes('ADMIN')) {
                navigate('/admin');
            } else if (roles.includes('DEVELOPER')) {
                navigate('/developer/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            // Error is handled by AuthContext
            console.error('Login error:', err);
        }
    };

    const handleSocialLogin = async (provider: SocialProvider) => {
        console.log('Social login:', provider);
        // TODO: Implement OAuth flow
    };

    return (
        <AuthLayout
            title={t('auth.loginTitle')}
            subtitle={t('auth.loginSubtitle')}
        >
            <SocialAuth
                onSocialLogin={handleSocialLogin}
                isLoading={isLoading}
                showGitHub
            />
            <AuthDivider />
            <LoginForm
                onSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
            />
        </AuthLayout>
    );
}
