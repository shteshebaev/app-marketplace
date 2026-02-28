import { Search, Lightbulb, Code2, Headphones } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function ProcessSteps() {
  const { t } = useTranslation();

  const steps = [
    { icon: Search, title: t('orderDev.step1Title'), description: t('orderDev.step1Desc') },
    { icon: Lightbulb, title: t('orderDev.step2Title'), description: t('orderDev.step2Desc') },
    { icon: Code2, title: t('orderDev.step3Title'), description: t('orderDev.step3Desc') },
    { icon: Headphones, title: t('orderDev.step4Title'), description: t('orderDev.step4Desc') },
  ];

  return (
    <section className="py-16 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-4">
          {t('orderDev.processTitle')}
        </h2>
        <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
          {t('orderDev.processSubtitle')}
        </p>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="
                  relative
                  bg-background-card rounded-2xl p-6
                  shadow-apple-sm hover:shadow-apple-md
                  transition-all duration-300
                  group
                  animate-fade-in
                "
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Step Number */}
                <div className="
                  absolute -top-3 -left-3
                  w-8 h-8 rounded-full
                  bg-gradient-to-br from-orange-400 to-pink-500
                  text-white text-sm font-bold
                  flex items-center justify-center
                  shadow-md
                ">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="
                  w-14 h-14 rounded-2xl mb-4
                  bg-gray-100 dark:bg-[#2C2C2E]
                  flex items-center justify-center
                  group-hover:bg-gradient-to-br group-hover:from-orange-400/10 group-hover:to-pink-500/10
                  transition-all duration-300
                ">
                  <Icon className="w-7 h-7 text-text-secondary group-hover:text-orange-500 transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {step.description}
                </p>

                {/* Connector line (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="
                    hidden lg:block
                    absolute top-1/2 -right-3
                    w-6 h-0.5
                    bg-gradient-to-r from-orange-300 to-pink-300
                    dark:from-orange-400/30 dark:to-pink-400/30
                  " />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
