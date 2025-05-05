"use client"

import Pagination from '@/components/tables/Pagination'
import TableFooter from '@/components/tables/TableFooter'
import TableToolbar from '@/components/tables/TableToolbar'
import Button from '@/components/ui/button/Button'
import ButtonLink from '@/components/ui/button/ButtonLink'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { useFetchData } from '@/hooks/useFetchData'
import UserService from '@/services/UserService'
import { User } from '@/types/user'
import { dateFormat } from '@/utils/dateFormat'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useEffect } from 'react'

const UserTable = () => {

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

    const { data: users } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const users = await UserService.getAllUsers();
            return users.data;
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
                                        Name
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Email
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Created At
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
                                {users?.map((user: User, index: number) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {user.name}
                                        </TableCell>
                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {user.email}
                                        </TableCell>
                                        <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {dateFormat(user.created_at)}
                                        </TableCell>

                                        <TableCell className="px-5 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex gap-1">
                                            <ButtonLink href='/user/edit' variant='info' size='xs' className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                                Edit
                                            </ButtonLink>
                                            <Button variant='danger' size='xs' className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {/* {users?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-gray-500 dark:text-gray-400 p-5 text-xs text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )} */}
                                {users?.length === 0 && (
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

export default UserTable
