import type { Metadata } from "next";
import CalculatorShell from "@/components/CalculatorShell";
import UnitConverter from "@/components/calculators/UnitConverter";
import { findCalculator } from "@/lib/calculators";

const { domain, calculator } = findCalculator("math", "unit-converter");

export const metadata: Metadata = {
  title: calculator?.name,
  description: calculator?.description,
};

export default function UnitConverterPage() {
  return (
    <CalculatorShell
      domainName={domain!.name}
      domainSlug={domain!.slug}
      title={calculator!.name}
      description={calculator!.description}
    >
      <UnitConverter />
    </CalculatorShell>
  );
}
