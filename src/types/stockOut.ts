import { Area } from "./area";
import { Kanban } from "./kanban";
import { Machine } from "./machine";
import { Operator } from "./operator";
import { Requester } from "./requester";
import { StockOutChangeLog } from "./stockOutChangeLog";
import { SubMachine } from "./subMachine";

export type StockOut = {
    id: number;
    kanban_code:string;
    kanban:Kanban;
    quantity:number;
    machine_area:Area;
    machine:Machine;
    sub_machine?:SubMachine;
    operator?:Operator;
    requester?: Requester;
    stock_out_change_logs:StockOutChangeLog[];
    created_at:string;
}