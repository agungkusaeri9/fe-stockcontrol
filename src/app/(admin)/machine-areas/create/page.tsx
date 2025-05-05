"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import MachineAreaService from '@/services/MachineAreaService';
import { MachineArea } from '@/types/machineArea';
import { machineAreaValidator } from '@/validators/machineAreaValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';

const CreateOperator = () => {

    const { mutate: createMutation, isPending } = useCreateData(
        MachineAreaService.create,
        ["machine-areas"],
        "/machine-areas"
    );
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(machineAreaValidator),
    })

    const onSubmit = (data: MachineArea) => {
        createMutation(data);
    };

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'machine-areas', href: '/machine-areas' }, { label: 'Create' }]} />
            <div className="space-y-6">
                <ComponentCard title="Create Machine Area">
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
