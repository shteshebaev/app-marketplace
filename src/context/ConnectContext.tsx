import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export interface ProductPlan {
    id: string;
    name: string;
    price: number;
    period: 'monthly' | 'yearly' | 'one-time';
    features: string[];
    isPopular?: boolean;
    isFree?: boolean;
}

export interface ProductToConnect {
    id: string;
    name: string;
    developerName: string;
    logo?: string;
    gradient: string;
    plans: ProductPlan[];
}

export type OrderStatus = 'PENDING' | 'WAITING_PAYMENT' | 'WAITING_APPROVAL' | 'ACTIVE' | 'REJECTED' | 'CANCELLED';

export interface Order {
    id: string;
    userId: string;
    productId: string;
    productName: string;
    planId: string;
    planName: string;
    price: number;
    status: OrderStatus;
    createdAt: string;
}

type ModalState = 'closed' | 'auth' | 'switchRole' | 'selectPlan' | 'confirm' | 'success';

interface ConnectContextValue {
    // Modal state
    modalState: ModalState;
    currentProduct: ProductToConnect | null;
    selectedPlan: ProductPlan | null;
    isProcessing: boolean;

    // Actions
    initiateConnect: (product: ProductToConnect) => void;
    selectPlan: (plan: ProductPlan) => void;
    confirmConnect: () => Promise<void>;
    closeModal: () => void;
    goToLogin: () => void;
    goToRegister: () => void;

    // Last created order
    lastOrder: Order | null;
}

const ConnectContext = createContext<ConnectContextValue | null>(null);

export function ConnectProvider({ children }: { children: ReactNode }) {
    const { isAuthenticated, user, selectedDashboard } = useAuth();
    const navigate = useNavigate();

    const [modalState, setModalState] = useState<ModalState>('closed');
    const [currentProduct, setCurrentProduct] = useState<ProductToConnect | null>(null);
    const [selectedPlan, setSelectedPlanState] = useState<ProductPlan | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [lastOrder, setLastOrder] = useState<Order | null>(null);

    // Store return URL for after auth
    const [returnUrl, setReturnUrl] = useState<string | null>(null);

    const initiateConnect = useCallback((product: ProductToConnect) => {
        setCurrentProduct(product);
        setSelectedPlanState(null);
        setLastOrder(null);

        // Check auth state
        if (!isAuthenticated) {
            setReturnUrl(window.location.pathname + '?connect=true&productId=' + product.id);
            setModalState('auth');
            return;
        }

        // Check if user is developer (not client)
        if (selectedDashboard === 'developer') {
            setModalState('switchRole');
            return;
        }

        // User is authenticated as client - show plan selection
        if (product.plans.length === 1) {
            // Single plan - go directly to confirm
            setSelectedPlanState(product.plans[0]);
            setModalState('confirm');
        } else {
            // Multiple plans - show selection
            setModalState('selectPlan');
        }
    }, [isAuthenticated, selectedDashboard]);

    const selectPlan = useCallback((plan: ProductPlan) => {
        setSelectedPlanState(plan);
        setModalState('confirm');
    }, []);

    const confirmConnect = useCallback(async () => {
        if (!currentProduct || !selectedPlan || !user) return;

        setIsProcessing(true);

        try {
            // Simulate API call to create order
            await new Promise(resolve => setTimeout(resolve, 1500));

            const newOrder: Order = {
                id: `order-${Date.now()}`,
                userId: user.id,
                productId: currentProduct.id,
                productName: currentProduct.name,
                planId: selectedPlan.id,
                planName: selectedPlan.name,
                price: selectedPlan.price,
                status: selectedPlan.isFree ? 'ACTIVE' : 'PENDING',
                createdAt: new Date().toISOString(),
            };

            setLastOrder(newOrder);
            setModalState('success');
        } catch (error) {
            console.error('Failed to create order:', error);
        } finally {
            setIsProcessing(false);
        }
    }, [currentProduct, selectedPlan, user]);

    const closeModal = useCallback(() => {
        setModalState('closed');
        setCurrentProduct(null);
        setSelectedPlanState(null);
        setReturnUrl(null);
    }, []);

    const goToLogin = useCallback(() => {
        closeModal();
        if (returnUrl) {
            sessionStorage.setItem('connectReturnUrl', returnUrl);
        }
        navigate('/login');
    }, [navigate, returnUrl, closeModal]);

    const goToRegister = useCallback(() => {
        closeModal();
        if (returnUrl) {
            sessionStorage.setItem('connectReturnUrl', returnUrl);
        }
        navigate('/register');
    }, [navigate, returnUrl, closeModal]);

    const value: ConnectContextValue = {
        modalState,
        currentProduct,
        selectedPlan,
        isProcessing,
        initiateConnect,
        selectPlan,
        confirmConnect,
        closeModal,
        goToLogin,
        goToRegister,
        lastOrder,
    };

    return (
        <ConnectContext.Provider value={value}>
            {children}
        </ConnectContext.Provider>
    );
}

export function useConnect() {
    const context = useContext(ConnectContext);
    if (!context) {
        throw new Error('useConnect must be used within ConnectProvider');
    }
    return context;
}
