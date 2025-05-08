"use client"
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FilterStockIn from "@/components/pages/stock-in/FilterStockIn";

export default function UserListPage() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Stock In" />
            <div className="space-y-6">
                <FilterStockIn />
                <ComponentCard title="Stock In History">
                    <h1>Test Stok In</h1>
                </ComponentCard>
            </div>
        </div>
    );
}
