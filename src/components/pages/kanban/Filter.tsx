import ComponentCard from '@/components/common/ComponentCard'
import DatePicker from '@/components/form/datePicker'
import Input from '@/components/form/input/InputField'
import Button from '@/components/ui/button/Button'
import React, { useState } from 'react'

const FilterKanban = () => {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (date: Date[]) => {
        console.log(date);
    };

    const handleDateSelect = (date: Date[]) => {
        console.log(date);
    };
    return (
        <>
            <ComponentCard title="Filter" className="mb-4">
                <form action="">
                    <div className="grid grid-cols-3 gap-4">
                        <div className='w-full'>
                            <label htmlFor="start_date" className='text-xs mb-5'>Start Date</label>
                            <DatePicker name='start_date' id='start_date' onChange={handleDateChange} mode='single' defaultDate={date} />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="end_date" className='text-xs mb-5'>End Date</label>
                            <DatePicker name='end_date' id='end_date' onChange={handleDateChange} mode='single' defaultDate={date} />
                        </div>
                        {/* <div>
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
                        </div> */}
                        <div className='flex flex-wrap gap-2'>
                            <Button className='mt-6 px-6' size='sm' variant='outline'>Filter</Button>
                            <Button className='mt-6 px-6' size='sm' variant='primary'>Excel</Button>
                            <Button className='mt-6 px-6' size='sm' variant='danger'>PDF</Button>
                        </div>
                    </div>
                </form>
            </ComponentCard>

        </>
    )
}

export default FilterKanban
