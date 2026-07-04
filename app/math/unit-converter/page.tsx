import { buildMetadata } from "@/lib/seo";
import CalculatorShell from "@/components/CalculatorShell";
import UnitConverter from "@/components/calculators/UnitConverter";
import { findCalculator } from "@/lib/calculators";

const { domain, calculator } = findCalculator("math", "unit-converter");

export const metadata = buildMetadata({
  title: calculator!.name,
  description: calculator!.description,
  path: "/math/unit-converter",
});

export default function UnitConverterPage() {
  return (
    <CalculatorShell
      domainName={domain!.name}
      domainSlug={domain!.slug}
      title={calculator!.name}
      description={calculator!.description}
      explanation={calculator!.explanation}
      related={calculator!.related}
    >
      <UnitConverter />
    </CalculatorShell>
  );
}
