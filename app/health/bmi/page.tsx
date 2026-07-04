import type { Metadata } from "next";
import CalculatorShell from "@/components/CalculatorShell";
import BmiCalculator from "@/components/calculators/BmiCalculator";
import { findCalculator } from "@/lib/calculators";

const { domain, calculator } = findCalculator("health", "bmi");

export const metadata: Metadata = {
  title: calculator?.name,
  description: calculator?.description,
};

export default function BmiPage() {
  return (
    <CalculatorShell
      domainName={domain!.name}
      domainSlug={domain!.slug}
      title={calculator!.name}
      description={calculator!.description}
    >
      <BmiCalculator />
    </CalculatorShell>
  );
}
