import type { Metadata } from "next";
import CalculatorShell from "@/components/CalculatorShell";
import EmiCalculator from "@/components/calculators/EmiCalculator";
import { findCalculator } from "@/lib/calculators";

const { domain, calculator } = findCalculator("finance", "emi");

export const metadata: Metadata = {
  title: calculator?.name,
  description: calculator?.description,
};

export default function EmiPage() {
  return (
    <CalculatorShell
      domainName={domain!.name}
      domainSlug={domain!.slug}
      title={calculator!.name}
      description={calculator!.description}
      explanation={calculator!.explanation}
    >
      <EmiCalculator />
    </CalculatorShell>
  );
}
