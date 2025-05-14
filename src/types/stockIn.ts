import { Kanban } from "./kanban";

export type StockIn = {
    id: number;
    kanban:Kanban;
    quantity:number;
    created_at:string;
}