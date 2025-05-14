import { Area } from "./area";
import { Machine } from "./machine";
import { Rack } from "./rack";

export type Kanban = {
    id: number;
    code: string;
    balance: string;
    description: number;
    specification: string;
    lead_time: number;
    machine: Machine;
    machine_area: Area;
    max_quantity: number;
    min_quantity: number;
    rack: Rack;
    stock_in_quantity: number;
    uom: string;
    created_at: string;
    updated_at: string;
}
