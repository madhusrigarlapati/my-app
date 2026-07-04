"use client";

import { useMemo } from "react";
import Field from "@/components/ui/Field";
import UnitSystemToggle, { type UnitSystem } from "@/components/ui/UnitSystemToggle";
import { ResultRow, ResultsPanel } from "@/components/ui/ResultRow";
import ShareLinkButton from "@/components/ShareLinkButton";
import { validateNumber } from "@/lib/validation";
import { useShareableParams } from "@/lib/useShareableParams";
import { calculateBmiMetric, calculateBmiImperial, bmiCategory } from "@/lib/calculations/health";

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
      return calculateBmiMetric(Number(heightCm) || 0, Number(weightKg) || 0);
    }
    return calculateBmiImperial(Number(heightIn) || 0, Number(weightLb) || 0);
  }, [unit, heightCm, weightKg, heightIn, weightLb]);

  return (
    <div className="flex flex-col gap-6">
      <UnitSystemToggle value={unit} onChange={(v) => update({ unit: v })} />

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
