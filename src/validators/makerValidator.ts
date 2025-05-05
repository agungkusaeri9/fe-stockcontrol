import { z } from "zod";

export const makerValidator = z.object({
  name: z.string().min(1, "Name is required")
});
