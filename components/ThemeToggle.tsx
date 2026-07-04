"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "system" | "dark";

function applyTheme(theme: Theme) {
  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}

const OPTIONS: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
  { value: "dark", label: "Dark" },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    // Reflects the theme the anti-flash script in the root layout already
    // applied to <html> before hydration; only updates local UI state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  function selectTheme(next: Theme) {
    setTheme(next);
    try {
      window.localStorage.setItem("theme", next);
    } catch {
      // Storage disabled — theme still applies for this page view.
    }
    applyTheme(next);
  }

  return (
    <div className="flex gap-1 rounded-full bg-neutral-100 p-1 dark:bg-neutral-800">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => selectTheme(option.value)}
          aria-pressed={theme === option.value}
          aria-label={`${option.label} theme`}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-100 ${
            theme === option.value
              ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900"
              : "text-neutral-600 dark:text-neutral-400"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
