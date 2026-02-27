import { useEffect, useState } from 'react';
import { Plus, X, Link2, Server, Shield, Headphones, FileText } from 'lucide-react';
import type { DeveloperProduct } from '../../../../types/developer-product';

interface Step5TechInfoProps {
    data: Partial<DeveloperProduct>;
    onChange: (data: Partial<DeveloperProduct>) => void;
    onValidChange: (isValid: boolean) => void;
}

export function Step5TechInfo({ data, onChange, onValidChange }: Step5TechInfoProps) {
    const [integrations, setIntegrations] = useState<string[]>(data.integrations || []);
    const [integrationInput, setIntegrationInput] = useState('');
    const [apiAvailable, setApiAvailable] = useState(data.apiAvailable || false);
    const [slaLevel, setSlaLevel] = useState(data.slaLevel || '');
    const [supportOptions, setSupportOptions] = useState<string[]>(data.supportOptions || []);
    const [documentationUrl, setDocumentationUrl] = useState(data.documentationUrl || '');

    // This step is optional, so always valid
    useEffect(() => {
        onValidChange(true);
    }, [onValidChange]);

    // Update parent data
    useEffect(() => {
        onChange({
            integrations,
            apiAvailable,
            slaLevel: slaLevel || undefined,
            supportOptions,
            documentationUrl: documentationUrl || undefined,
            techRequirements: [] // Simplified for now
        });
    }, [integrations, apiAvailable, slaLevel, supportOptions, documentationUrl, onChange]);

    const handleAddIntegration = () => {
        if (integrationInput.trim() && !integrations.includes(integrationInput.trim())) {
            setIntegrations([...integrations, integrationInput.trim()]);
            setIntegrationInput('');
        }
    };

    const handleRemoveIntegration = (integration: string) => {
        setIntegrations(integrations.filter(i => i !== integration));
    };

    const toggleSupportOption = (option: string) => {
        if (supportOptions.includes(option)) {
            setSupportOptions(supportOptions.filter(o => o !== option));
        } else {
            setSupportOptions([...supportOptions, option]);
        }
    };

    const supportChoices = [
        { id: 'email', label: 'Email поддержка', icon: <Headphones className="w-4 h-4" /> },
        { id: 'phone', label: 'Телефон', icon: <Headphones className="w-4 h-4" /> },
        { id: 'chat', label: 'Онлайн-чат', icon: <Headphones className="w-4 h-4" /> },
        { id: 'ticket', label: 'Тикет-система', icon: <Headphones className="w-4 h-4" /> },
        { id: 'manager', label: 'Персональный менеджер', icon: <Headphones className="w-4 h-4" /> }
    ];

    const slaOptions = [
        { value: '', label: 'Не указан' },
        { value: '99.9%', label: '99.9% uptime' },
        { value: '99.5%', label: '99.5% uptime' },
        { value: '99%', label: '99% uptime' },
        { value: 'custom', label: 'По договору' }
    ];

    const popularIntegrations = [
        '1С:Предприятие', 'Битрикс24', 'amoCRM', 'Telegram',
        'WhatsApp', 'Slack', 'Jira', 'PostgreSQL',
        'MySQL', 'MongoDB', 'Redis', 'Elasticsearch'
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 lg:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                Техническая информация
            </h2>

            <div className="space-y-8">
                {/* Integrations */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                        <Link2 className="w-4 h-4" />
                        Интеграции
                    </label>

                    {/* Selected integrations */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {integrations.map(integration => (
                            <span
                                key={integration}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm"
                            >
                                {integration}
                                <button onClick={() => handleRemoveIntegration(integration)}>
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        ))}
                    </div>

                    {/* Add integration */}
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={integrationInput}
                            onChange={(e) => setIntegrationInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddIntegration())}
                            placeholder="Добавить интеграцию"
                            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleAddIntegration}
                            disabled={!integrationInput.trim()}
                            className="px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Popular integrations */}
                    <div>
                        <p className="text-xs text-slate-400 mb-2">Популярные:</p>
                        <div className="flex flex-wrap gap-2">
                            {popularIntegrations
                                .filter(i => !integrations.includes(i))
                                .slice(0, 8)
                                .map(integration => (
                                    <button
                                        key={integration}
                                        onClick={() => setIntegrations([...integrations, integration])}
                                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                    >
                                        + {integration}
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>

                {/* API */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                        <Server className="w-4 h-4" />
                        API
                    </label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={apiAvailable}
                                onChange={(e) => setApiAvailable(e.target.checked)}
                                className="w-5 h-5 rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                            />
                            <span className="text-slate-700 dark:text-slate-300">API доступен</span>
                        </label>
                    </div>
                    {apiAvailable && (
                        <div className="mt-4">
                            <input
                                type="url"
                                value={documentationUrl}
                                onChange={(e) => setDocumentationUrl(e.target.value)}
                                placeholder="Ссылка на документацию API"
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}
                </div>

                {/* SLA */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        SLA (уровень обслуживания)
                    </label>
                    <select
                        value={slaLevel}
                        onChange={(e) => setSlaLevel(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                        {slaOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Support Options */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                        <Headphones className="w-4 h-4" />
                        Варианты поддержки
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {supportChoices.map(option => (
                            <label
                                key={option.id}
                                className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                                    supportOptions.includes(option.id)
                                        ? 'bg-blue-50 dark:bg-blue-500/20 border-2 border-blue-500'
                                        : 'bg-slate-50 dark:bg-slate-700 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={supportOptions.includes(option.id)}
                                    onChange={() => toggleSupportOption(option.id)}
                                    className="hidden"
                                />
                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                                    supportOptions.includes(option.id)
                                        ? 'bg-blue-500 border-blue-500 text-white'
                                        : 'border-slate-300 dark:border-slate-500'
                                }`}>
                                    {supportOptions.includes(option.id) && (
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-slate-700 dark:text-slate-300">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Documentation Link */}
                {!apiAvailable && (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Документация
                        </label>
                        <input
                            type="url"
                            value={documentationUrl}
                            onChange={(e) => setDocumentationUrl(e.target.value)}
                            placeholder="Ссылка на документацию продукта"
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
