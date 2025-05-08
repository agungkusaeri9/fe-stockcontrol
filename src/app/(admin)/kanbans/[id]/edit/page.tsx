"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import Button from '@/components/ui/button/Button';
import { useFetchData } from '@/hooks/useFetchData';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import KanbanService from '@/services/KanbanService';
import MakerService from '@/services/MakerService';
import RackService from '@/services/RackService';
import SparePartService from '@/services/SparePartService';
import SupplierService from '@/services/SupplierService';
import { Kanban } from '@/types/kanban';
import { Maker } from '@/types/maker';
import { Rack } from '@/types/rack';
import { Supplier } from '@/types/supplier';
import { Sparepart } from '@/utils/sparepart';
import { updateKanbanValidator } from '@/validators/kanbanValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

const EditPage = () => {

    const params = useParams();
    const id = params.id;
    type formData = {
        js_code: string;
        quantity: number;
        lead_time: number;
        spare_part_id: number;
        supplier_id: number;
        maker_id: number;
        rack_id: number;
    }
    const { data: kanban } = useFetchById<Kanban>(KanbanService.getById, Number(id), "kanban");
    const { data: spareparts } = useFetchData(SparePartService.getWithoutPagination, "spareparts", false);
    const { data: suppliers } = useFetchData(SupplierService.getWithoutPagination, "suppliers", false);
    const { data: makers } = useFetchData(MakerService.getWithoutPagination, "makers", false);
    const { data: racks } = useFetchData(RackService.getWithoutPagination, "racks", false);
    const { mutate: updateMutation, isPending } = useUpdateData(KanbanService.update, Number(id), "kanbans", "/kanbans");
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(updateKanbanValidator),
    })

    useEffect(() => {
        if (kanban) {
            reset({
                js_code: kanban?.js_code,
                quantity: kanban?.quantity,
                lead_time: kanban?.lead_time,
                spare_part_id: kanban?.spare_part?.id,
                supplier_id: kanban?.supplier?.id,
                maker_id: kanban?.maker?.id,
                rack_id: kanban?.rack?.id,
            });
        }
    }, [kanban, reset]);

    const onSubmit = (data: formData) => {
        updateMutation(data);
    };

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'kanbans', href: '/kanbans' }, { label: 'Edit' }]} />
            <div className="space-y-6">
                <ComponentCard title="Edit Kanban">
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
                            label="Lead Time"
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
                                options={spareparts.map((d: Sparepart) => ({
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
                                options={suppliers.map((d: Supplier) => ({
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
                                options={makers.map((d: Maker) => ({
                                    label: d.name,
                                    value: d.id!,
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
                                options={racks.map((d: Rack) => ({
                                    label: d.name,
                                    value: d.id,
                                }))}
                            />
                        )}
                        <Button size="sm" variant="primary" className="w-full mt-4" disabled={isPending} loading={isPending}>
                            Update
                        </Button>
                    </form>
                </ComponentCard>
            </div>
        </div>
    )
}

export default EditPage
