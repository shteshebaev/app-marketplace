import { useState } from 'react';
import {
    AuthLayout,
    RoleSelector,
    UserRegisterForm,
    DeveloperRegisterForm,
    SocialAuth,
    AuthDivider
} from '../components/auth';
import type { UserRegisterData, DeveloperRegisterData, SocialProvider } from '../types/auth';

type Step = 'select-role' | 'user-form' | 'developer-form';

interface RegisterPageProps {
    onRegisterSuccess: (role: 'USER' | 'DEVELOPER') => void;
}

export function RegisterPage({ onRegisterSuccess }: RegisterPageProps) {
    const [step, setStep] = useState<Step>('select-role');
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectRole = (role: 'USER' | 'DEVELOPER') => {
        setStep(role === 'USER' ? 'user-form' : 'developer-form');
    };

    const handleUserRegister = async (data: UserRegisterData) => {
        setIsLoading(true);
        try {
            // TODO: Call API
            console.log('User register:', data);
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API
            onRegisterSuccess('USER');
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeveloperRegister = async (data: DeveloperRegisterData) => {
        setIsLoading(true);
        try {
            // TODO: Call API
            console.log('Developer register:', data);
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API
            onRegisterSuccess('DEVELOPER');
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider: SocialProvider) => {
        console.log('Social login:', provider);
        // TODO: Implement OAuth flow
    };

    const getTitle = () => {
        switch (step) {
            case 'select-role':
                return 'Создайте аккаунт';
            case 'user-form':
                return 'Регистрация';
            case 'developer-form':
                return 'Регистрация разработчика';
        }
    };

    const getSubtitle = () => {
        switch (step) {
            case 'select-role':
                return 'Выберите, как вы хотите использовать платформу';
            case 'user-form':
                return 'Создайте аккаунт для использования решений';
            case 'developer-form':
                return 'Создайте аккаунт для публикации решений';
        }
    };

    return (
        <AuthLayout title={getTitle()} subtitle={getSubtitle()}>
            {step === 'select-role' && (
                <RoleSelector onSelectRole={handleSelectRole} />
            )}

            {step === 'user-form' && (
                <>
                    <SocialAuth
                        onSocialLogin={handleSocialLogin}
                        isLoading={isLoading}
                    />
                    <AuthDivider />
                    <UserRegisterForm
                        onSubmit={handleUserRegister}
                        onBack={() => setStep('select-role')}
                        isLoading={isLoading}
                    />
                </>
            )}

            {step === 'developer-form' && (
                <>
                    <SocialAuth
                        onSocialLogin={handleSocialLogin}
                        isLoading={isLoading}
                        showGitHub
                    />
                    <AuthDivider />
                    <DeveloperRegisterForm
                        onSubmit={handleDeveloperRegister}
                        onBack={() => setStep('select-role')}
                        isLoading={isLoading}
                    />
                </>
            )}
        </AuthLayout>
    );
}
