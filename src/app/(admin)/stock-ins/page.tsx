"use client"
import React, { useState } from "react";
import ButtonLink from "@/components/ui/button/ButtonLink";
import { dateFormat } from "@/utils/dateFormat";
import DataTable from "@/components/common/DataTable";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { useFetchData } from "@/hooks/useFetchData";
import StockInService from "@/services/StockInService";
import { StockIn } from "@/types/stockIn";
import Breadcrumb from "@/components/common/Breadcrumb";
import FilterStockIn from "@/components/pages/stock-in/FilterStockIn";
import { useFetchDataStock } from "@/hooks/useFetchDataStock";

export default function Page() {
    const [filter, setFilter] = useState({
        start_date: '',
        end_date: '',
        keyword: '',
    });
    const {
        data: stockIn,
        isLoading,
        setCurrentPage,
        setLimit,
        keyword,
        setKeyword,
        limit,
        pagination
    } = useFetchDataStock(StockInService.get, "stockIn", true, filter);
    const columns = [
        {
            header: 'Date',
            accessorKey: 'po_date',
            cell: (item: StockIn) => dateFormat(item.created_at)
        },
       {
            header: "Code",
            accessorKey: "kanban_code"
        },
          {
            header: "Quantity",
            accessorKey: "quantity"
        },
        // {
        //     header: "Description",
        //     accessorKey: "kanban.description",
        //     cell: (item: StockIn) => item.kanban?.description || '-'
        // },
        //   {
        //     header: "Specification",
        //     accessorKey: "kanban.specification",
        //     cell: (item: StockIn) => item.kanban?.specification || '-'
        // },
        //   {
        //     header: "Machine",
        //     accessorKey: "machine",
        //     cell: (item: StockIn) => item.kanban.machine?.code || '-'
        // },
        //   {
        //     header: "Machine Area",
        //     accessorKey: "machine_area",
        //     cell: (item: StockIn) => item.kanban.machine_area?.name || '-'
        // },
        //   {
        //     header: "Rack",
        //     accessorKey: "rack",
        //     cell: (item: StockIn) => item.kanban.rack?.code || '-'
        // },
        {
            header: 'Action',
            accessorKey: 'id',
            cell: (item: PurchaseOrder) => (
                <ButtonLink 
                    href={`/purchase-orders/${item.id}`} 
                    variant='outline' 
                    size='xs' 
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    Show
                </ButtonLink>
            )
        }
    ];

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Stock In' }
                ]}
            />
            <div className="space-y-6">
                <FilterStockIn filter={filter} setFilter={setFilter} />
                <DataTable
                    title="Stock In History"
                    columns={columns}
                    data={stockIn || []}
                    isLoading={isLoading}
                    pagination={pagination ? {
                        currentPage: pagination.curr_page,
                        totalPages: pagination.total_page,
                        totalItems: pagination.total,
                        itemsPerPage: limit,
                        onPageChange: setCurrentPage,
                        onLimitChange: setLimit
                    } : undefined}
                />
            </div>
        </div>
    );
}
