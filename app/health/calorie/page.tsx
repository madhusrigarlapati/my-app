import { buildMetadata } from "@/lib/seo";
import CalculatorShell from "@/components/CalculatorShell";
import CalorieCalculator from "@/components/calculators/CalorieCalculator";
import { findCalculator } from "@/lib/calculators";

const { domain, calculator } = findCalculator("health", "calorie");

export const metadata = buildMetadata({
  title: calculator!.name,
  description: calculator!.description,
  path: "/health/calorie",
});

export default function CaloriePage() {
  return (
    <CalculatorShell
      domainName={domain!.name}
      domainSlug={domain!.slug}
      title={calculator!.name}
      description={calculator!.description}
      explanation={calculator!.explanation}
      related={calculator!.related}
    >
      <CalorieCalculator />
    </CalculatorShell>
  );
}
