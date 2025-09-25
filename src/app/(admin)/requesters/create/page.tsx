"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import FormSelect2 from '@/components/form/FormSelect2';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import { useFetchData } from '@/hooks/useFetchData';
import GroupService from '@/services/GroupService';
import RequesterService from '@/services/RequesterService';
import { Group } from '@/types/group';
import { createRequesterValidator } from '@/validators/RequesterValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type CreateFromRequesterValidator = z.infer<typeof createRequesterValidator>;

export default function Page() {
    const { mutate: createMutation, isPending } = useCreateData(
        RequesterService.create,
        ["requesters"],
        "/requesters"
    );
    const {
        data: groups,
        isLoading
    } = useFetchData(GroupService.getWithoutPagination, "groups", false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm<CreateFromRequesterValidator>({
        resolver: zodResolver(createRequesterValidator),
        mode: "onChange",
        defaultValues: {
            name: "",
            group_id: null
        }
    });

    const onSubmit = (data: CreateFromRequesterValidator) => {
        const formData = {
            ...data,
            group_id: data.group_id?.value || null
        }
        createMutation(formData, {
            onSuccess: () => {
                reset();
            }
        });
    };

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Requester', href: '/requesters' },
                    { label: 'Create' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Create Requester">
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
                                disabled={isPending}
                                loading={isPending}
                            >
                                Create Requester
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
