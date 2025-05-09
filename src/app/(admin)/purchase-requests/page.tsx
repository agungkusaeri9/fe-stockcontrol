"use client"
import React, { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { PurchaseRequest } from "@/types/purchaseRequest";
import { useFetchData } from "@/hooks/useFetchData";
import PurchaseRequestService from "@/services/PurchaseRequestService";
import ButtonLink from "@/components/ui/button/ButtonLink";
import TableFooter from "@/components/tables/TableFooter";
import { formatDate } from "@fullcalendar/core/index.js";
import TableToolbar from "@/components/tables/TableToolbar";
import { useFetchDataPurchaseRequest } from "@/hooks/useFetchDataPR";
import FilterPurchaseRequest from "@/components/pages/purchase-request/Filter";
import { dateFormat } from "@/utils/dateFormat";

export default function Page() {
    const [filter, setFilter] = useState({
        start_date: '',
        end_date: '',
        pr_number: ''
    });

    const {
        data: purchaseRequests,
        isLoading,
        setKeyword,
        setCurrentPage,
        setLimit,
        limit,
        keyword,
        pagination
    } = useFetchDataPurchaseRequest(PurchaseRequestService.get, "purchaseRequests", true, filter);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        console.log("Filter:", filter);
    }, [filter])
    return (
        <div>
            <PageBreadcrumb pageTitle="Purchase Requests" />
            <div className="space-y-6">
                <FilterPurchaseRequest filter={filter} setFilter={setFilter} />
                <ComponentCard title="Purchase Request History">
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
                                                Budget Number
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
                                                Requested
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Gen. Manager
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
                                        {purchaseRequests?.map((pr: PurchaseRequest, index: number) => (
                                            <TableRow key={pr.id}>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {dateFormat(pr.date)}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {pr.pr_number}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {pr.budget_number}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {pr.department}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {pr.requested}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {pr.gen_manager}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex gap-1">
                                                    <ButtonLink href={`/purchase-requests/${pr.id}`} variant='outline' size='xs' className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                                        Show
                                                    </ButtonLink>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {isLoading && (
                                            <TableRow>
                                                <TableCell colSpan={8} className="text-gray-500 dark:text-gray-400 p-5 text-xs text-center">
                                                    Loading...
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {purchaseRequests?.length === 0 && (
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
