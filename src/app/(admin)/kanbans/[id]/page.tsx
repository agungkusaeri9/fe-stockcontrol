"use client"
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { useParams } from "next/navigation";
import { useFetchById } from "@/hooks/useFetchDetailData";
import Breadcrumb from "@/components/common/Breadcrumb";
import DataTable from "@/components/common/DataTable";
import { Kanban } from "@/types/kanban";
import KanbanService from "@/services/KanbanService";
import { Supplier } from "@/types/supplier";

export default function Page() {
    const params = useParams();
    const id = params.id;
    const { data: kanban } = useFetchById<Kanban>(KanbanService.getById, Number(id), "kanban");


    if (!kanban) return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <div className="text-gray-500">Loading...</div>
            </div>
        </div>
    );

    let counter = 0;
    const columns = [
          {
            header: "No.",
            accessorKey: "id",
            cell: (item:any) => {
                const suppliers = Array.isArray(kanban?.supplier) ? kanban.supplier : [kanban?.supplier];
                const index = suppliers.findIndex((area: any) => area.id === item.id) ?? 0;
                return index + 1;
            },
        },
        {
            header: "Name",
            accessorKey: "name",
            cell: (item: Supplier) => {
                return <div>{item?.name || '-'}</div>
            },
        }
    ];

    return (
        <div className="space-y-6">
            <Breadcrumb 
                items={[
                    { label: 'Dashboard', href: '/dashboard' }, 
                    { label: 'Kanban', href: '/kanbans' }, 
                    { label: 'Detail' }
                ]} 
            />

            <div className="grid gap-6">
                <ComponentCard title="Kanban Detail" className="w-full">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Code
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {kanban?.code}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Balance
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {kanban?.balance}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Description
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {kanban?.description}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Specification
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {kanban?.specification}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Min Quantity
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {kanban?.min_quantity}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Uom
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {kanban?.uom}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Machine
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {kanban?.machine?.code}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Machine Area    
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {kanban?.machine_area?.name}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Rack
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {kanban?.rack?.code}
                                    </div>
                                </div>
                                 <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Max Quantity
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {kanban?.max_quantity}
                                    </div>
                                </div>
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Lead Time
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {kanban?.lead_time}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ComponentCard>
                     <DataTable
                    title="Supplier List"
                    columns={columns}
                    data={kanban.supplier ? (Array.isArray(kanban.supplier) ? kanban.supplier : [kanban.supplier]) : []}
                    // isLoading={isLoading}
                    />
            </div>
        </div>
    );
}
