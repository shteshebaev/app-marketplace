import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    AuthLayout,
    RoleSelector,
    UserRegisterForm,
    DeveloperRegisterForm,
    SocialAuth,
    AuthDivider
} from '../components/auth';
import { useAuth } from '../context/AuthContext';
import type { UserRegisterData, DeveloperRegisterData, SocialProvider } from '../types/auth';

type Step = 'select-role' | 'user-form' | 'developer-form';

export function RegisterPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { registerUser, registerDeveloper, isLoading } = useAuth();
    const [step, setStep] = useState<Step>('select-role');

    const handleSelectRole = (role: 'USER' | 'DEVELOPER') => {
        setStep(role === 'USER' ? 'user-form' : 'developer-form');
    };

    const handleUserRegister = async (data: UserRegisterData) => {
        try {
            await registerUser(data);
            // Navigate to customer dashboard after registration
            navigate('/dashboard');
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const handleDeveloperRegister = async (data: DeveloperRegisterData) => {
        try {
            await registerDeveloper(data);
            // Navigate to developer dashboard after registration
            navigate('/developer/dashboard');
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const handleSocialLogin = async (provider: SocialProvider) => {
        console.log('Social login:', provider);
        // TODO: Implement OAuth flow
    };

    const getTitle = () => {
        switch (step) {
            case 'select-role':
                return t('auth.registerTitle');
            case 'user-form':
                return t('auth.registerTitle');
            case 'developer-form':
                return t('auth.registerTitle');
        }
    };

    const getSubtitle = () => {
        switch (step) {
            case 'select-role':
                return t('auth.registerSubtitle');
            case 'user-form':
                return t('auth.registerSubtitle');
            case 'developer-form':
                return t('auth.registerSubtitle');
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
