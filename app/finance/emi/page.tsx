import { buildMetadata } from "@/lib/seo";
import CalculatorShell from "@/components/CalculatorShell";
import EmiCalculator from "@/components/calculators/EmiCalculator";
import { findCalculator } from "@/lib/calculators";

const { domain, calculator } = findCalculator("finance", "emi");

export const metadata = buildMetadata({
  title: calculator!.name,
  description: calculator!.description,
  path: "/finance/emi",
});

export default function EmiPage() {
  return (
    <CalculatorShell
      domainName={domain!.name}
      domainSlug={domain!.slug}
      title={calculator!.name}
      description={calculator!.description}
      explanation={calculator!.explanation}
      related={calculator!.related}
    >
      <EmiCalculator />
    </CalculatorShell>
  );
}
