import type { Metadata } from "next";
import CalculatorShell from "@/components/CalculatorShell";
import AgeCalculator from "@/components/calculators/AgeCalculator";
import { findCalculator } from "@/lib/calculators";

const { domain, calculator } = findCalculator("everyday", "age");

export const metadata: Metadata = {
  title: calculator?.name,
  description: calculator?.description,
};

export default function AgePage() {
  return (
    <CalculatorShell
      domainName={domain!.name}
      domainSlug={domain!.slug}
      title={calculator!.name}
      description={calculator!.description}
      explanation={calculator!.explanation}
    >
      <AgeCalculator />
    </CalculatorShell>
  );
}
