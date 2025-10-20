"use client"
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { useParams } from "next/navigation";
import { useFetchById } from "@/hooks/useFetchDetailData";
import Breadcrumb from "@/components/common/Breadcrumb";
import { dateFormat } from "@/utils/dateFormat";
import { ManualPurchaseOrder } from "@/types/manualPurchaseOrder";
import ManualPurchaseOrderService from "@/services/ManualPurchaseOrderService";

export default function Page() {
    const params = useParams();
    const id = params.id;
    const { data: manualPurchaseOrder } = useFetchById<ManualPurchaseOrder>(ManualPurchaseOrderService.getById, Number(id), "manual-purchase-order");

    if (!manualPurchaseOrder) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
    );
    return (
        <div className="space-y-6">
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Manual Purchase Order', href: '/manual-purchase-orders' },
                    { label: 'Detail' }
                ]}
            />

            <div className="grid gap-6">
                <ComponentCard title="Purchase Order Detail" className="w-full">
                    <div className="grid md:grid-cols-1 gap-8">
                        <div className="space-y-4">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Date
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {dateFormat(manualPurchaseOrder?.date, "DD-MM-YYYY")}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        PO. Number
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {manualPurchaseOrder?.po_number}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        PR. Number
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {manualPurchaseOrder?.pr_number}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Kanban Code
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {manualPurchaseOrder?.kanban_code}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Kanban Description
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {manualPurchaseOrder?.kanban_description}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Kanban Specification
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {manualPurchaseOrder?.kanban_specification}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </ComponentCard>


            </div>
        </div>
    );
}
