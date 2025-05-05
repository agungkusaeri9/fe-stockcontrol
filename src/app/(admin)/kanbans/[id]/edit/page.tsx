"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import MachineAreaService from '@/services/MachineAreaService';
import { MachineArea } from '@/types/machineArea';
import { machineAreaValidator } from '@/validators/machineAreaValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

const EditPage = () => {
    const params = useParams();
    const id = params.id;

    const { data: machineArea } = useFetchById(MachineAreaService.getById, Number(id), "machineArea");

    useEffect(() => {
        if (machineArea) {
            reset({
                name: machineArea.name,
                code: machineArea.code
            });
        }
    }, [machineArea]);

    const { mutate: updateMutation, isPending } = useUpdateData(MachineAreaService.update, Number(id), "machine-areas", "/machine-areas");
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(machineAreaValidator)
    })

    const onSubmit = (data: MachineArea) => {
        updateMutation(data);
    };
    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'machine-areas', href: '/machine-areas' }, { label: 'Edit' }]} />
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

export default EditPage
