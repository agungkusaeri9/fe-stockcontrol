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
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

export default function Page() {
    const params = useParams();
    const id = params.id;
    const { data: purchaseOrder } = useFetchById<any>(PurchaseOrderService.getById, Number(id), "purchase-order");

    if (!purchaseOrder) return <div>Loading...</div>;

    return (
        <div>
            {/* <PageBreadcrumb pageTitle="Detail" /> */}
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Purchase Order', href: '/purchase-orders' }, { label: 'Detail' }]} />
            <div className="container mx-auto px-4">
                <ComponentCard title="Purchase Order Detail" className="w-full mb-2">
                    <div className="w-full grid grid-cols-2 gap-10">
                        <div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm">
                                    PO. Number
                                </div>
                                <div className="text-sm font-normal">
                                    {purchaseOrder?.po_number}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm">
                                    PO. Date
                                </div>
                                <div className="text-sm font-normal">
                                    {dateFormat(purchaseOrder.po_date)}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm">
                                    PR. Number
                                </div>
                                <div className="text-sm font-normal">
                                    {purchaseOrder?.pr_number}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm">
                                    PR. Date
                                </div>
                                <div className="text-sm font-normal">
                                    {dateFormat(purchaseOrder.pr_date)}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm">
                                    Department
                                </div>
                                <div className="text-sm font-normal">
                                    {purchaseOrder?.department}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm">
                                    Supplier
                                </div>
                                <div className="text-sm font-normal">
                                    {purchaseOrder?.supplier}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm">
                                    Created
                                </div>
                                <div className="text-sm font-normal">
                                    {dateFormat(purchaseOrder.createdAt)}
                                </div>
                            </div>
                        </div>
                    </div>
                </ComponentCard>
                <ComponentCard title="Products" className="w-full">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                        <div className="max-w-full overflow-x-auto">
                            <div className="">
                                <Table>
                                    {/* Table Header */}
                                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                        <TableRow isHeader={true}>
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
                                                Code
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Description
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Spesification
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Qty
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Remark
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Status
                                            </TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {purchaseOrder?.purchase_order_details?.map((detail: any, index: number) => (
                                            <TableRow key={detail.id}>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {detail.product_code}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {detail.description}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {detail.spesification}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {detail.quantity}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {detail.remark}
                                                </TableCell>
                                                <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    {detail.status}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </ComponentCard>
            </div>
        </div >
    );
}
