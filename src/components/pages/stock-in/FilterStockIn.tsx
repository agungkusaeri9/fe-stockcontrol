import ComponentCard from '@/components/common/ComponentCard'
import SelectLabel from '@/components/form/FormSelect'
import Input from '@/components/form/input/InputField'
import Button from '@/components/ui/button/Button'
import { useFetchData } from '@/hooks/useFetchData'
import SparePartService from '@/services/SparePartService'
import { Sparepart } from '@/utils/sparepart'
import { updateKanbanValidator } from '@/validators/kanbanValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

const FilterStockIn = () => {

    const { register, formState: { errors } } = useForm({
        resolver: zodResolver(updateKanbanValidator),
    })

    const { data: spareparts } = useFetchData(SparePartService.getWithoutPagination, "spareparts", false);

    return (
        <>
            <ComponentCard title="Filter" className="mb-4">
                <form action="">
                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <label htmlFor="start_date" className='text-xs mb-5'>Start Date</label>
                            <Input placeholder='' type='date' className='w-full' />
                        </div>
                        <div>
                            <label htmlFor="end_date" className='text-xs mb-5'>End Date</label>
                            <Input placeholder='' type='date' className='w-full' />
                        </div>
                        <div>
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
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            <Button className='mt-6 px-6' size='sm' variant='primary'>Excel</Button>
                            <Button className='mt-6 px-6' size='sm' variant='danger'>PDF</Button>
                        </div>
                    </div>
                </form>
            </ComponentCard>

        </>
    )
}

export default FilterStockIn
