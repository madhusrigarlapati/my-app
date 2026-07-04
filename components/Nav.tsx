import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import CommandPalette from "@/components/CommandPalette";

export default function Nav() {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50"
        >
          Calc Suite
        </Link>
        <div className="flex items-center gap-4">
          <CommandPalette />
          <Link
            href="/progress"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            Build progress
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
