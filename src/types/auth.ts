export type UserRole = 'USER' | 'DEVELOPER' | 'ADMIN';

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: UserRole;
    createdAt: string;
    developerId?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
    role: 'USER' | 'DEVELOPER';
    companyName?: string;
}

export interface LoginData {
    email: string;
    password: string;
}
