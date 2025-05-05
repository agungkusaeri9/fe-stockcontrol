import { Sparepart } from "@/utils/sparepart";
import { Supplier } from "./supplier";
import { Maker } from "./maker";
import { Rack } from "./rack";

export type Kanban = {
    id: number;
    js_code: string;
    quantity: number;
    lead_time: number;
    spare_part: Sparepart;
    supplier: Supplier;
    maker: Maker;
    rack: Rack;
    created_at: string;
    updated_at: string;
}