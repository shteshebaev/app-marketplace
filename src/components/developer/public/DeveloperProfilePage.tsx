import { ArrowLeft } from 'lucide-react';
import { DeveloperHero } from './DeveloperHero';
import { DeveloperAbout } from './DeveloperAbout';
import { DeveloperProducts } from './DeveloperProducts';
import { mockDeveloper, mockDeveloperProducts } from '../mockData';

interface DeveloperProfilePageProps {
    developerId?: string;
    onNavigateBack?: () => void;
    onProductClick?: (productId: string) => void;
}

export function DeveloperProfilePage({
    developerId: _developerId,
    onNavigateBack,
    onProductClick
}: DeveloperProfilePageProps) {
    // In real app, fetch developer by ID/slug using _developerId
    const developer = mockDeveloper;
    const products = mockDeveloperProducts;

    const handleContact = () => {
        window.location.href = `mailto:${developer.contact.email}`;
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">
            {/* Back Button */}
            {onNavigateBack && (
                <div className="fixed top-20 left-6 z-50">
                    <button
                        onClick={onNavigateBack}
                        className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Назад
                    </button>
                </div>
            )}

            {/* Hero */}
            <DeveloperHero
                developer={developer}
                onContact={handleContact}
            />

            {/* Products */}
            <DeveloperProducts
                products={products}
                onProductClick={onProductClick}
            />

            {/* About */}
            <DeveloperAbout developer={developer} />

            {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-500 to-indigo-600">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        Готовы начать сотрудничество?
                    </h2>
                    <p className="text-xl text-white/80 mb-8">
                        Свяжитесь с нами для обсуждения вашего проекта
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={handleContact}
                            className="flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                        >
                            Написать на почту
                        </button>
                        {developer.socialLinks.telegram && (
                            <a
                                href={developer.socialLinks.telegram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/30 transition-all"
                            >
                                Написать в Telegram
                            </a>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
