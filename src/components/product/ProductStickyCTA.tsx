import { ArrowRight } from 'lucide-react';

interface ProductStickyCTAProps {
    visible: boolean;
    text: string;
    gradient?: string;
    onClick?: () => void;
}

export function ProductStickyCTA({ visible, text, gradient = 'from-blue-500 to-indigo-600', onClick }: ProductStickyCTAProps) {
    return (
        <div
            className={`
                fixed bottom-6 right-6 z-50 transition-all duration-300
                ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}
            `}
        >
            <button
                onClick={onClick}
                className={`
                    flex items-center gap-3 bg-gradient-to-r ${gradient}
                    text-white font-semibold px-6 py-4 rounded-2xl
                    shadow-2xl shadow-blue-500/30
                    hover:shadow-blue-500/50 hover:scale-105
                    active:scale-95
                    transition-all duration-200
                `}
            >
                {text}
                <ArrowRight className="w-5 h-5" />
            </button>
        </div>
    );
}
