"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard';
import InputLabel from '@/components/form/FormInput';
import FormSelect2 from '@/components/form/FormSelect2';
import Button from '@/components/ui/button/Button';
import { useFetchData } from '@/hooks/useFetchData';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData'; import GroupService from '@/services/GroupService';
import RequesterService from '@/services/RequesterService';
import { Group } from '@/types/group';
import { Requester } from '@/types/requester';
import { updateRequesterValidator } from '@/validators/RequesterValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type UpdateRequesterFormData = z.infer<typeof updateRequesterValidator>;

export default function Page() {
    const params = useParams();
    const id = Number(params.id);

    const { data: requester, isLoading } = useFetchById<Requester>(RequesterService.getById, id, "requester");
    const { mutate: updateMutation, isPending } = useUpdateData(
        RequesterService.update,
        id,
        "requesters",
        "/requesters"
    );
    const {
        data: groups,
    } = useFetchData(GroupService.getWithoutPagination, "groups", false);


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm<UpdateRequesterFormData>({
        resolver: zodResolver(updateRequesterValidator),
        mode: "onChange",

    });

    useEffect(() => {
        if (requester) {
            reset({
                name: requester.name,
                group_id: requester.group ? { value: requester.group.id, label: requester.group.name } : null,
            });
        }
    }, [requester, reset]);

    const onSubmit = (data: UpdateRequesterFormData) => {
        const formData = {
            ...data,
            group_id: data.group_id?.value || null
        }
        updateMutation(formData);
    };

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Requester', href: '/requesters' },
                    { label: 'Edit' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Edit Requester">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputLabel
                            label="Name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter requester name"
                            register={register("name")}
                            error={errors.name}
                        />
                        {groups && !isLoading && (
                            <FormSelect2
                                label="Group"
                                name="group_id"
                                control={control}
                                options={groups.map((d: Group) => ({
                                    label: d.name!,
                                    value: d.id!,
                                }))}
                                error={errors.group_id?.message}
                                placeholder="Select Group"
                            />
                        )}
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
                                Update Requester
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
