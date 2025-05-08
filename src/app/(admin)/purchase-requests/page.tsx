"use client"
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { PurchaseRequest } from "@/types/purchaseRequest";
import { useFetchData } from "@/hooks/useFetchData";
import purchaseRequestService from "@/services/PurchaseRequestService";
import ButtonLink from "@/components/ui/button/ButtonLink";
import TableFooter from "@/components/tables/TableFooter";
import { formatDate } from "@fullcalendar/core/index.js";
import FilterPurchaseOrder from "@/components/pages/purchase-orders/Filter";

export default function Page() {

    const {
        data: purchaseRequests,
        isLoading,
        setKeyword,
        setCurrentPage,
        setLimit,
        limit,
        keyword,
        pagination
    } = useFetchData(purchaseRequestService.get, "purchaseRequests");

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <PageBreadcrumb pageTitle="Purchase Requests" />
            <div className="space-y-6">
                <FilterPurchaseOrder />
                <ComponentCard title="Purchase Request History">
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
                                                Date
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                PR. Number
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Unit
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
                                                Supplier
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
                                        {purchaseRequests?.map((rack: PurchaseRequest, index: number) => (
                                            <TableRow key={rack.id}>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {formatDate(rack.date)}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {rack.pr_number}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {rack.unit}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {rack.department}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {rack.supplier}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex gap-1">
                                                    <ButtonLink href={`/purchaseRequests/${rack.id}`} variant='outline' size='xs' className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                                        Show
                                                    </ButtonLink>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {isLoading && (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-gray-500 dark:text-gray-400 p-5 text-xs text-center">
                                                    Loading...
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {purchaseRequests?.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-gray-500 dark:text-gray-400 p-5 text-xs text-center">
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
