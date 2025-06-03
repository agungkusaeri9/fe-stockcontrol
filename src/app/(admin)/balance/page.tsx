"use client";
import React, { Suspense, useState } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import KanbanService from "@/services/KanbanService";
import { Kanban } from "@/types/kanban";
import DataTable from "@/components/common/DataTable";
import FilterKanban from "@/components/pages/kanban/Filter";
import { useFetchDataKanban } from "@/hooks/useFetchDataKanban";
import Loading from "@/components/common/Loading";

function BalanceList() {
    const [filter, setFilter] = useState({
        machine_id: null as number | null,
        machine_area_id: null as number | null,
        rack_id: null as number | null,
        keyword: "",
        status: null as string | null
    });
    const {
        data: kanbans,
        isLoading,
        setCurrentPage,
        setLimit,
        limit,
        pagination
    } = useFetchDataKanban(KanbanService.get, "kanbans", true, filter);

    const columns = [
        // {
        //     header: "#",
        //     accessorKey: "id",
        //     cell: (item: Kanban) => {
        //         const index = kanbans?.findIndex((kanban: Kanban) => kanban.id === item.id) ?? 0;
        //         return index + 1;
        //     },
        // },
        {
            header: "Code",
            accessorKey: "code",
        },
        {
            header: "Description",
            accessorKey: "description",
        },
        //   {
        //     header: "Specification",
        //     accessorKey: "specification",
        // },
        {
            header: "Machine",
            accessorKey: "machine",
            cell: (item: Kanban) => item.machine?.code || '-'
        },
        {
            header: "Machine Area",
            accessorKey: "machine_area",
            cell: (item: Kanban) => item.machine_area?.name || '-'
        },
        // {
        //     header: "Rack",
        //     accessorKey: "rack",
        //     cell: (item: Kanban) => item.rack?.code || '-'
        // },
        {
            header: "Min.",
            accessorKey: "min_quantity",
        },
        {
            header: "Max.",
            accessorKey: "max_quantity",
        },
        {
            header: "Balance",
            accessorKey: "balance",
        },
        {
            header: "JS Ending Qty",
            accessorKey: "balance",
            cell: (item: Kanban) => {
                const balance = Number(item.balance);
                const js_ending_quantity = Number(item.js_ending_quantity);
                if (balance !== js_ending_quantity) {
                    return <div className="text-red-700 text-xs text-center w-full bg-red-100 rounded-md px-2 py-1 dark:bg-red-800/20 dark:text-red-400">{js_ending_quantity}</div>;
                } else {
                    return <div className="text-xs text-center w-full rounded-md px-2 py-1 dark:bg-green-800/20 dark:text-green-400">{js_ending_quantity}</div>;
                }
            }
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (item: Kanban) => {
                if (item.stock_status === "Overstock")
                    return <div className="text-red-700 text-xs text-center w-full bg-red-100 rounded-md px-2 py-1 dark:bg-red-800/20 dark:text-red-400">Overstock</div>
                else if (item.stock_status === "Understock")
                    return <div className="text-yellow-700 text-xs text-center w-full bg-yellow-100 rounded-md px-2 py-1 dark:bg-yellow-800/20 dark:text-yellow-400">Understock</div>
                else
                    return <div className="text-green-700 text-xs text-center w-full bg-green-100 rounded-md px-2 py-1 dark:bg-green-800/20 dark:text-green-400">Normal</div>
            }
        }
    ];

    return (
        <div>
            <Breadcrumb items={[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Balance', href: '/balance' }
            ]} />
            <div className="space-y-6">
                <DataTable
                    title="Balance"
                    columns={columns}
                    data={kanbans || []}
                    headerRight={<FilterKanban filter={filter} setFilter={setFilter} />}
                    isLoading={isLoading}
                    pagination={{
                        currentPage: pagination?.curr_page || 1,
                        totalPages: pagination?.total_page || 1,
                        totalItems: pagination?.total || 0,
                        itemsPerPage: limit,
                        onPageChange: setCurrentPage,
                        onLimitChange: setLimit,
                    }}

                />
            </div>
        </div>
    );
}
export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <BalanceList />
        </Suspense>
    );
}
