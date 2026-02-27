import { useState } from 'react';
import { AuthLayout, LoginForm, SocialAuth, AuthDivider } from '../components/auth';
import type { LoginCredentials, SocialProvider, UserRole } from '../types/auth';

interface LoginPageProps {
    onLoginSuccess: (role: UserRole) => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (data: LoginCredentials) => {
        setIsLoading(true);
        setError(null);

        try {
            // TODO: Call API
            console.log('Login:', data);
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API

            // Simulate different roles based on email for demo
            if (data.email.includes('developer') || data.email.includes('dev')) {
                onLoginSuccess('DEVELOPER');
            } else if (data.email.includes('admin')) {
                onLoginSuccess('ADMIN');
            } else {
                onLoginSuccess('USER');
            }
        } catch (err) {
            setError('Неверный email или пароль');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider: SocialProvider) => {
        console.log('Social login:', provider);
        // TODO: Implement OAuth flow
    };

    return (
        <AuthLayout
            title="Вход в аккаунт"
            subtitle="Добро пожаловать! Войдите для продолжения"
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
