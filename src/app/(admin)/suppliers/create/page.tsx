"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import SupplierService from '@/services/SupplierService';
import { createSupplierValidator } from '@/validators/SupplierValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';

const Page = () => {
    type formData = {
        name: string;
    }
    const { mutate: createMutation, isPending } = useCreateData(
        SupplierService.create,
        ["suppliers"],
        "/suppliers"
    );
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(createSupplierValidator),
    })

    const onSubmit = (data: formData) => {
        createMutation(data);
    };

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'suppliers', href: '/suppliers' }, { label: 'Create' }]} />
            <div className="space-y-6">
                <ComponentCard title="Create Supplier">
                    <form onSubmit={handleSubmit(onSubmit)}>
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

export default Page
