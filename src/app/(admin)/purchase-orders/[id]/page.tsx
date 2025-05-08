"use client"
import React, { useEffect } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useFetchData } from "@/hooks/useFetchData";
import FilterPurchaseOrder from "@/components/pages/purchase-orders/Filter";
import PurchaseOrderService from "@/services/PurchaseOrderService";
import { useParams } from "next/navigation";
import { useFetchById } from "@/hooks/useFetchDetailData";
import Breadcrumb from "@/components/common/Breadcrumb";
import { dateFormat } from "@/utils/dateFormat";

export default function Page() {
    const params = useParams();
    const id = params.id;
    const { data: purchaseOrder } = useFetchById<any>(PurchaseOrderService.getById, Number(id), "purchase-order");


    if (!purchaseOrder) return <div>Loading...</div>;

    console.log({ purchaseOrder })

    return (
        <div>
            {/* <PageBreadcrumb pageTitle="Detail" /> */}
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Purchase Order', href: '/purchase-orders' }, { label: 'Detail' }]} />
            <div className="space-y-6 flex justify-center">
                <ComponentCard title="Purchase Order Detail" className="w-full md:w-1/2">
                    <div className="flex justify-between gap-15">
                        <div className="w-full">
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold ">
                                    PO. Number
                                </div>
                                <div>
                                    {purchaseOrder?.po_number}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold ">
                                    PO. Date
                                </div>
                                <div>
                                    {dateFormat(purchaseOrder.po_date)}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold ">
                                    PR. Number
                                </div>
                                <div>
                                    {purchaseOrder?.pr_number}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold ">
                                    PR. Date
                                </div>
                                <div>
                                    {dateFormat(purchaseOrder.pr_date)}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold ">
                                    Department
                                </div>
                                <div>
                                    {purchaseOrder?.department}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold ">
                                    Supplier
                                </div>
                                <div>
                                    {purchaseOrder?.supplier}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold">
                                    Created
                                </div>
                                <div>
                                    {dateFormat(purchaseOrder.createdAt)}
                                </div>
                            </div>
                        </div>

                    </div>
                </ComponentCard>
            </div>
        </div>
    );
}
