"use client"
import { useEffect, useState } from 'react';
import Modal from '@/components/common/Modal';
import { useFetchData } from '@/hooks/useFetchData';
import ReminderService from '@/services/ReminderService';
import { Reminder } from '@/types/reminder';
import { format } from 'date-fns';

const ReminderModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: reminders } = useFetchData(ReminderService.get, "reminders", false);

    useEffect(() => {
        if (reminders && reminders.length > 0) {
            setIsOpen(true);
        }
    }, [reminders]);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Reminders"
            size="md"
        >
            <div className="space-y-4">
                {reminders?.map((reminder: Reminder) => (
                    <div key={reminder.id} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-medium text-yellow-800">{reminder.title}</h3>
                                <p className="mt-1 text-sm text-yellow-700">{reminder.description}</p>
                                <p className="mt-2 text-xs text-yellow-600">
                                    Due: {format(new Date(reminder.due_date), 'PPP')}
                                </p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                reminder.priority === 'high' 
                                    ? 'bg-red-100 text-red-800'
                                    : reminder.priority === 'medium'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                            }`}>
                                {reminder.priority}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    onClick={handleClose}
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default ReminderModal; 