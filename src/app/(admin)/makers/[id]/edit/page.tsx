"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import MakerService from '@/services/MakerService';
import { Maker } from '@/types/maker';
import { makerValidator } from '@/validators/makerValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

const EditPage = () => {
    const params = useParams();
    const id = params.id;

    const { data: maker } = useFetchById(MakerService.getById, Number(id), "maker");

    useEffect(() => {
        if (maker) {
            reset({
                name: maker.name
            });
        }
    }, [maker]);

    const { mutate: updateMutation, isPending } = useUpdateData(MakerService.update, Number(id), "makers", "/makers");
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(makerValidator)
    })

    const onSubmit = (data: Maker) => {
        updateMutation(data);
    };
    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'makers', href: '/makers' }, { label: 'Edit' }]} />
            <div className="space-y-6">
                <ComponentCard title="Create department">
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
                            Update
                        </Button>
                    </form>
                </ComponentCard>
            </div>
        </div>
    )
}

export default EditPage
