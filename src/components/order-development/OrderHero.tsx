import { CheckCircle } from 'lucide-react';

interface OrderHeroProps {
  onScrollToForm: () => void;
}

const benefits = [
  '150+ реализованных проектов',
  '99.9% uptime',
  'Поддержка 24/7',
];

export function OrderHero({ onScrollToForm }: OrderHeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #FF8F65 25%, #F093FB 50%, #F5576C 75%, #FF6B35 100%)',
        }}
      />

      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Разработаем решение под ваш бизнес
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
              CRM, автоматизация, маркетплейсы, интеграции —
              полный цикл разработки под ключ.
            </p>
            <button
              onClick={onScrollToForm}
              className="
                bg-white text-gray-900
                px-8 py-4 rounded-2xl
                font-semibold text-lg
                shadow-lg hover:shadow-xl
                transition-all duration-300
                hover:scale-105 active:scale-100
              "
            >
              Оставить заявку
            </button>
          </div>

          {/* Right Content - Benefits */}
          <div className="flex flex-col gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="
                  flex items-center gap-4
                  bg-white/15 backdrop-blur-sm
                  px-6 py-4 rounded-2xl
                  border border-white/20
                  animate-fade-in
                "
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
