"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import MakerService from '@/services/MakerService';
import { Maker } from '@/types/maker';
import { makerValidator } from '@/validators/makerValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';

const CreateOperator = () => {

    const { mutate: createMutation, isPending } = useCreateData(
        MakerService.create,
        ["makers"],
        "/makers"
    );
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(makerValidator),
    })

    const onSubmit = (data: Maker) => {
        createMutation(data);
    };

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'makers', href: '/makers' }, { label: 'Create' }]} />
            <div className="space-y-6">
                <ComponentCard title="Create Maker">
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

export default CreateOperator
