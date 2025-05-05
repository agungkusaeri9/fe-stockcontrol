"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import Button from '@/components/ui/button/Button';
import { useFetchData } from '@/hooks/useFetchData';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import DepartmentService from '@/services/DepartmentService';
import MachineAreaService from '@/services/MachineAreaService';
import RackService from '@/services/RackService';
import SparePartService from '@/services/SparePartService';
import { updateSparepartValidator } from '@/validators/sparepartValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

const CreateOperator = () => {
    const params = useParams();
    const id = params.id
    const { data: sparepart } = useFetchById(SparePartService.getById, Number(id), "sparepart");
    useEffect(() => {
        reset({
            name: sparepart?.name,
            specification: sparepart?.specification,
            part_number: sparepart?.part_number,
            minimum_quantity: sparepart?.minimum_quantity,
            balance: sparepart?.balance,
            machine_area_id: sparepart?.machine_area?.id,
            department_id: sparepart?.department?.id,
            rack_id: sparepart?.rack?.id
        })
    }, [sparepart])
    const { data: departments } = useFetchData(DepartmentService.getWithoutPagination, "departments", false);
    const { data: machineAreas } = useFetchData(MachineAreaService.getWithoutPagination, "machineAreas", false);
    const { data: racks } = useFetchData(RackService.getWithoutPagination, "racks", false);
    const { mutate: UpdateMutation, isPending } = useUpdateData(
        SparePartService.update,
        Number(id),
        "spareparts",
        '/spareparts'
    );
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(updateSparepartValidator),
    });
    const onSubmit = (data: any) => {
        UpdateMutation(data);
    };

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'spareparts', href: '/spareparts' }, { label: 'Edit' }]} />
            <div className="space-y-6">
                <ComponentCard title="Edit Sparepart">
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
                                options={departments.map((d: any) => ({
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
                                options={machineAreas.map((area: any) => ({
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
                                options={racks.map((rack: any) => ({
                                    label: rack.name,
                                    value: rack.id,
                                }))}
                            />
                        )}
                        <Button size="sm" variant="primary" className="w-full mt-4" disabled={isPending}>
                            Create
                        </Button>
                    </form>
                </ComponentCard>
            </div>
        </div>
    )
}

export default CreateOperator
