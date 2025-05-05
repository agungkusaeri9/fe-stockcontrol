"use client"
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AreaTable from "@/components/pages/area/AreaTable";
import StockInTable from "@/components/pages/stock-in/StockInTable";
import StockOutTable from "@/components/pages/stock-out/StockOutTable";
import FilterStockOut from "@/components/pages/stock-out/FilterStockOut";

export default function UserListPage() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Stock Out" />
            <div className="space-y-6">
                <FilterStockOut />
                <ComponentCard title="Stock Out History">
                    <StockOutTable />
                </ComponentCard>
            </div>
        </div>
    );
}
