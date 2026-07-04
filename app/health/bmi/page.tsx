import { buildMetadata } from "@/lib/seo";
import CalculatorShell from "@/components/CalculatorShell";
import BmiCalculator from "@/components/calculators/BmiCalculator";
import { findCalculator } from "@/lib/calculators";

const { domain, calculator } = findCalculator("health", "bmi");

export const metadata = buildMetadata({
  title: calculator!.name,
  description: calculator!.description,
  path: "/health/bmi",
});

export default function BmiPage() {
  return (
    <CalculatorShell
      domainName={domain!.name}
      domainSlug={domain!.slug}
      title={calculator!.name}
      description={calculator!.description}
      explanation={calculator!.explanation}
    >
      <BmiCalculator />
    </CalculatorShell>
  );
}
