type FieldProps = {
  label: string;
  value: number | string;
  onChange: (value: string) => void;
  unit?: string;
  type?: "number" | "text";
  step?: number;
  min?: number;
};

export default function Field({
  label,
  value,
  onChange,
  unit,
  type = "number",
  step,
  min,
}: FieldProps) {
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
          className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-base text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100"
        />
        {unit && (
          <span className="whitespace-nowrap text-neutral-500 dark:text-neutral-400">
            {unit}
          </span>
        )}
      </div>
    </label>
  );
}
