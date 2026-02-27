// Main page component
export { ProductPage } from './ProductPage';

// Section components
export { ProductHero } from './ProductHero';
export { ProductNav } from './ProductNav';
export { ProductVideo } from './ProductVideo';
export { ProductGallery } from './ProductGallery';
export { ProductFeatures } from './ProductFeatures';
export { ProductDemo } from './ProductDemo';
export { ProductPricing } from './ProductPricing';
export { ProductReviews } from './ProductReviews';
export { ProductTechInfo } from './ProductTechInfo';
export { ProductFAQ } from './ProductFAQ';
export { ProductCTA } from './ProductCTA';
export { ProductStickyCTA } from './ProductStickyCTA';

// Hooks
export { useProductNav } from './hooks';

// Data
export { getProductProfile, hasProductProfile, productNavAnchors, mockProductProfiles } from './mockData';

// Types
export type {
    SolutionProfile,
    ProductImage,
    ProductVideo as ProductVideoType,
    KeyBenefit,
    ProductFeature,
    ProductDemo as ProductDemoType,
    PricingTier,
    PricingComparisonRow,
    ProductReview,
    TechInfo,
    FAQItem,
    ProductNavAnchor,
    VendorInfo,
    ProductNavState
} from './types';
