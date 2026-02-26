import {
  ArrowRight,
  Sparkles,
  Users,
  ShoppingCart,
  Truck,
  GraduationCap,
  Dumbbell,
  Warehouse,
  Building2,
  Utensils,
  Star,
  Check,
} from 'lucide-react';
import { Button } from '../components/ui';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

const categories: Category[] = [
  { id: 'crm', name: 'CRM-системы', icon: <Users className="w-6 h-6" />, count: 24 },
  { id: 'ecommerce', name: 'Интернет-магазины', icon: <ShoppingCart className="w-6 h-6" />, count: 18 },
  { id: 'delivery', name: 'Доставка', icon: <Truck className="w-6 h-6" />, count: 12 },
  { id: 'education', name: 'Образование', icon: <GraduationCap className="w-6 h-6" />, count: 15 },
  { id: 'fitness', name: 'Фитнес и здоровье', icon: <Dumbbell className="w-6 h-6" />, count: 9 },
  { id: 'warehouse', name: 'Склад и логистика', icon: <Warehouse className="w-6 h-6" />, count: 11 },
  { id: 'realestate', name: 'Недвижимость', icon: <Building2 className="w-6 h-6" />, count: 8 },
  { id: 'food', name: 'Рестораны и кафе', icon: <Utensils className="w-6 h-6" />, count: 14 },
];

interface Solution {
  id: string;
  name: string;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  price: string;
  popular?: boolean;
}

const popularSolutions: Solution[] = [
  {
    id: '1',
    name: 'CRM Pro',
    description: 'Полнофункциональная CRM для управления продажами и клиентами',
    features: ['Воронка продаж', 'Аналитика', 'Интеграции'],
    rating: 4.9,
    reviews: 128,
    price: 'от ₽15,000/мес',
    popular: true,
  },
  {
    id: '2',
    name: 'E-Store Platform',
    description: 'Готовое решение для запуска интернет-магазина за 1 день',
    features: ['Каталог товаров', 'Онлайн-оплата', 'Доставка'],
    rating: 4.8,
    reviews: 89,
    price: 'от ₽12,000/мес',
  },
  {
    id: '3',
    name: 'DeliveryHub',
    description: 'Система управления доставкой и курьерской службой',
    features: ['Трекинг', 'Маршруты', 'Уведомления'],
    rating: 4.7,
    reviews: 64,
    price: 'от ₽8,000/мес',
  },
];

export function HomePage() {
  const handleRequestProduct = () => {
    console.log('Request new product');
  };

  return (
    <div className="h-[calc(100vh-72px)] flex flex-col overflow-hidden">
      <div className="flex-1 max-w-[1440px] mx-auto w-full px-6 lg:px-10 py-6 lg:py-8 flex flex-col">
        {/* Top section: CTA + Categories */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* CTA Block */}
          <div
            className="
              flex-shrink-0 lg:w-[380px]
              bg-gradient-to-br from-primary to-primary-700
              rounded-apple-xl p-6 lg:p-8
              text-white
              relative overflow-hidden
              animate-fade-in
            "
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-apple flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>

              <h2 className="text-h2 font-bold mb-3">
                Не нашли нужное решение?
              </h2>

              <p className="text-white/80 text-body-sm mb-6 leading-relaxed">
                Закажите разработку индивидуального продукта под ваши бизнес-задачи
              </p>

              <Button
                variant="secondary"
                className="
                  w-full bg-white text-primary
                  hover:bg-white/90 hover:shadow-lg
                  font-semibold
                "
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={handleRequestProduct}
              >
                Запросить реализацию
              </Button>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="flex-1 min-w-0" id="categories">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-h3 text-text-primary">Категории решений</h2>
              <a
                href="#all-categories"
                className="text-body-sm text-primary font-medium hover:underline hidden sm:block"
              >
                Все категории
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section: Popular Solutions */}
        <div className="flex-1 min-h-0" id="solutions">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-h3 text-text-primary">Популярные решения</h2>
            <a
              href="#all-solutions"
              className="text-body-sm text-primary font-medium hover:underline hidden sm:block"
            >
              Смотреть все
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {popularSolutions.map((solution) => (
              <SolutionCard key={solution.id} solution={solution} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <a
      href={`#category-${category.id}`}
      className="
        group
        bg-white dark:bg-[#1C1C1E]
        rounded-apple-md p-4
        border border-apple-gray5 dark:border-[#3A3A3C]
        hover:border-primary/30
        shadow-apple-sm hover:shadow-apple
        transition-all duration-apple ease-apple
        hover:scale-[1.02]
        active:scale-[0.98]
        cursor-pointer
      "
    >
      <div
        className="
          w-10 h-10
          bg-primary/10 dark:bg-primary/20
          rounded-apple-sm
          flex items-center justify-center
          text-primary
          mb-3
          group-hover:bg-primary group-hover:text-white
          transition-colors duration-apple
        "
      >
        {category.icon}
      </div>

      <h3 className="text-body-sm font-medium text-[#1C1C1E] dark:text-white mb-1 truncate">
        {category.name}
      </h3>

      <p className="text-caption text-gray-500 dark:text-gray-400">
        {category.count} решений
      </p>
    </a>
  );
}

interface SolutionCardProps {
  solution: Solution;
}

function SolutionCard({ solution }: SolutionCardProps) {
  return (
    <div
      className="
        group
        bg-white dark:bg-[#1C1C1E]
        rounded-apple-xl p-5
        border border-apple-gray5 dark:border-[#3A3A3C]
        shadow-apple-sm hover:shadow-apple-md
        transition-all duration-apple ease-apple
        hover:scale-[1.01]
        cursor-pointer
        relative
        flex flex-col
      "
    >
      {/* Popular badge */}
      {solution.popular && (
        <div
          className="
            absolute -top-2 -right-2
            bg-gradient-to-r from-amber-400 to-orange-500
            text-white text-caption-sm font-semibold
            px-3 py-1 rounded-full
            shadow-apple-sm
          "
        >
          Популярное
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-body font-semibold text-[#1C1C1E] dark:text-white mb-1">
            {solution.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-caption font-medium text-[#1C1C1E] dark:text-white">
                {solution.rating}
              </span>
            </div>
            <span className="text-caption text-gray-500 dark:text-gray-400">
              ({solution.reviews} отзывов)
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-body-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
        {solution.description}
      </p>

      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-4">
        {solution.features.map((feature) => (
          <span
            key={feature}
            className="
              inline-flex items-center gap-1
              text-caption text-gray-600 dark:text-gray-400
              bg-apple-gray6 dark:bg-[#2C2C2E]
              px-2 py-1 rounded-md
            "
          >
            <Check className="w-3 h-3 text-green-500" />
            {feature}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-apple-gray5 dark:border-[#3A3A3C]">
        <span className="text-body-sm font-semibold text-[#1C1C1E] dark:text-white">
          {solution.price}
        </span>

        <Button
          variant="ghost"
          size="sm"
          className="text-primary"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Подробнее
        </Button>
      </div>
    </div>
  );
}
