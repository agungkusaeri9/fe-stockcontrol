import { z } from "zod";

const selectOptionSchema = z.object({
    value: z.string(),
    label: z.string()
}).nullable();

export const createManualPurchaseOrderSchema = z.object({
  po_number: z.string().min(1, "PO number wajib diisi"),
  pr_number: z.string().min(1, "PR number wajib diisi"),
    kanban_code: selectOptionSchema,
  date: z.coerce.date({ required_error: "Tanggal wajib diisi" }),
  quantity: z.number().positive("Quantity harus lebih dari 0"),
  remark: z.string().optional(),
});
