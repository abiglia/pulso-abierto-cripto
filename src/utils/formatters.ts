export interface FormattedPriceChange {
  className: "positive" | "negative";
  formatted: string;
}

export function formatPriceChange(
  change?: number
): FormattedPriceChange | null {
  if (typeof change !== "number") {
    return null;
  }

  const isPositive = change >= 0;

  return {
    className: isPositive ? "positive" : "negative",
    formatted: `${isPositive ? "+" : ""}${change.toFixed(2)}%`,
  };
}