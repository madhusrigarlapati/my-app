export function percentOf(percent: number, value: number) {
  return (percent / 100) * value;
}

export function whatPercent(part: number, whole: number) {
  if (whole === 0) return 0;
  return (part / whole) * 100;
}

export function percentageChange(from: number, to: number) {
  if (from === 0) return 0;
  return ((to - from) / Math.abs(from)) * 100;
}

export const LENGTH_UNITS = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  mile: 1609.344,
  yard: 0.9144,
  foot: 0.3048,
  inch: 0.0254,
} as const;

export const WEIGHT_UNITS = {
  kilogram: 1,
  gram: 0.001,
  milligram: 0.000001,
  pound: 0.45359237,
  ounce: 0.028349523125,
} as const;

export const TEMPERATURE_UNITS = ["celsius", "fahrenheit", "kelvin"] as const;

export function convertLength(value: number, from: string, to: string) {
  const meters = value * LENGTH_UNITS[from as keyof typeof LENGTH_UNITS];
  return meters / LENGTH_UNITS[to as keyof typeof LENGTH_UNITS];
}

export function convertWeight(value: number, from: string, to: string) {
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

export function convertTemperature(value: number, from: string, to: string) {
  return fromCelsius(toCelsius(value, from), to);
}
