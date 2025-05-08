"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import ButtonLink from "@/components/ui/button/ButtonLink";
import Breadcrumb from "@/components/common/Breadcrumb";
import SparePartService from "@/services/SparePartService";
import { useFetchData } from "@/hooks/useFetchData";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import TableToolbar from "@/components/tables/TableToolbar";
import TableFooter from "@/components/tables/TableFooter";
import { Sparepart } from "@/utils/sparepart";
import { useFetchDataSparepart } from "@/hooks/useFetchDataSparepart";
import FilterSparepart from "@/components/pages/spareparts/Filter";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const {
        data: spareparts,
        isLoading,
        setKeyword,
        setCurrentPage,
        setLimit,
        setFilters,
        filters,
        limit,
        keyword,
        pagination,
    } = useFetchDataSparepart(SparePartService.get, "spareparts");

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        console.log({ filters });
    }, [filters]);

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Spareparts', href: '/spareparts' }]} />
            <div className="space-y-6">
                <FilterSparepart filters={filters} setFilters={setFilters} />
                <ComponentCard title="Sparepart List">
                    <ButtonLink size='xs' href="/spareparts/create">Create Sparepart</ButtonLink>
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
                                        <TableRow isHeader={true}>
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
                                                Part Number
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Minimum Qty
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Maximum Qty
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Area
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Department
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Rack
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
                                        {spareparts?.map((sparepart: Sparepart, index: number) => (
                                            <TableRow key={sparepart.id}>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {sparepart.name}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {sparepart.part_number}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {sparepart.minimum_quantity}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {sparepart.maximum_quantity}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {sparepart.machine_area?.name}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {sparepart.department?.name}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {sparepart.rack?.name}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex gap-1">
                                                    <ButtonLink href={`/spareparts/${sparepart.id}/edit`} variant='info' size='xs' className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                                        Edit
                                                    </ButtonLink>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {isLoading && (
                                            <TableRow>
                                                <TableCell colSpan={8} className="text-gray-500 dark:text-gray-400 p-5 text-xs text-center">
                                                    No results.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {spareparts?.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={8} className="text-gray-500 dark:text-gray-400 p-5 text-xs text-center">
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
