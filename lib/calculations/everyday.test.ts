import { describe, expect, it } from "vitest";
import { calculateTip, calculateDateDiff } from "./everyday";

describe("calculateTip", () => {
  it("splits a tip and total evenly across people", () => {
    const { tipAmount, total, perPerson } = calculateTip(50, 18, 2);
    expect(tipAmount).toBeCloseTo(9, 5);
    expect(total).toBeCloseTo(59, 5);
    expect(perPerson).toBeCloseTo(29.5, 5);
  });

  it("clamps people to a minimum of 1", () => {
    const { perPerson, total } = calculateTip(100, 10, 0);
    expect(perPerson).toBeCloseTo(total, 5);
  });
});

describe("calculateDateDiff", () => {
  it("computes years/months/days across a leap-day boundary", () => {
    const result = calculateDateDiff("2000-01-01", "2024-06-15");
    expect(result).not.toBeNull();
    expect(result?.years).toBe(24);
    expect(result?.months).toBe(5);
    expect(result?.days).toBe(14);
  });

  it("is order-independent (from/to can be swapped)", () => {
    const forward = calculateDateDiff("2020-01-01", "2020-03-01");
    const backward = calculateDateDiff("2020-03-01", "2020-01-01");
    expect(backward).toEqual(forward);
  });

  it("returns null for an invalid date string", () => {
    expect(calculateDateDiff("not-a-date", "2020-01-01")).toBeNull();
  });

  it("computes total days across a known range", () => {
    const result = calculateDateDiff("2020-01-01", "2020-01-31");
    expect(result?.totalDays).toBe(30);
  });
});
