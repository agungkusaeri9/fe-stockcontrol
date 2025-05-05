"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import DepartmentService from '@/services/DepartmentService';
import { Department } from '@/types/department';
import { departmentUpdateValidation } from '@/validators/department/edit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

const EditDepartment = () => {
    const params = useParams();
    const id = params.id;

    const { data: department } = useFetchById(DepartmentService.getById, Number(id), "department");

    const { mutate: updateMutation, isPending } = useUpdateData(DepartmentService.update, Number(id), "departments", "/departments");
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(departmentUpdateValidation)
    })
    useEffect(() => {
        if (department) {
            reset({
                name: department.name,
                code: department.code,
                number: department.number,
            });
        }
    }, [department]);

    const onSubmit = (data: {
        name: string;
        code: string;
        number: string;
    }) => {
        updateMutation(data);
    };

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'departments', href: '/departments' }, { label: 'Edit' }]} />
            <div className="space-y-6">
                <ComponentCard title="Create department">
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
                            Update
                        </Button>
                    </form>
                </ComponentCard>
            </div>
        </div>
    )
}

export default EditDepartment
