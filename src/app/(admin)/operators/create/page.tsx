"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import OperatorCreate from '@/components/pages/operator/OperatorCreate';
import dynamic from 'next/dynamic';
import React from 'react'

const CreateOperator = () => {
    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Operators', href: '/operators' }, { label: 'Create' }]} />
            <div className="space-y-6">
                <ComponentCard title="Create Operator">
                    <OperatorCreate />
                </ComponentCard>
            </div>
        </div>
    )
}

export default CreateOperator
