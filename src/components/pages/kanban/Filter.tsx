import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput'
import SelectLabel from '@/components/form/FormSelect'
import Button from '@/components/ui/button/Button'
import React from 'react'
import { useFetchData } from '@/hooks/useFetchData'
import MachineService from '@/services/MachineService'
import AreaService from '@/services/AreaService'
import RackService from '@/services/RackService'
import { Machine } from '@/types/machine'
import { Area } from '@/types/area'
import { Rack } from '@/types/rack'
import { useForm } from 'react-hook-form'

interface FilterFormData {
    keyword: string;
    machine_id: number | null;
    machine_area_id: number | null;
    rack_id: number | null;
}

const FilterKanban = ({ 
    filter, 
    setFilter 
}: { 
    filter: { 
        machine_id: number | null, 
        machine_area_id: number | null, 
        rack_id: number | null,
        keyword: string 
    }, 
    setFilter: (filter: { 
        machine_id: number | null, 
        machine_area_id: number | null, 
        rack_id: number | null,
        keyword: string 
    }) => void 
}) => {
    const { register, handleSubmit, reset } = useForm<FilterFormData>({
        defaultValues: {
            keyword: "",
            machine_id: null,
            machine_area_id: null,
            rack_id: null
        }
    });

    const { data: machines } = useFetchData(MachineService.getWithoutPagination, "machines", false);
    const { data: machineAreas } = useFetchData(AreaService.getWithoutPagination, "machineAreas", false);
    const { data: racks } = useFetchData(RackService.getWithoutPagination, "racks", false);

    const onSubmit = (data: FilterFormData) => {
        setFilter({ 
            machine_id: data.machine_id, 
            machine_area_id: data.machine_area_id, 
            rack_id: data.rack_id,
            keyword: data.keyword 
        });
    };

    const handleReset = () => {
        reset();
        setFilter({ 
            machine_id: null, 
            machine_area_id: null, 
            rack_id: null,
            keyword: "" 
        });
    };

    return (
        <>
            <ComponentCard title="Filter" className="mb-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-5 gap-4">
                        <InputLabel
                            placeholder="Code"
                            label="Code"
                            name="keyword"
                            onChange={(e) => setFilter({ ...filter, keyword: e.target.value })}
                            register={register("keyword")}
                        />
                        {machines && (
                            <SelectLabel
                                label="Machine"
                                name="machine_id"
                                register={register("machine_id", { valueAsNumber: true })}
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
                                register={register("machine_area_id", { valueAsNumber: true })}
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
                                register={register("rack_id", { valueAsNumber: true })}
                                options={racks.map((d: Rack) => ({
                                    label: d.code,
                                    value: Number(d.id),
                                }))}
                            />
                        )}
                        <div className="flex flex-wrap gap-2 mt-1">
                            <Button
                                type="reset"
                                onClick={() => handleReset()}
                                className="mt-5 mb-4 px-6"
                                size="xs"
                                variant="outline"
                            >
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                className="mt-5 mb-4 px-6"
                                size="xs"
                                variant="primary"
                            >
                                Filter
                            </Button>
                        </div>
                    </div>
                </form>
            </ComponentCard>
        </>
    )
}

export default FilterKanban
