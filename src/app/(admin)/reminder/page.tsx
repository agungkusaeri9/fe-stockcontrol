"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import DataTable from "@/components/common/DataTable";
import ReminderService from "@/services/ReminderService";
import { Reminder } from "@/types/reminder";
import { useFetchData } from "@/hooks/useFetchData";
import { dateFormat } from "@/utils/dateFormat";

export default function KanbanList() {
    const {
        data: reminders,
        isLoading,
        setCurrentPage,
        setLimit,
        limit,
        pagination
    } = useFetchData(ReminderService.get, "reminders", true);

    const columns = [
        {
            header: "No. Kanban",
            accessorKey: "code",
        },
        {
            header: 'PO. Status',
            accessorKey: 'po_status',
            cell: (item: Reminder) => item.po_status || '-',
        },
        {
            header: 'PO. Date',
            accessorKey: 'po_date',
            cell: (item: Reminder) => item.po_date ? dateFormat(item.po_date) : '-',
        },
        {
            header: 'PR. Status',
            accessorKey: 'pr_status',
            cell: (item: Reminder) => item.pr_status || '-',
        },
        {
            header: 'PR. Date',
            accessorKey: 'pr_date',
            cell: (item: Reminder) => item.pr_date ? dateFormat(item.pr_date) : '-',
        }
    ];

    return (
        <div>
            <Breadcrumb items={[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Reminders', href: '/reminders' }
            ]} />
            <div className="space-y-6">
                <DataTable
                    title="Reminder List"
                    columns={columns}
                    data={reminders || []}
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
