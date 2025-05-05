"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import { useFetchData } from '@/hooks/useFetchData';
import KanbanService from '@/services/KanbanService';
import MakerService from '@/services/MakerService';
import RackService from '@/services/RackService';
import SparePartService from '@/services/SparePartService';
import SupplierService from '@/services/SupplierService';
import { MachineArea } from '@/types/machineArea';
import { Sparepart } from '@/utils/sparepart';
import { createKanbanValidator } from '@/validators/kanbanValidator';
import { machineAreaValidator } from '@/validators/machineAreaValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';

const CreateOperator = () => {
    type formData = {
        js_code: string;
        quantity: number;
        lead_time: number;
        spare_part_id: number;
        supplier_id: number;
        maker_id: number;
        rack_id: number;
    }
    const { data: spareparts } = useFetchData(SparePartService.getWithoutPagination, "spareparts", false);
    const { data: suppliers } = useFetchData(SupplierService.getWithoutPagination, "suppliers", false);
    const { data: makers } = useFetchData(MakerService.getWithoutPagination, "makers", false);
    const { data: racks } = useFetchData(RackService.getWithoutPagination, "racks", false);
    const { mutate: createMutation, isPending } = useCreateData(
        KanbanService.create,
        ["kanbans"],
        "/kanbans"
    );
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(createKanbanValidator),
    })

    const onSubmit = (data: any) => {
        createMutation(data);
    };

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'kanbans', href: '/kanbans' }, { label: 'Create' }]} />
            <div className="space-y-6">
                <ComponentCard title="Create Kanban">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputLabel
                            label="JS Code"
                            name="js_code"
                            type="text"
                            required
                            placeholder="Enter Code"
                            register={register("js_code")}
                            error={errors.js_code}
                        />
                        <InputLabel
                            label="Quantity"
                            name="quantity"
                            type="number"
                            required
                            placeholder="Enter Quantity"
                            register={register("quantity", { valueAsNumber: true })}
                            error={errors.quantity}
                        />
                        <InputLabel
                            label="Lead TIme"
                            name="lead_time"
                            type="number"
                            required
                            placeholder="Enter Lead Time"
                            register={register("lead_time", { valueAsNumber: true })}
                            error={errors.lead_time}
                        />
                        {spareparts && (
                            <SelectLabel
                                label="Sparepart"
                                name="spare_part_id"
                                required
                                register={register("spare_part_id", { valueAsNumber: true })}
                                error={errors.spare_part_id}
                                options={spareparts.map((d: any) => ({
                                    label: d.part_number + " - " + d.name,
                                    value: d.id,
                                }))}
                            />
                        )}
                        {suppliers && (
                            <SelectLabel
                                label="Supplier"
                                name="supplier_id"
                                required
                                register={register("supplier_id", { valueAsNumber: true })}
                                error={errors.supplier_id}
                                options={suppliers.map((d: any) => ({
                                    label: d.name,
                                    value: d.id,
                                }))}
                            />
                        )}
                        {makers && (
                            <SelectLabel
                                label="Maker"
                                name="maker_id"
                                required
                                register={register("maker_id", { valueAsNumber: true })}
                                error={errors.maker_id}
                                options={makers.map((d: any) => ({
                                    label: d.name,
                                    value: d.id,
                                }))}
                            />
                        )}
                        {racks && (
                            <SelectLabel
                                label="Rack"
                                name="rack_id"
                                required
                                register={register("rack_id", { valueAsNumber: true })}
                                error={errors.rack_id}
                                options={racks.map((d: any) => ({
                                    label: d.name,
                                    value: d.id,
                                }))}
                            />
                        )}
                        <Button size="sm" variant="primary" className="w-full mt-4" disabled={isPending} loading={isPending}>
                            Create
                        </Button>
                    </form>
                </ComponentCard>
            </div>
        </div>
    )
}

export default CreateOperator
