import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Monitor, Smartphone, BarChart2, Layout, Settings } from 'lucide-react';
import type { ProductImage } from './types';

interface ProductGalleryProps {
    images: ProductImage[];
}

const placeholderIcons = [
    <Layout className="w-16 h-16" />,
    <BarChart2 className="w-16 h-16" />,
    <Monitor className="w-16 h-16" />,
    <Settings className="w-16 h-16" />,
    <Smartphone className="w-16 h-16" />,
];

export function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openModal = (index: number) => {
        setSelectedIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedIndex(null);
        document.body.style.overflow = '';
    };

    const goToPrev = () => {
        if (selectedIndex !== null) {
            setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : images.length - 1);
        }
    };

    const goToNext = () => {
        if (selectedIndex !== null) {
            setSelectedIndex(selectedIndex < images.length - 1 ? selectedIndex + 1 : 0);
        }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') goToPrev();
        if (e.key === 'ArrowRight') goToNext();
    };

    return (
        <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Скриншоты
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Посмотрите, как выглядит интерфейс нашего решения
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                        <button
                            key={image.id}
                            onClick={() => openModal(index)}
                            className={`
                                group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                                bg-gradient-to-br ${image.gradient || 'from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800'}
                            `}
                        >
                            {/* Placeholder content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60 p-4">
                                {placeholderIcons[index % placeholderIcons.length]}
                                <p className="text-xs text-center mt-2 text-white/50 line-clamp-2">{image.alt}</p>
                            </div>

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-6 h-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Modal */}
                {selectedIndex !== null && (
                    <div
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={closeModal}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation */}
                        <button
                            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                            className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Image */}
                        <div
                            className={`max-w-4xl w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br ${images[selectedIndex].gradient || 'from-slate-700 to-slate-800'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-full h-full flex flex-col items-center justify-center text-white/60 p-8">
                                {placeholderIcons[selectedIndex % placeholderIcons.length]}
                                <p className="text-xl text-center mt-4 text-white/80">{images[selectedIndex].alt}</p>
                            </div>
                        </div>

                        {/* Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                            {selectedIndex + 1} / {images.length}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
