import Link from "next/link";
import ExplanationPanel from "@/components/ExplanationPanel";
import RelatedCalculators from "@/components/RelatedCalculators";
import type { Explanation } from "@/lib/calculators";

export default function CalculatorShell({
  domainName,
  domainSlug,
  title,
  description,
  explanation,
  related,
  children,
}: {
  domainName: string;
  domainSlug: string;
  title: string;
  description: string;
  explanation: Explanation;
  related?: [string, string][];
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-4 py-10">
      <div className="flex flex-col gap-1">
        <Link
          href={`/#${domainSlug}`}
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          &larr; {domainName}
        </Link>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
          {title}
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
      {children}
      <ExplanationPanel explanation={explanation} />
      <RelatedCalculators related={related} />
    </div>
  );
}
