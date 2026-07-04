export type CalculatorMeta = {
  slug: string;
  name: string;
  description: string;
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
      },
      {
        slug: "compound-interest",
        name: "Compound Interest",
        description: "Future value of an investment with periodic compounding.",
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
      },
      {
        slug: "calorie",
        name: "Calorie / TDEE",
        description: "Daily calorie needs based on activity level.",
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
      },
      {
        slug: "unit-converter",
        name: "Unit Converter",
        description: "Convert between length, weight, and temperature units.",
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
      },
      {
        slug: "age",
        name: "Age / Date Difference",
        description: "Exact age or the duration between two dates.",
      },
    ],
  },
];

export function findCalculator(domainSlug: string, calculatorSlug: string) {
  const domain = domains.find((d) => d.slug === domainSlug);
  const calculator = domain?.calculators.find((c) => c.slug === calculatorSlug);
  return { domain, calculator };
}
