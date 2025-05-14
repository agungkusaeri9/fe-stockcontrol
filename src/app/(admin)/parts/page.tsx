"use client";
import React from "react";
import ButtonLink from "@/components/ui/button/ButtonLink";
import Breadcrumb from "@/components/common/Breadcrumb";
import { useFetchData } from "@/hooks/useFetchData";
import { useDeleteData } from "@/hooks/useDeleteData";
import { confirmDelete } from "@/utils/confirm";
import Button from "@/components/ui/button/Button";
import DataTable from "@/components/common/DataTable";
import PartService from "@/services/PartService";
import { Part } from "@/types/part";

export default function AreaListPage() {
    const {
        data: parts,
        isLoading,
        setKeyword,
        setCurrentPage,
        setLimit,
        limit,
        keyword,
        pagination
    } = useFetchData(PartService.get, "parts");
    const { mutate: remove } = useDeleteData(PartService.remove, ["parts"]);

    console.log(parts);

    const handleDelete = async (id: number) => {
        const confirmed = await confirmDelete();
        if (confirmed) {
            remove(id);
        }
    };

    const columns = [
        {
            header: "#",
            accessorKey: "id",
            cell: (item: Part) => {
                const index = parts?.findIndex((part: Part) => part.id === item.id) ?? 0;
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
            header: "Spesification",
            accessorKey: "specification",
        },
          {
            header: "Max Qty",
            accessorKey: "max_quantity",
        },
         {
            header: "Min Qty",
            accessorKey: "min_quantity",
        },
        {
            header: "Action",
            accessorKey: "id",
            cell: (item: Part) => (
                <div className="flex items-center gap-2">
                    <ButtonLink 
                        href={`/parts/${item.id}/edit`} 
                        variant='info' 
                        size='xs'
                    >
                        Edit
                    </ButtonLink>
                    <Button 
                        onClick={() => handleDelete(item.id!)} 
                        variant='danger' 
                        size='xs'
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Parts', href: '/parts' }]} />
            <div className="space-y-6">
                <div className="flex justify-end mb-4">
                    <ButtonLink size='xs' href="/parts/create">Create Part</ButtonLink>
                </div>
                <DataTable
                    title="Part List"
                    columns={columns}
                    data={parts || []}
                    isLoading={isLoading}
                    pagination={{
                        currentPage: pagination?.curr_page || 1,
                        totalPages: pagination?.total_page || 1,
                        totalItems: pagination?.total || 0,
                        itemsPerPage: limit,
                        onPageChange: setCurrentPage,
                        onLimitChange: setLimit,
                    }}
                    search={{
                        value: keyword,
                        onChange: setKeyword,
                        placeholder: "Search parts...",
                    }}
                />
            </div>
        </div>
    );
}
