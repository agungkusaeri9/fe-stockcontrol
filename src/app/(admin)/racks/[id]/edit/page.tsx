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
import { z } from 'zod';

type UpdateRackFormData = z.infer<typeof updateRackValidator>;

export default function EditRack() {
    const params = useParams();
    const id = Number(params.id);
    
    const { data: rack, isLoading } = useFetchById<Rack>(RackService.getById, id, "rack");
    const { mutate: updateMutation, isPending } = useUpdateData(
        RackService.update, 
        id, 
        "racks", 
        "/racks"
    );

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        reset 
    } = useForm<UpdateRackFormData>({
        resolver: zodResolver(updateRackValidator),
        mode: "onChange",
    });

    useEffect(() => {
        if (rack) {
            reset({
                code: rack.code
            });
        }
    }, [rack, reset]);

    const onSubmit = (data: UpdateRackFormData) => {
        updateMutation(data);
    };

    return (
        <div>
            <Breadcrumb 
                items={[
                    { label: 'Dashboard', href: '/dashboard' }, 
                    { label: 'Racks', href: '/racks' }, 
                    { label: 'Edit' }
                ]} 
            />
            <div className="space-y-6">
                <ComponentCard title="Edit Rack">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputLabel
                            label="Code"
                            name="code"
                            type="text"
                            required
                            placeholder="Enter rack code"
                            register={register("code")}
                            error={errors.code}
                        />
                        <div className="flex justify-end gap-2 mt-6">
                            <Button 
                                type="button"
                                size="sm" 
                                variant="secondary" 
                                className="px-4"
                                onClick={() => reset()}
                            >
                                Reset
                            </Button>
                            <Button 
                                type="submit"
                                size="sm" 
                                variant="primary" 
                                className="px-4" 
                                disabled={isPending || isLoading} 
                                loading={isPending}
                            >
                                Update Rack
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
