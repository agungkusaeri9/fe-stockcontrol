import ComponentCard from '@/components/common/ComponentCard'
import DatePicker from '@/components/form/datePicker'
import Button from '@/components/ui/button/Button'
import React, { useState } from 'react'

const FilterPurchaseOrder = ({ filter, setFilter }: { filter: any, setFilter: any }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleDateChange = (selectedDates: Date[], dateStr: string, instance: any) => {
        const inputId = instance.element.id;

        if (inputId === 'start_date') {
            setStartDate(dateStr);
        } else if (inputId === 'end_date') {
            setEndDate(dateStr);
        }
    };

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        setFilter({ ...filter, start_date: startDate, end_date: endDate });
    };

    return (
        <>
            <ComponentCard title="Filter" className="mb-4">
                <form onSubmit={handleFilter}>
                    <div className="grid grid-cols-4 gap-4">
                        <div className='w-full'>
                            <label htmlFor="start_date" className='text-xs mb-5'>Start Date</label>
                            <DatePicker id='start_date' onChange={handleDateChange} mode='single' defaultDate={startDate} />
                        </div>
                        <div>
                            <label htmlFor="end_date" className='text-xs mb-5'>End Date</label>
                            <DatePicker id='end_date' onChange={handleDateChange} mode='single' defaultDate={endDate} />
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            {/* Add type="submit" to the filter button */}
                            <Button type="submit" className='mt-6 px-6' size='sm' variant='outline'>Filter</Button>
                            <Button className='mt-6 px-6' size='sm' variant='primary'>Excel</Button>
                            <Button className='mt-6 px-6' size='sm' variant='danger'>PDF</Button>
                        </div>
                    </div>
                </form>
            </ComponentCard>
        </>
    )
}

export default FilterPurchaseOrder
