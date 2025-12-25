export type Column = {
  key: string
  label: string
}

export type TableModel = {
  headers: Column[]
  rows: {
    key: string
    cells: {
      columnKey: string
      value: unknown
    }[]
  }[]
}


export type SortDirection = "asc" | "desc"

export type SortConfig = {
  key: string
  direction: SortDirection
} | null
