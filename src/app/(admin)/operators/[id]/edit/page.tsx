"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import OperatorEdit from '@/components/pages/operator/OperatorEdit';
import dynamic from 'next/dynamic';
import React from 'react'

const EditOperator = () => {
    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Operators', href: '/operators' }, { label: 'Edit' }]} />
            <div className="space-y-6">
                <ComponentCard title="Edit Operator">
                    <OperatorEdit />
                </ComponentCard>
            </div>
        </div>
    )
}

export default EditOperator
