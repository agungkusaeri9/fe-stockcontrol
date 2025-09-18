"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard';
import InputLabel from '@/components/form/FormInput';
import TextAreaLabel from '@/components/form/FormTextArea';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData'; import GroupService from '@/services/GroupService';
import { Group } from '@/types/group';
import { updateGroupValidator } from '@/validators/GroupValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type UpdateGroupFormData = z.infer<typeof updateGroupValidator>;

export default function Page() {
    const params = useParams();
    const id = Number(params.id);

    const { data: group, isLoading } = useFetchById<Group>(GroupService.getById, id, "group");
    const { mutate: updateMutation, isPending } = useUpdateData(
        GroupService.update,
        id,
        "groups",
        "/groups"
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UpdateGroupFormData>({
        resolver: zodResolver(updateGroupValidator),
        mode: "onChange",

    });

    useEffect(() => {
        if (group) {
            reset({
                name: group.name,
                description: group.description
            });
        }
    }, [group, reset]);

    const onSubmit = (data: UpdateGroupFormData) => {
        updateMutation(data);
    };

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'groups', href: '/groups' },
                    { label: 'Edit' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Edit Group">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputLabel
                            label="Name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter group name"
                            register={register("name")}
                            error={errors.name}
                        />
                        <TextAreaLabel
                            label="Description"
                            name="description"
                            placeholder="Enter group description"
                            register={register("description")}
                            error={errors.description}
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
                                Update Group
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
