"use client"
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AreaTable from "@/components/pages/area/AreaTable";
import BalanceTable from "@/components/pages/balance/BalanceTable";
import ReminderTable from "@/components/pages/reminder/ReminderTable";

export default function BalancePageList() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Reminder" />
            <div className="space-y-6">
                <ComponentCard title="Reminder">
                    <ReminderTable />
                </ComponentCard>
            </div>
        </div>
    );
}
