import { Department } from "@/types/department";
import { MachineArea } from "@/types/machineArea";
import { Rack } from "@/types/rack";

export type Sparepart = {
  id: number;
  part_number: string;
  name: string;
  description: string;
  specification?: string;
  minimum_quantity: number;
  balance: number;
  department: Department;
  machine_area: MachineArea;
  rack: Rack;
  created_at: string;
  updated_at: string;
};
