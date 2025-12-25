export function applyPagination<T>(
  data: T[],
  config: { page: number; pageSize: number }
): T[] {
  const startIndex = (config.page - 1) * config.pageSize;
  return data?.slice(startIndex, startIndex + config.pageSize);
}
