"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import OperatorCreate from '@/components/pages/operator/OperatorCreate';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import DepartmentService from '@/services/DepartmentService';
import { departmentCreateValidation } from '@/validators/machineArea/departmentCreate';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const CreateOperator = () => {
    const { mutate: createMutation, isPending } = useCreateData(
        DepartmentService.create,
        ["departments"],
        "/departments"
    );

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(departmentCreateValidation),
    })

    const onSubmit = (data: any) => {
        createMutation(data);
    };

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Departments', href: '/departments' }, { label: 'Create' }]} />
            <div className="space-y-6">
                <ComponentCard title="Create Department">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputLabel
                            label="Code"
                            name="code"
                            type="text"
                            required
                            placeholder="Enter Code"
                            register={register("code")}
                            error={errors.code}
                        />
                        <InputLabel
                            label="Number"
                            name="number"
                            type="text"
                            required
                            placeholder="Enter Number"
                            register={register("number")}
                            error={errors.number}
                        />
                        <InputLabel
                            label="Name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter Name"
                            register={register("name")}
                            error={errors.name}
                        />
                        <Button size="sm" variant="primary" className="w-full mt-4" disabled={isPending} loading={isPending}>
                            Create
                        </Button>
                    </form>
                </ComponentCard>
            </div>
        </div>
    )
}

export default CreateOperator
