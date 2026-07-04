import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50"
        >
          Calc Suite
        </Link>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          Calculators for every domain
        </span>
      </div>
    </header>
  );
}
