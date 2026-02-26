import { Star, Building2 } from 'lucide-react';

const clients = [
  { name: 'TechCorp', logo: null },
  { name: 'FinanceHub', logo: null },
  { name: 'LogiPro', logo: null },
  { name: 'MedSoft', logo: null },
  { name: 'EduTech', logo: null },
  { name: 'RetailMax', logo: null },
];

const reviews = [
  {
    text: 'Команда профессионалов, которые понимают бизнес. Проект был сдан в срок и превзошёл ожидания.',
    author: 'Алексей К.',
    company: 'CEO, TechCorp',
    rating: 5,
  },
  {
    text: 'Отличная коммуникация на всех этапах. Рекомендую для сложных интеграционных проектов.',
    author: 'Мария С.',
    company: 'CTO, FinanceHub',
    rating: 5,
  },
  {
    text: 'Качественная архитектура и чистый код. Система работает стабильно уже 2 года.',
    author: 'Дмитрий В.',
    company: 'Product Owner, LogiPro',
    rating: 5,
  },
];

export function TrustBadges() {
  return (
    <section className="py-16 md:py-20 px-4 bg-gray-50 dark:bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-12">
          Нам доверяют
        </h2>

        {/* Client Logos */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mb-16">
          {clients.map((client, index) => (
            <div
              key={index}
              className="
                flex items-center gap-2
                px-6 py-3 rounded-xl
                bg-background-card
                shadow-apple-sm
                opacity-70 hover:opacity-100
                transition-opacity duration-300
              "
            >
              <Building2 className="w-5 h-5 text-text-tertiary" />
              <span className="font-medium text-text-secondary">{client.name}</span>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="
                bg-background-card rounded-2xl p-6
                shadow-apple-sm hover:shadow-apple-md
                transition-all duration-300
                animate-fade-in
              "
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                "{review.text}"
              </p>

              {/* Author */}
              <div>
                <p className="font-semibold text-text-primary text-sm">
                  {review.author}
                </p>
                <p className="text-xs text-text-tertiary">{review.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
