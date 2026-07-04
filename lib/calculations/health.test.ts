import { describe, expect, it } from "vitest";
import {
  calculateBmiMetric,
  calculateBmiImperial,
  bmiCategory,
  calculateBmrTdee,
} from "./health";

describe("calculateBmiMetric", () => {
  it("computes weight(kg) / height(m)^2", () => {
    expect(calculateBmiMetric(170, 70)).toBeCloseTo(24.22, 2);
  });

  it("returns 0 for a non-positive height", () => {
    expect(calculateBmiMetric(0, 70)).toBe(0);
  });
});

describe("calculateBmiImperial", () => {
  it("computes 703 * weight(lb) / height(in)^2", () => {
    expect(calculateBmiImperial(67, 154)).toBeCloseTo(24.11, 1);
  });

  it("returns 0 for a non-positive height", () => {
    expect(calculateBmiImperial(0, 154)).toBe(0);
  });
});

describe("bmiCategory", () => {
  it.each([
    [0, "—"],
    [18, "Underweight"],
    [22, "Normal"],
    [27, "Overweight"],
    [32, "Obese"],
  ])("categorizes BMI %s as %s", (bmi, expected) => {
    expect(bmiCategory(bmi)).toBe(expected);
  });
});

describe("calculateBmrTdee", () => {
  it("applies the Mifflin-St Jeor equation for men (+5)", () => {
    const { bmr } = calculateBmrTdee({
      gender: "male",
      age: 30,
      heightCm: 175,
      weightKg: 75,
      activityFactor: 1,
    });
    expect(bmr).toBeCloseTo(10 * 75 + 6.25 * 175 - 5 * 30 + 5, 5);
  });

  it("applies the Mifflin-St Jeor equation for women (-161)", () => {
    const { bmr } = calculateBmrTdee({
      gender: "female",
      age: 30,
      heightCm: 165,
      weightKg: 60,
      activityFactor: 1,
    });
    expect(bmr).toBeCloseTo(10 * 60 + 6.25 * 165 - 5 * 30 - 161, 5);
  });

  it("scales TDEE by the activity factor", () => {
    const { bmr, tdee } = calculateBmrTdee({
      gender: "male",
      age: 25,
      heightCm: 180,
      weightKg: 80,
      activityFactor: 1.55,
    });
    expect(tdee).toBeCloseTo(bmr * 1.55, 5);
  });
});
