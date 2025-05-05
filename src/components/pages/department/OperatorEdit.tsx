'use client';

import InputLabel from '@/components/form/InputLabel';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import OperatorService from '@/services/OperatorService';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const OperatorEdit = () => {

    const params = useParams();
    const id = params.id;

    const { data: operator } = useFetchById(OperatorService.getOperatorById, Number(id), "operator");
    console.log(operator);

    const [form, setForm] = useState({
        name: '',
        nik: ''
    });

    useEffect(() => {
        if (operator) {
            setForm({
                name: operator.name,
                nik: operator.nik
            });
        }
    }, [operator]);
    const [formErrors, setFormErrors] = useState<any>({});

    const { mutate: updateMutation, isPending } = useUpdateData(OperatorService.updateOperator, Number(id), "operators", "/operators");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateMutation(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputLabel
                label="Name"
                name="name"
                type="text"
                required
                placeholder="Enter Name"
                value={form.name}
                onChange={handleChange}
                error={formErrors.name}
            />
            <InputLabel
                label="NIK"
                name="nik"
                type="text"
                required
                placeholder="Enter NIK"
                value={form.nik}
                onChange={handleChange}
                error={formErrors.nik}
            />
            <Button size="sm" variant="primary" className="w-full mt-4" disabled={isPending}>
                Update
            </Button>
        </form>
    );
};

export default OperatorEdit;
