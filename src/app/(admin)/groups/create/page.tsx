"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import TextAreaLabel from '@/components/form/FormTextArea';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import GroupService from '@/services/GroupService';
import { createGroupValidator } from '@/validators/GroupValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type CreateFromGroupValidator = z.infer<typeof createGroupValidator>;

export default function Page() {
    const { mutate: createMutation, isPending } = useCreateData(
        GroupService.create,
        ["groups"],
        "/groups"
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CreateFromGroupValidator>({
        resolver: zodResolver(createGroupValidator),
        mode: "onChange",
        defaultValues: {
            name: "",
            description: null
        }
    });

    const onSubmit = (data: CreateFromGroupValidator) => {
        createMutation(data, {
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
                    { label: 'Groups', href: '/groups' },
                    { label: 'Create' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Create Group">
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
                                disabled={isPending}
                                loading={isPending}
                            >
                                Create Group
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
