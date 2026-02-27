import { ArrowLeft, Eye, PlayCircle, Grid, CreditCard, MessageCircle } from 'lucide-react';
import type { ProductNavAnchor } from './types';

interface ProductNavProps {
    anchors: ProductNavAnchor[];
    activeSection: string;
    isSticky: boolean;
    productName?: string;
    onNavigateBack: () => void;
    onAnchorClick: (sectionId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
    eye: <Eye className="w-4 h-4" />,
    'play-circle': <PlayCircle className="w-4 h-4" />,
    grid: <Grid className="w-4 h-4" />,
    'credit-card': <CreditCard className="w-4 h-4" />,
    'message-circle': <MessageCircle className="w-4 h-4" />,
};

export function ProductNav({
    anchors,
    activeSection,
    isSticky,
    productName,
    onNavigateBack,
    onAnchorClick
}: ProductNavProps) {
    return (
        <nav
            className={`
                sticky top-0 z-50 transition-all duration-300
                ${isSticky
                    ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-lg border-b border-slate-200 dark:border-slate-800'
                    : 'bg-transparent'
                }
            `}
        >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                <div className="flex items-center justify-between h-16">
                    {/* Left - Back button */}
                    <button
                        onClick={onNavigateBack}
                        className={`
                            flex items-center gap-2 font-medium transition-colors
                            ${isSticky
                                ? 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                                : 'text-white/80 hover:text-white'
                            }
                        `}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Назад</span>
                    </button>

                    {/* Center - Product name (only when sticky) */}
                    {isSticky && productName && (
                        <span className="hidden md:block font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">
                            {productName}
                        </span>
                    )}

                    {/* Right - Navigation anchors */}
                    <div className="flex items-center gap-1">
                        {anchors.map((anchor) => (
                            <button
                                key={anchor.id}
                                onClick={() => onAnchorClick(anchor.id)}
                                className={`
                                    flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm transition-all
                                    ${activeSection === anchor.id
                                        ? isSticky
                                            ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                                            : 'bg-white/20 text-white'
                                        : isSticky
                                            ? 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }
                                `}
                            >
                                {anchor.icon && iconMap[anchor.icon]}
                                <span className="hidden lg:inline">{anchor.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
