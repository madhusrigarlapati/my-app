"use client";

import { useMemo, useState } from "react";
import Field from "@/components/ui/Field";
import { ResultRow, ResultsPanel } from "@/components/ui/ResultRow";
import { validateNumber } from "@/lib/validation";

type UnitSystem = "metric" | "imperial";

function bmiCategory(bmi: number) {
  if (bmi <= 0) return "—";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export default function BmiCalculator() {
  const [unit, setUnit] = useState<UnitSystem>("metric");
  const [heightCm, setHeightCm] = useState("170");
  const [weightKg, setWeightKg] = useState("70");
  const [heightIn, setHeightIn] = useState("67");
  const [weightLb, setWeightLb] = useState("154");

  const bmi = useMemo(() => {
    if (unit === "metric") {
      const h = (Number(heightCm) || 0) / 100;
      const w = Number(weightKg) || 0;
      if (h <= 0) return 0;
      return w / (h * h);
    }
    const h = Number(heightIn) || 0;
    const w = Number(weightLb) || 0;
    if (h <= 0) return 0;
    return (703 * w) / (h * h);
  }, [unit, heightCm, weightKg, heightIn, weightLb]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        {(["metric", "imperial"] as UnitSystem[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setUnit(option)}
            aria-pressed={unit === option}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-100 ${
              unit === option
                ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
            }`}
          >
            {option === "metric" ? "Metric (cm / kg)" : "Imperial (in / lb)"}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {unit === "metric" ? (
          <>
            <Field
              label="Height"
              value={heightCm}
              onChange={setHeightCm}
              unit="cm"
              min={0}
              error={validateNumber(heightCm, { min: 0 })}
            />
            <Field
              label="Weight"
              value={weightKg}
              onChange={setWeightKg}
              unit="kg"
              min={0}
              error={validateNumber(weightKg, { min: 0 })}
            />
          </>
        ) : (
          <>
            <Field
              label="Height"
              value={heightIn}
              onChange={setHeightIn}
              unit="in"
              min={0}
              error={validateNumber(heightIn, { min: 0 })}
            />
            <Field
              label="Weight"
              value={weightLb}
              onChange={setWeightLb}
              unit="lb"
              min={0}
              error={validateNumber(weightLb, { min: 0 })}
            />
          </>
        )}
      </div>

      <ResultsPanel>
        <ResultRow label="BMI" value={bmi > 0 ? bmi.toFixed(1) : "—"} emphasize />
        <ResultRow label="Category" value={bmiCategory(bmi)} />
      </ResultsPanel>
    </div>
  );
}
