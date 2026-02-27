import { useState, useCallback } from 'react';
import type { DeveloperProduct, ProductWizardState } from '../types/developer-product';

const TOTAL_STEPS = 6;

interface UseProductWizardReturn {
    state: ProductWizardState;
    currentStep: number;
    totalSteps: number;
    data: Partial<DeveloperProduct>;
    isFirstStep: boolean;
    isLastStep: boolean;
    canGoNext: boolean;
    goToStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    updateData: (newData: Partial<DeveloperProduct>) => void;
    setStepValid: (step: number, isValid: boolean) => void;
    resetWizard: () => void;
}

const initialState: ProductWizardState = {
    currentStep: 1,
    totalSteps: TOTAL_STEPS,
    isValid: {},
    data: {},
    isDirty: false
};

export function useProductWizard(initialData?: Partial<DeveloperProduct>): UseProductWizardReturn {
    const [state, setState] = useState<ProductWizardState>({
        ...initialState,
        data: initialData || {}
    });

    const currentStep = state.currentStep;
    const totalSteps = state.totalSteps;
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === totalSteps;
    const canGoNext = state.isValid[currentStep] === true;

    const goToStep = useCallback((step: number) => {
        if (step >= 1 && step <= TOTAL_STEPS) {
            setState(prev => ({ ...prev, currentStep: step }));
        }
    }, []);

    const nextStep = useCallback(() => {
        if (!isLastStep && canGoNext) {
            setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
        }
    }, [isLastStep, canGoNext]);

    const prevStep = useCallback(() => {
        if (!isFirstStep) {
            setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
        }
    }, [isFirstStep]);

    const updateData = useCallback((newData: Partial<DeveloperProduct>) => {
        setState(prev => ({
            ...prev,
            data: { ...prev.data, ...newData },
            isDirty: true
        }));
    }, []);

    const setStepValid = useCallback((step: number, isValid: boolean) => {
        setState(prev => ({
            ...prev,
            isValid: { ...prev.isValid, [step]: isValid }
        }));
    }, []);

    const resetWizard = useCallback(() => {
        setState(initialState);
    }, []);

    return {
        state,
        currentStep,
        totalSteps,
        data: state.data,
        isFirstStep,
        isLastStep,
        canGoNext,
        goToStep,
        nextStep,
        prevStep,
        updateData,
        setStepValid,
        resetWizard
    };
}
