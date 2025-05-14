
export interface Reminder {
    id: number;
    title: string;
    description: string;
    due_date: string;
    priority: 'low' | 'medium' | 'high';
    created_at: string;
    updated_at: string;
}
