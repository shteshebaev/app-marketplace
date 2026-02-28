import { useRef, useCallback } from 'react';
import {
  OrderHero,
  ProblemSolution,
  OrderForm,
  ProcessSteps,
  FixedCTA,
} from '../components/order-development';

interface OrderDevelopmentPageProps {
  onNavigateHome: () => void;
}

export function OrderDevelopmentPage({ onNavigateHome }: OrderDevelopmentPageProps) {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <OrderHero onScrollToForm={scrollToForm} />

      {/* Problem → Solution Block */}
      <ProblemSolution />

      {/* Main Form */}
      <OrderForm ref={formRef} onNavigateHome={onNavigateHome} />

      {/* Social Proof */}
    {/*  <TrustBadges />*/}

      {/* Process Steps */}
      <ProcessSteps />

      {/* Fixed CTA Button */}
      <FixedCTA onScrollToForm={scrollToForm} />

      {/* Bottom padding for fixed CTA */}
      <div className="h-20" />
    </div>
  );
}
