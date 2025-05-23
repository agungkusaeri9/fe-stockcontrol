import { Area } from "./area";
import { Machine } from "./machine";
import { Operator } from "./operator";

export type StockOut = {
    id: number;
    kanban_code:string;
    quantity:number;
    machine_area:Area;
    machine:Machine;
    operator?:Operator;
    created_at:string;
}