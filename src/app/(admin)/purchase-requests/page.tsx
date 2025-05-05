"use client"
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AreaTable from "@/components/pages/area/AreaTable";
import StockInTable from "@/components/pages/stock-in/StockInTable";
import PurchaseOrderTable from "@/components/pages/purchase-order/PurchaseOrderTable";
import PurchaseRequestTable from "@/components/pages/purchase-request/PurchaseRequestTable";

export default function UserListPage() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Purchase Requests" />
            <div className="space-y-6">
                <ComponentCard title="Purchase Request History">
                    <PurchaseRequestTable />
                </ComponentCard>
            </div>
        </div>
    );
}
