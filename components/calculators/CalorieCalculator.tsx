"use client";

import { useMemo } from "react";
import Field from "@/components/ui/Field";
import UnitSystemToggle, { type UnitSystem } from "@/components/ui/UnitSystemToggle";
import { ResultRow, ResultsPanel } from "@/components/ui/ResultRow";
import ShareLinkButton from "@/components/ShareLinkButton";
import { validateNumber } from "@/lib/validation";
import { useShareableParams } from "@/lib/useShareableParams";
import { calculateBmrTdee } from "@/lib/calculations/health";
import { convertLength, convertWeight } from "@/lib/calculations/math";

type Gender = "male" | "female";

const ACTIVITY_LEVELS = [
  { label: "Sedentary (little or no exercise)", factor: 1.2 },
  { label: "Light (1-3 days/week)", factor: 1.375 },
  { label: "Moderate (3-5 days/week)", factor: 1.55 },
  { label: "Active (6-7 days/week)", factor: 1.725 },
  { label: "Very active (physical job / 2x/day)", factor: 1.9 },
];

export default function CalorieCalculator() {
  const [params, update] = useShareableParams("calorie", {
    gender: "male",
    unit: "metric",
    age: "30",
    heightCm: "175",
    weightKg: "75",
    heightIn: "69",
    weightLb: "165",
    activityFactor: "1.55",
  });
  const gender = params.gender as Gender;
  const unit = params.unit as UnitSystem;
  const { age, heightCm, weightKg, heightIn, weightLb, activityFactor } = params;

  const { bmr, tdee } = useMemo(() => {
    const heightCmValue =
      unit === "metric"
        ? Number(heightCm) || 0
        : convertLength(Number(heightIn) || 0, "inch", "centimeter");
    const weightKgValue =
      unit === "metric"
        ? Number(weightKg) || 0
        : convertWeight(Number(weightLb) || 0, "pound", "kilogram");

    return calculateBmrTdee({
      gender,
      age: Number(age) || 0,
      heightCm: heightCmValue,
      weightKg: weightKgValue,
      activityFactor: Number(activityFactor) || 1,
    });
  }, [gender, unit, age, heightCm, weightKg, heightIn, weightLb, activityFactor]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        {(["male", "female"] as Gender[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => update({ gender: option })}
            aria-pressed={gender === option}
            className={`rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-100 ${
              gender === option
                ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <UnitSystemToggle value={unit} onChange={(v) => update({ unit: v })} />

      <div className="flex flex-col gap-4">
        <Field
          label="Age"
          value={age}
          onChange={(v) => update({ age: v })}
          unit="years"
          min={0}
          error={validateNumber(age, { min: 0 })}
        />
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
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            Activity level
          </span>
          <select
            value={activityFactor}
            onChange={(e) => update({ activityFactor: e.target.value })}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base text-neutral-900 outline-none focus:border-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100 dark:focus-visible:ring-neutral-100"
          >
            {ACTIVITY_LEVELS.map((level) => (
              <option key={level.label} value={level.factor}>
                {level.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ResultsPanel>
        <ResultRow label="BMR" value={`${Math.round(bmr)} kcal/day`} />
        <ResultRow
          label="Daily calories (TDEE)"
          value={`${Math.round(tdee)} kcal/day`}
          emphasize
        />
      </ResultsPanel>
      <ShareLinkButton params={params} />
    </div>
  );
}
