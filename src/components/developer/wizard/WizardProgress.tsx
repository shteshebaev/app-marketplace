import { Check } from 'lucide-react';
import { WIZARD_STEPS } from '../../../types/developer-product';

interface WizardProgressProps {
    currentStep: number;
    completedSteps: Record<number, boolean>;
    onStepClick?: (step: number) => void;
}

export function WizardProgress({ currentStep, completedSteps, onStepClick }: WizardProgressProps) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
                {WIZARD_STEPS.map((step, index) => {
                    const stepNumber = step.id;
                    const isCompleted = completedSteps[stepNumber];
                    const isCurrent = currentStep === stepNumber;
                    const isPast = currentStep > stepNumber;
                    const isClickable = isPast || isCompleted || stepNumber === currentStep;

                    return (
                        <div key={step.id} className="flex items-center flex-1 last:flex-none">
                            {/* Step Circle */}
                            <button
                                onClick={() => isClickable && onStepClick?.(stepNumber)}
                                disabled={!isClickable}
                                className={`
                                    relative flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-all
                                    ${isCurrent
                                        ? 'bg-blue-500 text-white ring-4 ring-blue-100 dark:ring-blue-500/20'
                                        : isCompleted || isPast
                                        ? 'bg-emerald-500 text-white cursor-pointer hover:bg-emerald-600'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
                                    }
                                    ${isClickable && !isCurrent ? 'cursor-pointer' : ''}
                                `}
                            >
                                {isCompleted || isPast ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    stepNumber
                                )}
                            </button>

                            {/* Step Info (only show on larger screens) */}
                            <div className="hidden lg:block ml-3 mr-4">
                                <div className={`text-sm font-medium ${isCurrent ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                                    {step.title}
                                </div>
                                <div className="text-xs text-slate-400 dark:text-slate-500">
                                    {step.description}
                                </div>
                            </div>

                            {/* Connector Line */}
                            {index < WIZARD_STEPS.length - 1 && (
                                <div className={`
                                    flex-1 h-0.5 mx-2
                                    ${isPast || isCompleted
                                        ? 'bg-emerald-500'
                                        : 'bg-slate-200 dark:bg-slate-700'
                                    }
                                `} />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Mobile: Current Step Info */}
            <div className="lg:hidden mt-4 text-center">
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                    Шаг {currentStep}: {WIZARD_STEPS[currentStep - 1].title}
                </div>
                <div className="text-xs text-slate-400">
                    {WIZARD_STEPS[currentStep - 1].description}
                </div>
            </div>
        </div>
    );
}
