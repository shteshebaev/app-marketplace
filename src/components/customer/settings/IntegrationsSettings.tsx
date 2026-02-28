import { useState } from 'react';
import { Key, Copy, Eye, EyeOff, Plus, Trash2, Check, AlertCircle } from 'lucide-react';

interface ApiKey {
    id: string;
    name: string;
    key: string;
    createdAt: string;
    lastUsed: string | null;
}

const mockApiKeys: ApiKey[] = [
    {
        id: '1',
        name: 'Production API',
        key: 'mk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        createdAt: '10 янв 2024',
        lastUsed: '2 часа назад'
    },
    {
        id: '2',
        name: 'Development API',
        key: 'mk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        createdAt: '5 дек 2023',
        lastUsed: '3 дня назад'
    }
];

export function IntegrationsSettings() {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newKeyName, setNewKeyName] = useState('');
    const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const toggleKeyVisibility = (id: string) => {
        setVisibleKeys(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const copyToClipboard = async (key: string, id: string) => {
        await navigator.clipboard.writeText(key);
        setCopiedKey(id);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const handleCreateKey = () => {
        if (!newKeyName.trim()) return;

        const newKey: ApiKey = {
            id: Date.now().toString(),
            name: newKeyName,
            key: `mk_live_${Math.random().toString(36).substring(2, 34)}`,
            createdAt: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }),
            lastUsed: null
        };

        setApiKeys(prev => [...prev, newKey]);
        setNewKeyName('');
        setShowCreateModal(false);
    };

    const handleDeleteKey = (id: string) => {
        setApiKeys(prev => prev.filter(k => k.id !== id));
    };

    const maskKey = (key: string) => {
        return key.substring(0, 10) + '••••••••••••••••••••';
    };

    return (
        <div className="space-y-6">
            {/* Info Banner */}
            <div className="bg-blue-50 dark:bg-blue-500/10 rounded-2xl p-6 border border-blue-200 dark:border-blue-500/20">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Key className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                            API интеграция
                        </h3>
                        <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                            Используйте API ключи для интеграции наших решений с вашими системами.
                            Храните ключи в безопасности и никогда не публикуйте их в открытом коде.
                        </p>
                    </div>
                </div>
            </div>

            {/* API Keys */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                API ключи
                            </h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Управление ключами доступа к API
                            </p>
                        </div>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/25"
                        >
                            <Plus className="w-4 h-4" />
                            Создать ключ
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {apiKeys.map((apiKey) => (
                        <div key={apiKey.id} className="p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-slate-900 dark:text-white">
                                        {apiKey.name}
                                    </h3>
                                    <div className="mt-2 flex items-center gap-2">
                                        <code className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-sm font-mono text-slate-700 dark:text-slate-300 truncate">
                                            {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                                        </code>
                                        <button
                                            onClick={() => toggleKeyVisibility(apiKey.id)}
                                            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                        >
                                            {visibleKeys.has(apiKey.id) ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                                            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                        >
                                            {copiedKey === apiKey.id ? (
                                                <Check className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="mt-2 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                        <span>Создан: {apiKey.createdAt}</span>
                                        {apiKey.lastUsed && (
                                            <span>Последнее использование: {apiKey.lastUsed}</span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeleteKey(apiKey.id)}
                                    className="ml-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {apiKeys.length === 0 && (
                    <div className="p-8 text-center">
                        <Key className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-500 dark:text-slate-400">
                            Нет созданных API ключей
                        </p>
                    </div>
                )}
            </div>

            {/* Security Warning */}
            <div className="bg-amber-50 dark:bg-amber-500/10 rounded-2xl p-6 border border-amber-200 dark:border-amber-500/20">
                <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-amber-800 dark:text-amber-300">
                            Важно
                        </h3>
                        <ul className="mt-2 space-y-1 text-sm text-amber-700 dark:text-amber-400">
                            <li>• Никогда не делитесь своими API ключами</li>
                            <li>• Не храните ключи в публичных репозиториях</li>
                            <li>• Используйте разные ключи для разных сред</li>
                            <li>• Регулярно обновляйте ключи</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Create Key Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                            Создать API ключ
                        </h3>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Название ключа
                            </label>
                            <input
                                type="text"
                                value={newKeyName}
                                onChange={(e) => setNewKeyName(e.target.value)}
                                placeholder="Например: Production API"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setNewKeyName('');
                                }}
                                className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={handleCreateKey}
                                disabled={!newKeyName.trim()}
                                className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Создать
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
