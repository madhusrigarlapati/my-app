"use client";

import { useMemo } from "react";
import Field from "@/components/ui/Field";
import { ResultRow, ResultsPanel } from "@/components/ui/ResultRow";
import ShareLinkButton from "@/components/ShareLinkButton";
import { validateNumber } from "@/lib/validation";
import { useShareableParams } from "@/lib/useShareableParams";

type UnitSystem = "metric" | "imperial";

function bmiCategory(bmi: number) {
  if (bmi <= 0) return "—";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export default function BmiCalculator() {
  const [params, update] = useShareableParams("bmi", {
    unit: "metric",
    heightCm: "170",
    weightKg: "70",
    heightIn: "67",
    weightLb: "154",
  });
  const unit = params.unit as UnitSystem;
  const { heightCm, weightKg, heightIn, weightLb } = params;

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
            onClick={() => update({ unit: option })}
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
              onChange={(v) => update({ heightCm: v })}
              unit="cm"
              min={0}
              error={validateNumber(heightCm, { min: 0 })}
            />
            <Field
              label="Weight"
              value={weightKg}
              onChange={(v) => update({ weightKg: v })}
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
              onChange={(v) => update({ heightIn: v })}
              unit="in"
              min={0}
              error={validateNumber(heightIn, { min: 0 })}
            />
            <Field
              label="Weight"
              value={weightLb}
              onChange={(v) => update({ weightLb: v })}
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
      <ShareLinkButton params={params} />
    </div>
  );
}
