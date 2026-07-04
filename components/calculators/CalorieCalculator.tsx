"use client";

import { useMemo, useState } from "react";
import Field from "@/components/ui/Field";
import { ResultRow, ResultsPanel } from "@/components/ui/ResultRow";

type Gender = "male" | "female";

const ACTIVITY_LEVELS = [
  { label: "Sedentary (little or no exercise)", factor: 1.2 },
  { label: "Light (1-3 days/week)", factor: 1.375 },
  { label: "Moderate (3-5 days/week)", factor: 1.55 },
  { label: "Active (6-7 days/week)", factor: 1.725 },
  { label: "Very active (physical job / 2x/day)", factor: 1.9 },
];

export default function CalorieCalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("30");
  const [heightCm, setHeightCm] = useState("175");
  const [weightKg, setWeightKg] = useState("75");
  const [activityFactor, setActivityFactor] = useState(1.55);

  const { bmr, tdee } = useMemo(() => {
    const a = Number(age) || 0;
    const h = Number(heightCm) || 0;
    const w = Number(weightKg) || 0;

    const base = 10 * w + 6.25 * h - 5 * a;
    const bmrValue = gender === "male" ? base + 5 : base - 161;
    return { bmr: bmrValue, tdee: bmrValue * activityFactor };
  }, [gender, age, heightCm, weightKg, activityFactor]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        {(["male", "female"] as Gender[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setGender(option)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
              gender === option
                ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <Field label="Age" value={age} onChange={setAge} unit="years" min={0} />
        <Field label="Height" value={heightCm} onChange={setHeightCm} unit="cm" min={0} />
        <Field label="Weight" value={weightKg} onChange={setWeightKg} unit="kg" min={0} />
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            Activity level
          </span>
          <select
            value={activityFactor}
            onChange={(e) => setActivityFactor(Number(e.target.value))}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100"
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
    </div>
  );
}
