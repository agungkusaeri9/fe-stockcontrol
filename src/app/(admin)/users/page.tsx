"use client"
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UserTable from "@/components/pages/user/UserTable";

export default function UserListPage() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Users" />
            <div className="space-y-6">
                <ComponentCard title="User List">
                    <UserTable />
                </ComponentCard>
            </div>
        </div>
    );
}
