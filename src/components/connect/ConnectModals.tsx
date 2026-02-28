import { useConnect, type ProductPlan } from '../../context/ConnectContext';
import {
    X,
    LogIn,
    UserPlus,
    Check,
    AlertTriangle,
    ArrowRight,
    Sparkles,
    Shield,
    Clock,
    CreditCard,
    CheckCircle,
    Package
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function ConnectModals() {
    const { modalState } = useConnect();

    if (modalState === 'closed') return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-lg">
                {modalState === 'auth' && <AuthRequiredModal />}
                {modalState === 'switchRole' && <SwitchRoleModal />}
                {modalState === 'selectPlan' && <SelectPlanModal />}
                {modalState === 'confirm' && <ConfirmModal />}
                {modalState === 'success' && <SuccessModal />}
            </div>
        </div>
    );
}

// Auth Required Modal
function AuthRequiredModal() {
    const { currentProduct, closeModal, goToLogin, goToRegister } = useConnect();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                        <Shield className="w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Требуется авторизация</h2>
                        <p className="text-blue-100 text-sm mt-1">
                            Войдите чтобы подключить решение
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {currentProduct && (
                    <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl mb-6">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentProduct.gradient} flex items-center justify-center`}>
                            <span className="text-white font-bold text-lg">
                                {currentProduct.name.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                {currentProduct.name}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {currentProduct.developerName}
                            </p>
                        </div>
                    </div>
                )}

                <p className="text-slate-600 dark:text-slate-300 mb-6">
                    Чтобы подключить решение, войдите в свой аккаунт или создайте новый.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={goToLogin}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/25"
                    >
                        <LogIn className="w-5 h-5" />
                        Войти
                    </button>
                    <button
                        onClick={goToRegister}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                        <UserPlus className="w-5 h-5" />
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </div>
    );
}

// Switch Role Modal (for developers)
function SwitchRoleModal() {
    const { closeModal } = useConnect();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                        <AlertTriangle className="w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Недоступно для разработчиков</h2>
                        <p className="text-amber-100 text-sm mt-1">
                            Переключитесь на кабинет клиента
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                    Вы вошли как разработчик. Чтобы подключать решения, перейдите в кабинет клиента.
                </p>

                <div className="space-y-3">
                    <Link
                        to="/select-dashboard"
                        onClick={closeModal}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/25"
                    >
                        Переключить кабинет
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <button
                        onClick={closeModal}
                        className="w-full px-6 py-3.5 text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
}

// Select Plan Modal
function SelectPlanModal() {
    const { currentProduct, selectPlan, closeModal } = useConnect();

    if (!currentProduct) return null;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-w-2xl mx-auto">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentProduct.gradient} flex items-center justify-center`}>
                            <span className="text-white font-bold text-lg">
                                {currentProduct.name.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                Выберите тариф
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {currentProduct.name}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>
            </div>

            {/* Plans */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
                {currentProduct.plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} onSelect={() => selectPlan(plan)} />
                ))}
            </div>
        </div>
    );
}

// Plan Card Component
function PlanCard({ plan, onSelect }: { plan: ProductPlan; onSelect: () => void }) {
    const periodLabels = {
        'monthly': '/мес',
        'yearly': '/год',
        'one-time': ''
    };

    return (
        <div
            className={`
                relative p-5 rounded-2xl border-2 transition-all cursor-pointer
                ${plan.isPopular
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                    : 'border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500/50'
                }
            `}
            onClick={onSelect}
        >
            {plan.isPopular && (
                <div className="absolute -top-3 left-4 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                    Популярный
                </div>
            )}

            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                {plan.name}
            </h3>

            <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                    {plan.isFree ? 'Бесплатно' : `${plan.price.toLocaleString()} сум`}
                </span>
                {!plan.isFree && (
                    <span className="text-slate-500 dark:text-slate-400">
                        {periodLabels[plan.period]}
                    </span>
                )}
            </div>

            <ul className="space-y-2 mb-4">
                {plan.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                    </li>
                ))}
            </ul>

            <button
                className={`
                    w-full py-2.5 rounded-xl font-medium transition-colors
                    ${plan.isPopular
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200'
                    }
                `}
            >
                {plan.isFree ? 'Начать бесплатно' : 'Выбрать'}
            </button>
        </div>
    );
}

// Confirm Modal
function ConfirmModal() {
    const { currentProduct, selectedPlan, confirmConnect, closeModal, isProcessing } = useConnect();

    if (!currentProduct || !selectedPlan) return null;

    const periodLabels = {
        'monthly': 'в месяц',
        'yearly': 'в год',
        'one-time': 'единоразово'
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className={`relative bg-gradient-to-r ${currentProduct.gradient} p-6 text-white`}>
                <button
                    onClick={closeModal}
                    disabled={isProcessing}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                        <Package className="w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Подтверждение</h2>
                        <p className="text-white/80 text-sm mt-1">
                            Проверьте данные перед подключением
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Product Info */}
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-500 dark:text-slate-400">Продукт</span>
                        <span className="font-medium text-slate-900 dark:text-white">{currentProduct.name}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-500 dark:text-slate-400">Тариф</span>
                        <span className="font-medium text-slate-900 dark:text-white">{selectedPlan.name}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-500 dark:text-slate-400">Период</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                            {selectedPlan.isFree ? 'Бессрочно' : periodLabels[selectedPlan.period]}
                        </span>
                    </div>
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-600 flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Стоимость</span>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">
                            {selectedPlan.isFree ? 'Бесплатно' : `${selectedPlan.price.toLocaleString()} сум`}
                        </span>
                    </div>
                </div>

                {/* Info boxes */}
                <div className="space-y-3 mb-6">
                    {selectedPlan.isFree ? (
                        <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-500/10 rounded-xl">
                            <Sparkles className="w-5 h-5 text-green-500 mt-0.5" />
                            <p className="text-sm text-green-700 dark:text-green-300">
                                Бесплатное решение будет активировано сразу после подтверждения
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
                                <CreditCard className="w-5 h-5 text-blue-500 mt-0.5" />
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    После подтверждения вы будете перенаправлены на страницу оплаты
                                </p>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-500/10 rounded-xl">
                                <Clock className="w-5 h-5 text-amber-500 mt-0.5" />
                                <p className="text-sm text-amber-700 dark:text-amber-300">
                                    Активация произойдёт после подтверждения разработчиком
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 mb-6 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-500 focus:ring-blue-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                        Я соглашаюсь с{' '}
                        <a href="#" className="text-blue-500 hover:underline">условиями использования</a>
                        {' '}и{' '}
                        <a href="#" className="text-blue-500 hover:underline">политикой конфиденциальности</a>
                    </span>
                </label>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={closeModal}
                        disabled={isProcessing}
                        className="flex-1 px-6 py-3.5 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={confirmConnect}
                        disabled={isProcessing}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r ${currentProduct.gradient} text-white font-medium rounded-xl transition-all hover:shadow-lg disabled:opacity-50`}
                    >
                        {isProcessing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Обработка...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Подтвердить
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Success Modal
function SuccessModal() {
    const { currentProduct, selectedPlan, lastOrder, closeModal } = useConnect();

    if (!currentProduct || !selectedPlan || !lastOrder) return null;

    const isFree = selectedPlan.isFree;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-white text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold">
                    {isFree ? 'Решение активировано!' : 'Заявка отправлена!'}
                </h2>
                <p className="text-green-100 mt-2">
                    {isFree
                        ? 'Вы можете начать использовать решение прямо сейчас'
                        : 'Мы уведомим вас об изменении статуса'
                    }
                </p>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Order Info */}
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentProduct.gradient} flex items-center justify-center`}>
                            <span className="text-white font-bold text-lg">
                                {currentProduct.name.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                {currentProduct.name}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {selectedPlan.name}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-600">
                        <span className="text-slate-500 dark:text-slate-400">Статус</span>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                            isFree
                                ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300'
                                : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300'
                        }`}>
                            {isFree ? (
                                <>
                                    <CheckCircle className="w-4 h-4" />
                                    Активно
                                </>
                            ) : (
                                <>
                                    <Clock className="w-4 h-4" />
                                    В обработке
                                </>
                            )}
                        </span>
                    </div>
                </div>

                {!isFree && (
                    <div className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6">
                        Номер заявки: <span className="font-mono font-medium">{lastOrder.id}</span>
                    </div>
                )}

                {/* Actions */}
                <div className="space-y-3">
                    <Link
                        to="/dashboard"
                        onClick={closeModal}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/25"
                    >
                        <Package className="w-5 h-5" />
                        Перейти в мои продукты
                    </Link>
                    <button
                        onClick={closeModal}
                        className="w-full px-6 py-3.5 text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    >
                        Продолжить просмотр
                    </button>
                </div>
            </div>
        </div>
    );
}
