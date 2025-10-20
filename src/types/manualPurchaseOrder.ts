
export type ManualPurchaseOrder = {
    id: number;
    po_number:string;
    pr_number:string;
    kanban_code:string;
    kanban_description?:string;
    kanban_specification?:string;
    date: string;
    quantity: number;
    remark?: string;
    createdAt:string;
    updatedAt:string;
}