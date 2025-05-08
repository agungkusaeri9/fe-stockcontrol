"use client"
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FilterStockOut from "@/components/pages/stock-out/FilterStockOut";

export default function UserListPage() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Stock Out" />
            <div className="space-y-6">
                <FilterStockOut />
                <ComponentCard title="Stock Out History">
                    <h1>Test Stok Out</h1>
                </ComponentCard>
            </div>
        </div>
    );
}
