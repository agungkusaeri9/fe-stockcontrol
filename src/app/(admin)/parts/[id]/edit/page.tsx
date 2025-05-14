"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import React from 'react'

const CreateOperator = () => {
   

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'spareparts', href: '/spareparts' }, { label: 'Edit' }]} />
            <div className="space-y-6">
                <ComponentCard title="Edit Sparepart">
                   <h1>Update Part</h1>
                </ComponentCard>
            </div>
        </div>
    )
}

export default CreateOperator
