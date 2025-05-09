"use client"
import React, { useEffect } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PurchaseRequestService from "@/services/PurchaseRequestService";
import { useParams } from "next/navigation";
import { useFetchById } from "@/hooks/useFetchDetailData";
import Breadcrumb from "@/components/common/Breadcrumb";
import { dateFormat } from "@/utils/dateFormat";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { formatNumber } from "@/utils/currencyFormat";

export default function Page() {
    const params = useParams();
    const id = params.id;
    const { data: purchaseRequest } = useFetchById<any>(PurchaseRequestService.getById, Number(id), "purchase-orderrequests");

    if (!purchaseRequest) return <div>Loading...</div>;

    console.log(purchaseRequest);

    return (
        <div>
            {/* <PageBreadcrumb pageTitle="Detail" /> */}
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Purchase Request', href: '/purchase-requests' }, { label: 'Detail' }]} />
            <div className="container mx-auto px-4">
                <ComponentCard title="Purchase Request Detail" className="w-full mb-2">
                    <div className="w-full grid grid-cols-2 gap-10">
                        <div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm text-gray-800">
                                    PR. Number
                                </div>
                                <div className="text-sm font-normal text-gray-800">
                                    {purchaseRequest?.pr_number}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm text-gray-800">
                                    PR. Date
                                </div>
                                <div className="text-sm font-normal text-gray-800">
                                    {dateFormat(purchaseRequest.pr_date)}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm text-gray-800">
                                    Budget. Number
                                </div>
                                <div className="text-sm font-normal text-gray-800">
                                    {purchaseRequest?.budget_number}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm text-gray-800">
                                    Type
                                </div>
                                <div className="text-sm font-normal text-gray-800">
                                    {purchaseRequest?.type ?? "-"}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm text-gray-800">
                                    Department
                                </div>
                                <div className="text-sm font-normal text-gray-800">
                                    {purchaseRequest.department}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm text-gray-800">
                                    Fixed Asset Number
                                </div>
                                <div className="text-sm font-normal text-gray-800">
                                    {purchaseRequest?.fix_asset_number ?? "-"}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm text-gray-800">
                                    Kind Of Request
                                </div>
                                <div className="text-sm font-normal text-gray-800">
                                    {purchaseRequest?.kind_of_request ?? '-'}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm text-gray-800">
                                    Requested
                                </div>
                                <div className="text-sm font-normal text-gray-800">
                                    {purchaseRequest?.requested}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm text-gray-800">
                                    Supervisor
                                </div>
                                <div className="text-sm font-normal text-gray-800">
                                    {purchaseRequest?.supervisor ?? '-'}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm text-gray-800">
                                    Transportation
                                </div>
                                <div className="text-sm font-normal text-gray-800">
                                    {purchaseRequest?.transaportation ?? '-'}
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 mb-2">
                                <div className="font-semibold text-sm text-gray-800">
                                    Created
                                </div>
                                <div className="text-sm font-normal text-gray-800">
                                    {dateFormat(purchaseRequest.createdAt)}
                                </div>
                            </div>
                        </div>
                    </div>
                </ComponentCard>
                <ComponentCard title="Products" className="w-full">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                        <div className="max-w-full overflow-x-auto">
                            <div className="">
                                <Table className="">
                                    {/* Table Header */}
                                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                        <TableRow isHeader={true}>
                                            <TableCell
                                                isHeader
                                                className="px-5 font-medium py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                #
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 font-medium py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Item Code
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 font-medium py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Item Name
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 font-medium py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Description Of Good
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 font-medium py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Spesification
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 font-medium py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Part
                                            </TableCell>

                                            <TableCell
                                                isHeader
                                                className="px-5 font-medium py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Qty
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 font-medium py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Unit
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 font-medium py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Est. Unit Price
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 font-medium py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Est. Amount
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 font-medium py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Currency
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 font-medium py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Req. Deliv.
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 font-medium py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Supplier
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 font-medium py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Remark
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 font-medium py-2 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Purpose
                                            </TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {purchaseRequest?.purchase_request_details?.map((detail: any, index: number) => (
                                            <TableRow key={detail.id}>
                                                <TableCell width="120" className="text-gray-500 px-2 text-xs text-center text-theme-sm dark:text-gray-400">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell width="120" className="text-gray-500 px-2 text-xs text-center text-theme-sm dark:text-gray-400">
                                                    {detail.item_code}
                                                </TableCell>
                                                <TableCell width="120" className="text-gray-500 px-2 text-xs text-center text-theme-sm dark:text-gray-400">
                                                    {detail.item_name}
                                                </TableCell>
                                                <TableCell width="120" className="text-gray-500 px-2 text-xs text-center text-theme-sm dark:text-gray-400">
                                                    {detail.description_of_good}
                                                </TableCell>
                                                <TableCell width="120" className="text-gray-500 px-2 text-xs text-center text-theme-sm dark:text-gray-400">
                                                    {detail.spesification}
                                                </TableCell>
                                                <TableCell width="120" className="text-gray-500 px-2 text-xs text-center text-theme-sm dark:text-gray-400">
                                                    {detail.part}
                                                </TableCell>
                                                <TableCell width="120" className="text-gray-500 px-2 text-xs text-center text-theme-sm dark:text-gray-400">
                                                    {detail.quantity}
                                                </TableCell>
                                                <TableCell width="120" className="text-gray-500 px-2 text-xs text-center text-theme-sm dark:text-gray-400">
                                                    {detail.unit}
                                                </TableCell>
                                                <TableCell width="120" className="text-gray-500 px-2 text-xs text-center text-theme-sm dark:text-gray-400">
                                                    {formatNumber(detail.est_unit_price)}
                                                </TableCell>
                                                <TableCell width="120" className="text-gray-500 px-2 text-xs text-center text-theme-sm dark:text-gray-400">
                                                    {formatNumber(detail.est_amount)}
                                                </TableCell>
                                                <TableCell width="120" className="text-gray-500 px-2 text-xs text-center text-theme-sm dark:text-gray-400">
                                                    {detail.currency}
                                                </TableCell>
                                                <TableCell width="120" className="text-gray-500 px-2 text-xs text-center text-theme-sm dark:text-gray-400">
                                                    {dateFormat(detail.req_delivery)}
                                                </TableCell>
                                                <TableCell width="120" className="text-gray-500 px-2 text-xs text-center text-theme-sm dark:text-gray-400">
                                                    {detail.supplier}
                                                </TableCell>
                                                <TableCell width="120" className="text-gray-500 px-2 text-xs text-center text-theme-sm dark:text-gray-400">
                                                    {detail.remark}
                                                </TableCell>
                                                <TableCell width="120" className="text-gray-500 px-2 text-xs text-center text-theme-sm dark:text-gray-400">
                                                    {detail.purpose}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    {purchaseRequest?.purchase_request_details?.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={15} className="text-gray-500 px-2 dark:text-gray-400 p-5 text-xs text-center">
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </Table>
                            </div>
                        </div>
                    </div>
                </ComponentCard>
            </div>
        </div >
    );
}
