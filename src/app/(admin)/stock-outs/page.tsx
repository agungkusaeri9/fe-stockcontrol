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
import { useFetchDataStockOut } from "@/hooks/useFetchDataStockOut";
import FilterStockOutOld from "@/components/pages/stock-out/FilterStockOutOld";

export default function Page() {
    const [filter, setFilter] = useState({
        start_date: '',
        end_date: '',
        code: '',
        machine_id: null as number | null,
        machine_area_id: null as number | null,
        keyword: ''
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
    } = useFetchDataStockOut(StockOutService.get, "stockOut", true, filter);
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
            header: "Machine",
            accessorKey: "machine.code",
            cell: (item: StockOut) => item.machine?.code 
            
        },
          {
            header: "Machine Area",
            accessorKey: "machine_area",
             cell: (item: StockOut) => item.machine_area?.name
        },
         {
            header: "Quantity",
            accessorKey: "quantity"
        },
        {
            header: 'Action',
            accessorKey: 'id',
            cell: (item: StockOut) => (
                <ButtonLink 
                    href={`/stock-outs/${item.id}`} 
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
                {/* <FilterStockOutOld filter={filter} setFilter={setFilter} /> */}
                <DataTable
                    title="Stock Out History"
                    headerRight={<FilterStockOut filter={filter} setFilter={setFilter} />}
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
