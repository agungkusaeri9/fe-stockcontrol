'use client';

import Button from '@/components/ui/button/Button';
import { useUpdateData } from '@/hooks/useUpdateData';
import { useFetchById } from '@/hooks/useFetchDetailData';
import OperatorService from '@/services/OperatorService';
import { operatorUpdateValidation } from '@/validators/operator/operatorUpdate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputLabel from '@/components/form/FormInput';

const OperatorEdit = () => {
    const params = useParams();
    const id = params.id;

    const { data: operator } = useFetchById(OperatorService.getOperatorById, Number(id), "operator");
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(operatorUpdateValidation),
    });

    useEffect(() => {
        if (operator) {
            reset({
                name: operator.name,
                nik: operator.nik,
            });
        }
    }, [operator, reset]);

    const { mutate: updateMutation, isPending } = useUpdateData(
        OperatorService.updateOperator,
        Number(id),
        "operators",
        "/operators"
    );

    const onSubmit = (data: any) => {
        updateMutation(data);
    };

    return (
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
            <Button
                size="sm"
                variant="primary"
                className="w-full mt-4"
                disabled={isPending}
                loading={isPending}
            >
                Update
            </Button>
        </form>
    );
};

export default OperatorEdit;
