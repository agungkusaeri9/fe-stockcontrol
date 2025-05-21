"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import Button from '@/components/ui/button/Button';
import { useFetchData } from '@/hooks/useFetchData';
import KanbanService from '@/services/KanbanService';
import RackService from '@/services/RackService';
import { Rack } from '@/types/rack';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import TextAreaLabel from '@/components/form/FormTextArea';
import { Machine } from '@/types/machine';
import MachineService from '@/services/MachineService';
import AreaService from '@/services/AreaService';
import { Area } from '@/types/area';
import { z } from 'zod';
import { useParams } from 'next/navigation';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { Kanban } from '@/types/kanban';
import { useUpdateData } from '@/hooks/useUpdateData';
import { updateKanbanValidator } from '@/validators/kanbanValidator';
type UpdateKanbanFormData = z.infer<typeof updateKanbanValidator>;
const Page = () => {
    const { data: machineAreas } = useFetchData(AreaService.getWithoutPagination, "machineAreas", false);
    const { data: racks } = useFetchData(RackService.getWithoutPagination, "racks", false);
    const { data: machines } = useFetchData(MachineService.getWithoutPagination, "machines", false);

    const params = useParams();
    const id = Number(params.id);
    
    const { data: kanban, isLoading } = useFetchById<Kanban>(KanbanService.getById, id, "kanban");
    const { mutate: updateMutation, isPending } = useUpdateData(
            KanbanService.update, 
            id, 
            "kanbans", 
            "/kanbans"
        );
        const { 
            register, 
            handleSubmit, 
            formState: { errors },
            reset
        } = useForm<UpdateKanbanFormData>({
            resolver: zodResolver(updateKanbanValidator),
            mode: "onChange",
        });

    useEffect(() => {
        if (kanban) {
            reset({
                code: kanban.code,
                balance: Number(kanban.balance),
                description: kanban.description.toString(),
                specification: kanban.specification,
                lead_time: kanban.lead_time,
                machine_id: Number(kanban.machine?.id),
                machine_area_id: Number(kanban.machine_area?.id),
                rack_id: Number(kanban.rack?.id),
                max_quantity: Number(kanban.max_quantity),
                min_quantity: Number(kanban.min_quantity),
                uom: kanban.uom,
            });
        }
    }, [kanban, reset]);

   
    const onSubmit = (data: UpdateKanbanFormData) => {
        updateMutation(data, {
            onSuccess: () => {
                reset(); 
            }
        });
    };

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'kanbans', href: '/kanbans' }, { label: 'Edit' }]} />
            <div className="space-y-6">
                <ComponentCard title="Edit Kanban">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputLabel
                            label="Code"
                            name="code"
                            type="text"
                            required
                            placeholder="Enter Code"
                            register={register("code")}
                            error={errors.code}
                        />
                        <InputLabel
                            label="Balance"
                            name="balance"
                            type="number"
                            required
                            placeholder="Enter balance"
                            register={register("balance", { valueAsNumber: true })}
                            error={errors.balance}
                        />
                        <TextAreaLabel
                            label="Description"
                            name="description"
                            required
                            placeholder="Enter Description"
                            register={register("description")}
                            error={errors.description}
                            rows={3}
                        />
                          <TextAreaLabel
                            label="Specification"
                            name="specification"
                            required
                            placeholder="Enter specification"
                            register={register("specification")}
                            error={errors.specification}
                            rows={3}
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
                        {machines && (
                            <SelectLabel
                                label="Machine"
                                name="machine_id"
                                required
                                register={register("machine_id", { valueAsNumber: true })}
                                error={errors.machine_id}
                                options={machines.map((d: Machine) => ({
                                    label: d.code,
                                    value: Number(d.id),
                                }))}
                            />
                        )}
                          {machineAreas && (
                            <SelectLabel
                                label="Machine Area"
                                name="machine_area_id"
                                required
                                register={register("machine_area_id", { valueAsNumber: true })}
                                error={errors.machine_area_id}
                                options={machineAreas.map((d: Area) => ({
                                    label: d.name,
                                    value: Number(d.id),
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
                                    label: d.code,
                                    value: Number(d.id),
                                }))}
                            />
                        )}
                         <InputLabel
                            label="Max Quantity"
                            name="max_quantity"
                            type="number"
                            required
                            placeholder="Enter max quantity"
                            register={register("max_quantity", { valueAsNumber: true })}
                            error={errors.max_quantity}
                        />
                        <InputLabel
                            label="Min Quantity"
                            name="min_quantity"
                            type="number"
                            required
                            placeholder="Enter min quantity"
                            register={register("min_quantity", { valueAsNumber: true })}
                            error={errors.min_quantity}
                        />
                        <InputLabel
                            label="Uom"
                            name="uom"
                            type="text"
                            required
                            placeholder="Enter uom"
                            register={register("uom")}
                            error={errors.uom}
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
                                loading={isLoading}
                            >
                                Update Kanban
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    )
}

export default Page
