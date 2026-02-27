import { useCallback, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useProductWizard } from '../../../hooks';
import { WizardProgress } from './WizardProgress';
import { WizardNavigation } from './WizardNavigation';
import {
    Step1BasicInfo,
    Step2Description,
    Step3Media,
    Step4Pricing,
    Step5TechInfo,
    Step6Review
} from './steps';
import type { DeveloperProduct } from '../../../types/developer-product';

interface CreateProductWizardProps {
    onCancel?: () => void;
    onComplete?: (product: Partial<DeveloperProduct>) => void;
    initialData?: Partial<DeveloperProduct>;
}

export function CreateProductWizard({ onCancel, onComplete, initialData }: CreateProductWizardProps) {
    const {
        currentStep,
        totalSteps,
        data,
        isFirstStep,
        isLastStep,
        canGoNext,
        goToStep,
        nextStep,
        prevStep,
        updateData,
        setStepValid,
        state
    } = useProductWizard(initialData);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleStepValidChange = useCallback((isValid: boolean) => {
        setStepValid(currentStep, isValid);
    }, [currentStep, setStepValid]);

    const handleSaveDraft = useCallback(() => {
        console.log('Saving draft:', data);
        // In real app, call API to save draft
    }, [data]);

    const handleSubmit = useCallback(async () => {
        if (!canGoNext) return;

        setIsSubmitting(true);
        try {
            // In real app, call API to submit for moderation
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Submitted for review:', data);
            onComplete?.(data);
        } catch (error) {
            console.error('Error submitting:', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [canGoNext, data, onComplete]);

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1BasicInfo
                        data={data}
                        onChange={updateData}
                        onValidChange={handleStepValidChange}
                    />
                );
            case 2:
                return (
                    <Step2Description
                        data={data}
                        onChange={updateData}
                        onValidChange={handleStepValidChange}
                    />
                );
            case 3:
                return (
                    <Step3Media
                        data={data}
                        onChange={updateData}
                        onValidChange={handleStepValidChange}
                    />
                );
            case 4:
                return (
                    <Step4Pricing
                        data={data}
                        onChange={updateData}
                        onValidChange={handleStepValidChange}
                    />
                );
            case 5:
                return (
                    <Step5TechInfo
                        data={data}
                        onChange={updateData}
                        onValidChange={handleStepValidChange}
                    />
                );
            case 6:
                return (
                    <Step6Review
                        data={data}
                        onChange={updateData}
                        onValidChange={handleStepValidChange}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {initialData ? 'Редактирование решения' : 'Создание решения'}
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Шаг {currentStep} из {totalSteps}
                        </p>
                    </div>
                </div>
            </div>

            {/* Progress */}
            <WizardProgress
                currentStep={currentStep}
                completedSteps={state.isValid}
                onStepClick={goToStep}
            />

            {/* Current Step */}
            {renderStep()}

            {/* Navigation */}
            <WizardNavigation
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
                canGoNext={canGoNext}
                onPrevious={prevStep}
                onNext={nextStep}
                onSaveDraft={handleSaveDraft}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}
