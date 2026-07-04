"use client";

import { useMemo, useState } from "react";
import Field from "@/components/ui/Field";
import { ResultRow, ResultsPanel } from "@/components/ui/ResultRow";
import { validateNumber } from "@/lib/validation";

type Category = "length" | "weight" | "temperature";

const LENGTH_UNITS = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  mile: 1609.344,
  yard: 0.9144,
  foot: 0.3048,
  inch: 0.0254,
} as const;

const WEIGHT_UNITS = {
  kilogram: 1,
  gram: 0.001,
  milligram: 0.000001,
  pound: 0.45359237,
  ounce: 0.028349523125,
} as const;

const TEMPERATURE_UNITS = ["celsius", "fahrenheit", "kelvin"] as const;

function convertLength(value: number, from: string, to: string) {
  const meters = value * LENGTH_UNITS[from as keyof typeof LENGTH_UNITS];
  return meters / LENGTH_UNITS[to as keyof typeof LENGTH_UNITS];
}

function convertWeight(value: number, from: string, to: string) {
  const kg = value * WEIGHT_UNITS[from as keyof typeof WEIGHT_UNITS];
  return kg / WEIGHT_UNITS[to as keyof typeof WEIGHT_UNITS];
}

function toCelsius(value: number, unit: string) {
  if (unit === "celsius") return value;
  if (unit === "fahrenheit") return ((value - 32) * 5) / 9;
  return value - 273.15;
}

function fromCelsius(value: number, unit: string) {
  if (unit === "celsius") return value;
  if (unit === "fahrenheit") return (value * 9) / 5 + 32;
  return value + 273.15;
}

function convertTemperature(value: number, from: string, to: string) {
  return fromCelsius(toCelsius(value, from), to);
}

const CATEGORY_UNITS: Record<Category, readonly string[]> = {
  length: Object.keys(LENGTH_UNITS),
  weight: Object.keys(WEIGHT_UNITS),
  temperature: TEMPERATURE_UNITS,
};

function formatNumber(n: number) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString(undefined, { maximumFractionDigits: 4 });
}

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("length");
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("foot");

  const units = CATEGORY_UNITS[category];

  const result = useMemo(() => {
    const n = Number(value) || 0;
    if (category === "length") return convertLength(n, fromUnit, toUnit);
    if (category === "weight") return convertWeight(n, fromUnit, toUnit);
    return convertTemperature(n, fromUnit, toUnit);
  }, [category, value, fromUnit, toUnit]);

  function handleCategoryChange(next: Category) {
    setCategory(next);
    const defaults = CATEGORY_UNITS[next];
    setFromUnit(defaults[0]);
    setToUnit(defaults[1] ?? defaults[0]);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        {(["length", "weight", "temperature"] as Category[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleCategoryChange(option)}
            aria-pressed={category === option}
            className={`rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-100 ${
              category === option
                ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <Field
          label="Value"
          value={value}
          onChange={setValue}
          error={validateNumber(value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              From
            </span>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base capitalize text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100"
            >
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              To
            </span>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base capitalize text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100"
            >
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <ResultsPanel>
        <ResultRow label="Result" value={`${formatNumber(result)} ${toUnit}`} emphasize />
      </ResultsPanel>
    </div>
  );
}
