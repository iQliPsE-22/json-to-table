import { Column, TableModel } from "./types"

export function createTableModel(
  columns: Column[],
  data: Record<string, unknown>[]
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
  }
}
