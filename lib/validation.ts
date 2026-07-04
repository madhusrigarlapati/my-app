export function validateNumber(
  value: string,
  options: { min?: number } = {}
): string | undefined {
  if (value.trim() === "") return "Required";

  const n = Number(value);
  if (Number.isNaN(n)) return "Enter a valid number";

  if (options.min !== undefined && n < options.min) {
    return options.min === 0
      ? "Must not be negative"
      : `Must be at least ${options.min}`;
  }

  return undefined;
}
