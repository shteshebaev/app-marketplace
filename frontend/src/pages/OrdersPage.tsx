import { useState } from 'react';
import { ShoppingBag, Plus, Filter, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, EmptyState } from '../components/ui';

interface Order {
  id: string;
  title: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  date: string;
  amount: number;
  items: number;
}

// Demo orders data - set to empty array [] to see empty state
const DEMO_ORDERS: Order[] = [
  {
    id: '1',
    title: 'Заказ #12847 - iPhone 15 Pro Max',
    status: 'completed',
    date: '24 февраля 2026',
    amount: 149990,
    items: 1,
  },
  {
    id: '2',
    title: 'Заказ #12846 - MacBook Air M3',
    status: 'processing',
    date: '23 февраля 2026',
    amount: 134990,
    items: 1,
  },
  {
    id: '3',
    title: 'Заказ #12845 - AirPods Pro 2',
    status: 'pending',
    date: '22 февраля 2026',
    amount: 24990,
    items: 2,
  },
  {
    id: '4',
    title: 'Заказ #12844 - Apple Watch Ultra 2',
    status: 'completed',
    date: '20 февраля 2026',
    amount: 79990,
    items: 1,
  },
  {
    id: '5',
    title: 'Заказ #12843 - iPad Pro 12.9"',
    status: 'cancelled',
    date: '18 февраля 2026',
    amount: 109990,
    items: 1,
  },
];

const statusLabels: Record<Order['status'], string> = {
  pending: 'Ожидает',
  processing: 'В обработке',
  completed: 'Завершён',
  cancelled: 'Отменён',
};

const statusStyles: Record<Order['status'], string> = {
  pending: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
  processing: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
  completed: 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400',
  cancelled: 'bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400',
};

export function OrdersPage() {
  const [orders] = useState<Order[]>(DEMO_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((order) =>
    order.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateOrder = () => {
    console.log('Navigate to create order');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Мои заказы</CardTitle>
            <p className="text-body-sm text-text-secondary mt-1">
              Управляйте вашими заказами и отслеживайте статус
            </p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={handleCreateOrder}
          >
            Создать заказ
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {orders.length > 0 ? (
          <>
            {/* Search and filter bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                <input
                  type="text"
                  placeholder="Поиск заказов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-12"
                />
              </div>
              <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>
                Фильтры
              </Button>
            </div>

            {/* Orders list */}
            <div className="space-y-3">
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-body-sm text-text-secondary">
                  По вашему запросу ничего не найдено
                </p>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon={<ShoppingBag className="w-8 h-8" />}
            title="Нет заказов"
            description="У вас пока нет заказов. Создайте первый заказ, чтобы начать работу с маркетплейсом."
            actionLabel="Создать первый заказ"
            onAction={handleCreateOrder}
          />
        )}
      </CardContent>
    </Card>
  );
}

interface OrderCardProps {
  order: Order;
}

function OrderCard({ order }: OrderCardProps) {
  return (
    <div
      className="
        p-4
        bg-apple-gray6/50 dark:bg-[#2C2C2E]/50
        hover:bg-apple-gray6 dark:hover:bg-apple-dark-gray5
        rounded-apple-md
        transition-all duration-apple ease-apple
        cursor-pointer
        hover:scale-[1.01]
        active:scale-[0.99]
      "
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div
            className="
              w-12 h-12
              bg-white dark:bg-[#3A3A3C] rounded-apple
              flex items-center justify-center
              shadow-apple-sm dark:shadow-none
              flex-shrink-0
            "
          >
            <ShoppingBag className="w-5 h-5 text-text-secondary" />
          </div>
          <div className="min-w-0">
            <p className="text-body-sm font-medium text-text-primary truncate">
              {order.title}
            </p>
            <p className="text-caption text-text-secondary">
              {order.items} товаров • {order.date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <span
            className={`
              px-3 py-1
              text-caption font-medium
              rounded-full
              ${statusStyles[order.status]}
            `}
          >
            {statusLabels[order.status]}
          </span>
          <span className="text-body-sm font-semibold text-text-primary hidden sm:block">
            {order.amount.toLocaleString('ru-RU')} ₽
          </span>
        </div>
      </div>
    </div>
  );
}
