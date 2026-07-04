import type { PhaseProgress } from "@/lib/roadmap";

export default function PhaseBar({ phase }: { phase: PhaseProgress }) {
  const { title, total, done, inProgress, todo, pct } = phase;
  const donePct = total === 0 ? 0 : (done / total) * 100;
  const inProgressPct = total === 0 ? 0 : (inProgress / total) * 100;
  const todoPct = total === 0 ? 0 : (todo / total) * 100;

  return (
    <div className="progress-viz flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
          {title}
        </span>
        <span
          className="text-sm text-neutral-500 dark:text-neutral-400"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {done}/{total} tasks &middot; {pct}%
        </span>
      </div>
      <div
        className="flex h-3 w-full gap-[2px] overflow-hidden rounded-full bg-[var(--track)]"
        role="img"
        aria-label={`${title}: ${done} done, ${inProgress} in progress, ${todo} to do, out of ${total} tasks`}
      >
        {donePct > 0 && (
          <div
            className="h-full rounded-full bg-[var(--status-good)]"
            style={{ width: `${donePct}%` }}
          />
        )}
        {inProgressPct > 0 && (
          <div
            className="h-full rounded-full bg-[var(--status-warning)]"
            style={{ width: `${inProgressPct}%` }}
          />
        )}
        {todoPct > 0 && (
          <div
            className="h-full rounded-full bg-[var(--status-todo)]"
            style={{ width: `${todoPct}%` }}
          />
        )}
      </div>
    </div>
  );
}
