"use client";
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UserTable from "./UserTable";
import TableToolbar from "@/components/tables/TableToolbar";
import TableFooter from "@/components/tables/TableFooter";
import { useFetchData } from "@/hooks/useFetchData";
import UserService from "@/services/UserService";

export default function UserList() {
    const {
        data: users,
        isLoading,
        pagination,
        setSearch,
        setCurrentPage,
        setLimit,
        limit,
        search,
    } = useFetchData(UserService.getAllUsers, "users");

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    if (isLoading)
        return "Loading...";

    return (
        <div>
            <PageBreadcrumb pageTitle="Users" />
            <div className="space-y-6">
                <ComponentCard title="User List">
                    <TableToolbar setSearch={setSearch} limit={limit} setLimit={setLimit} search={search} />
                    <UserTable data={users} />
                    <TableFooter pagination={pagination} onPageChange={handlePageChange} />
                </ComponentCard>
            </div>
        </div>
    );
}
