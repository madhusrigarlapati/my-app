"use client";

import { useMemo, useState } from "react";
import Field from "@/components/ui/Field";
import { ResultRow, ResultsPanel } from "@/components/ui/ResultRow";
import { validateNumber } from "@/lib/validation";

function formatNumber(n: number) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export default function PercentageCalculator() {
  const [percent, setPercent] = useState("15");
  const [ofValue, setOfValue] = useState("200");

  const [partValue, setPartValue] = useState("30");
  const [wholeValue, setWholeValue] = useState("200");

  const [fromValue, setFromValue] = useState("200");
  const [toValue, setToValue] = useState("250");

  const percentOf = useMemo(
    () => ((Number(percent) || 0) / 100) * (Number(ofValue) || 0),
    [percent, ofValue]
  );

  const partOfWhole = useMemo(() => {
    const whole = Number(wholeValue) || 0;
    if (whole === 0) return 0;
    return ((Number(partValue) || 0) / whole) * 100;
  }, [partValue, wholeValue]);

  const percentChange = useMemo(() => {
    const from = Number(fromValue) || 0;
    if (from === 0) return 0;
    return ((Number(toValue) - from) / Math.abs(from)) * 100;
  }, [fromValue, toValue]);

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          What is X% of Y?
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Percent"
            value={percent}
            onChange={setPercent}
            unit="%"
            error={validateNumber(percent)}
          />
          <Field
            label="Of value"
            value={ofValue}
            onChange={setOfValue}
            error={validateNumber(ofValue)}
          />
        </div>
        <ResultsPanel>
          <ResultRow label="Result" value={formatNumber(percentOf)} emphasize />
        </ResultsPanel>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          X is what percent of Y?
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Part"
            value={partValue}
            onChange={setPartValue}
            error={validateNumber(partValue)}
          />
          <Field
            label="Whole"
            value={wholeValue}
            onChange={setWholeValue}
            error={validateNumber(wholeValue)}
          />
        </div>
        <ResultsPanel>
          <ResultRow
            label="Result"
            value={`${formatNumber(partOfWhole)}%`}
            emphasize
          />
        </ResultsPanel>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Percentage change from X to Y
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="From"
            value={fromValue}
            onChange={setFromValue}
            error={validateNumber(fromValue)}
          />
          <Field
            label="To"
            value={toValue}
            onChange={setToValue}
            error={validateNumber(toValue)}
          />
        </div>
        <ResultsPanel>
          <ResultRow
            label={percentChange >= 0 ? "Increase" : "Decrease"}
            value={`${formatNumber(Math.abs(percentChange))}%`}
            emphasize
          />
        </ResultsPanel>
      </section>
    </div>
  );
}
