"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard';
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import RackService from '@/services/RackService';
import { Rack } from '@/types/rack';
import { updateRackValidator } from '@/validators/rackValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

const EditRack = () => {
    const params = useParams();
    const id = params.id;
    type formData = {
        code: string;
        name: string;
    }
    const { data: rack } = useFetchById<Rack>(RackService.getById, Number(id), "rack");
    const { mutate: updateMutation, isPending } = useUpdateData(RackService.update, Number(id), "racks", "/racks");
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(updateRackValidator)
    })
    useEffect(() => {
        if (rack) {
            reset({
                name: rack.name,
                code: rack.code
            });
        }
    }, [rack, reset]);

    const onSubmit = (data: formData) => {
        updateMutation(data);
    }
    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'racks', href: '/racks' }, { label: 'Edit' }]} />
            <div className="space-y-6">
                <ComponentCard title="Create rack">
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

export default EditRack
