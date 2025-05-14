"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createPartValidator } from '@/validators/sparepartValidator';
import PartService from '@/services/PartService';
import TextAreaLabel from '@/components/form/FormTextArea';
import { z } from 'zod';

type CreatePartFormData = z.infer<typeof createPartValidator>;

const CreatePart = () => {
    const { mutate: createMutation, isPending } = useCreateData(
        PartService.create,
        ["parts"],
        "/parts"
    );

    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors } 
    } = useForm<CreatePartFormData>({
        resolver: zodResolver(createPartValidator),
        mode: "onChange"
    });

    const onSubmit = (data: CreatePartFormData) => {
        createMutation(data, {
            onSuccess: () => {
                reset();
            }
        });
    };

    return (
        <div>
            <Breadcrumb items={[
                { label: 'Dashboard', href: '/dashboard' }, 
                { label: 'Parts', href: '/parts' }, 
                { label: 'Create' }
            ]} />
            <div className="space-y-6">
                <ComponentCard title="Create Part">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputLabel
                            label="Code"
                            name="code"
                            type="text"
                            required
                            placeholder="Enter part code"
                            register={register("code")}
                            error={errors.code}
                        />
                        <InputLabel
                            label="Balance"
                            name="balance"
                            type="number"
                            required
                            placeholder="Enter initial balance"
                            register={register("balance", { valueAsNumber: true })}
                            error={errors.balance}
                        />
                        <TextAreaLabel
                            label="Description"
                            name="description"
                            required
                            placeholder="Enter part description"
                            register={register("description")}
                            error={errors.description}
                            rows={4}
                        />
                         <TextAreaLabel
                            label="Specification"
                            name="specification"
                            required
                            placeholder="Enter part specification"
                            register={register("specification")}
                            error={errors.specification}
                            rows={4}
                        />
                        <InputLabel
                            label="Minimum Quantity"
                            name="min_quantity"
                            type="number"
                            required
                            placeholder="Enter minimum quantity"
                            register={register("min_quantity", { valueAsNumber: true })}
                            error={errors.min_quantity}
                        />
                        <InputLabel
                            label="Maximum Quantity"
                            name="max_quantity"
                            type="number"
                            required
                            placeholder="Enter maximum quantity"
                            register={register("max_quantity", { valueAsNumber: true })}
                            error={errors.max_quantity}
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
                            >
                                {isPending ? 'Creating...' : 'Create Part'}
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
};

export default CreatePart;
