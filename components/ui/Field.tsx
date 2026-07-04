import { useId } from "react";

type FieldProps = {
  label: string;
  value: number | string;
  onChange: (value: string) => void;
  unit?: string;
  type?: "number" | "text";
  step?: number;
  min?: number;
  error?: string;
};

export default function Field({
  label,
  value,
  onChange,
  unit,
  type = "number",
  step,
  min,
  error,
}: FieldProps) {
  const errorId = useId();

  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-neutral-700 dark:text-neutral-300">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <input
          type={type}
          value={value}
          step={step}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`w-full rounded-lg border bg-white px-3 py-2 text-base text-neutral-900 outline-none focus-visible:ring-2 dark:bg-neutral-900 dark:text-neutral-100 ${
            error
              ? "border-[#d03b3b] focus:border-[#d03b3b] focus-visible:ring-[#d03b3b]"
              : "border-neutral-300 focus:border-neutral-900 focus-visible:ring-neutral-900 dark:border-neutral-700 dark:focus:border-neutral-100 dark:focus-visible:ring-neutral-100"
          }`}
        />
        {unit && (
          <span className="whitespace-nowrap text-neutral-500 dark:text-neutral-400">
            {unit}
          </span>
        )}
      </div>
      {error && (
        <span id={errorId} className="text-xs text-[#d03b3b]">
          {error}
        </span>
      )}
    </label>
  );
}
