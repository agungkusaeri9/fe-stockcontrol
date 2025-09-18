"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import OperatorService from '@/services/OperatorService';
import { operatorCreateValidator } from '@/validators/operator/operatorCreate';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';

const CreateOperator = () => {
    type formData = {
        name: string;
        nik: string;
        username: string;
        password: string;
    }

    const { mutate: createMutation, isPending } = useCreateData(
        OperatorService.create,
        ["operators"],
        "/operators"
    );
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(operatorCreateValidator),
    });
    const onSubmit = (data: formData) => {
        createMutation(data);
    };
    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Operators', href: '/operators' }, { label: 'Create' }]} />
            <div className="space-y-6">
                <ComponentCard title="Create Operator">
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
                        <InputLabel
                            label="NIK"
                            name="nik"
                            type="text"
                            required
                            placeholder="Enter NIK"
                            register={register("nik")}
                            error={errors.nik}
                        />
                        <InputLabel
                            label="Username"
                            name="username"
                            type="text"
                            required
                            placeholder="Enter Username"
                            register={register("username")}
                            error={errors.username}
                        />
                        <InputLabel
                            label="Password"
                            name="password"
                            type="password"
                            required
                            placeholder="Enter password"
                            register={register("password")}
                            error={errors.password}
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
                                Create Operator
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    )
}

export default CreateOperator
