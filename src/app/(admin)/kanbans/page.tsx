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

export default function KanbanList() {
      const [filter, setFilter] = useState({
        machine_id: null as number | null,
        machine_area_id: null as number | null,
        rack_id: null as number | null,
        keyword:""
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
        {
            header: "#",
            accessorKey: "id",
            cell: (item: Kanban) => {
                const index = kanbans?.findIndex((kanban: Kanban) => kanban.id === item.id) ?? 0;
                return index + 1;
            },
        },
        {
            header: "Code",
            accessorKey: "code",
        },
          {
            header: "Description",
            accessorKey: "description",
        },
          {
            header: "Specification",
            accessorKey: "specification",
        },
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
            header: "Max Quantity",
            accessorKey: "max_quantity",
        },
          {
            header: "Min Quantity",
            accessorKey: "min_quantity",
        },
        {
            header: "Action",
            accessorKey: "id",
            cell: (item: Kanban) => (
                <div className="flex items-center gap-2">
                    <ButtonLink 
                        href={`/kanbans/${item.id}`} 
                        variant='outline' 
                        size='xs'
                    >
                        Show
                    </ButtonLink>
                     <ButtonLink 
                        href={`/kanbans/${item.id}/edit`} 
                        variant='info' 
                        size='xs'
                    >
                        Edit
                    </ButtonLink>
                </div>
            ),
        },
    ];
    
    return (
        <div>
            <Breadcrumb items={[
                { label: 'Dashboard', href: '/dashboard' }, 
                { label: 'Kanbans', href: '/kanbans' }
            ]} />
           <div className="space-y-6">
                <div className="flex justify-end mb-4">
                    <ButtonLink size='xs' href="/kanbans/create">Create Kanban</ButtonLink>
                </div>
                <FilterKanban
                    filter={filter}
                    setFilter={setFilter}
                />
                <DataTable
                    title="Kanban List"
                    columns={columns}
                    data={kanbans || []}
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
