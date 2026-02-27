import { Clock, CheckCircle2, XCircle, FileEdit } from 'lucide-react';
import type { ProductStatus } from '../../../types/developer-product';

interface ProductStatusBadgeProps {
    status: ProductStatus;
    size?: 'sm' | 'md';
}

const statusConfig: Record<ProductStatus, {
    label: string;
    icon: React.ReactNode;
    className: string;
}> = {
    draft: {
        label: 'Черновик',
        icon: <FileEdit className="w-3.5 h-3.5" />,
        className: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
    },
    pending: {
        label: 'На проверке',
        icon: <Clock className="w-3.5 h-3.5" />,
        className: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
    },
    approved: {
        label: 'Опубликовано',
        icon: <CheckCircle2 className="w-3.5 h-3.5" />,
        className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
    },
    rejected: {
        label: 'Отклонено',
        icon: <XCircle className="w-3.5 h-3.5" />,
        className: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
    }
};

export function ProductStatusBadge({ status, size = 'md' }: ProductStatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <span className={`
            inline-flex items-center gap-1.5 font-medium rounded-lg
            ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
            ${config.className}
        `}>
            {config.icon}
            {config.label}
        </span>
    );
}
