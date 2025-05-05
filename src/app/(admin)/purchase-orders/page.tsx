"use client"
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AreaTable from "@/components/pages/area/AreaTable";
import StockInTable from "@/components/pages/stock-in/StockInTable";
import PurchaseOrderTable from "@/components/pages/purchase-order/PurchaseOrderTable";

export default function UserListPage() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Purchase Orders" />
            <div className="space-y-6">
                <ComponentCard title="Purchase Order History">
                    <PurchaseOrderTable />
                </ComponentCard>
            </div>
        </div>
    );
}
