import { useState } from 'react';
import {
    CreditCard,
    Plus,
    Download,
    Calendar,
    Trash2,
    CheckCircle,
    Clock,
    FileText
} from 'lucide-react';

interface PaymentMethod {
    id: string;
    type: 'visa' | 'mastercard' | 'uzcard' | 'humo';
    last4: string;
    expiryDate: string;
    isDefault: boolean;
}

interface PaymentHistory {
    id: string;
    date: string;
    description: string;
    amount: string;
    status: 'paid' | 'pending' | 'failed';
    invoiceId: string;
}

const mockPaymentMethods: PaymentMethod[] = [
    {
        id: '1',
        type: 'visa',
        last4: '4242',
        expiryDate: '12/25',
        isDefault: true
    },
    {
        id: '2',
        type: 'uzcard',
        last4: '8600',
        expiryDate: '08/26',
        isDefault: false
    }
];

const mockPaymentHistory: PaymentHistory[] = [
    {
        id: '1',
        date: '15 февраля 2024',
        description: '1С:Бухгалтерия - Профессиональный',
        amount: '450 000 сум',
        status: 'paid',
        invoiceId: 'INV-2024-001'
    },
    {
        id: '2',
        date: '15 января 2024',
        description: 'Email Marketing Pro - Бизнес',
        amount: '280 000 сум',
        status: 'paid',
        invoiceId: 'INV-2024-002'
    },
    {
        id: '3',
        date: '10 января 2024',
        description: 'CRM System - Стартап',
        amount: '320 000 сум',
        status: 'pending',
        invoiceId: 'INV-2024-003'
    }
];

export function BillingSettings() {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
    const [showAddCard, setShowAddCard] = useState(false);

    const getCardLogo = (type: string) => {
        switch (type) {
            case 'visa':
                return (
                    <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                    </div>
                );
            case 'mastercard':
                return (
                    <div className="w-10 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                        MC
                    </div>
                );
            case 'uzcard':
                return (
                    <div className="w-10 h-6 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        UZ
                    </div>
                );
            case 'humo':
                return (
                    <div className="w-10 h-6 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        HUMO
                    </div>
                );
            default:
                return <CreditCard className="w-6 h-6 text-slate-400" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Оплачено
                    </span>
                );
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400">
                        <Clock className="w-3.5 h-3.5" />
                        Ожидает
                    </span>
                );
            case 'failed':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400">
                        Ошибка
                    </span>
                );
            default:
                return null;
        }
    };

    const handleSetDefault = (id: string) => {
        setPaymentMethods(prev =>
            prev.map(pm => ({ ...pm, isDefault: pm.id === id }))
        );
    };

    const handleDelete = (id: string) => {
        setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
    };

    return (
        <div className="space-y-6">
            {/* Next Payment */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-blue-100 text-sm">Следующий платёж</p>
                        <p className="text-3xl font-bold mt-1">450 000 сум</p>
                        <p className="text-blue-100 mt-2 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            25 февраля 2024
                        </p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <CreditCard className="w-8 h-8" />
                    </div>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                Способы оплаты
                            </h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Управление привязанными картами
                            </p>
                        </div>
                        <button
                            onClick={() => setShowAddCard(true)}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/25"
                        >
                            <Plus className="w-4 h-4" />
                            Добавить карту
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {paymentMethods.map((method) => (
                        <div key={method.id} className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {getCardLogo(method.type)}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-slate-900 dark:text-white">
                                            •••• {method.last4}
                                        </span>
                                        {method.isDefault && (
                                            <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full">
                                                Основная
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Истекает {method.expiryDate}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {!method.isDefault && (
                                    <button
                                        onClick={() => handleSetDefault(method.id)}
                                        className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                    >
                                        Сделать основной
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(method.id)}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {paymentMethods.length === 0 && (
                    <div className="p-8 text-center">
                        <CreditCard className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-500 dark:text-slate-400">
                            Нет привязанных карт
                        </p>
                    </div>
                )}
            </div>

            {/* Payment History */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                        История платежей
                    </h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Все ваши транзакции
                    </p>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {mockPaymentHistory.map((payment) => (
                        <div key={payment.id} className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">
                                        {payment.description}
                                    </p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {payment.date} • {payment.invoiceId}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="font-semibold text-slate-900 dark:text-white">
                                        {payment.amount}
                                    </p>
                                    {getStatusBadge(payment.status)}
                                </div>
                                <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Card Modal */}
            {showAddCard && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                            Добавить карту
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Номер карты
                                </label>
                                <input
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Срок действия
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        CVV
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="•••"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Имя владельца
                                </label>
                                <input
                                    type="text"
                                    placeholder="IVAN IVANOV"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowAddCard(false)}
                                className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={() => setShowAddCard(false)}
                                className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/25"
                            >
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
