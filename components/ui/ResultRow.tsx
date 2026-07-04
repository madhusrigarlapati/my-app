export function ResultsPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
      {children}
    </div>
  );
}

export function ResultRow({
  label,
  value,
  emphasize,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm text-neutral-600 dark:text-neutral-400">
        {label}
      </span>
      <span
        className={
          emphasize
            ? "text-lg font-semibold text-neutral-900 dark:text-neutral-50"
            : "text-base text-neutral-800 dark:text-neutral-200"
        }
      >
        {value}
      </span>
    </div>
  );
}
