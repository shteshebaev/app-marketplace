import { useEffect } from 'react';
import { ProductHero } from './ProductHero';
import { ProductNav } from './ProductNav';
import { ProductVideo } from './ProductVideo';
import { ProductGallery } from './ProductGallery';
import { ProductFeatures } from './ProductFeatures';
import { ProductDemo } from './ProductDemo';
import { ProductPricing } from './ProductPricing';
import { ProductReviews } from './ProductReviews';
import { ProductTechInfo } from './ProductTechInfo';
import { ProductFAQ } from './ProductFAQ';
import { ProductCTA } from './ProductCTA';
import { ProductStickyCTA } from './ProductStickyCTA';
import { useProductNav } from './hooks';
import { getProductProfile, productNavAnchors } from './mockData';

interface ProductPageProps {
    solutionId: string;
    onNavigateBack: () => void;
    onConnect?: () => void;
}

export function ProductPage({ solutionId, onNavigateBack, onConnect }: ProductPageProps) {
    const profile = getProductProfile(solutionId);
    const { activeSection, isSticky, showCTA, scrollToSection } = useProductNav();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [solutionId]);

    if (!profile) {
        return (
            <div className="min-h-screen bg-[var(--bg-default)] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        Решение не найдено
                    </h1>
                    <button
                        onClick={onNavigateBack}
                        className="text-blue-500 hover:text-blue-600 font-medium"
                    >
                        Вернуться к каталогу
                    </button>
                </div>
            </div>
        );
    }

    const handleConnect = () => {
        if (onConnect) {
            onConnect();
        } else {
            console.log('Connect to:', profile.id);
        }
    };

    const handleDemo = () => {
        if (profile.demo?.url) {
            window.open(profile.demo.url, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-default)]">
            {/* Sticky Navigation */}
            <ProductNav
                anchors={productNavAnchors}
                activeSection={activeSection}
                isSticky={isSticky}
                productName={profile.name}
                onNavigateBack={onNavigateBack}
                onAnchorClick={scrollToSection}
            />

            {/* Hero Section */}
            <ProductHero
                profile={profile}
                onConnect={handleConnect}
                onDemo={handleDemo}
            />

            {/* Video Section */}
            {profile.video && (
                <ProductVideo
                    video={profile.video}
                    benefits={profile.keyBenefits}
                />
            )}

            {/* Gallery Section */}
            {profile.gallery.length > 0 && (
                <ProductGallery images={profile.gallery} />
            )}

            {/* Features Section */}
            {profile.features.length > 0 && (
                <ProductFeatures features={profile.features} />
            )}

            {/* Demo Section */}
            {profile.demo && (
                <ProductDemo
                    demo={profile.demo}
                    gradient={profile.gradient}
                />
            )}

            {/* Pricing Section */}
            {profile.pricing.tiers.length > 0 && (
                <ProductPricing
                    tiers={profile.pricing.tiers}
                    comparison={profile.pricing.comparison}
                    billingNote={profile.pricing.billingNote}
                    gradient={profile.gradient}
                />
            )}

            {/* Reviews Section */}
            {profile.reviews.length > 0 && (
                <ProductReviews
                    reviews={profile.reviews}
                    totalReviews={profile.reviewsCount}
                    avgRating={profile.rating}
                />
            )}

            {/* Tech Info Section */}
            {profile.techInfo.length > 0 && (
                <ProductTechInfo techInfo={profile.techInfo} />
            )}

            {/* FAQ Section */}
            {profile.faq.length > 0 && (
                <ProductFAQ items={profile.faq} />
            )}

            {/* Final CTA */}
            <ProductCTA
                productName={profile.name}
                ctaPrimary={profile.ctaPrimary}
                ctaSecondary={profile.ctaSecondary}
                gradient={profile.gradient}
                onConnect={handleConnect}
            />

            {/* Sticky CTA Button */}
            <ProductStickyCTA
                visible={showCTA}
                text={profile.ctaPrimary.text}
                gradient={profile.gradient}
                onClick={handleConnect}
            />
        </div>
    );
}
