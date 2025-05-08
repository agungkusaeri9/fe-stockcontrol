"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import SupplierService from '@/services/SupplierService';
import { updateSupplierValidator } from '@/validators/SupplierValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

const EditPage = () => {
    type FormData = {
        name: string;
    }
    const params = useParams();
    const id = params.id;
    const { data: supplier } = useFetchById(SupplierService.getById, Number(id), "supplier");
    const { mutate: updateMutation, isPending } = useUpdateData(SupplierService.update, Number(id), "suppliers", "/suppliers");
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(updateSupplierValidator)
    })
    useEffect(() => {
        if (supplier) {
            reset({
                name: supplier.name
            });
        }
    }, [supplier, reset]);

    const onSubmit = (data: FormData) => {
        updateMutation(data);
    };
    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'suppliers', href: '/suppliers' }, { label: 'Edit' }]} />
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
