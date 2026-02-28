import { useState, useEffect } from 'react';
import { HelpCircle, X, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HelpPromptProps {
    onStartQuiz: () => void;
}

export function HelpPrompt({ onStartQuiz }: HelpPromptProps) {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        if (isDismissed) return;

        let scrollCount = 0;
        let lastScrollY = 0;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 500) {
                scrollCount++;
            }

            lastScrollY = currentScrollY;

            if (scrollCount > 3 && !isVisible) {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible, isDismissed]);

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-24 right-6 z-40 animate-slide-up">
            <div className="relative bg-[var(--bg-card)] rounded-2xl shadow-2xl shadow-black/20
                border border-[var(--border-color)] p-5 max-w-sm">
                {/* Close button */}
                <button
                    onClick={handleDismiss}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-[var(--bg-card)] border border-[var(--border-color)]
                        rounded-full flex items-center justify-center hover:bg-[var(--hover-overlay)]
                        transition-colors shadow-lg"
                >
                    <X className="w-4 h-4 text-[var(--text-tertiary)]" />
                </button>

                {/* Content */}
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                            {t('solutions.helpTitle')}
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] mb-3">
                            {t('solutions.helpDesc')}
                        </p>
                        <button
                            onClick={() => {
                                onStartQuiz();
                                handleDismiss();
                            }}
                            className="group flex items-center gap-2 text-sm font-medium text-blue-500
                                hover:text-blue-600 transition-colors"
                        >
                            <span>{t('solutions.startQuiz')}</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Pointer */}
                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-[var(--bg-card)] border-r border-b
                    border-[var(--border-color)] rotate-45" />
            </div>
        </div>
    );
}
