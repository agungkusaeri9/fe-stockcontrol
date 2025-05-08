"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import { useFetchData } from '@/hooks/useFetchData';
import DepartmentService from '@/services/DepartmentService';
import MachineAreaService from '@/services/MachineAreaService';
import RackService from '@/services/RackService';
import SparePartService from '@/services/SparePartService';
import { Department } from '@/types/department';
import { MachineArea } from '@/types/machineArea';
import { Rack } from '@/types/rack';
import { createSparepartValidator } from '@/validators/sparepartValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';

const CreateOperator = () => {
    type formData = {
        name: string;
        part_number: string;
        specification: string;
        minimum_quantity: number;
        balance: number;
        department_id: number;
        machine_area_id: number;
        rack_id: number;
    }
    const { data: departments } = useFetchData(DepartmentService.getWithoutPagination, "departments", false);
    const { data: machineAreas } = useFetchData(MachineAreaService.getWithoutPagination, "machineAreas", false);
    const { data: racks } = useFetchData(RackService.getWithoutPagination, "racks", false);

    const { mutate: createMutation, isPending } = useCreateData(
        SparePartService.create,
        ["spareparts"],
        "/spareparts"
    );
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(createSparepartValidator),
    })
    const onSubmit = (data: formData) => {
        createMutation(data);
    };

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'spareparts', href: '/spareparts' }, { label: 'Create' }]} />
            <div className="space-y-6">
                <ComponentCard title="Create Sparepart">
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
                            label="Part Number"
                            name="part_number"
                            type="text"
                            required
                            placeholder="Enter Part Number"
                            register={register("part_number")}
                            error={errors.part_number}
                        />
                        <InputLabel
                            label="Spesicication"
                            name="specification"
                            type="text"
                            required
                            placeholder="Enter Spesicication"
                            register={register("specification")}
                            error={errors.specification}
                        />
                        <InputLabel
                            label="Minimum Qty"
                            name="minimum_quantity"
                            type="number"
                            required
                            placeholder="Enter Minimum Qty"
                            register={register("minimum_quantity", { valueAsNumber: true })}
                            error={errors.minimum_quantity}
                        />
                        <InputLabel
                            label="Balance"
                            name="balance"
                            type="number"
                            required
                            placeholder="Enter Balance"
                            register={register("balance", { valueAsNumber: true })}
                            error={errors.balance}
                        />
                        {departments && (
                            <SelectLabel
                                label="Departemen"
                                name="department_id"
                                required
                                register={register("department_id", { valueAsNumber: true })}
                                error={errors.department_id}
                                options={departments.map((d: Department) => ({
                                    label: d.name,
                                    value: d.id,
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
                                options={machineAreas.map((area: MachineArea) => ({
                                    label: area.name,
                                    value: area.id,
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
                                options={racks.map((rack: Rack) => ({
                                    label: rack.name,
                                    value: rack.id,
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
