import { describe, expect, it } from "vitest";
import { calculateEmi, calculateCompoundInterest } from "./finance";

describe("calculateEmi", () => {
  it("matches the standard amortization formula for a typical loan", () => {
    const { emi, totalPayment, totalInterest } = calculateEmi(250000, 7.5, 20);
    expect(emi).toBeCloseTo(2013.98, 1);
    expect(totalPayment).toBeCloseTo(emi * 240, 5);
    expect(totalInterest).toBeCloseTo(totalPayment - 250000, 5);
  });

  it("handles a 0% interest rate as a plain division", () => {
    const { emi, totalInterest } = calculateEmi(12000, 0, 1);
    expect(emi).toBeCloseTo(1000, 5);
    expect(totalInterest).toBeCloseTo(0, 5);
  });

  it("returns all zeros for a non-positive principal or tenure", () => {
    expect(calculateEmi(0, 5, 10)).toEqual({ emi: 0, totalPayment: 0, totalInterest: 0 });
    expect(calculateEmi(10000, 5, 0)).toEqual({ emi: 0, totalPayment: 0, totalInterest: 0 });
  });
});

describe("calculateCompoundInterest", () => {
  it("matches A = P(1 + r/n)^(nt) for monthly compounding", () => {
    const { futureValue, totalInterest } = calculateCompoundInterest(10000, 6, 10, 12);
    const expected = 10000 * Math.pow(1 + 0.06 / 12, 12 * 10);
    expect(futureValue).toBeCloseTo(expected, 5);
    expect(totalInterest).toBeCloseTo(expected - 10000, 5);
  });

  it("reduces to simple exponential growth for annual compounding", () => {
    const { futureValue } = calculateCompoundInterest(1000, 10, 2, 1);
    expect(futureValue).toBeCloseTo(1000 * 1.1 * 1.1, 5);
  });

  it("returns the principal unchanged over zero years", () => {
    const { futureValue, totalInterest } = calculateCompoundInterest(5000, 5, 0, 12);
    expect(futureValue).toBeCloseTo(5000, 5);
    expect(totalInterest).toBeCloseTo(0, 5);
  });
});
