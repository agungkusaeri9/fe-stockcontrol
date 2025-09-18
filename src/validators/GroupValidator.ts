import { z } from "zod";


export const createGroupValidator = z.object({
  name: z.string().min(1, "Name is required"),
   description: z.string().optional().nullable(),
});

export const updateGroupValidator = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().nullable(),
});
