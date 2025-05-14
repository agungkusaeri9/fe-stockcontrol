import { Area } from "./area";
import { Kanban } from "./kanban";
import { Machine } from "./machine";

export type StockOut = {
    id: number;
    kanban:Kanban;
    quantity:number;
    machine_area:Area;
    machine:Machine;
    created_at:string;
}