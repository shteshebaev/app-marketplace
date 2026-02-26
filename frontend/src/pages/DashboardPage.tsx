import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  DollarSign,
  Users,
  Package,
  ArrowRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../components/ui';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <Card padding="md" className="hover:shadow-apple-lg dark:hover:shadow-apple-dark-lg transition-shadow duration-apple">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-caption text-text-secondary mb-1">{title}</p>
          <p className="text-h1 text-text-primary">{value}</p>
          <div className="flex items-center gap-1 mt-2">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span
              className={`text-caption font-medium ${
                isPositive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {isPositive ? '+' : ''}{change}%
            </span>
            <span className="text-caption text-text-tertiary">vs прошлый месяц</span>
          </div>
        </div>
        <div
          className="
            w-12 h-12
            bg-primary/10 dark:bg-primary/20 rounded-apple
            flex items-center justify-center
            text-primary
          "
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}

interface RecentOrderProps {
  id: string;
  customer: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed';
  time: string;
}

const statusStyles = {
  pending: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
  processing: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
  completed: 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400',
};

const statusLabels = {
  pending: 'Ожидает',
  processing: 'В обработке',
  completed: 'Завершён',
};

function RecentOrderItem({ customer, amount, status, time }: RecentOrderProps) {
  return (
    <div
      className="
        flex items-center justify-between py-4
        border-b border-apple-gray5 dark:border-[#3A3A3C] last:border-0
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            w-10 h-10
            bg-apple-gray6 dark:bg-[#2C2C2E] rounded-full
            flex items-center justify-center
            text-text-secondary
          "
        >
          <ShoppingBag className="w-4 h-4" />
        </div>
        <div>
          <p className="text-body-sm font-medium text-text-primary">{customer}</p>
          <p className="text-caption text-text-secondary">{time}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span
          className={`
            px-2.5 py-1 text-caption font-medium rounded-full
            ${statusStyles[status]}
          `}
        >
          {statusLabels[status]}
        </span>
        <span className="text-body-sm font-semibold text-text-primary">
          {amount.toLocaleString('ru-RU')} ₽
        </span>
      </div>
    </div>
  );
}

const recentOrders: RecentOrderProps[] = [
  { id: '1', customer: 'Иван Петров', amount: 12500, status: 'completed', time: '2 часа назад' },
  { id: '2', customer: 'Мария Сидорова', amount: 8900, status: 'processing', time: '4 часа назад' },
  { id: '3', customer: 'Алексей Козлов', amount: 25000, status: 'pending', time: '5 часов назад' },
  { id: '4', customer: 'Елена Новикова', amount: 4500, status: 'completed', time: 'Вчера' },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-h1 text-text-primary">Добрый день, Александр</h1>
          <p className="text-body-sm text-text-secondary mt-1">
            Вот краткий обзор вашего бизнеса
          </p>
        </div>
        <Button variant="primary">
          Смотреть аналитику
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Выручка"
          value="₽ 284,500"
          change={12.5}
          icon={<DollarSign className="w-6 h-6" />}
        />
        <StatCard
          title="Заказы"
          value="156"
          change={8.2}
          icon={<ShoppingBag className="w-6 h-6" />}
        />
        <StatCard
          title="Клиенты"
          value="1,240"
          change={-2.4}
          icon={<Users className="w-6 h-6" />}
        />
        <StatCard
          title="Товары"
          value="89"
          change={5.1}
          icon={<Package className="w-6 h-6" />}
        />
      </div>

      {/* Two columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <Card padding="none" className="lg:col-span-2">
          <CardHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle>Последние заказы</CardTitle>
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Все заказы
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {recentOrders.map((order) => (
              <RecentOrderItem key={order.id} {...order} />
            ))}
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <QuickActionButton
              icon={<Package className="w-5 h-5" />}
              label="Добавить товар"
              description="Создать новый товар в каталоге"
            />
            <QuickActionButton
              icon={<ShoppingBag className="w-5 h-5" />}
              label="Создать заказ"
              description="Оформить заказ вручную"
            />
            <QuickActionButton
              icon={<Users className="w-5 h-5" />}
              label="Пригласить клиента"
              description="Отправить приглашение"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
}

function QuickActionButton({ icon, label, description }: QuickActionButtonProps) {
  return (
    <button
      className="
        w-full p-4
        bg-apple-gray6/50 dark:bg-[#2C2C2E]/50
        hover:bg-apple-gray6 dark:hover:bg-apple-dark-gray5
        rounded-apple-md
        text-left
        transition-all duration-apple ease-apple
        hover:scale-[1.02]
        active:scale-[0.98]
        group
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            w-10 h-10
            bg-white dark:bg-[#3A3A3C] rounded-apple
            flex items-center justify-center
            text-primary
            shadow-apple-sm dark:shadow-none
            group-hover:shadow-apple dark:group-hover:shadow-none
            transition-shadow duration-apple
          "
        >
          {icon}
        </div>
        <div>
          <p className="text-body-sm font-medium text-text-primary">{label}</p>
          <p className="text-caption text-text-secondary">{description}</p>
        </div>
      </div>
    </button>
  );
}
