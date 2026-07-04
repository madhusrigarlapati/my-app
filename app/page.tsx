import Link from "next/link";
import { domains } from "@/lib/calculators";
import { buildWebApplicationSchema } from "@/lib/structuredData";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebApplicationSchema()) }}
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Calc Suite
        </h1>
        <p className="max-w-2xl text-neutral-600 dark:text-neutral-400">
          A collection of quick, focused calculators grouped by domain.
          Pick one below — everything runs instantly in your browser.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {domains.map((domain) => (
          <section key={domain.slug} id={domain.slug} className="scroll-mt-20">
            <div className="mb-3 flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                {domain.name}
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {domain.description}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {domain.calculators.map((calculator) => (
                <Link
                  key={calculator.slug}
                  href={`/${domain.slug}/${calculator.slug}`}
                  className="group flex flex-col gap-1 rounded-xl border border-neutral-200 p-4 transition-colors hover:border-neutral-900 dark:border-neutral-800 dark:hover:border-neutral-100"
                >
                  <span className="font-medium text-neutral-900 dark:text-neutral-50">
                    {calculator.name}
                  </span>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {calculator.description}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
