import { buildMetadata } from "@/lib/seo";
import CalculatorShell from "@/components/CalculatorShell";
import AgeCalculator from "@/components/calculators/AgeCalculator";
import { findCalculator } from "@/lib/calculators";

const { domain, calculator } = findCalculator("everyday", "age");

export const metadata = buildMetadata({
  title: calculator!.name,
  description: calculator!.description,
  path: "/everyday/age",
});

export default function AgePage() {
  return (
    <CalculatorShell
      domainName={domain!.name}
      domainSlug={domain!.slug}
      title={calculator!.name}
      description={calculator!.description}
      explanation={calculator!.explanation}
      related={calculator!.related}
    >
      <AgeCalculator />
    </CalculatorShell>
  );
}
