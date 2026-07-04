"use client";

import { useMemo, useState } from "react";
import { ResultRow, ResultsPanel } from "@/components/ui/ResultRow";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function diffYmd(start: Date, end: Date) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

export default function AgeCalculator() {
  const [startDate, setStartDate] = useState("2000-01-01");
  const [endDate, setEndDate] = useState(todayIso());

  const result = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return null;
    }

    const [from, to] = start <= end ? [start, end] : [end, start];
    const { years, months, days } = diffYmd(from, to);
    const totalDays = Math.round(
      (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
    );

    return { years, months, days, totalDays };
  }, [startDate, endDate]);

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
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            To date
          </span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100"
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
    </div>
  );
}
