"use client";
import React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
    RowSelectionState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react";

interface DataTableProps<T extends { id: string | number }> {
    data: T[];
    columns: ColumnDef<T, any>[];
    onSelectionChange?: (ids: (string | number)[]) => void;
}

export function DataTableClean<T extends { id: string | number }>({
    data,
    columns,
    onSelectionChange,
}: DataTableProps<T>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

    const table = useReactTable({
        data,
        columns,
        state: { sorting, rowSelection },
        enableRowSelection: true,
        getRowId: (row) => String(row.id), // pake id asli
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    // sync selected rows ke parent
    React.useEffect(() => {
        if (onSelectionChange) {
            const selectedIds = table
                .getSelectedRowModel()
                .rows.map((row) => row.original.id);
            onSelectionChange(selectedIds);
        }
    }, [rowSelection]);

    return (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow">
            <table className="w-full text-sm text-gray-700">
                <thead className="bg-gray-100 sticky top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const canSort = header.column.getCanSort();
                                const sortDir = header.column.getIsSorted();

                                return (
                                    <th
                                        key={header.id}
                                        className="p-3 border-b border-gray-200 font-semibold text-left text-gray-700 select-none"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={`flex items-center gap-1 ${canSort ? "cursor-pointer hover:text-gray-900" : ""
                                                    }`}
                                                onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {canSort && (
                                                    <>
                                                        {sortDir === "asc" && <ChevronUp className="w-4 h-4" />}
                                                        {sortDir === "desc" && <ChevronDown className="w-4 h-4" />}
                                                        {!sortDir && <ArrowUpDown className="w-4 h-4 text-gray-400" />}
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, idx) => (
                        <tr
                            key={row.id}
                            className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                } hover:bg-blue-50 transition-colors`}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="p-3 border-b border-gray-200">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {table.getRowModel().rows.length === 0 && (
                        <tr>
                            <td
                                colSpan={table.getAllColumns().length}
                                className="text-center p-6 text-gray-500"
                            >
                                🚫 No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
