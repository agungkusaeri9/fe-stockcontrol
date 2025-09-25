import { z } from "zod";

const selectOptionSchema = z.object({
    value: z.number({
    required_error: "Group is required",
    invalid_type_error: "Group must be a number",
  }),
  label: z.string(),
}).nullable();


export const createRequesterValidator = z.object({
  name: z.string().min(1, "Name is required"),
  group_id: selectOptionSchema,
});

export const updateRequesterValidator = z.object({
  name: z.string().min(1, "Name is required"),
 group_id: selectOptionSchema,
});
