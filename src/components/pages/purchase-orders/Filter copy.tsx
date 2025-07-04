import ComponentCard from '@/components/common/ComponentCard'
import DatePicker from '@/components/form/datePicker'
import InputLabel from '@/components/form/FormInput'
import Button from '@/components/ui/button/Button'
import React, { useState } from 'react'

const FilterPurchaseOrderOld = ({ filter, setFilter }: { filter: { start_date: string, end_date: string, po_number: string }, setFilter: (filter: { start_date: string, end_date: string, po_number: string }) => void }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [poNumber, setPoNumber] = useState("");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        setFilter({ ...filter, start_date: startDate, end_date: endDate, po_number: poNumber });
    };

    const handleReset = () => {
        setStartDate("");
        setEndDate("");
        setFilter({ ...filter, start_date: "", end_date: "", po_number: "" });
    };

    const handlePoNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPoNumber(value);
    };

    return (
        <>
            <ComponentCard title="Filter" className="mb-4">
                <form onSubmit={handleFilter}>
                    <div className="grid grid-cols-4 gap-4">
                        <DatePicker placeholder='Start Date' label='Start Date' id='start_date' onChange={handleDateChange} mode='single' defaultDate={startDate} />
                        <DatePicker placeholder='End Date' label='End Date' id='end_date' onChange={handleDateChange} mode='single' defaultDate={endDate} />
                        <InputLabel
                            placeholder="PO. Number"
                            label="PO. Number"
                            name="keyword"
                            onChange={handlePoNumber}
                        />
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

export default FilterPurchaseOrderOld
