"use client"

import Pagination from '@/components/tables/Pagination'
import TableFooter from '@/components/tables/TableFooter'
import TableToolbar from '@/components/tables/TableToolbar'
import Button from '@/components/ui/button/Button'
import ButtonLink from '@/components/ui/button/ButtonLink'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import PurchaseOrderService from '@/services/PurchaseOrderService'
import UserService from '@/services/UserService'
import { User } from '@/types/user'
import { formatRupiah } from '@/utils/currencyFormat'
import { dateFormat } from '@/utils/dateFormat'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useEffect } from 'react'

const PurchaseOrderTable = () => {

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

    const { data: purchaseOrders } = useQuery({
        queryKey: ["purchaseOrders"],
        queryFn: async () => {
            const response = await PurchaseOrderService.getAllPurchaseOrder();
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
                                        Po. Number
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Supllier
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Price Total
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
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {purchaseOrders?.map((po: any, index: number) => (
                                    <TableRow key={po.id}>
                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {po.po_number}
                                        </TableCell>
                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {po.supplier.name}
                                        </TableCell>
                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {formatRupiah(po.price_total)}
                                        </TableCell>
                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {dateFormat(po.date)}
                                        </TableCell>
                                        <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex gap-1">
                                            <ButtonLink href='#' variant='info' size='xs' className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                                Show
                                            </ButtonLink>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {/* {purchaseOrders?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-gray-500 dark:text-gray-400 p-5 text-xs text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )} */}
                                {purchaseOrders?.length === 0 && (
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

export default PurchaseOrderTable
