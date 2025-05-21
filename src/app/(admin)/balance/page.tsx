"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import { useFetchData } from "@/hooks/useFetchData";
import KanbanService from "@/services/KanbanService";
import { useDeleteData } from "@/hooks/useDeleteData";
import { confirmDelete } from "@/utils/confirm";
import ButtonLink from "@/components/ui/button/ButtonLink";
import { Kanban } from "@/types/kanban";
import Button from "@/components/ui/button/Button";
import DataTable from "@/components/common/DataTable";
import AreaService from "@/services/AreaService";
import RackService from "@/services/RackService";
import MachineService from "@/services/MachineService";
import FilterKanban from "@/components/pages/kanban/Filter";
import { useFetchDataKanban } from "@/hooks/useFetchDataKanban";
import { Badge } from "lucide-react";

export default function Page() {
      const [filter, setFilter] = useState({
        machine_id: null as number | null,
        machine_area_id: null as number | null,
        rack_id: null as number | null,
        keyword:"",
        status: null as string | null
    });
 const {
        data: kanbans,
        isLoading,
        setKeyword,
        setCurrentPage,
        setLimit,
        limit,
        keyword,
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
          {
            header: "Rack",
            accessorKey: "rack",
            cell: (item: Kanban) => item.rack?.code || '-'
        },
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
            header: "Status",
            accessorKey: "status",
            cell: (item: Kanban) => {
                const balance = Number(item.balance);
                const min = Number(item.min_quantity);
                const max = Number(item.max_quantity);

                if(balance > max)
                  return <div className="text-red-700 text-xs text-center w-full bg-red-100 rounded-md px-2 py-1 dark:bg-red-800/20 dark:text-red-400">Over Stock</div>
                else if(balance < min)
                  return <div className="text-yellow-700 text-xs text-center w-full bg-yellow-100 rounded-md px-2 py-1 dark:bg-yellow-800/20 dark:text-yellow-400">Under Stock</div>
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
