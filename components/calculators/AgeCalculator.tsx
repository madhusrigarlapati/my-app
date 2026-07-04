"use client";

import { useMemo } from "react";
import { ResultRow, ResultsPanel } from "@/components/ui/ResultRow";
import ShareLinkButton from "@/components/ShareLinkButton";
import { useShareableParams } from "@/lib/useShareableParams";
import { calculateDateDiff } from "@/lib/calculations/everyday";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export default function AgeCalculator() {
  const [params, update] = useShareableParams("age", {
    startDate: "2000-01-01",
    endDate: todayIso(),
  });
  const { startDate, endDate } = params;

  const result = useMemo(
    () => calculateDateDiff(startDate, endDate),
    [startDate, endDate]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            From date
          </span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => update({ startDate: e.target.value })}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base text-neutral-900 outline-none focus:border-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100 dark:focus-visible:ring-neutral-100"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            To date
          </span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => update({ endDate: e.target.value })}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base text-neutral-900 outline-none focus:border-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100 dark:focus-visible:ring-neutral-100"
          />
        </label>
      </div>

      <ResultsPanel>
        {result ? (
          <>
            <ResultRow
              label="Difference"
              value={`${result.years}y ${result.months}m ${result.days}d`}
              emphasize
            />
            <ResultRow label="Total days" value={result.totalDays.toLocaleString()} />
          </>
        ) : (
          <ResultRow label="Difference" value="Enter valid dates" />
        )}
      </ResultsPanel>
      <ShareLinkButton params={params} />
    </div>
  );
}
