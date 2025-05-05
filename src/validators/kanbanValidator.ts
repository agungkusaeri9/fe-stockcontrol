import { z } from "zod";

export const createKanbanValidator = z.object({
  js_code: z.string().min(1, "JS Code is required"),
  quantity: z.number().min(1, "Quantity is required"),
  lead_time: z.number().min(1, "Lead Time is required"),
  spare_part_id: z.number().min(1, "Spare Part is required"),
  supplier_id: z.number().min(1, "Supplier is required"),
  maker_id: z.number().min(1, "Maker is required"),
  rack_id: z.number().min(1, "Rack is required"),
});

export const updateKanbanValidator = z.object({
    js_code: z.string().min(1, "JS Code is required"),
    quantity: z.number().min(1, "Quantity is required"),
    lead_time: z.number().min(1, "Lead Time is required"),
    spare_part_id: z.number().min(1, "Spare Part is required"),
    supplier_id: z.number().min(1, "Supplier is required"),
    maker_id: z.number().min(1, "Maker is required"),
    rack_id: z.number().min(1, "Rack is required")
});