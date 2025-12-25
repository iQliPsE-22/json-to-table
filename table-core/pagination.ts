export function applyPagination<T extends Record<string, unknown>>(
  data: T[],
  config: { page: number; pageSize: number }
): {
  rows: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
} {
  const { page, pageSize } = config;
  const startIndex = (page - 1) * pageSize;
  const rows = data.slice(startIndex, startIndex + pageSize);

  return {
    rows,
    meta: {
      page,
      pageSize,
      total: data.length,
      totalPages: Math.ceil(data.length / pageSize),
    },
  };
}
