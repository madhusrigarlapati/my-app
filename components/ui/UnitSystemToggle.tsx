export type UnitSystem = "metric" | "imperial";

export default function UnitSystemToggle({
  value,
  onChange,
}: {
  value: UnitSystem;
  onChange: (value: UnitSystem) => void;
}) {
  return (
    <div className="flex gap-2">
      {(["metric", "imperial"] as UnitSystem[]).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={value === option}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-100 ${
            value === option
              ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900"
              : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
          }`}
        >
          {option === "metric" ? "Metric (cm / kg)" : "Imperial (in / lb)"}
        </button>
      ))}
    </div>
  );
}
