export type Explanation = {
  summary: string;
  formula: string;
  notes?: string;
};

export type CalculatorMeta = {
  slug: string;
  name: string;
  description: string;
  explanation: Explanation;
  /** [domainSlug, calculatorSlug] pairs for cross-links to related tools */
  related?: [string, string][];
};

export type DomainMeta = {
  slug: string;
  name: string;
  description: string;
  calculators: CalculatorMeta[];
};

export const domains: DomainMeta[] = [
  {
    slug: "finance",
    name: "Finance",
    description: "Loans, interest, and everyday money math.",
    calculators: [
      {
        slug: "emi",
        name: "EMI / Loan",
        description: "Monthly payment, total interest, and total payment for a loan.",
        explanation: {
          summary:
            "Calculates the fixed monthly payment (EMI) needed to fully repay a loan, given the principal, annual interest rate, and tenure.",
          formula:
            "EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ − 1)\nP = principal, r = monthly interest rate (annual rate ÷ 12), n = number of monthly payments",
          notes:
            "Assumes a fixed interest rate and equal monthly installments, with no prepayments.",
        },
        related: [["finance", "compound-interest"]],
      },
      {
        slug: "compound-interest",
        name: "Compound Interest",
        description: "Future value of an investment with periodic compounding.",
        explanation: {
          summary:
            "Calculates how an investment grows over time when interest is compounded periodically.",
          formula:
            "A = P × (1 + r/n)^(n × t)\nP = principal, r = annual interest rate, n = compounding periods per year, t = years",
          notes: "Assumes no additional contributions are made during the term.",
        },
        related: [["finance", "emi"]],
      },
    ],
  },
  {
    slug: "health",
    name: "Health",
    description: "Body metrics and daily energy needs.",
    calculators: [
      {
        slug: "bmi",
        name: "BMI",
        description: "Body Mass Index from height and weight.",
        explanation: {
          summary:
            "Estimates body fat based on height and weight, used as a general screening tool.",
          formula:
            "BMI = weight(kg) / height(m)²\nImperial: BMI = 703 × weight(lb) / height(in)²",
          notes:
            "BMI doesn't account for muscle mass, age, or body composition — it's a screening tool, not a diagnosis.",
        },
        related: [["health", "calorie"]],
      },
      {
        slug: "calorie",
        name: "Calorie / TDEE",
        description: "Daily calorie needs based on activity level.",
        explanation: {
          summary:
            "Estimates daily calorie needs using the Mifflin-St Jeor equation for basal metabolic rate (BMR), scaled by activity level.",
          formula:
            "BMR (male) = 10w + 6.25h − 5a + 5\nBMR (female) = 10w + 6.25h − 5a − 161\nTDEE = BMR × activity factor\nw = weight(kg), h = height(cm), a = age(years)",
          notes:
            "Individual metabolism varies — treat this as a starting estimate, not a precise measurement.",
        },
        related: [["health", "bmi"]],
      },
    ],
  },
  {
    slug: "math",
    name: "Math",
    description: "General-purpose numeric tools.",
    calculators: [
      {
        slug: "percentage",
        name: "Percentage",
        description: "Percentage of a value, and percentage change between two values.",
        explanation: {
          summary:
            "Three common percentage calculations: a percentage of a value, what percent one value is of another, and the percentage change between two values.",
          formula:
            "X% of Y = (X ÷ 100) × Y\nX is what % of Y = (X ÷ Y) × 100\nChange = ((new − old) ÷ |old|) × 100",
        },
        related: [["math", "unit-converter"]],
      },
      {
        slug: "unit-converter",
        name: "Unit Converter",
        description: "Convert between length, weight, and temperature units.",
        explanation: {
          summary: "Converts a value between units of length, weight, or temperature.",
          formula:
            "Length/weight: convert via a common base unit (meters or kilograms).\nTemperature: convert via Celsius as the common intermediate — °F = °C × 9/5 + 32, K = °C + 273.15",
        },
        related: [["math", "percentage"]],
      },
    ],
  },
  {
    slug: "everyday",
    name: "Everyday",
    description: "Quick tools for daily life.",
    calculators: [
      {
        slug: "tip",
        name: "Tip Splitter",
        description: "Tip amount and per-person split for a bill.",
        explanation: {
          summary:
            "Calculates a tip amount and splits the total bill evenly across a group.",
          formula:
            "tip = bill × (tip% ÷ 100)\ntotal = bill + tip\nper person = total ÷ number of people",
        },
        related: [["everyday", "age"]],
      },
      {
        slug: "age",
        name: "Age / Date Difference",
        description: "Exact age or the duration between two dates.",
        explanation: {
          summary:
            "Calculates the exact difference between two dates in years, months, and days, plus the total number of days.",
          formula:
            "Calendar-aware subtraction that accounts for varying month lengths and leap years — not a simple day-count division.",
        },
        related: [["everyday", "tip"]],
      },
    ],
  },
];

export function findCalculator(domainSlug: string, calculatorSlug: string) {
  const domain = domains.find((d) => d.slug === domainSlug);
  const calculator = domain?.calculators.find((c) => c.slug === calculatorSlug);
  return { domain, calculator };
}

export function getCalculatorMeta(domainSlug: string, calculatorSlug: string) {
  const { domain, calculator } = findCalculator(domainSlug, calculatorSlug);
  if (!domain || !calculator) return null;
  return { domain, calculator };
}
