"use client"
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Table, TableCell, TableHeader, TableRow } from "@/components/ui/table";

export default function BalancePageList() {

    return (
        <div>
            <PageBreadcrumb pageTitle="Reminder" />
            <div className="space-y-6">
                <ComponentCard title="Reminder">
                    {/* <TableToolbar limit={10} setLimit={() => { }} search={""} setSearch={() => { }} /> */}
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
                                                Part Name
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                PO. Status
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                PO. Date
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                PR. Status
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                PR. Date
                                            </TableCell>
                                        </TableRow>
                                    </TableHeader>
                                </Table>

                                {/* {pagination && (
                            <Pagination currentPage={pagination?.current_page} totalPages={pagination.total} onPageChange={handlePageChange} />
                        )} */}
                                {/* <TableFooter pagination={pagination} onPageChange={handlePageChange} /> */}

                            </div>
                        </div>
                    </div>
                </ComponentCard>
            </div>
        </div>
    );
}
