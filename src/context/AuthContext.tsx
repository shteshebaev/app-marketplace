import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, UserRole, DashboardType, AuthState, RegisterData, LoginCredentials, UserRegisterData, DeveloperRegisterData } from '../types/auth';
import { hasMultipleDashboards, getAvailableDashboards } from '../types/auth';
import type { Developer } from '../types/developer';

interface AuthContextValue extends AuthState {
    login: (data: LoginCredentials) => Promise<UserRole[]>;
    loginAsDeveloper: () => void;
    loginAsUser: () => void;
    loginAsMultiRole: () => void;
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
    // New: Multiple roles support
    needsDashboardSelection: boolean;
    selectedDashboard: DashboardType | null;
    selectDashboard: (dashboard: DashboardType) => void;
    availableDashboards: DashboardType[];
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
    roles: ['DEVELOPER'],
    isVerified: true,
    developerId: 'dev-1',
    createdAt: '2024-01-01',
};

const mockRegularUser: User = {
    id: 'user-1',
    email: 'user@example.com',
    name: 'Александр Иванов',
    roles: ['USER'],
    isVerified: true,
    createdAt: '2024-01-01',
};

const mockAdminUser: User = {
    id: 'user-admin-1',
    email: 'admin@example.com',
    name: 'Администратор',
    roles: ['ADMIN'],
    isVerified: true,
    createdAt: '2024-01-01',
};

// Mock user with multiple roles (both USER and DEVELOPER)
const mockMultiRoleUser: User = {
    id: 'user-multi-1',
    email: 'multi@example.com',
    name: 'Мария Смирнова',
    roles: ['USER', 'DEVELOPER'],
    isVerified: true,
    developerId: 'dev-1',
    createdAt: '2024-01-01',
};

const LAST_DASHBOARD_KEY = 'marketplace_last_dashboard';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [developer, setDeveloper] = useState<Developer | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedDashboard, setSelectedDashboard] = useState<DashboardType | null>(null);

    const isAuthenticated = !!user;
    const isUser = user?.roles.includes('USER') ?? false;
    const isDeveloper = user?.roles.includes('DEVELOPER') ?? false;
    const isAdmin = user?.roles.includes('ADMIN') ?? false;

    const hasRole = useCallback((role: UserRole) => user?.roles.includes(role) ?? false, [user]);

    const needsDashboardSelection = hasMultipleDashboards(user) && !selectedDashboard;
    const availableDashboards = getAvailableDashboards(user);

    const selectDashboard = useCallback((dashboard: DashboardType) => {
        setSelectedDashboard(dashboard);
        localStorage.setItem(LAST_DASHBOARD_KEY, dashboard);
    }, []);

    const clearError = useCallback(() => setError(null), []);

    const login = useCallback(async (data: LoginCredentials): Promise<UserRole[]> => {
        setIsLoading(true);
        setError(null);
        setSelectedDashboard(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock: determine role based on email for demo
            let mockUser: User;
            if (data.email.includes('multi')) {
                // User with multiple roles
                mockUser = { ...mockMultiRoleUser, email: data.email };
                setDeveloper(mockDeveloper);
            } else if (data.email.includes('developer') || data.email.includes('dev')) {
                mockUser = { ...mockDeveloperUser, email: data.email };
                setDeveloper(mockDeveloper);
            } else if (data.email.includes('admin')) {
                mockUser = { ...mockAdminUser, email: data.email };
            } else {
                mockUser = { ...mockRegularUser, email: data.email };
            }

            setUser(mockUser);

            // If single role, auto-select dashboard
            if (mockUser.roles.length === 1) {
                const role = mockUser.roles[0];
                if (role === 'USER') setSelectedDashboard('customer');
                else if (role === 'DEVELOPER') setSelectedDashboard('developer');
                else if (role === 'ADMIN') setSelectedDashboard('admin');
            }

            return mockUser.roles;
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
        setSelectedDashboard('developer');
    }, []);

    const loginAsUser = useCallback(() => {
        setUser(mockRegularUser);
        setDeveloper(null);
        setSelectedDashboard('customer');
    }, []);

    const loginAsMultiRole = useCallback(() => {
        setUser(mockMultiRoleUser);
        setDeveloper(mockDeveloper);
        setSelectedDashboard(null); // Will show dashboard selection
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setDeveloper(null);
        setError(null);
        setSelectedDashboard(null);
        localStorage.removeItem(LAST_DASHBOARD_KEY);
    }, []);

    const registerUser = useCallback(async (data: UserRegisterData): Promise<void> => {
        setIsLoading(true);
        setError(null);
        setSelectedDashboard(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newUser: User = {
                id: `user-${Date.now()}`,
                email: data.email,
                name: data.name,
                roles: ['USER'],
                isVerified: false, // Email verification pending
                createdAt: new Date().toISOString(),
            };

            setUser(newUser);
            setSelectedDashboard('customer');
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
        setSelectedDashboard(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newDeveloperId = `dev-${Date.now()}`;

            const newUser: User = {
                id: `user-${Date.now()}`,
                email: data.email,
                name: data.contactName,
                roles: ['DEVELOPER'],
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
            setSelectedDashboard('developer');
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
        loginAsMultiRole,
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
        // Multiple roles support
        needsDashboardSelection,
        selectedDashboard,
        selectDashboard,
        availableDashboards,
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
