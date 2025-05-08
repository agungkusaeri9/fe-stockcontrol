import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";

export const metadata: Metadata = {
  title:
    "WMS - Admin"
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 ">
        <EcommerceMetrics />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>
    </div>
  );
}
