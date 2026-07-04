import Link from "next/link";
import { findCalculator } from "@/lib/calculators";

export default function RelatedCalculators({
  related,
}: {
  related?: [string, string][];
}) {
  if (!related || related.length === 0) return null;

  const items = related
    .map(([domainSlug, calculatorSlug]) => {
      const { calculator } = findCalculator(domainSlug, calculatorSlug);
      if (!calculator) return null;
      return { domainSlug, calculatorSlug, name: calculator.name };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
        Related calculators
      </h2>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={`${item.domainSlug}/${item.calculatorSlug}`}
            href={`/${item.domainSlug}/${item.calculatorSlug}`}
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-900 dark:border-neutral-800 dark:text-neutral-50 dark:hover:border-neutral-100"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
