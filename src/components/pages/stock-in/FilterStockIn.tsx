import ComponentCard from '@/components/common/ComponentCard'
import Input from '@/components/form/input/InputField'
import Select from '@/components/form/Select'
import Button from '@/components/ui/button/Button'
import SparePartService from '@/services/SparePartService'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const FilterStockIn = () => {

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
                            <label htmlFor="end_date" className='text-xs mb-5'>Part Number</label>
                            <Select onChange={() => { }} options={[
                                { value: "0", label: "Select Option" },
                                { value: "1", label: "Part 1" },
                                { value: "2", label: "Part 2" },
                                { value: "3", label: "Part 3" },
                            ]} placeholder="Select Option" />
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
