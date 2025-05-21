"use client"
import React, { Suspense } from "react";
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import { useFetchData } from '@/hooks/useFetchData';
import KanbanService from '@/services/KanbanService';
import RackService from '@/services/RackService';
import { Rack } from '@/types/rack';
import { createKanbanValidator } from '@/validators/kanbanValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import TextAreaLabel from '@/components/form/FormTextArea';
import { Machine } from '@/types/machine';
import MachineService from '@/services/MachineService';
import AreaService from '@/services/AreaService';
import { Area } from '@/types/area';
import { z } from 'zod';
import Loading from '@/components/common/Loading';

type CreateKanbanFormData = z.infer<typeof createKanbanValidator>;

function CreateKanbanForm() {
    const { data: machineAreas } = useFetchData(AreaService.getWithoutPagination, "machineAreas", false);
    const { data: racks } = useFetchData(RackService.getWithoutPagination, "racks", false);
    const { data: machines } = useFetchData(MachineService.getWithoutPagination, "machines", false);

    const { mutate: createMutation, isPending } = useCreateData(
        KanbanService.create,
        ["kanbans"],
        "/kanbans"
    );

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset
    } = useForm<CreateKanbanFormData>({
        resolver: zodResolver(createKanbanValidator),
        mode: "onChange",
    });

    const onSubmit = (data: CreateKanbanFormData) => {
        createMutation(data, {
            onSuccess: () => {
                reset(); 
            }
        });
    };

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'kanbans', href: '/kanbans' }, { label: 'Create' }]} />
            <div className="space-y-6">
                <ComponentCard title="Create Kanban">
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
                                loading={isPending}
                            >
                                Create Kanban
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <CreateKanbanForm />
        </Suspense>
    );
}
