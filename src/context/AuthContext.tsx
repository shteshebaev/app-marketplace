import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, UserRole, AuthState, RegisterData, LoginCredentials, UserRegisterData, DeveloperRegisterData } from '../types/auth';
import type { Developer } from '../types/developer';

interface AuthContextValue extends AuthState {
    login: (data: LoginCredentials) => Promise<UserRole>;
    loginAsDeveloper: () => void;
    loginAsUser: () => void;
    logout: () => void;
    register: (data: RegisterData) => Promise<UserRole>;
    registerUser: (data: UserRegisterData) => Promise<void>;
    registerDeveloper: (data: DeveloperRegisterData) => Promise<void>;
    hasRole: (role: UserRole) => boolean;
    isUser: boolean;
    isDeveloper: boolean;
    isAdmin: boolean;
    developer: Developer | null;
    setDeveloper: (developer: Developer) => void;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Mock developer data
const mockDeveloper: Developer = {
    id: 'dev-1',
    slug: 'crm-pro-inc',
    companyName: 'CRM Pro Inc.',
    description: 'Ведущий разработчик CRM-систем для бизнеса любого масштаба',
    aboutCompany: 'CRM Pro Inc. — компания с 10-летним опытом разработки CRM-систем. Наши решения используют более 1200 компаний по всему миру.',
    foundedYear: 2014,
    employeesCount: '50-100',
    rating: 4.8,
    reviewsCount: 342,
    productsCount: 5,
    clientsCount: 1250,
    contact: {
        email: 'info@crmpro.example.com',
        phone: '+7 (800) 123-45-67',
    },
    socialLinks: {
        website: 'https://crmpro.example.com',
        telegram: '@crmpro',
    },
    isVerified: true,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-03-15',
};

// Mock users
const mockDeveloperUser: User = {
    id: 'user-dev-1',
    email: 'developer@example.com',
    name: 'Иван Разработчиков',
    role: 'DEVELOPER',
    isVerified: true,
    developerId: 'dev-1',
    createdAt: '2024-01-01',
};

const mockRegularUser: User = {
    id: 'user-1',
    email: 'user@example.com',
    name: 'Александр Иванов',
    role: 'USER',
    isVerified: true,
    createdAt: '2024-01-01',
};

const mockAdminUser: User = {
    id: 'user-admin-1',
    email: 'admin@example.com',
    name: 'Администратор',
    role: 'ADMIN',
    isVerified: true,
    createdAt: '2024-01-01',
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [developer, setDeveloper] = useState<Developer | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isAuthenticated = !!user;
    const isUser = user?.role === 'USER';
    const isDeveloper = user?.role === 'DEVELOPER';
    const isAdmin = user?.role === 'ADMIN';

    const hasRole = useCallback((role: UserRole) => user?.role === role, [user]);

    const clearError = useCallback(() => setError(null), []);

    const login = useCallback(async (data: LoginCredentials): Promise<UserRole> => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock: determine role based on email for demo
            let mockUser: User;
            if (data.email.includes('developer') || data.email.includes('dev')) {
                mockUser = { ...mockDeveloperUser, email: data.email };
                setDeveloper(mockDeveloper);
            } else if (data.email.includes('admin')) {
                mockUser = { ...mockAdminUser, email: data.email };
            } else {
                mockUser = { ...mockRegularUser, email: data.email };
            }

            setUser(mockUser);
            return mockUser.role;
        } catch (err) {
            setError('Неверный email или пароль');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loginAsDeveloper = useCallback(() => {
        setUser(mockDeveloperUser);
        setDeveloper(mockDeveloper);
    }, []);

    const loginAsUser = useCallback(() => {
        setUser(mockRegularUser);
        setDeveloper(null);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setDeveloper(null);
        setError(null);
    }, []);

    const registerUser = useCallback(async (data: UserRegisterData): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newUser: User = {
                id: `user-${Date.now()}`,
                email: data.email,
                name: data.name,
                role: 'USER',
                isVerified: false, // Email verification pending
                createdAt: new Date().toISOString(),
            };

            setUser(newUser);
        } catch (err) {
            setError('Ошибка при регистрации. Попробуйте снова.');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const registerDeveloper = useCallback(async (data: DeveloperRegisterData): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newDeveloperId = `dev-${Date.now()}`;

            const newUser: User = {
                id: `user-${Date.now()}`,
                email: data.email,
                name: data.contactName,
                role: 'DEVELOPER',
                isVerified: false, // Email verification pending
                developerId: newDeveloperId,
                createdAt: new Date().toISOString(),
            };

            const newDeveloper: Developer = {
                id: newDeveloperId,
                slug: data.companyName.toLowerCase().replace(/\s+/g, '-'),
                companyName: data.companyName,
                description: '',
                aboutCompany: '',
                rating: 0,
                reviewsCount: 0,
                productsCount: 0,
                clientsCount: 0,
                contact: {
                    email: data.email,
                },
                socialLinks: {
                    website: data.website,
                },
                isVerified: false,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            setUser(newUser);
            setDeveloper(newDeveloper);
        } catch (err) {
            setError('Ошибка при регистрации. Попробуйте снова.');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const register = useCallback(async (data: RegisterData): Promise<UserRole> => {
        if (data.role === 'USER') {
            await registerUser(data);
            return 'USER';
        } else {
            await registerDeveloper(data);
            return 'DEVELOPER';
        }
    }, [registerUser, registerDeveloper]);

    const value: AuthContextValue = {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        loginAsDeveloper,
        loginAsUser,
        logout,
        register,
        registerUser,
        registerDeveloper,
        hasRole,
        isUser,
        isDeveloper,
        isAdmin,
        developer,
        setDeveloper,
        clearError,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
