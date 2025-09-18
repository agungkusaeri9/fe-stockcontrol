import { z } from "zod";

export const createSubMachineValidator = z.object({
  code: z.string().min(1, "Code is required")
});

export const updateSubMachineValidator = z.object({
  code: z.string().min(1, "Code is required")
}); 