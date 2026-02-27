import { ChevronLeft, ChevronRight, Save, Send } from 'lucide-react';

interface WizardNavigationProps {
    isFirstStep: boolean;
    isLastStep: boolean;
    canGoNext: boolean;
    onPrevious: () => void;
    onNext: () => void;
    onSaveDraft?: () => void;
    onSubmit?: () => void;
    isSubmitting?: boolean;
}

export function WizardNavigation({
    isFirstStep,
    isLastStep,
    canGoNext,
    onPrevious,
    onNext,
    onSaveDraft,
    onSubmit,
    isSubmitting = false
}: WizardNavigationProps) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
                {/* Left: Back button */}
                <button
                    onClick={onPrevious}
                    disabled={isFirstStep}
                    className={`
                        flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all
                        ${isFirstStep
                            ? 'opacity-50 cursor-not-allowed text-slate-400'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }
                    `}
                >
                    <ChevronLeft className="w-5 h-5" />
                    Назад
                </button>

                {/* Center: Save draft button */}
                {onSaveDraft && !isLastStep && (
                    <button
                        onClick={onSaveDraft}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                    >
                        <Save className="w-5 h-5" />
                        Сохранить черновик
                    </button>
                )}

                {/* Right: Next/Submit button */}
                {isLastStep ? (
                    <button
                        onClick={onSubmit}
                        disabled={!canGoNext || isSubmitting}
                        className={`
                            flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                            ${canGoNext && !isSubmitting
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                            }
                        `}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Отправка...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Отправить на модерацию
                            </>
                        )}
                    </button>
                ) : (
                    <button
                        onClick={onNext}
                        disabled={!canGoNext}
                        className={`
                            flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                            ${canGoNext
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                            }
                        `}
                    >
                        Далее
                        <ChevronRight className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}
