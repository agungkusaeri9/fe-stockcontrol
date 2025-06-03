import { Area } from "./area";
import { Machine } from "./machine";
import { Maker } from "./maker";
import { Rack } from "./rack";
import { Supplier } from "./supplier";

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
    js_ending_quantity?: number;
    uom: string;
    maker?: Maker;
    supplier: Supplier;
    stock_status: string;
    created_at: string;
    updated_at: string;
}
