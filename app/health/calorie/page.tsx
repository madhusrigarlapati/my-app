import type { Metadata } from "next";
import CalculatorShell from "@/components/CalculatorShell";
import CalorieCalculator from "@/components/calculators/CalorieCalculator";
import { findCalculator } from "@/lib/calculators";

const { domain, calculator } = findCalculator("health", "calorie");

export const metadata: Metadata = {
  title: calculator?.name,
  description: calculator?.description,
};

export default function CaloriePage() {
  return (
    <CalculatorShell
      domainName={domain!.name}
      domainSlug={domain!.slug}
      title={calculator!.name}
      description={calculator!.description}
    >
      <CalorieCalculator />
    </CalculatorShell>
  );
}
