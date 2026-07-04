import type { Metadata } from "next";
import CalculatorShell from "@/components/CalculatorShell";
import PercentageCalculator from "@/components/calculators/PercentageCalculator";
import { findCalculator } from "@/lib/calculators";

const { domain, calculator } = findCalculator("math", "percentage");

export const metadata: Metadata = {
  title: calculator?.name,
  description: calculator?.description,
};

export default function PercentagePage() {
  return (
    <CalculatorShell
      domainName={domain!.name}
      domainSlug={domain!.slug}
      title={calculator!.name}
      description={calculator!.description}
      explanation={calculator!.explanation}
    >
      <PercentageCalculator />
    </CalculatorShell>
  );
}
