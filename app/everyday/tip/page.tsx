import { buildMetadata } from "@/lib/seo";
import CalculatorShell from "@/components/CalculatorShell";
import TipCalculator from "@/components/calculators/TipCalculator";
import { findCalculator } from "@/lib/calculators";

const { domain, calculator } = findCalculator("everyday", "tip");

export const metadata = buildMetadata({
  title: calculator!.name,
  description: calculator!.description,
  path: "/everyday/tip",
});

export default function TipPage() {
  return (
    <CalculatorShell
      domainName={domain!.name}
      domainSlug={domain!.slug}
      title={calculator!.name}
      description={calculator!.description}
      explanation={calculator!.explanation}
    >
      <TipCalculator />
    </CalculatorShell>
  );
}
