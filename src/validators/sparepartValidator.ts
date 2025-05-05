import { z } from "zod";

export const createSparepartValidator = z.object({
  name: z.string().min(1, "Name is required"),
  part_number: z.string().min(1, "Part Number is required"),
  minimum_quantity: z.number().min(1, "Minimum Quantity is required"),
  balance: z.number().min(1, "Balance is required"),
  machine_area_id: z.number().min(1, "Machine Area is required"),
  department_id: z.number().min(1, "Department is required"),
  rack_id: z.number().min(1, "Rack is required"),
  specification: z.string().min(1, "Specification is required"),
});
export const updateSparepartValidator = z.object({
  name: z.string().min(1, "Name is required"),
  part_number: z.string().min(1, "Part Number is required"),
  minimum_quantity: z.number().min(1, "Minimum Quantity is required"),
  balance: z.number().min(1, "Balance is required"),
  machine_area_id: z.number().min(1, "Machine Area is required"),
  department_id: z.number().min(1, "Department is required"),
  rack_id: z.number().min(1, "Rack is required"),
  specification: z.string().min(1, "Specification is required"),
});