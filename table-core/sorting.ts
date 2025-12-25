import { SortConfig } from "./types";

export function applySorting<T extends Record<string, unknown>>(
  data: T[],
  sortConfig: SortConfig
): T[] {
  if (!sortConfig) return data;

  const { key, direction } = sortConfig;

  const sorted = [...data];

  sorted.sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    // handle undefined / null safely
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return direction === "asc" ? -1 : 1;
    if (bValue == null) return direction === "asc" ? 1 : -1;

    // number comparison
    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    // string comparison (default)
    const aStr = String(aValue);
    const bStr = String(bValue);

    return direction === "asc"
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
  });

  return sorted;
}
