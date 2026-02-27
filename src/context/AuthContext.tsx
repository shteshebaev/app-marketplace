import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, UserRole, AuthState, RegisterData, LoginData } from '../types/auth';
import type { Developer } from '../types/developer';

interface AuthContextValue extends AuthState {
    login: (data: LoginData) => Promise<void>;
    loginAsDeveloper: () => void;
    loginAsUser: () => void;
    logout: () => void;
    register: (data: RegisterData) => Promise<void>;
    hasRole: (role: UserRole) => boolean;
    isUser: boolean;
    isDeveloper: boolean;
    isAdmin: boolean;
    developer: Developer | null;
    setDeveloper: (developer: Developer) => void;
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
    developerId: 'dev-1',
    createdAt: '2024-01-01',
};

const mockRegularUser: User = {
    id: 'user-1',
    email: 'user@example.com',
    name: 'Александр Иванов',
    role: 'USER',
    createdAt: '2024-01-01',
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [developer, setDeveloper] = useState<Developer | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = !!user;
    const isUser = user?.role === 'USER';
    const isDeveloper = user?.role === 'DEVELOPER';
    const isAdmin = user?.role === 'ADMIN';

    const hasRole = useCallback((role: UserRole) => user?.role === role, [user]);

    const login = useCallback(async (_data: LoginData) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setUser(mockRegularUser);
        setIsLoading(false);
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
    }, []);

    const register = useCallback(async (_data: RegisterData) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setUser(mockRegularUser);
        setIsLoading(false);
    }, []);

    const value: AuthContextValue = {
        user,
        isAuthenticated,
        isLoading,
        login,
        loginAsDeveloper,
        loginAsUser,
        logout,
        register,
        hasRole,
        isUser,
        isDeveloper,
        isAdmin,
        developer,
        setDeveloper,
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
