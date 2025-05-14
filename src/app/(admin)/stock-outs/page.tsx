"use client"
import React, { useState } from "react";
import ButtonLink from "@/components/ui/button/ButtonLink";
import { dateFormat } from "@/utils/dateFormat";
import DataTable from "@/components/common/DataTable";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { useFetchData } from "@/hooks/useFetchData";
import StockOutService from "@/services/StockOutService";
import Breadcrumb from "@/components/common/Breadcrumb";
import { useFetchDataStock } from "@/hooks/useFetchDataStock";
import { StockOut } from "@/types/stockOut";
import FilterStockOut from "@/components/pages/stock-out/FilterStockOut";

export default function Page() {
    const [filter, setFilter] = useState({
        start_date: '',
        end_date: '',
        keyword: '',
    });
    const {
        data: stockOut,
        isLoading,
        setCurrentPage,
        setLimit,
        keyword,
        setKeyword,
        limit,
        pagination
    } = useFetchDataStock(StockOutService.get, "stockOut", true, filter);
    const columns = [
        {
            header: 'Date',
            accessorKey: 'po_date',
            cell: (item: StockOut) => dateFormat(item.created_at)
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
        //     cell: (item: stockOut) => item.kanban?.description || '-'
        // },
        //   {
        //     header: "Specification",
        //     accessorKey: "kanban.specification",
        //     cell: (item: stockOut) => item.kanban?.specification || '-'
        // },
        //   {
        //     header: "Machine",
        //     accessorKey: "machine",
        //     cell: (item: stockOut) => item.kanban.machine?.code || '-'
        // },
        //   {
        //     header: "Machine Area",
        //     accessorKey: "machine_area",
        //     cell: (item: stockOut) => item.kanban.machine_area?.name || '-'
        // },
        //   {
        //     header: "Rack",
        //     accessorKey: "rack",
        //     cell: (item: stockOut) => item.kanban.rack?.code || '-'
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
                    { label: 'Stock Out' }
                ]}
            />
            <div className="space-y-6">
                <FilterStockOut filter={filter} setFilter={setFilter} />
                <DataTable
                    title="Stock Out History History"
                    columns={columns}
                    data={stockOut || []}
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
