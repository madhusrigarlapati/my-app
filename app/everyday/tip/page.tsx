import type { Metadata } from "next";
import CalculatorShell from "@/components/CalculatorShell";
import TipCalculator from "@/components/calculators/TipCalculator";
import { findCalculator } from "@/lib/calculators";

const { domain, calculator } = findCalculator("everyday", "tip");

export const metadata: Metadata = {
  title: calculator?.name,
  description: calculator?.description,
};

export default function TipPage() {
  return (
    <CalculatorShell
      domainName={domain!.name}
      domainSlug={domain!.slug}
      title={calculator!.name}
      description={calculator!.description}
    >
      <TipCalculator />
    </CalculatorShell>
  );
}
