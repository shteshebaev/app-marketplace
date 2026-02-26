export function CategorySkeleton() {
    return (
        <div className="relative overflow-hidden rounded-[24px] bg-slate-100 dark:bg-slate-800 p-6 min-h-[200px] animate-pulse">
            {/* Icon placeholder */}
            <div className="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-slate-700 mb-4" />

            {/* Title placeholder */}
            <div className="h-6 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-700 mb-2" />

            {/* Description placeholder */}
            <div className="h-4 w-full rounded-lg bg-slate-200 dark:bg-slate-700 mb-4" />

            {/* Footer placeholder */}
            <div className="flex items-center justify-between mt-auto">
                <div className="h-4 w-20 rounded-lg bg-slate-200 dark:bg-slate-700" />
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
    );
}

export function CategoryListSkeleton() {
    return (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse">
            {/* Icon placeholder */}
            <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 flex-shrink-0" />

            {/* Content placeholder */}
            <div className="flex-1 min-w-0">
                <div className="h-5 w-32 rounded-lg bg-slate-200 dark:bg-slate-700 mb-2" />
                <div className="h-4 w-48 rounded-lg bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* Count placeholder */}
            <div className="hidden sm:block h-4 w-20 rounded-lg bg-slate-200 dark:bg-slate-700" />

            {/* Arrow placeholder */}
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0" />
        </div>
    );
}
