export function calculateBmiMetric(heightCm: number, weightKg: number) {
  const h = heightCm / 100;
  if (h <= 0) return 0;
  return weightKg / (h * h);
}

export function calculateBmiImperial(heightIn: number, weightLb: number) {
  if (heightIn <= 0) return 0;
  return (703 * weightLb) / (heightIn * heightIn);
}

export function bmiCategory(bmi: number): string {
  if (bmi <= 0) return "—";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function calculateBmrTdee({
  gender,
  age,
  heightCm,
  weightKg,
  activityFactor,
}: {
  gender: "male" | "female";
  age: number;
  heightCm: number;
  weightKg: number;
  activityFactor: number;
}) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const bmr = gender === "male" ? base + 5 : base - 161;
  return { bmr, tdee: bmr * activityFactor };
}
