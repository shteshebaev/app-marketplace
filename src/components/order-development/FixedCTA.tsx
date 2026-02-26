import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

interface FixedCTAProps {
  onScrollToForm: () => void;
  showAfterScroll?: number; // pixels to scroll before showing
}

export function FixedCTA({ onScrollToForm, showAfterScroll = 600 }: FixedCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > showAfterScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScroll]);

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50
        transition-all duration-300
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
      `}
    >
      {/* Gradient fade effect */}
      <div className="
        absolute inset-x-0 -top-10 h-10
        bg-gradient-to-t from-background to-transparent
        pointer-events-none
      " />

      {/* CTA Container */}
      <div className="
        bg-background-card/95 backdrop-blur-lg
        border-t border-gray-200 dark:border-gray-800
        safe-bottom
      ">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left text - hidden on mobile */}
            <div className="hidden sm:block">
              <p className="text-text-primary font-medium">
                Готовы обсудить проект?
              </p>
              <p className="text-sm text-text-secondary">
                Ответим в течение 1 рабочего дня
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={onScrollToForm}
              className="
                flex-1 sm:flex-none
                inline-flex items-center justify-center gap-2
                py-3 px-6 rounded-xl
                font-semibold
                bg-gradient-to-r from-orange-400 to-pink-500 text-white
                shadow-lg hover:shadow-xl
                transition-all duration-300
                hover:scale-105 active:scale-100
              "
            >
              <Send className="w-4 h-4" />
              Оставить заявку
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
