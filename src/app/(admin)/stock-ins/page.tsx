"use client"
import React, { Suspense, useState } from "react";
import ButtonLink from "@/components/ui/button/ButtonLink";
import { dateFormat } from "@/utils/dateFormat";
import DataTable from "@/components/common/DataTable";
import { PurchaseOrder } from "@/types/purchaseOrder";
import StockInService from "@/services/StockInService";
import { StockIn } from "@/types/stockIn";
import Breadcrumb from "@/components/common/Breadcrumb";
import { useFetchDataStock } from "@/hooks/useFetchDataStock";
import FilterStockIn from "@/components/pages/stock-in/FilterStockInOld";
import Loading from "@/components/common/Loading";

function StockInList() {
    const [filter, setFilter] = useState({
        start_date: '',
        end_date: '',
        code: '',
    });
    const {
        data: stockIn,
        isLoading,
        setCurrentPage,
        setLimit,
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
        {
            header: 'Action',
            accessorKey: 'id',
            cell: (item: PurchaseOrder) => (
                <ButtonLink 
                    href={`/stock-ins/${item.id}`} 
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
                {/* <FilterStockIn filter={filter} setFilter={setFilter} /> */}
                <DataTable
                    title="Stock In History"
                    headerRight={<FilterStockIn filter={filter} setFilter={setFilter} />}
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
export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <StockInList />
        </Suspense>
    );
}
