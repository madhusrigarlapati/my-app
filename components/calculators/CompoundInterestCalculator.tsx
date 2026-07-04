"use client";

import { useMemo, useState } from "react";
import Field from "@/components/ui/Field";
import { ResultRow, ResultsPanel } from "@/components/ui/ResultRow";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const FREQUENCIES = [
  { label: "Annually", value: 1 },
  { label: "Quarterly", value: 4 },
  { label: "Monthly", value: 12 },
  { label: "Daily", value: 365 },
];

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("6");
  const [years, setYears] = useState("10");
  const [frequency, setFrequency] = useState(12);

  const { futureValue, totalInterest } = useMemo(() => {
    const p = Number(principal) || 0;
    const r = (Number(rate) || 0) / 100;
    const t = Number(years) || 0;
    const n = frequency;

    const fv = p * Math.pow(1 + r / n, n * t);
    return { futureValue: fv, totalInterest: fv - p };
  }, [principal, rate, years, frequency]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Field
          label="Principal"
          value={principal}
          onChange={setPrincipal}
          unit="$"
          min={0}
        />
        <Field
          label="Annual interest rate"
          value={rate}
          onChange={setRate}
          unit="%"
          step={0.01}
          min={0}
        />
        <Field label="Time" value={years} onChange={setYears} unit="years" min={0} />
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            Compounding frequency
          </span>
          <select
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100"
          >
            {FREQUENCIES.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <ResultsPanel>
        <ResultRow
          label="Future value"
          value={currency.format(futureValue)}
          emphasize
        />
        <ResultRow label="Interest earned" value={currency.format(totalInterest)} />
      </ResultsPanel>
    </div>
  );
}
