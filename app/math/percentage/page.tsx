import { buildMetadata } from "@/lib/seo";
import CalculatorShell from "@/components/CalculatorShell";
import PercentageCalculator from "@/components/calculators/PercentageCalculator";
import { findCalculator } from "@/lib/calculators";

const { domain, calculator } = findCalculator("math", "percentage");

export const metadata = buildMetadata({
  title: calculator!.name,
  description: calculator!.description,
  path: "/math/percentage",
});

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
