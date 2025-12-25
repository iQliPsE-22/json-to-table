export function applyFilters<T>(
  data: T[],
  filters: Array<{ key: keyof T; value: unknown }>
): T[] {
  return filters.reduce((filteredData, filter) => {
    return filteredData.filter((item) => {
      const itemValue = item[filter.key];
      return itemValue === filter.value;
    });
  }, data);
}
