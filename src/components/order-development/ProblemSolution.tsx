import { Check } from 'lucide-react';

const reasons = [
  {
    title: 'Нужны нестандартные процессы',
    description: 'Ваш бизнес уникален и требует кастомных решений',
  },
  {
    title: 'Готовые решения не подходят',
    description: 'Коробочные продукты ограничивают ваш рост',
  },
  {
    title: 'Требуются интеграции с вашими системами',
    description: 'Нужна бесшовная связь между сервисами',
  },
  {
    title: 'Нужна масштабируемая архитектура',
    description: 'Планируете рост и увеличение нагрузки',
  },
];

export function ProblemSolution() {
  return (
    <section className="py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Вам подходит индивидуальная разработка, если:
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="
                group
                bg-background-card rounded-2xl p-6
                border border-transparent
                hover:border-primary/20
                shadow-apple-sm hover:shadow-apple-md
                transition-all duration-300
                animate-fade-in
              "
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="
                  flex-shrink-0
                  w-8 h-8 rounded-full
                  bg-gradient-to-br from-orange-400 to-pink-500
                  flex items-center justify-center
                  group-hover:scale-110
                  transition-transform duration-300
                ">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
