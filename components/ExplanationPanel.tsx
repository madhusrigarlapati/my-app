import type { Explanation } from "@/lib/calculators";

export default function ExplanationPanel({ explanation }: { explanation: Explanation }) {
  return (
    <details className="group rounded-xl border border-neutral-200 dark:border-neutral-800">
      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-neutral-700 marker:content-none dark:text-neutral-300">
        How this is calculated
        <span className="float-right text-neutral-400 transition-transform group-open:rotate-180">
          &darr;
        </span>
      </summary>
      <div className="flex flex-col gap-3 border-t border-neutral-200 px-4 py-3 text-sm dark:border-neutral-800">
        <p className="text-neutral-700 dark:text-neutral-300">{explanation.summary}</p>
        <pre className="whitespace-pre-wrap rounded-lg bg-neutral-100 px-3 py-2 font-mono text-xs text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
          {explanation.formula}
        </pre>
        {explanation.notes && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {explanation.notes}
          </p>
        )}
      </div>
    </details>
  );
}
