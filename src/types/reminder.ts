import { Sparepart } from "@/utils/sparepart";

export type Reminder = {
    id: number;
    sparepart: Sparepart;
    po_status: boolean;
    pr_status: boolean;
    po_date: string;
    pr_date: string;
}
