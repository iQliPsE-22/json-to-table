import { Column, TableModel } from "./types";

export function createTableModel<T extends Record<string, unknown>>(
  columns: Column[],
  data: T[]
): TableModel {
  return {
    headers: columns,
    rows: data.map((row, idx) => ({
      key: `row-${idx}`,
      cells: columns.map((col) => ({
        columnKey: col.key,
        value: row[col.key],
      })),
    })),
  };
}
