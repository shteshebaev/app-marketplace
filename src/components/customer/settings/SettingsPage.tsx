import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    User,
    Shield,
    Bell,
    CreditCard,
    Key,
    Trash2
} from 'lucide-react';
import { ProfileSettings } from './ProfileSettings';
import { SecuritySettings } from './SecuritySettings';
import { NotificationSettings } from './NotificationSettings';
import { BillingSettings } from './BillingSettings';
import { IntegrationsSettings } from './IntegrationsSettings';
import { DangerZone } from './DangerZone';

type SettingsTab = 'profile' | 'security' | 'notifications' | 'billing' | 'integrations' | 'danger';

interface TabItem {
    id: SettingsTab;
    labelKey: string;
    icon: React.ReactNode;
    danger?: boolean;
}

const tabsConfig: TabItem[] = [
    { id: 'profile', labelKey: 'settings.profile', icon: <User className="w-5 h-5" /> },
    { id: 'security', labelKey: 'settings.security', icon: <Shield className="w-5 h-5" /> },
    { id: 'notifications', labelKey: 'settings.notificationsTab', icon: <Bell className="w-5 h-5" /> },
    { id: 'billing', labelKey: 'settings.billing', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'integrations', labelKey: 'settings.integrations', icon: <Key className="w-5 h-5" /> },
    { id: 'danger', labelKey: 'settings.dangerZone', icon: <Trash2 className="w-5 h-5" />, danger: true }
];

export function SettingsPage() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileSettings />;
            case 'security':
                return <SecuritySettings />;
            case 'notifications':
                return <NotificationSettings />;
            case 'billing':
                return <BillingSettings />;
            case 'integrations':
                return <IntegrationsSettings />;
            case 'danger':
                return <DangerZone />;
            default:
                return <ProfileSettings />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {t('settings.title')}
                </h1>
                <p className="mt-1 text-slate-500 dark:text-slate-400">
                    {t('settings.subtitle')}
                </p>
            </div>

            {/* Settings Layout */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Tabs Navigation */}
                <nav className="lg:w-64 flex-shrink-0">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-sm border border-slate-200 dark:border-slate-700">
                        {/* Mobile: Horizontal scroll */}
                        <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-2 px-2 lg:mx-0 lg:px-0">
                            {tabsConfig.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                                        whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink
                                        ${activeTab === tab.id
                                            ? tab.danger
                                                ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                                : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                            : tab.danger
                                                ? 'text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10'
                                                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                                        }
                                    `}
                                >
                                    {tab.icon}
                                    <span className="font-medium">{t(tab.labelKey)}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
