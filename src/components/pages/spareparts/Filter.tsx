'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ComponentCard from '@/components/common/ComponentCard'
import SelectLabel from '@/components/form/FormSelect'
import Button from '@/components/ui/button/Button'
import { useFetchData } from '@/hooks/useFetchData'
import DepartmentService from '@/services/DepartmentService'
import MachineAreaService from '@/services/MachineAreaService'
import RackService from '@/services/RackService'
import { MachineArea } from '@/types/machineArea'


interface FilterProps {
    filters?: {
        machine_area_id: string;
        department_id: string;
        rack_id: string;
    };
    setFilters?: React.Dispatch<React.SetStateAction<{
        machine_area_id: string;
        department_id: string;
        rack_id: string;
    }>>;
}

const FilterSparepart: React.FC<FilterProps> = ({ filters, setFilters }) => {
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const searchParams = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value) searchParams.set(key, value);
        });
        // router.push(`/spareparts?${searchParams.toString()}`);
    };

    const { data: machineAreas } = useFetchData(MachineAreaService.getWithoutPagination, "machineAreas", false)
    const { data: departments } = useFetchData(DepartmentService.getWithoutPagination, "departments", false)
    const { data: racks } = useFetchData(RackService.getWithoutPagination, "racks", false)

    return (
        <ComponentCard title="Filter" className="mb-4">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-4 gap-4">
                    {machineAreas && (
                        <SelectLabel
                            label="Machine Area"
                            name="machine_area_id"
                            onChange={handleChange}
                            value={filters.machine_area_id}
                            options={machineAreas.map((d: MachineArea) => ({
                                label: d.name,
                                value: d.id!,
                            }))}
                        />
                    )}
                    {departments && (
                        <SelectLabel
                            label="Department"
                            name="department_id"
                            onChange={handleChange}
                            value={filters.department_id}
                            options={departments.map((d: MachineArea) => ({
                                label: d.name,
                                value: d.id!,
                            }))}
                        />
                    )}
                    {racks && (
                        <SelectLabel
                            label="Rack"
                            name="rack_id"
                            onChange={handleChange}
                            value={filters.rack_id}
                            options={racks.map((d: MachineArea) => ({
                                label: d.name,
                                value: d.id!,
                            }))}
                        />
                    )}
                    <div className="flex flex-col w-1/2 gap-2">
                        <Button
                            className="mt-6 px-6"
                            size="sm"
                            variant="secondary"
                        >
                            Filter
                        </Button>
                    </div>
                </div>
            </form>
        </ComponentCard>
    )
}

export default FilterSparepart
