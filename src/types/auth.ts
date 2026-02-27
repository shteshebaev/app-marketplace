// User roles
export type UserRole = 'USER' | 'DEVELOPER' | 'ADMIN';

// Base user interface
export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: UserRole;
    isVerified: boolean;
    createdAt: string;

    // For DEVELOPER role - linked to DeveloperProfile
    developerId?: string;
}

// Registration data for users
export interface UserRegisterData {
    role: 'USER';
    name: string;
    email: string;
    password: string;
}

// Registration data for developers
export interface DeveloperRegisterData {
    role: 'DEVELOPER';
    companyName: string;
    contactName: string;
    email: string;
    password: string;
    website?: string;
}

// Combined registration data type
export type RegisterData = UserRegisterData | DeveloperRegisterData;

// Login credentials
export interface LoginCredentials {
    email: string;
    password: string;
}

// Legacy LoginData (for backwards compatibility)
export interface LoginData {
    email: string;
    password: string;
}

// Auth response from API
export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

// Auth state in context
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

// Form validation errors
export interface AuthFormErrors {
    name?: string;
    companyName?: string;
    contactName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    website?: string;
    general?: string;
}

// Password strength levels
export type PasswordStrength = 'weak' | 'medium' | 'strong';

// Social auth providers
export type SocialProvider = 'google' | 'github';

// Email verification status
export interface VerificationStatus {
    isVerified: boolean;
    emailSentAt?: string;
    canResendAt?: string;
}
