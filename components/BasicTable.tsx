"use client"

import { createTableModel, Column } from "@/table-core"
import { applyPagination } from "@/table-core/pagination"
import { applySorting } from "@/table-core/sorting"

export function BasicTable({
    columns,
    data,
}: {
    columns: Column[]
    data: Record<string, unknown>[]
}) {
    // const model = createTableModel(columns, data)
    // const sortedData = applySorting(data, { key: "age", direction: "asc" })
    const paginatedData = applyPagination(data, {
        page: 1,
        pageSize: 2
    })
    const model = createTableModel(columns, paginatedData.rows)
    return (
        <table>
            <thead>
                <tr>
                    {model.headers.map((h) => (
                        <th key={h.key}>{h.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {model.rows.map((row) => (
                    <tr key={row.key}>
                        {row.cells.map((cell) => (
                            <td key={cell.columnKey}>{String(cell.value)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
