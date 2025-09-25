// src/components/table/selectColumn.tsx
import { ColumnDef } from "@tanstack/react-table";

export function createSelectColumn<T>(): ColumnDef<T> {
    return {
        id: "select",
        header: ({ table }) => (
            <input
                type="checkbox"
                checked={table.getIsAllPageRowsSelected()}
                onChange={table.getToggleAllPageRowsSelectedHandler()}
            />
        ),
        cell: ({ row }) => (
            <input
                type="checkbox"
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
            />
        ),
    };
}
