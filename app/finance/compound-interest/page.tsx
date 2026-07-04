import type { Metadata } from "next";
import CalculatorShell from "@/components/CalculatorShell";
import CompoundInterestCalculator from "@/components/calculators/CompoundInterestCalculator";
import { findCalculator } from "@/lib/calculators";

const { domain, calculator } = findCalculator("finance", "compound-interest");

export const metadata: Metadata = {
  title: calculator?.name,
  description: calculator?.description,
};

export default function CompoundInterestPage() {
  return (
    <CalculatorShell
      domainName={domain!.name}
      domainSlug={domain!.slug}
      title={calculator!.name}
      description={calculator!.description}
      explanation={calculator!.explanation}
    >
      <CompoundInterestCalculator />
    </CalculatorShell>
  );
}
