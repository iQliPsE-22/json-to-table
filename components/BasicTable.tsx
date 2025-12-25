"use client"

import { createTableModel, Column } from "@/table-core"
import { applyPagination } from "@/table-core/pagination"
import { pipe } from "@/table-core/pipe"
import { applySorting } from "@/table-core/sorting"

export function BasicTable({
    columns,
    data,
}: {
    columns: Column[]
    data: Record<string, unknown>[]
}) {
    const rows = pipe(
        data,
        (d) => applySorting(d, { key: "name", direction: "asc" }),
        (d) => applyPagination(d, { page: 1, pageSize: 10 })
    )

    const model = createTableModel(columns, rows)

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
