// User roles
export type UserRole = 'USER' | 'DEVELOPER' | 'ADMIN';

// Dashboard types for navigation
export type DashboardType = 'customer' | 'developer' | 'admin';

// Base user interface
export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    roles: UserRole[]; // Support multiple roles
    isVerified: boolean;
    createdAt: string;

    // For DEVELOPER role - linked to DeveloperProfile
    developerId?: string;
}

// Helper to check if user has multiple dashboards
export function hasMultipleDashboards(user: User | null): boolean {
    if (!user) return false;
    // Count non-admin roles (USER and DEVELOPER)
    const dashboardRoles = user.roles.filter(r => r === 'USER' || r === 'DEVELOPER');
    return dashboardRoles.length > 1;
}

// Get available dashboards for user
export function getAvailableDashboards(user: User | null): DashboardType[] {
    if (!user) return [];
    const dashboards: DashboardType[] = [];
    if (user.roles.includes('USER')) dashboards.push('customer');
    if (user.roles.includes('DEVELOPER')) dashboards.push('developer');
    if (user.roles.includes('ADMIN')) dashboards.push('admin');
    return dashboards;
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
