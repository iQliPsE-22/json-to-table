export function applyFilters<T extends Record<string, unknown>>(
  data: T[],
  filters: Array<{ key: keyof T; value: unknown }>
): T[] {
  if (filters.length === 0) return data;

  return filters.reduce((filteredData, filter) => {
    return filteredData.filter((item) => {
      const itemValue = item[filter.key];

      if (typeof itemValue === "string" && typeof filter.value === "string") {
        return itemValue.toLowerCase().includes(filter.value.toLowerCase());
      }
      return itemValue === filter.value;
    });
  }, data);
}
