import { Area } from "./area";
import { Machine } from "./machine";

export type StockOut = {
    id: number;
    kanban_code:string;
    quantity:number;
    machine_area:Area;
    machine:Machine;
    created_at:string;
}