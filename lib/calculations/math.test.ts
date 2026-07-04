import { describe, expect, it } from "vitest";
import {
  percentOf,
  whatPercent,
  percentageChange,
  convertLength,
  convertWeight,
  convertTemperature,
} from "./math";

describe("percentOf", () => {
  it("computes X% of Y", () => {
    expect(percentOf(15, 200)).toBeCloseTo(30, 5);
  });
});

describe("whatPercent", () => {
  it("computes what percent X is of Y", () => {
    expect(whatPercent(30, 200)).toBeCloseTo(15, 5);
  });

  it("returns 0 when the whole is 0", () => {
    expect(whatPercent(10, 0)).toBe(0);
  });
});

describe("percentageChange", () => {
  it("computes a positive percentage increase", () => {
    expect(percentageChange(200, 250)).toBeCloseTo(25, 5);
  });

  it("computes a negative percentage decrease", () => {
    expect(percentageChange(200, 150)).toBeCloseTo(-25, 5);
  });

  it("returns 0 when the starting value is 0", () => {
    expect(percentageChange(0, 100)).toBe(0);
  });
});

describe("convertLength", () => {
  it("converts meters to feet", () => {
    expect(convertLength(1, "meter", "foot")).toBeCloseTo(3.28084, 4);
  });

  it("round-trips through the same unit", () => {
    expect(convertLength(42, "mile", "mile")).toBeCloseTo(42, 5);
  });
});

describe("convertWeight", () => {
  it("converts kilograms to pounds", () => {
    expect(convertWeight(1, "kilogram", "pound")).toBeCloseTo(2.20462, 4);
  });
});

describe("convertTemperature", () => {
  it("converts Celsius to Fahrenheit", () => {
    expect(convertTemperature(0, "celsius", "fahrenheit")).toBeCloseTo(32, 5);
    expect(convertTemperature(100, "celsius", "fahrenheit")).toBeCloseTo(212, 5);
  });

  it("converts Celsius to Kelvin", () => {
    expect(convertTemperature(0, "celsius", "kelvin")).toBeCloseTo(273.15, 5);
  });

  it("converts Fahrenheit to Celsius", () => {
    expect(convertTemperature(32, "fahrenheit", "celsius")).toBeCloseTo(0, 5);
  });
});
