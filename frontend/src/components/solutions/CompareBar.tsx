import { X, GitCompare, ChevronRight } from 'lucide-react';
import type { CompareItem } from './types';

interface CompareBarProps {
    items: CompareItem[];
    onRemove: (id: string) => void;
    onClear: () => void;
    onCompare: () => void;
}

export function CompareBar({ items, onRemove, onClear, onCompare }: CompareBarProps) {
    if (items.length === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
            <div className="max-w-[1000px] mx-auto pointer-events-auto">
                <div className="bg-[var(--bg-card)]/95 backdrop-blur-xl rounded-2xl border border-[var(--border-color)]
                    shadow-2xl shadow-black/20 p-4 animate-slide-up">
                    <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div className="hidden sm:flex w-12 h-12 rounded-xl bg-blue-500/10 items-center justify-center flex-shrink-0">
                            <GitCompare className="w-6 h-6 text-blue-500" />
                        </div>

                        {/* Selected items */}
                        <div className="flex-1 flex items-center gap-3 overflow-x-auto pb-1">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-2 bg-[var(--bg-default)] rounded-xl pl-3 pr-2 py-2
                                        flex-shrink-0"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500
                                        flex items-center justify-center">
                                        <span className="text-white font-semibold text-sm">
                                            {item.name.charAt(0)}
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium text-[var(--text-primary)] max-w-[100px] truncate">
                                        {item.name}
                                    </span>
                                    <button
                                        onClick={() => onRemove(item.id)}
                                        className="p-1 hover:bg-[var(--hover-overlay)] rounded-lg transition-colors"
                                    >
                                        <X className="w-4 h-4 text-[var(--text-tertiary)]" />
                                    </button>
                                </div>
                            ))}

                            {/* Empty slots */}
                            {items.length < 3 && (
                                <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)] flex-shrink-0">
                                    <span className="hidden sm:inline">+</span>
                                    <span>{3 - items.length} {items.length === 2 ? 'ещё' : 'ещё'}</span>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                                onClick={onClear}
                                className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]
                                    hover:bg-[var(--hover-overlay)] rounded-xl transition-all"
                            >
                                Очистить
                            </button>
                            <button
                                onClick={onCompare}
                                disabled={items.length < 2}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm
                                    transition-all duration-200 ${items.length >= 2
                                        ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30'
                                        : 'bg-[var(--bg-default)] text-[var(--text-tertiary)] cursor-not-allowed'}`}
                            >
                                <span>Сравнить {items.length}</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3 h-1 bg-[var(--bg-default)] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
                            style={{ width: `${(items.length / 3) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
