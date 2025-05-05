"use client"

import Pagination from '@/components/tables/Pagination'
import TableFooter from '@/components/tables/TableFooter'
import TableToolbar from '@/components/tables/TableToolbar'
import Button from '@/components/ui/button/Button'
import ButtonLink from '@/components/ui/button/ButtonLink'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import ReminderService from '@/services/ReminderService'
import { User } from '@/types/user'
import { dateFormat } from '@/utils/dateFormat'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useEffect } from 'react'

const ReminderTable = () => {

    // const {
    //     data: users,
    //     isLoading,
    //     pagination,
    //     setSearch,
    //     setCurrentPage,
    //     setLimit,
    //     limit,
    //     search,
    // } = useFetchData(UserService.getAllUsers, "users");

    const { data: balances } = useQuery({
        queryKey: ["balances"],
        queryFn: async () => {
            const response = await ReminderService.getAllReminder();
            return response.data;
        },
    })


    const handlePageChange = (page: number) => {
        // setCurrentPage(page);
    };

    const pagination = {
        total: 100,
        per_page: 10,
        current_page: 1,
        last_page: 10,
    }


    // if (!pagination) {
    //     return "Loading...";
    // }

    return (
        <>
            <TableToolbar limit={10} setLimit={() => { }} search={""} setSearch={() => { }} />
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

                            {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {balances?.map((balance: any, index: number) => (
                                    <TableRow key={balance.id}>
                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {balance.sparepart.name}
                                        </TableCell>
                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {balance.ps_status ? "Yes" : "No"}
                                        </TableCell>
                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {dateFormat(balance.ps_date)}
                                        </TableCell>
                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {balance.pr_status ? "Yes" : "No"}
                                        </TableCell>
                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {dateFormat(balance.pr_date)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {/* {balances?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-gray-500 dark:text-gray-400 p-5 text-xs text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )} */}
                                {balances?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-gray-500 dark:text-gray-400 p-5 text-xs text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        {/* {pagination && (
                            <Pagination currentPage={pagination?.current_page} totalPages={pagination.total} onPageChange={handlePageChange} />
                        )} */}
                        <TableFooter pagination={pagination} onPageChange={handlePageChange} />

                    </div>
                </div>
            </div>
        </>
    )
}

export default ReminderTable
