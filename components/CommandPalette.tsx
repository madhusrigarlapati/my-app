"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { domains } from "@/lib/calculators";

type SearchItem = {
  domainSlug: string;
  domainName: string;
  calculatorSlug: string;
  name: string;
  description: string;
};

const ITEMS: SearchItem[] = domains.flatMap((domain) =>
  domain.calculators.map((calculator) => ({
    domainSlug: domain.slug,
    domainName: domain.name,
    calculatorSlug: calculator.slug,
    name: calculator.name,
    description: calculator.description,
  }))
);

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.domainName.toLowerCase().includes(q)
    );
  }, [query]);

  function openPalette() {
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) {
          setOpen(false);
        } else {
          openPalette();
        }
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    // Focus is a DOM/external-system sync, not derived state, so this one
    // legitimately belongs in an effect (unlike the query/index resets,
    // which now happen directly in openPalette() and handleQueryChange()).
    if (!open) return;
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [open]);

  function navigate(item: SearchItem) {
    setOpen(false);
    router.push(`/${item.domainSlug}/${item.calculatorSlug}`);
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[activeIndex];
      if (item) navigate(item);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openPalette}
        className="flex items-center gap-2 rounded-full border border-neutral-300 px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:border-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-100 dark:focus-visible:ring-neutral-100"
        aria-label="Search calculators"
      >
        Search
        <kbd className="rounded border border-neutral-300 px-1 text-xs dark:border-neutral-700">
          &#8984;K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-24"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search calculators"
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-lg flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Search calculators..."
              aria-label="Search calculators"
              className="w-full border-b border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-900 outline-none dark:border-neutral-800 dark:text-neutral-100"
            />
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  No calculators found.
                </li>
              )}
              {results.map((item, index) => (
                <li key={`${item.domainSlug}/${item.calculatorSlug}`}>
                  <button
                    type="button"
                    onClick={() => navigate(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex w-full flex-col items-start gap-0.5 px-4 py-2 text-left ${
                      index === activeIndex ? "bg-neutral-100 dark:bg-neutral-800" : ""
                    }`}
                  >
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                      {item.name}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {item.domainName} &middot; {item.description}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
