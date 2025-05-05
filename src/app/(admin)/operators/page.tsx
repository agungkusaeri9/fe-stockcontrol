import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import OperatorTable from "@/components/pages/operator/OperatorTable";
import ButtonLink from "@/components/ui/button/ButtonLink";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function UserListPage() {
    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Operators', href: '/operators' }]} />
            <div className="space-y-6">
                <ComponentCard title="Operator List">
                    <ButtonLink size='xs' href="/operators/create">Create Operator</ButtonLink>
                    <OperatorTable />
                </ComponentCard>
            </div>
        </div>
    );
}
