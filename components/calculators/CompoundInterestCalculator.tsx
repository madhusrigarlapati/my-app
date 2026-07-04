"use client";

import { useMemo } from "react";
import Field from "@/components/ui/Field";
import { ResultRow, ResultsPanel } from "@/components/ui/ResultRow";
import ShareLinkButton from "@/components/ShareLinkButton";
import { validateNumber } from "@/lib/validation";
import { useShareableParams } from "@/lib/useShareableParams";
import { calculateCompoundInterest } from "@/lib/calculations/finance";

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
  const [params, update] = useShareableParams("compound-interest", {
    principal: "10000",
    rate: "6",
    years: "10",
    frequency: "12",
  });
  const { principal, rate, years, frequency } = params;

  const { futureValue, totalInterest } = useMemo(
    () =>
      calculateCompoundInterest(
        Number(principal) || 0,
        Number(rate) || 0,
        Number(years) || 0,
        Number(frequency) || 1
      ),
    [principal, rate, years, frequency]
  );

  const principalError = validateNumber(principal, { min: 0 });
  const rateError = validateNumber(rate, { min: 0 });
  const yearsError = validateNumber(years, { min: 0 });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Field
          label="Principal"
          value={principal}
          onChange={(v) => update({ principal: v })}
          unit="$"
          min={0}
          error={principalError}
        />
        <Field
          label="Annual interest rate"
          value={rate}
          onChange={(v) => update({ rate: v })}
          unit="%"
          step={0.01}
          min={0}
          error={rateError}
        />
        <Field
          label="Time"
          value={years}
          onChange={(v) => update({ years: v })}
          unit="years"
          min={0}
          error={yearsError}
        />
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            Compounding frequency
          </span>
          <select
            value={frequency}
            onChange={(e) => update({ frequency: e.target.value })}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base text-neutral-900 outline-none focus:border-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100 dark:focus-visible:ring-neutral-100"
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
      <ShareLinkButton params={params} />
    </div>
  );
}
