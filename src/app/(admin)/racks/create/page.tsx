"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import RackService from '@/services/RackService';
import { createRackValidator } from '@/validators/rackValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const CreateOperator = () => {
    type formData = {
        code: string;
        name: string;
    }
    const { mutate: createMutation, isPending } = useCreateData(
        RackService.create,
        ["racks"],
        "/racks"
    );

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(createRackValidator),
    })

    const onSubmit = (data: formData) => {
        createMutation(data);
    }

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'racks', href: '/racks' }, { label: 'Create' }]} />
            <div className="space-y-6">
                <ComponentCard title="Create Rack">
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
