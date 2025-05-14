import { z } from "zod";

export const createKanbanValidator = z.object({
  code: z.string().min(1, "Code is required"),
  balance: z.number().min(1, "Balance is required"),
  description: z.string().min(1, "Description Time is required"),
  specification: z.string().min(1, "Specification Part is required"),
  min_quantity: z.number().min(1, "Min Quantity is required"),
  max_quantity: z.number().min(1, "Max Quantity is required"),
  uom: z.string().min(1, "Uom is required"),
  machine_area_id: z.number().min(1, "Machine Area is required"),
  machine_id: z.number().min(1, "Machine is required"),
  rack_id: z.number().min(1, "Rack is required"),
  lead_time: z.number().min(1, "Lead Time is required"),
});

export const updateKanbanValidator = z.object({
  code: z.string().min(1, "Code is required"),
  balance: z.number().min(1, "Balance is required"),
  description: z.string().min(1, "Description Time is required"),
  specification: z.string().min(1, "Specification Part is required"),
  min_quantity: z.number().min(1, "Min Quantity is required"),
  max_quantity: z.number().min(1, "Max Quantity is required"),
  uom: z.string().min(1, "Uom is required"),
  machine_area_id: z.number().min(1, "Machine Area is required"),
  machine_id: z.number().min(1, "Machine is required"),
  rack_id: z.number().min(1, "Rack is required"),
  lead_time: z.number().min(1, "Lead Time is required"),
});