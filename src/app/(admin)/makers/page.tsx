"use client";
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import OperatorTable from "@/components/pages/operator/OperatorTable";
import ButtonLink from "@/components/ui/button/ButtonLink";
import Breadcrumb from "@/components/common/Breadcrumb";
import MakerService from "@/services/MakerService";
import { useFetchData } from "@/hooks/useFetchData";
import { useDeleteData } from "@/hooks/useDeleteData";
import { confirmDelete } from "@/utils/confirm";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import TableToolbar from "@/components/tables/TableToolbar";
import Button from "@/components/ui/button/Button";
import TableFooter from "@/components/tables/TableFooter";

export default function UserListPage() {
    const {
        data: machineAreas,
        isLoading,
        setKeyword,
        setCurrentPage,
        setLimit,
        limit,
        keyword,
        pagination
    } = useFetchData(MakerService.get, "makers");
    const { mutate: remove } = useDeleteData(MakerService.remove, "makers");

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleDelete = async (id: number) => {
        const confirmed = await confirmDelete();
        if (confirmed) {
            remove(id);
        }
    };


    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Makers', href: '/makers' }]} />
            <div className="space-y-6">
                <ComponentCard title="Maker List">
                    <ButtonLink size='xs' href="/makers/create">Create Maker</ButtonLink>
                    <TableToolbar limit={limit}
                        setLimit={setLimit}
                        keyword={keyword}
                        setKeyword={setKeyword} />
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                        <div className="max-w-full overflow-x-auto">
                            <div className="min-w-[1102px]">
                                <Table>
                                    {/* Table Header */}
                                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                        <TableRow>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                #
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Name
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHeader>

                                    {/* Table Body */}
                                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                        {machineAreas?.map((machineArea: any, index: number) => (
                                            <TableRow key={machineArea.id}>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {machineArea.name}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex gap-1">
                                                    <ButtonLink href={`/makers/${machineArea.id}/edit`} variant='info' size='xs' className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                                        Edit
                                                    </ButtonLink>
                                                    <Button onClick={() => handleDelete(machineArea.id)} variant='danger' size='xs' className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {machineAreas?.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-gray-500 dark:text-gray-400 p-5 text-xs text-center">
                                                    No results.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                                {pagination && (
                                    <TableFooter pagination={pagination} onPageChange={handlePageChange} />
                                )}

                            </div>
                        </div>
                    </div>
                </ComponentCard>
            </div>
        </div>
    );
}
