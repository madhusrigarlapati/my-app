import { buildMetadata } from "@/lib/seo";
import CalculatorShell from "@/components/CalculatorShell";
import CompoundInterestCalculator from "@/components/calculators/CompoundInterestCalculator";
import { findCalculator } from "@/lib/calculators";

const { domain, calculator } = findCalculator("finance", "compound-interest");

export const metadata = buildMetadata({
  title: calculator!.name,
  description: calculator!.description,
  path: "/finance/compound-interest",
});

export default function CompoundInterestPage() {
  return (
    <CalculatorShell
      domainName={domain!.name}
      domainSlug={domain!.slug}
      title={calculator!.name}
      description={calculator!.description}
      explanation={calculator!.explanation}
      related={calculator!.related}
    >
      <CompoundInterestCalculator />
    </CalculatorShell>
  );
}
